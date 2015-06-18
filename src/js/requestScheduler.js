var scheduler = require('node-schedule');

var requestBuilder = require('./requestBuilder');

var requestScheduler = {

    createScheduledJob : function (apiModel, node) {
        var schedule = '*/5 * * * *';

        if (apiModel.hasOwnProperty('schedule')) {
            schedule = apiModel.schedule;
        }

        scheduler.scheduleJob(schedule, requestBuilder.makeRequest(apiModel, node));
    }
};

module.exports = requestScheduler;