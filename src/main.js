var fs = require('fs');
//lee archivo en forma asincronica
fs.readFile('partidos.txt','utf8', function(err, data) {
    if (err) {
        return console.error(err);
    }
    console.log(data.toString());
});