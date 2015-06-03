var fs = require('fs');
var _ = require('lodash');

var apiRequestJSONLocation = 'apis';

var apiParser = {
    
    parseApiFiles : function() {},

    getApiRequestJSONFiles : function() {
        var fileNames = fs.readdirSync(apiRequestJSONLocation);
        var filteredFiles = _.filter(fileNames, function(item) {
            var re = new RegExp(/^\./);
            return !re.test(item);
        });
        return filteredFiles
    },

    getApiRequest : function(filename) {
        var fileToParse = apiRequestJSONLocation + "/" + filename;
        var jsonFileContent = fs.readFileSync(fileToParse, 'utf8');
        return JSON.parse(jsonFileContent);
    },

    getApiModels : function() {
        var apiRequestJSONFiles = this.getApiRequestJSONFiles();
        var apiModel;
        var apiModels = [];
        var filename;
        for (i in apiRequestJSONFiles) {
            apiModel = this.getApiRequest(apiRequestJSONFiles[i]);
            apiModels.push(apiModel);
        };
        return apiModels;
    },

    createApiModelsFile : function(fileToWrite) {
        // FIXME - this method should be tested better
        var apiModels = this.getApiModels();
        var stringToWrite = '';
        for (index in apiModels) {
            stringToWrite += JSON.stringify(apiModels[index]);
        }
        var fileHeader = "module.exports = function () { return [ ";
        var fileFooter = ' ]}';
        var fileContentToWrite = fileHeader + stringToWrite + fileFooter;
        var buffer = new Buffer(fileContentToWrite);
        fs.writeFileSync(fileToWrite, buffer);
    }
};

module.exports = apiParser;
