const {createServer} = require('http');
const {parse} = require('url');

var server = {
    DataClient: (request, response) => {
        const urlParams = parse(request.url, true).query;
        
        console.log(urlParams.name); 
    }           
};

createServer(server.DataClient).listen(8000);
console.log('server started');