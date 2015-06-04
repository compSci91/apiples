//var apiParser = require('./apiParser.js');
var nodeBuilder = require('./nodeBuilder.js');
var models = require('./models.js');

var app = {
    buildNodes : function(doc) {

        var wrapperDiv = doc.getElementById('wrapper');

        var apiModels = models.getModels();
        var allNodesHtml = '';
        for (i in apiModels) {
            allNodesHtml += nodeBuilder.buildNodeFrom(apiModels[i]);
        }
        wrapperDiv.innerHTML += allNodesHtml;
    }
}

module.exports = app;
