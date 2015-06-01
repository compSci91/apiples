var apiParser = require('./apiParser.js');

var app = {
    buildNodes : function(doc) {

        var wrapperDiv = doc.getElementById('wrapper');

        var apiModels = apiParser.getApiModels();
        for (apiModel in apiModels) {
            wrapperDiv.innerHTML += '<div>foo</div>';
        }
    },
}

module.exports = app;
