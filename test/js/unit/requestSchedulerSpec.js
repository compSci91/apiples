var scheduler = require('node-schedule');
var sinon = require('sinon');
var assert = require('assert');
var jsdom = require('jsdom').jsdom;

var requestScheduler = require('../../../src/js/requestScheduler.js');
var requestBuilder = require('../../../src/js/requestBuilder.js');

describe('RequestScheduler', function () {

    var stubbedDiv;
    var doc;
    beforeEach(function () {
        stubbedDiv = "<div id='wrapper'><button type='button'>one</button><button type='button'>two</button></div>";
        doc = jsdom(stubbedDiv);
    });

    describe('.createScheduledJob()', function () {

        it('should create a scheduled job', function () {
            var requestBuilderStub = sinon.stub(requestBuilder, 'makeRequest');
            var schedulerStub = sinon.stub(scheduler, 'scheduleJob');

            var apiModel = {};

            requestScheduler.createScheduledJob(apiModel);
            assert(schedulerStub.calledOnce);

            schedulerStub.restore();
            requestBuilderStub.restore();
        });

        it('should create a schedule that defaults to every 5 minutes', function () {
            var requestBuilderStub = sinon.stub(requestBuilder, 'makeRequest');
            var schedulerStub = sinon.stub(scheduler, 'scheduleJob');

            var defaultSchedule = '*/5 * * * *';
            var apiModel = {};

            requestScheduler.createScheduledJob(apiModel);
            assert(schedulerStub.calledWith(defaultSchedule));

            schedulerStub.restore();
            requestBuilderStub.restore();
        });

        it('should use the schedule defined in the apiModel', function () {
            var requestBuilderStub = sinon.stub(requestBuilder, 'makeRequest');
            var schedulerStub = sinon.stub(scheduler, 'scheduleJob');

            var apiModel = {
                "schedule": "* * * * *"
            };

            requestScheduler.createScheduledJob(apiModel);

            var expectedSchedule = "* * * * *";

            assert(schedulerStub.calledWith(expectedSchedule));

            requestBuilderStub.restore();
            schedulerStub.restore();
        });
    });

    describe('.startScheduledRequests()', function () {
        it('should create a scheduled job for each model in the apiModels array', function () {
            var requestBuilderStub = sinon.stub(requestBuilder, 'makeRequest');
            var requestSchedulerSpy = sinon.spy(requestScheduler, 'createScheduledJob');

            var mockedFooJSON = { name: 'foo', url: 'http://example.com', type: 'GET', schedule: '* * * * *' };
            var mockedSpargonautJSON = { name: 'spargonaut', url: 'http://spargonaut.com', type: 'GET', schedule: '* * * * *' };
            var mockedModelArray = [mockedFooJSON, mockedSpargonautJSON];

            var fooNode = doc.getElementById(mockedFooJSON.name);
            var spargonautNode = doc.getElementById(mockedSpargonautJSON.name);
            var apiNodes = [fooNode, spargonautNode];

            requestScheduler.startScheduledRequests(mockedModelArray, apiNodes);

            assert(requestSchedulerSpy.calledTwice);
            assert(requestSchedulerSpy.calledWithMatch(mockedFooJSON, fooNode));
            assert(requestSchedulerSpy.calledWithMatch(mockedSpargonautJSON, spargonautNode));

            requestSchedulerSpy.restore();
            requestBuilderStub.restore();
        });
    });

    describe('.stopScheduledRequests()', function () {
        it('should cancel the scheduled jobs', function () {
            var requestBuilderStub = sinon.stub(requestBuilder, 'makeRequest');
            var schedulerSpy = sinon.spy(scheduler, 'cancelJob');

            requestScheduler.stopScheduledRequests();
            assert(schedulerSpy.calledTwice);

            schedulerSpy.restore();
            requestBuilderStub.restore();
        });

    });
});