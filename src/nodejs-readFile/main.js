var Document = {
    contentFile: '',
    fileName: 'partidos.txt',
    encoding: 'utf8',
    readFile: function() {
        var fs = require('fs');
        //leo archivo en forma asincronica
        fs.readFile(
            Document.fileName,
            Document.encoding, 
            function(err, data) {
                if (err) {
                    console.error(err);
                } 
                else {
                    if (data.toString() !== Document.contentFile) {
                        Document.contentFile = data.toString();
                        console.log(data.toString());                
                    } 
                    else {
                        console.log('archivo no cambio');
                    }
                }        
            }
        )
    }
};
//Cada 5 segundos verifico si cambio el archivo
setInterval(Document.readFile,5000);
