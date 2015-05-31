var assert = require('assert');
var app = require('../../js/app.js');

describe('app', function() {
    describe('#buildNodes', function() {
        it('should have a buildNodes method', function() {
            assert.equal(typeof app, 'object');
            assert.equal(typeof app.buildNodes, 'function');
        });
    });
});
