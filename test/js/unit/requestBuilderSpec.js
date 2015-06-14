var assert = require('assert');
var jsdom = require('jsdom').jsdom;
var sinon = require('sinon');

var requestBuilder = require('../../../src/js/requestBuilder.js');

describe('RequestBuilder', function () {

    var stubbedDiv;
    var node;
    var apiModel = {
        name: 'foo',
        url: 'http://www.example.com',
        type: 'GET'
    };

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

    describe('#createAjaxBody', function () {
        var actualRequestBody = requestBuilder.createAjaxBody(apiModel);

        var expectedAjaxBody = {
            url: 'http://www.example.com',
            type: 'GET'
        };
        actualRequestBody.should.eql(expectedAjaxBody);
    });

    describe('#makeRequest', function () {
        it('should create a callback function', function () {
            var jqueryCallback = requestBuilder.makeRequest(apiModel, node);
            assert.equal(typeof jqueryCallback, 'function');
        });

        describe('the jquery callback', function () {
            xit('should make the call with the ajax body', function () {
                var ajaxBody = {
                    url: 'http://www.example.com',
                    type: 'GET'
                };
                var jsdom = require('jsdom');
                var jquery = require('jquery')(jsdom.jsdom().defaultView);

                var jqueryStub = sinon.stub(jquery, 'ajax');

                var jqueryCallback = requestBuilder.makeRequest(apiModel, node);
                //jqueryCallback();

                assert(jqueryStub.calledOnce);
            });
        });
    });
});