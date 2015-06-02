//var apiParser = require('./apiParser.js');
var nodeBuilder = require('./nodeBuilder.js');

var models = [{
    name :"foo",
    url : "http://spargonaut.com",
    type : "GET"
}];

var app = {
    buildNodes : function(doc) {

        var wrapperDiv = doc.getElementById('wrapper');
        console.log(doc);
        console.log(wrapperDiv);

        //var apiModels = apiParser.getApiModels();
        var apiModels = models;
        var allNodesHtml = '';
        for (i in apiModels) {
            allNodesHtml += nodeBuilder.buildNodeFrom(apiModels[i]);
        }
        wrapperDiv.innerHTML += allNodesHtml;
    },
}

module.exports = app;
