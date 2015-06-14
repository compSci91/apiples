var nodeBuilder = require('./nodeBuilder.js');
var models = require('./models.js');
var scheduler = require('node-schedule');

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

    buildScheduledRequests : function (minutes) {
        var apiRequests = [];

        var apiModels = models.getModels();
        var allNodesHtml = '';
        var scheduledJob;
        for (i in apiModels) {
            scheduledJob = scheduler.scheduleJob('*/' + minutes + ' * * * *', function () {
                console.log('making the apiRequests');
            });
            apiRequests.push(scheduledJob);
        }
        return apiRequests;
    }
};

module.exports = app;
