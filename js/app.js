var apiParser = require('./apiParser.js');
var nodeBuilder = require('./nodeBuilder.js');

var app = {
    buildNodes : function(doc) {

        var wrapperDiv = doc.getElementById('wrapper');

        var apiModels = apiParser.getApiModels();
        var allNodesHtml = '';
        for (apiModel in apiModels) {
            allNodesHtml += nodeBuilder.buildNodeFrom(apiModel);
        }
        wrapperDiv.innerHTML = allNodesHtml;
    },
}

module.exports = app;
