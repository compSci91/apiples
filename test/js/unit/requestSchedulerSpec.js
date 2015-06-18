var scheduler = require('node-schedule');
var sinon = require('sinon');
var assert = require('assert');

var requestScheduler = require('../../../src/js/requestScheduler.js');
var requestBuilder = require('../../../src/js/requestBuilder.js');

describe('RequestScheduler', function () {
    describe('#createScheduledJob', function () {

        var schedulerStub;
        var requestBuilderStub;

        beforeEach(function () {
            schedulerStub = sinon.stub(scheduler, 'scheduleJob');
            requestBuilderStub = sinon.stub(requestBuilder, 'makeRequest');
        });

        afterEach(function () {
            schedulerStub.restore();
            requestBuilderStub.restore();
        });


        it('should create a scheduled job', function () {
            var apiModel = {};

            requestScheduler.createScheduledJob(apiModel);
            assert(schedulerStub.calledOnce);
        });

        it('should create a schedule that defaults to every 5 minutes', function () {
            var defaultSchedule = '*/5 * * * *';
            var apiModel = {};

            requestScheduler.createScheduledJob(apiModel);
            assert(schedulerStub.calledWith(defaultSchedule));
        });

        it('should use the schedule defined in the apiModel', function () {
            var apiModel = {
                "schedule": "* * * * *"
            };

            requestScheduler.createScheduledJob(apiModel);

            var expectedSchedule = "* * * * *";

            assert(schedulerStub.calledWith(expectedSchedule));
        });
    });
});