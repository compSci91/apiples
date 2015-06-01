var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var jsdom = require('jsdom').jsdom;

var app = require('../../js/app.js');

describe('app', function() {
    describe('#buildNodes', function() {
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

            var apiParser = require('../../js/apiParser.js');
            sinon.stub(apiParser, 'getApiModels').returns(mockedModelArray);

            app.buildNodes(doc);
            var actualDiv = doc.getElementById('wrapper').innerHTML;
            var expectedDiv = "<div>foo</div><div>foo</div>";

            actualDiv.should.eql(expectedDiv);
        });
    });
});
