var nodeBuilder = require('./nodeBuilder.js');
var models = require('./models.js');
var scheduler = require('node-schedule');

var requestBuilder = require('./requestBuilder');

var app = {

    buildNodes : function (doc) {

        var wrapperDiv = doc.getElementById('wrapper');
        var allNodesHtml = '';

        var apiModels = models.getModels();
        if (apiModels.length == 0) {
            allNodesHtml = nodeBuilder.buildErrorMessageNode();
        } else {
            for (i in apiModels) {
                allNodesHtml += nodeBuilder.buildNodeFrom(apiModels[i]);
            }
        }
        wrapperDiv.innerHTML += allNodesHtml;
    },

    buildScheduledRequests : function (minutes, doc) {
        var apiRequests = [];

        var apiModels = models.getModels();

        var node;

        var scheduledJob;
        for (i in apiModels) {
            node = doc.getElementById(apiModels[i].name);
            scheduledJob = scheduler.scheduleJob('*/' + minutes + ' * * * *',
                requestBuilder.makeRequest(apiModels[i], node));
            apiRequests.push(scheduledJob);
        }
        return apiRequests;
    }
};

module.exports = app;