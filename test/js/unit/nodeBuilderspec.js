var assert = require('assert');
var should = require('should');

var nodeBuilder = require('../../../src/js/nodeBuilder.js');

describe('nodeBuilder', function() {
    it('should keep some shit straight', function() {
        assert.equal(typeof nodeBuilder, 'object');
        assert.equal(typeof nodeBuilder.buildNodeFrom, 'function');
    });
    
    describe('#buildNodeFrom', function() {

        var apiModel = { name: 'foo', url: 'http://example.com', type: 'GET' };

        it('should create a div with the name of the apiModel', function() {
            var actualHTML = nodeBuilder.buildContentNode(apiModel.name)
            
            var expectedHTML = '<div class="shape-content">' + apiModel.name + '</div>';
            actualHTML.should.eql(expectedHTML);
        });

        it('should create a div that can be styled with the \'shape\' class', function () {
            var actualHTML = nodeBuilder.buildNodeFrom(apiModel);

            var expectedHTML = '<div class="shape"><div class="shape-content">' + apiModel.name + '</div></div>';
            actualHTML.should.eql(expectedHTML);
        });

        it('shuold create an error message div telling the user they forgot to create the models file', function () {
            var errorMessage = "No API Models were found.  Did you generate the file?";

            actualHTML = nodeBuilder.buildErrorMessageNode();

            var expectedHTML = '<div class="shape-content">' + errorMessage + '</div>';
            actualHTML.should.eql(expectedHTML);
        });
    });

});