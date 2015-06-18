var sinon = require('sinon');
var scheduler = require('node-schedule');
var jsdom = require('jsdom').jsdom;
var assert = require('assert');

var app = require('../../../src/js/app.js');

describe('App Integration', function () {

    var stubbedDiv;
    var doc;
    beforeEach(function () {
        stubbedDiv = "<div id='wrapper'><button type='button'>one</button><button type='button'>two</button></div>";
        doc = jsdom(stubbedDiv);
    });

    describe('.startScheduledRequests()', function () {
        it('should create a scheduled job with a request from the requestBuilder', function () {
            sinon.spy(scheduler, 'scheduleJob');

            var mockedFooJSON = { name: 'foo', url: 'http://example.com', type: 'GET' };
            var mockedSpargonautJSON = { name: 'spargonaut', url: 'http://spargonaut.com', type: 'GET' };
            var mockedModelArray = [mockedFooJSON, mockedSpargonautJSON];

            var apiModels = require('../../../src/js/models.js');
            sinon.stub(apiModels, 'getModels').returns(mockedModelArray);

            var callbackStub = sinon.stub();
            var requestBuilder = require('../../../src/js/requestBuilder.js');
            var requestBuilderStub = sinon.stub(requestBuilder, 'makeRequest').returns(callbackStub);

            app.startScheduledRequests(doc);
            // TODO - this assertion could be better
            assert.equal(typeof scheduler.scheduleJob.getCall(0).args[1], 'function');

            requestBuilderStub.restore();
        });
    });

});