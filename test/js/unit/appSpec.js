var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var jsdom = require('jsdom').jsdom;

var app = require('../../../src/js/app.js');


describe('App', function () {

    var nodeBuilder = require('../../../src/js/nodeBuilder.js');
    var apiModels = require('../../../src/js/models.js');
    var scheduler = require('node-schedule');
    var requestScheduler = require('../../../src/js/requestScheduler.js');

    var stubbedDiv;
    var doc;
    var requestSchedulerStub;

    beforeEach(function () {
        stubbedDiv = "<div id='wrapper'><button type='button'>one</button><button type='button'>two</button></div>";
        doc = jsdom(stubbedDiv);
    });

    afterEach(function () {
        sinon.restore(nodeBuilder);
        sinon.restore(apiModels);
        sinon.restore(scheduler);
        if (requestSchedulerStub) {
            requestSchedulerStub.restore();
        }
    });

    it('should have a buildNodes method', function () {
        assert.equal(typeof app, 'object');
        assert.equal(typeof app.buildNodes, 'function');
    });

    describe('.buildNodes()', function () {
        it('should add a node to the wrapper element for every api model found by the apiParser', function () {
            var mockedFooJSON = { name: 'foo', url: 'http://example.com', type: 'GET' };
            var mockedSpargonautJSON = { name: 'spargonaut', url: 'http://spargonaut.com', type: 'GET' };
            var mockedModelArray = [mockedFooJSON, mockedSpargonautJSON];

            var apiModels = require('../../../src/js/models.js');
            sinon.stub(apiModels, 'getModels').returns(mockedModelArray);

            var mockedFooHtml = '<div class="shape-content">foo</div>';
            var mockedSpargonautHtml = '<div class="shape-content">spargonaut</div>';

            sinon.stub(nodeBuilder, 'buildNodeFrom')
                .onFirstCall().returns(mockedFooHtml)
                .onSecondCall().returns(mockedSpargonautHtml);

            app.buildNodes(doc);
            var actualDiv = doc.getElementById('wrapper').innerHTML;
            var expectedDiv = '<button type="button">one</button><button type="button">two</button><div class="shape-content">foo</div><div class="shape-content">spargonaut</div>';

            actualDiv.should.eql(expectedDiv);
        });

        it('should replace the contents in the wrapper div with an error message when the models array is empty', function () {
            var mockedModelArray = [];
            sinon.stub(apiModels, 'getModels').returns(mockedModelArray);

            var errorMessage = "No API Models were found.  Did you generate the file?";
            var errorDiv = "<div class='shape-content'>" + errorMessage + "</div>";
            sinon.stub(nodeBuilder, 'buildErrorMessageNode').returns(errorDiv);

            app.buildNodes(doc);

            var actualDiv = doc.getElementById('wrapper').innerHTML;
            var expectedContent = '<div class="shape-content">No API Models were found.  Did you generate the file?</div>';
            actualDiv.should.eql(expectedContent);
        });
    });

    describe('.startScheduledRequests()', function () {
        it('should create scheduled api requests for the api nodes', function () {
            requestSchedulerStub = sinon.stub(requestScheduler, 'startScheduledRequests', function () {});

            var mockedFooJSON = { name: 'foo', url: 'http://example.com', type: 'GET' };
            var mockedSpargonautJSON = { name: 'spargonaut', url: 'http://spargonaut.com', type: 'GET' };
            var mockedModelArray = [mockedFooJSON, mockedSpargonautJSON];

            var apiModels = require('../../../src/js/models.js');
            sinon.stub(apiModels, 'getModels').returns(mockedModelArray);

            var fooNode = doc.getElementById(mockedFooJSON.name);
            var spargonautNode = doc.getElementById(mockedSpargonautJSON.name);
            var nodeArray = [fooNode, spargonautNode];

            app.startScheduledRequests(doc);

            assert(requestSchedulerStub.calledWith(mockedModelArray, nodeArray));
            requestSchedulerStub.restore();
        });
    });

    describe('.stopScheduledRequests()', function () {
        it('should stop the scheduled requests', function () {
            requestSchedulerStub = sinon.spy(requestScheduler, 'stopScheduledRequests');

            app.stopScheduledRequests();
            assert(requestSchedulerStub.calledOnce);
            requestSchedulerStub.restore();
        });
    });
});