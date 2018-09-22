const {createServer} = require('http');
const {parse} = require('url');

var server = {
    DataClient: (request, response) => {
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        let paramUrl = parse(request.url,false).query; 
        console.log(paramUrl);
        response.write('peoples(876)');
        response.end();         
    },
    getPersons: (param) => {
        return param;
    }           
};

createServer(server.DataClient).listen(8000);
console.log('server started');