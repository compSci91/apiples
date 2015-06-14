var assert = require('assert');
var jsdom = require('jsdom').jsdom;

var requestBuilder = require('../../../src/js/requestBuilder.js');

describe('RequestBuilder', function () {

    var stubbedDiv;
    var node;

    beforeEach(function () {
        stubbedDiv = '<div class="shape" id="foo"><div class="shape-content">foo</div></div>';
        node = jsdom(stubbedDiv);
    });

    describe('#createCallbackForFailure', function () {
        it('should create a callback function', function () {
            var callback = requestBuilder.createCallbackForFailure();
            assert.equal(typeof callback, 'function');
        });

        describe('the callback created', function () {
            it('should update the node to include the \'failed\' classname', function () {
                var callback = requestBuilder.createCallbackForFailure(node);
                callback();

                var expectedClassName = 'shape failed';
                node.className.should.eql(expectedClassName);
            });
        });
    });

    describe('#createCallbackForSuccess', function () {
        it('should create a callback function', function () {
            var callback = requestBuilder.createCallbackForSuccess();
            assert.equal(typeof callback, 'function');
        });

        describe('the callback created', function () {
            it('should update the node to include the \'success\' classname', function () {
                var callback = requestBuilder.createCallbackForSuccess(node);
                callback();

                var expectedClassName = 'shape success';
                node.className.should.eql(expectedClassName);
            });
        })
    });
});