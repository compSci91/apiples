var assert = require('assert');
var should = require('should');

var nodeBuilder = require('../../../src/js/nodeBuilder.js');

describe('nodeBuilder', function() {
    it('should keep some shit straight', function() {
        assert.equal(typeof nodeBuilder, 'object');
        assert.equal(typeof nodeBuilder.buildNodeFrom, 'function');
    });
    
    describe('#buildNode', function() {
        it('should create a div with the name of the apiModel', function() {
            var apiModel = { name: 'foo', url: 'http://example.com', type: 'GET' };
            var actualHTML = nodeBuilder.buildNodeFrom(apiModel)
            
            var expectedHTML = '<div class="shape-content">' + apiModel.name + '</div>';
            actualHTML.should.eql(expectedHTML);
        });
    });

});
