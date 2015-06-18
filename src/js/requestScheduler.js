var scheduler = require('node-schedule');

var requestBuilder = require('./requestBuilder');

var scheduledJobs = [];

var requestScheduler = {

    createScheduledJob : function (apiModel, node) {
        var schedule = '*/5 * * * *';

        if (apiModel.hasOwnProperty('schedule')) {
            schedule = apiModel.schedule;
        }

        scheduler.scheduleJob(schedule, requestBuilder.makeRequest(apiModel, node));
    },

    startScheduledRequests : function (apiModels, nodes) {
        for (var i in apiModels) {
            if (apiModels.hasOwnProperty(i)) {
                var job = this.createScheduledJob(apiModels[i], nodes[i]);
                scheduledJobs.push(job);
            }
        }
    }
};

module.exports = requestScheduler;