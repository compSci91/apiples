var assert = require('assert');
var infoNode = require('../js/infoNode.js');

describe('infoNode', function() {
    describe('#createInfoNode', function() {

        var url = "http://myurl.com";
        var expectedDiv = "<div class='shape-content'>myurl</div>";

        it('should have a createInfoNode method', function() {
            assert.equal(typeof infoNode, 'object');
            assert.equal(typeof infoNode.createContentNode, 'function');
        });

        it('should create a div with the basename of the url as the content', function() {
            var actualDiv = infoNode.createContentNode(url);
            assert.equal(expectedDiv, actualDiv);
        });

        it('should', function() {});
    });
});

