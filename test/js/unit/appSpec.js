var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var jsdom = require('jsdom').jsdom;

var app = require('../../../src/js/app.js');


describe('app', function () {

    var nodeBuilder = require('../../../src/js/nodeBuilder.js');
    var apiModels = require('../../../src/js/models.js');

    afterEach(function () {
        sinon.restore(nodeBuilder);
        sinon.restore(apiModels);
    });

    describe('#buildNodes', function () {
        var stubbedDiv;
        var doc;
        beforeEach(function () {
            stubbedDiv = "<div id='wrapper'></div>";
            doc = jsdom(stubbedDiv);
        });

        it('should have a buildNodes method', function () {
            assert.equal(typeof app, 'object');
            assert.equal(typeof app.buildNodes, 'function');
        });

        it('should add a node to the wrapper element for every api model found by the apiParser', function () {
            var stubbedDiv = "<div id='wrapper'></div>";
            var doc = jsdom(stubbedDiv);

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
            var expectedDiv = '<div class="shape-content">foo</div><div class="shape-content">spargonaut</div>';

            actualDiv.should.eql(expectedDiv);
        });

        it('should create an error message node when the models array is empty', function () {
            var mockedModelArray = [];
            sinon.stub(apiModels, 'getModels').returns(mockedModelArray);

            var errorMessage = "No API Models were found.  Did you generate the file?";
            var errorDiv = '<div class="shape-content">' + errorMessage + '</div>';
            sinon.stub(nodeBuilder, 'buildErrorMessageNode').returns(errorDiv);

            app.buildNodes(doc);

            var actualDiv = doc.getElementById('wrapper').innerHTML;
            actualDiv.should.eql(errorDiv);
        });

        describe('#buildScheduledRequests', function () {
            it('should create a scheduled job for each api node', function () {
                var scheduler = require('node-schedule');
                var schedulerSpy = sinon.spy(scheduler, 'scheduleJob');

                var mockedFooJSON = { name: 'foo', url: 'http://example.com', type: 'GET' };
                var mockedSpargonautJSON = { name: 'spargonaut', url: 'http://spargonaut.com', type: 'GET' };
                var mockedModelArray = [mockedFooJSON, mockedSpargonautJSON];

                var apiModels = require('../../../src/js/models.js');
                sinon.stub(apiModels, 'getModels').returns(mockedModelArray);

                var minutes = 1;
                var actualScheduledRequests = app.buildScheduledRequests(minutes);

                actualScheduledRequests.length.should.eql(2);
                assert(schedulerSpy.calledWithMatch('*/' + minutes + ' * * * *'));
            });
        });
    });
});
