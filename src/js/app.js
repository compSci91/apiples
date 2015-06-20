var nodeBuilder = require('./nodeBuilder.js');
var models = require('./models.js');
var requestScheduler = require('./requestScheduler.js');

var app = {

    buildNodes : function (doc) {

        var wrapperElement = doc.getElementById('wrapper');
        var allNodesHtml = wrapperElement.innerHTML;

        var apiModels = models.getModels();
        if (apiModels.length === 0) {
            allNodesHtml = nodeBuilder.buildErrorMessageNode();
        } else {
            for (var i in apiModels) {
                if (apiModels.hasOwnProperty(i)) {
                    allNodesHtml += nodeBuilder.buildNodeFrom(apiModels[i]);
                }
            }
        }
        wrapperElement.innerHTML = allNodesHtml;
    },

    startScheduledRequests : function (doc) {
        console.log('starting the scheduled requests');
        var apiRequests = [];
        var apiModels = models.getModels();

        var nodes = [];
        for (var i in apiModels) {
            if (apiModels.hasOwnProperty(i)) {
                var node = doc.getElementById(apiModels[i].name);
                nodes.push(node);
            }
        }
        requestScheduler.startScheduledRequests(apiModels, nodes);
        return apiRequests;
    },

    stopScheduledRequests : function () {
        console.log('stopping the scheduled requests!');
        requestScheduler.stopScheduledRequests();
    }
};

module.exports = app;