var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var jsdom = require('jsdom').jsdom;

var app = require('../../../src/js/app.js');


describe('App', function () {

    it('should have a buildNodes method', function () {
        assert.equal(typeof app, 'object');
        assert.equal(typeof app.buildNodes, 'function');
    });

    describe('.buildNodes()', function () {
        it('should add a node to the wrapper element for every api model found by the apiParser', function () {
            var stubbedDiv = "<div id='wrapper'><button type='button'>one</button><button type='button'>two</button></div>";
            var doc = jsdom(stubbedDiv);
            var nodeBuilder = require('../../../src/js/nodeBuilder.js');

            var mockedFooJSON = { name: 'foo', url: 'http://example.com', type: 'GET' };
            var mockedSpargonautJSON = { name: 'spargonaut', url: 'http://spargonaut.com', type: 'GET' };
            var mockedModelArray = [mockedFooJSON, mockedSpargonautJSON];

            var apiModels = require('../../../src/js/models.js');
            var apiModelsStub = sinon.stub(apiModels, 'getModels').returns(mockedModelArray);

            var mockedFooHtml = "<div id='foo' class='shape-content'>foo</div>";
            var mockedSpargonautHtml = "<div id='spargonaut' class='shape-content'>spargonaut</div>";

            var nodeBuilderStub = sinon.stub(nodeBuilder, 'buildNodeFrom')
                .onFirstCall().returns(mockedFooHtml)
                .onSecondCall().returns(mockedSpargonautHtml);

            app.buildNodes(doc);
            var actualDiv = doc.getElementById('wrapper').innerHTML;
            var expectedDiv = '<button type="button">one</button><button type="button">two</button><div id="foo" class="shape-content">foo</div><div id="spargonaut" class="shape-content">spargonaut</div>';

            actualDiv.should.eql(expectedDiv);

            apiModelsStub.restore();
            nodeBuilderStub.stub.restore();
        });

        it('should replace the contents in the wrapper div with an error message when the models array is empty', function () {
            var mockedModelArray = [];
            var apiModels = require('../../../src/js/models.js');
            var apiModelsStub = sinon.stub(apiModels, 'getModels').returns(mockedModelArray);

            var errorMessage = "No API Models were found.  Did you generate the file?";
            var errorDiv = "<div class='shape-content'>" + errorMessage + "</div>";
            var stubbedDiv = "<div id='wrapper'><button type='button'>one</button><button type='button'>two</button></div>";
            var doc = jsdom(stubbedDiv);
            var nodeBuilder = require('../../../src/js/nodeBuilder.js');
            var nodeBuilderStub = sinon.stub(nodeBuilder, 'buildErrorMessageNode').returns(errorDiv);

            app.buildNodes(doc);

            var actualDiv = doc.getElementById('wrapper').innerHTML;
            var expectedContent = '<div class="shape-content">No API Models were found.  Did you generate the file?</div>';
            actualDiv.should.eql(expectedContent);

            apiModelsStub.restore();
            nodeBuilderStub.restore();
        });

        it('should add a click event listener to each node', function () {
            var stubbedDiv =
                "<div id='wrapper'>" +
                    "<button type='button'>one</button><button type='button'>two</button>" +
                    "<div id='foo' class='shape-content'>foo</div>" +
                    "<div id='spargonaut' class='shape-content'>spargonaut</div>" +
                "</div>";
            var doc = jsdom(stubbedDiv);
            var nodeBuilder = require('../../../src/js/nodeBuilder.js');

            var mockedFooJSON = { name: 'foo', url: 'http://example.com', type: 'GET' };
            var mockedSpargonautJSON = { name: 'spargonaut', url: 'http://spargonaut.com', type: 'GET' };
            var mockedModelArray = [mockedFooJSON, mockedSpargonautJSON];

            var apiModels = require('../../../src/js/models.js');
            var apiModelsStub = sinon.stub(apiModels, 'getModels').returns(mockedModelArray);

            var mockClickFunction = function () {};

            var requestBuilder = require('../../../src/js/requestBuilder.js');
            var requestBuilderStub = sinon.stub(requestBuilder, 'makeRequest').returns(mockClickFunction);

            app.addOnDemandRequest(doc, mockedModelArray);

            var fooNode = doc.getElementById('foo');
            var fooListenerFunction = fooNode._listeners.click.false[0];

            fooListenerFunction.should.eql(mockClickFunction);

            apiModelsStub.restore();
            requestBuilderStub.restore();
        });
    });

    describe('.startScheduledRequests()', function () {
        it('should create scheduled api requests for the api nodes', function () {
            var requestScheduler = require('../../../src/js/requestScheduler.js');
            var requestSchedulerStub = sinon.stub(requestScheduler, 'startScheduledRequests', function () {});

            var mockedFooJSON = { name: 'foo', url: 'http://example.com', type: 'GET' };
            var mockedSpargonautJSON = { name: 'spargonaut', url: 'http://spargonaut.com', type: 'GET' };
            var mockedModelArray = [mockedFooJSON, mockedSpargonautJSON];

            var apiModels = require('../../../src/js/models.js');
            var apiModelsStub = sinon.stub(apiModels, 'getModels').returns(mockedModelArray);

            var stubbedDiv = "<div id='wrapper'><button type='button'>one</button><button type='button'>two</button></div>";
            var doc = jsdom(stubbedDiv);
            var nodeBuilder = require('../../../src/js/nodeBuilder.js');

            var fooNode = doc.getElementById(mockedFooJSON.name);
            var spargonautNode = doc.getElementById(mockedSpargonautJSON.name);
            var nodeArray = [fooNode, spargonautNode];

            app.startScheduledRequests(doc);

            assert(requestSchedulerStub.calledWith(mockedModelArray, nodeArray));
            requestSchedulerStub.restore();

            apiModelsStub.restore();
            requestSchedulerStub.restore();
        });
    });

    describe('.stopScheduledRequests()', function () {
        it('should stop the scheduled requests', function () {
            var requestScheduler = require('../../../src/js/requestScheduler.js');
            var requestSchedulerStub = sinon.spy(requestScheduler, 'stopScheduledRequests');

            app.stopScheduledRequests();
            assert(requestSchedulerStub.calledOnce);
            requestSchedulerStub.restore();
        });
    });
});