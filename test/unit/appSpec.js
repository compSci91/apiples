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

        it('should add a node to the wrapper element', function() {

            var stubbedDiv = "<div id='wrapper'></div>";
            var document = jsdom(stubbedDiv);

            app.buildNodes(document);
            var actualDiv = document.getElementById('wrapper').innerHTML;
            var expectedDiv = "<div>foo</div>";

            actualDiv.should.eql(expectedDiv);
        });
    });
});
