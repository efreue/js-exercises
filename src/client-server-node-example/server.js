const {createServer} = require('http');

var server = {
    DataClient: (request, response) => {
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.write('peoples(34)');
        response.end();         
    }           
};

createServer(server.DataClient).listen(8000);
console.log('server started');