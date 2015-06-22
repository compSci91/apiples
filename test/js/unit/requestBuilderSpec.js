var assert = require('assert');
var jsdom = require('jsdom').jsdom;
var proxyquire = require('proxyquire');

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

    describe('.createCallbackForFailure()', function () {
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

    describe('.createCallbackForSuccess()', function () {
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
        });
    });

    describe('.createAjaxBody()', function () {
        var some_sample_data = {
            foo: 'bar',
            biz: 'baz'
        };

        context('...when type is POST', function () {
            it('should map the apiModel data to an ajax body as strings', function () {
                var sampleApiModel = {
                    url: 'http://www.example.com',
                    type: 'POST',
                    data: some_sample_data,
                    contentType: 'some_content_type',
                    dataType: 'json',
                    timeout: 6000
                };

                var actualRequestBody = requestBuilder.createAjaxBody(sampleApiModel);

                var expectedAjaxBody = {
                    url: 'http://www.example.com',
                    type: 'POST',
                    data: JSON.stringify(some_sample_data),
                    contentType: 'some_content_type',
                    dataType: 'json',
                    timeout: 6000
                };
                actualRequestBody.should.eql(expectedAjaxBody);
            });
        });

        context('...when type is GET', function () {
            it('should map the apiModel data to an ajax body', function () {
                var sampleApiModel = {
                    url: 'http://www.example.com',
                    type: 'GET',
                    data: some_sample_data,
                    contentType: 'some_content_type',
                    dataType: 'json',
                    timeout: 6000
                };

                var actualRequestBody = requestBuilder.createAjaxBody(sampleApiModel);

                var expectedAjaxBody = {
                    url: 'http://www.example.com',
                    type: 'GET',
                    data: some_sample_data,
                    contentType: 'some_content_type',
                    dataType: 'json',
                    timeout: 6000
                };
                actualRequestBody.should.eql(expectedAjaxBody);
            });
        });
    });

    describe('.makeRequest()', function () {
        it('should create a callback function', function () {
            var jqueryCallback = requestBuilder.makeRequest(apiModel, node);
            assert.equal(typeof jqueryCallback, 'function');
        });

        describe('the jquery callback', function () {

            it('should update the node to include the \'failed\' classname', function (done) {

                var optionsSentToAjax = {};

                var mockJquery = {
                    ajax: function (options) {
                        optionsSentToAjax = options;
                        return {
                            fail: function () { return { done : function () {}};}
                        };
                    }
                };

                var requestBuilderProxy = proxyquire('../../../src/js/requestBuilder.js', {
                    'jquery': mockJquery
                });
                var docHtml = '<html>' + stubbedDiv + '<html>';
                var jsdom = require('jsdom').jsdom(docHtml);

                var nodeUnderTest = jsdom.getElementById('foo');

                var jqueryCallback = requestBuilderProxy.makeRequest(apiModel, nodeUnderTest);
                jqueryCallback();
                done();


                var expectedClassName = 'shape pending';
                nodeUnderTest.className.should.eql(expectedClassName);
            });

            it('should make the call with the ajax body', function (done) {
                var optionsSentToAjax = {};

                var mockJquery = {
                    ajax: function (options) {
                        optionsSentToAjax = options;
                        return {
                            fail: function () { return { done : function () {}};}
                        };
                    }
                };

                var requestBuilderProxy = proxyquire('../../../src/js/requestBuilder.js', {
                    'jquery': mockJquery
                });

                var jqueryCallback = requestBuilderProxy.makeRequest(apiModel, node);
                jqueryCallback();
                done();

                optionsSentToAjax.url.should.eql('http://www.example.com');
                optionsSentToAjax.type.should.eql('GET');
            });
        });
    });
});