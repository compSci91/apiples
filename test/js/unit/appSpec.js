var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var jsdom = require('jsdom').jsdom;

var app = require('../../../src/js/app.js');


describe('app', function() {

    var nodeBuilder = require('../../../src/js/nodeBuilder.js');

    afterEach(function () {
        sinon.restore(nodeBuilder);
    });

    describe('#buildNodes', function () {
        it('should have a buildNodes method', function() {
            assert.equal(typeof app, 'object');
            assert.equal(typeof app.buildNodes, 'function');
        });

        it('should add a node to the wrapper element for every api model found by the apiParser', function() {
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
    });
});
