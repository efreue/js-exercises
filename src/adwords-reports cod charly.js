const {AdwordsAuth, AdwordsReport} = require('node-adwords');
const Logger = require('./logger');
const config = require('../config');
const utils = require('./utils');
const MarketingChannelIds = require('./marketing-channel-ids');
const storedProc = require('./stored-proc');
const _ = require('lodash');

const logger = new Logger();

const header = `Date, CampaignId, CampaignName, Device, Cost, Impressions, ` +
    `Clicks, Conversions, ConversionValue, AdvertisingChannelType`;

const getColumnIndex = (name) => {
    return header
        .toLowerCase()
        .split(', ')
        .indexOf(name.toLowerCase());
};

const Indexes = {
    date: getColumnIndex('Date'),
    campaignId: getColumnIndex('CampaignId'),
    device: getColumnIndex('Device'),
    cost: getColumnIndex('Cost'),
    impressions: getColumnIndex('Impressions'),
    clicks: getColumnIndex('Clicks'),
    conversions: getColumnIndex('Conversions'),
    conversionValue: getColumnIndex('ConversionValue'),
    channelType: getColumnIndex('AdvertisingChannelType')
};

const getPrimaryKey = (row, ...indexes) => {
    return indexes.reduce((values, index) => {
        values.push(row[index]);
        return values;
    }, []).join('');
};

const mapColumns = (data, mapping) => {
    const columnsToMap = Object.keys(mapping);
    const indexes = columnsToMap.reduce((indexes, name) => {
        indexes[name] = getColumnIndex(name);
        return indexes;
    }, {});
    return data.map(row => {
        columnsToMap.forEach((columnName) => {
            row[indexes[columnName]] = mapping[columnName](
                row[indexes[columnName]]
            );
        });
        return row;
    });
};

const normalizeCost = (cost, currencyCode) => {
    switch(currencyCode) {
        case 'ARS':
        case 'BRL':
            return cost / 1000000;
        default:
            return cost;
    }
};

const ChannelTypeMarketingChannel = {
	'Search': 'GoogleSearch',
	'Display': 'GoogleDisplay',
	'Shopping': 'GoogleShopping'
};

const summarize = (total, row, index) => {
    total[index] = (parseFloat(total[index]) || 0) +
        (parseFloat(row[index]) || 0);
};

const normalizeReport = (csv, currencyCode, marketingChannels) => {
    let data = csv
        .split('\n')
        .slice(2, -2)
        .map(row => row.split(','));

    data.forEach(row => {
        row[Indexes.channelType] = row[Indexes.channelType]
            .replace(/\s/g, '');
    });

    data = data.filter(row => {
        return marketingChannels.includes(
            MarketingChannelIds[
                ChannelTypeMarketingChannel[
                    row[Indexes.channelType]
                ]
            ]
        );
    });

    return _.chain(
        mapColumns(data, {
            device(value) {
                return value == 'Computers'
                    ? 'Desktop'
                    : 'Mobile';
            },
            cost(value) {
                return normalizeCost(value, currencyCode);
            },
            conversions(value) {
                return parseInt(value);
            }
        })
    )
    .reduce((total, row) => {
        const primaryKey = getPrimaryKey(
            row,
            Indexes.date,
            Indexes.campaignId,
            Indexes.device
        );
        if(typeof total[primaryKey] == 'undefined') {
            total[primaryKey] = row;
        }
        else {
            summarize(total[primaryKey], row, Indexes.cost);
            summarize(total[primaryKey], row, Indexes.impressions);
            summarize(total[primaryKey], row, Indexes.clicks);
            summarize(total[primaryKey], row, Indexes.conversions);
            summarize(total[primaryKey], row, Indexes.conversionValue);
        }
        return total;
    }, {})
    .values()
    .groupBy(row => row[Indexes.channelType])
    .reduce((allReports, report, channelType) => {
        allReports[ChannelTypeMarketingChannel[channelType]] = report
            .map(row => {
                row.splice(Indexes.channelType, 1);
                return row.join(';');
            })
            .join('\n');
        return allReports;
    }, {})
    .value();
};

const getRefreshToken = (authCode) => {
    return new Promise((resolve, reject) => {
        const client = new AdwordsAuth({
            /* eslint-disable camelcase */
            client_id: config.channels.google.clientId,
            client_secret: config.channels.google.clientSecret
            /* eslint-enable camelcase */
        }, config.channels.google.redirectUrl);

        client.getAccessTokenFromAuthorizationCode(authCode, (error, tokens) => {
            if(error) {
                reject(error);
            }
            else {
                resolve(tokens);
            }
        });
    });
};

const saveCredentials = async (advertiserId, marketingChannels, credentials) => {
    try {
        await storedProc.updateCredentials(
            advertiserId,
            // In the DB all google marketing-channel uses the same credentials,
            // that is, they point to the same record,
            // therefor we update for a single (any) marketing channel
            marketingChannels.pop(),
            !!credentials,
            credentials
                ? JSON.stringify(credentials)
                : {}
        );
    }
    catch(e) {
        logger.error([
            'Failed to save the permanent credentials.',
            JSON.stringify({
                advertiserId,
                marketingChannels,
                credentials
            }),
            e
        ].join(' '));
    }
};

const getAccountReport = async ({
    account,
    credentials,
    id_advertiser: advertiserId,
    id_marketing_channel: marketingChannels,
    currency_code: currencyCode
}) => {

    // ********
    // delete credentials.refresh_token;
    // credentials.authorization_code = '4/lgDAjmBnqRWqnYXlTOc1ennCa8ZyQ-Jf_wY9BkK8iPo4dLYnyIakm0aif8f1Rt6gKlUq9zMMooNxeloTbSTBmnI';
    // ********

    if(!credentials.refresh_token) {
        try {
            logger.info(
                'Account ${account} has temporal credential. ' +
                'Trying to get the permanent credentials'
            );
            //
            // http://test.admotion.com.ar/google-login/
            //
            /* eslint-disable camelcase */
            credentials = await getRefreshToken(credentials.authorization_code);
            /* eslint-enable camelcase */
            await saveCredentials(advertiserId, marketingChannels, credentials);
        }
        catch(e) {
            logger.error(e);
            await saveCredentials(advertiserId, marketingChannels, null);
            throw new Error(e);
        }
    }

    let report = new AdwordsReport({
        developerToken: config.channels.google.developerToken,
        userAgent: config.company,
        clientCustomerId: account,
        /* eslint-disable camelcase */
        client_id: config.channels.google.clientId,
        client_secret: config.channels.google.clientSecret,
        refresh_token: credentials.refresh_token
        /* eslint-enable camelcase */
    });

    return new Promise((resolve, reject) => {
        report.getReport(config.channels.google.apiVersion, {
            query: [
                `SELECT ${header}`,
                `FROM CAMPAIGN_PERFORMANCE_REPORT`,
                // `WHERE Status = "ENABLED"`,
                `DURING
                    ${utils.yyyymmdd(
                        utils.addDaysToDate(
                            new Date(),
                            config.channels.google.fromDate
                        )
                    )},
                    ${utils.yyyymmdd(
                        utils.addDaysToDate(
                            new Date(),
                            config.channels.google.toDate
                        )
                    )}`
            ].join(' '),
            format: 'CSV'
        }, (error, report) => {
            if(error) {
                reject(error);
            }
            else {
                resolve(
                    normalizeReport(report, currencyCode, marketingChannels)
                );
            }
        });
    });
};

module.exports = {
    async getGoogleReports(task) {
        try {
            return await getAccountReport(task);
        }
        catch(e) {
            throw new Error(e);
        }
    }
};