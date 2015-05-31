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

    getApiRequest : function() {
        var filename = apiRequestJSONLocation + "/GET_foo.txt_spargonaut.com.json";
        var jsonFileContent = fs.readFileSync(filename, 'utf8');
        var apiRequestModel = JSON.parse(jsonFileContent);
        return apiRequestModel;
    }
};

module.exports = apiParser;
