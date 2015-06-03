var apiParser = require('./apiParser.js');
var fs = require('fs');

var fileToWrite = 'src/js/models.js';
var contentToWrite = apiParser.createApiModelsFile(fileToWrite);
fs.writeFileSync(fileToWrite, contentToWrite);
console.log('done');
