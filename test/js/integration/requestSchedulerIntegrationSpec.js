var sinon = require('sinon');
var assert = require('assert');

var requestScheduler = require('../../../src/js/requestScheduler.js');
var requestBuilder = require('../../../src/js/requestBuilder.js');

describe('RequestSchedulerIntegration', function () {
    describe('.createScheduledJob()', function () {

        var apiModel = {
            "schedule": "* * * * *"
        };

        var requestBuilderStub;

        afterEach(function () {
            requestBuilderStub.restore();
        });

        it('should create a request', function () {
            requestBuilderStub = sinon.stub(requestBuilder, 'makeRequest');

            var node = {};

            requestScheduler.createScheduledJob(apiModel, node);
            assert(requestBuilderStub.calledWith(apiModel, node));
        });
    });
});