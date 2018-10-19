const {createServer} = require('http');
const {parse} = require('url');
const {existsSync, appendFileSync, readFileSync} = require('fs');

var server = {
    DataClient: (request, response) => {
        response.writeHead (200, {'Content-Type': 'text/javascript'});
        let paramUrl = parse(request.url,false).query.split("=");
        response.write (
            server.wrapJsonInFunction (
                paramUrl[1],
                server.getDataJson(server.getLocation(request.url))
            )
        );
        response.end();         
    },
    wrapJsonInFunction: (nameFunction, dataJson) => {
        let result = `${nameFunction} (${dataJson})`;
        return result;
    },
    getDataJson: (pathLocation) => {
        if (existsSync(pathLocation)) {
            return readFileSync(pathLocation);
        }
        else {
            return 'File not Found';
        }
    },
    getLocation: (path) => {
        return __dirname + parse(path).pathname + (parse(path).pathname == '/' ? 'data-json.json' : '');
    }         
};

createServer(server.DataClient).listen(8000);
console.log('server started');