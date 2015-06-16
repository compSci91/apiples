var fs = require('fs');
var _ = require('lodash');

var apiModelValidator = require('./apiModelValidator.js');
var apiRequestJSONLocation = 'apis';

var apiParser = {
    
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
        for (i in apiRequestJSONFiles) {
            apiModel = this.getApiRequest(apiRequestJSONFiles[i]);
            apiModels.push(apiModel);
        };

        apiModelValidator.areValidModels(apiModels);

        return apiModels;
    },

    createApiModelsFile : function() {
        var apiModels = this.getApiModels();
        var stringToWrite = '';
        for (index in apiModels) {
            stringToWrite += JSON.stringify(apiModels[index]) + ", ";
        }
        stringToWrite = stringToWrite.substring(0, (stringToWrite.length - 2));
        var fileHeader = "module.exports = { getModels : function () { return [ ";
        var fileFooter = ' ]}}';
        return fileHeader + stringToWrite + fileFooter;
    }
};

module.exports = apiParser;
