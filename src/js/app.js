var nodeBuilder = require('./nodeBuilder.js');
var models = require('./models.js');
var scheduler = require('node-schedule');

var requestBuilder = require('./requestBuilder');

var app = {

    buildNodes : function (doc) {

        var wrapperElement = doc.getElementById('wrapper');
        var allNodesHtml = wrapperElement.innerHTML;

        var apiModels = models.getModels();
        if (apiModels.length == 0) {
            allNodesHtml = nodeBuilder.buildErrorMessageNode();
        } else {
            for (i in apiModels) {
                allNodesHtml += nodeBuilder.buildNodeFrom(apiModels[i]);
            }
        }
        wrapperElement.innerHTML = allNodesHtml;
    },

    startScheduledRequests : function (minutes, doc) {
        console.log('starting the scheduled requests');
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
    },

    stopScheduledRequests : function (requests) {
        console.log('stopping the scheduled requests!');
        for (i in requests) {
            scheduler.cancelJob(requests[i]);
        }
    }
};

module.exports = app;