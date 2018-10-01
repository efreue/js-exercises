const {createServer} = require('http');
const {parse} = require('url');

var server = {
    DataClient: (request, response) => {
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        let paramUrl = parse(request.url,false).query.split("=");
        response.write(server.getDataJson(paramUrl[1]));
        response.end();         
    },
    getDataJson: (callback) => {
        return callback + '("hola");';
    }         
};

createServer(server.DataClient).listen(8000);
console.log('server started');