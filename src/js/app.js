var nodeBuilder = require('./nodeBuilder.js');
var models = require('./models.js');
var scheduler = require('node-schedule');

var requestBuilder = require('./requestBuilder');

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

    startScheduledRequests : function (minutes, doc) {
        console.log('starting the scheduled requests');
        var apiRequests = [];

        var apiModels = models.getModels();

        var node;

        var scheduledJob;
        for (var i in apiModels) {
            if (apiModels.hasOwnProperty(i)) {
                node = doc.getElementById(apiModels[i].name);
                scheduledJob = scheduler.scheduleJob('*/' + minutes + ' * * * *',
                    requestBuilder.makeRequest(apiModels[i], node));
                apiRequests.push(scheduledJob);
            }
        }
        return apiRequests;
    },

    stopScheduledRequests : function (requests) {
        console.log('stopping the scheduled requests!');
        for (var i in requests) {
            if (requests.hasOwnProperty(i)) {
                scheduler.cancelJob(requests[i]);
            }
        }
    }
};

module.exports = app;