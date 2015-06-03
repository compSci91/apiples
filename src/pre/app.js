var apiParser = require('./apiParser.js');

var fileToWrite = 'src/js/models.js';
apiParser.createApiModelsFile(fileToWrite);
console.log('done');
