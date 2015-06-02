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
        var jsonFileContent = fs.readFileSync(filename, 'utf8');
        return JSON.parse(jsonFileContent);
    },

    getApiModels : function() {
        var apiRequestJSONFiles = this.getApiRequestJSONFiles();
        var apiModel;
        var apiModels = [];
        var filename;
        for (filename in apiRequestJSONFiles) {
            apiModel = this.getApiRequest(filename);
            apiModels.push(apiModel);
        };
        return apiModels;
    },

    createApiModelsFile : function(fileToWrite) {
        fs.writeSync(fileToWrite, '');
    }
};

module.exports = apiParser;
