var should = require('should');
var sinon = require('sinon');
var assert = require('assert');

var apiParser = require('../../../src/pre/apiParser.js');

describe('apiParser', function() {

    var fs = require('fs');

    var fooFileName = "GET_something.txt_foo.com.json";
    var spargonautFileName = "GET_foo.txt_spargonaut.com.json";

    var mockedSpargonautFile = "{\"name\":\"spargonaut\",\"url\":\"http://spargonaut.com\",\"type\":\"GET\"}";
    var mockedFooFile = "{\"name\":\"foo\",\"url\":\"http://example.com\",\"type\":\"GET\"}";

    var fileHeader = "module.exports = { getModels : function () { return [ ";
    var fileFooter = ' ]}}';

    var mockedFileArray = ['.gitkeep', 'GET_foo.txt_bar.com'];

    afterEach(function() {
        sinon.restore(fs);
    });

    describe('#getApiRequestJSONFiles', function() {
        it('should ignore filenames that start with a dot', function() {
            sinon.stub(fs, 'readdirSync').returns(mockedFileArray);

            var actualApiRequestArray = apiParser.getApiRequestJSONFiles();

            var expectedApiRequestArray = ['GET_foo.txt_bar.com'];

            actualApiRequestArray.should.eql(expectedApiRequestArray);
        });        
    });

    describe('#getApiRequest', function() {
        it('should create an apiRequest object from an apiRequest.JSON file', function() {
            sinon.stub(fs, 'readFileSync').returns(mockedSpargonautFile);

            var actualApiJSON = apiParser.getApiRequest(spargonautFileName);

            var expectedJSON = { name: 'spargonaut', url: 'http://spargonaut.com', type: 'GET' };

            actualApiJSON.should.eql(expectedJSON);
        });
    });

    describe('#getApiModels', function() {
        it('should create an array of apiRequest Objects from the json files in the api directory', function() {
            sinon.stub(fs, 'readFileSync')
                .onFirstCall().returns(mockedFooFile)
                .onSecondCall().returns(mockedSpargonautFile);

            sinon.stub(fs, 'readdirSync').returns([fooFileName, spargonautFileName]);

            var expectedFooJSON = { name: 'foo', url: 'http://example.com', type: 'GET' };
            var expectedSpargonautJSON = { name: 'spargonaut', url: 'http://spargonaut.com', type: 'GET' };
            var expectedArray = [expectedFooJSON, expectedSpargonautJSON];

            var actualArray = apiParser.getApiModels();
            actualArray.should.eql(expectedArray);
        });
    });

    describe('#createApiModelsFile', function() {
        it('should create the models file with an api model', function() {
            sinon.stub(fs, 'readdirSync').returns(mockedFileArray);

            var mockedFooFile = "{\"name\":\"foo\",\"url\":\"http://example.com\",\"type\":\"GET\"}";
            sinon.stub(fs, 'readFileSync').returns(mockedFooFile);

            var apiModels = apiParser.createApiModelsFile();
            var expectedApiModels = fileHeader + mockedFooFile + fileFooter;
            apiModels.should.eql(expectedApiModels);
        });

        it('should separate multiple api models by a comma', function () {

            sinon.stub(fs, 'readdirSync').returns([fooFileName, spargonautFileName]);

            sinon.stub(fs, 'readFileSync')
                .onFirstCall().returns(mockedFooFile)
                .onSecondCall().returns(mockedSpargonautFile);

            var expectedApiModels = fileHeader + mockedFooFile + ", " + mockedSpargonautFile + fileFooter;
            var apiModels = apiParser.createApiModelsFile();
            apiModels.should.eql(expectedApiModels);
        });
    });
});
