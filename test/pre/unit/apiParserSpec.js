var should = require('should');
var sinon = require('sinon');
var assert = require('assert');

var apiParser = require('../../../src/pre/apiParser.js');

describe('apiParser', function() {

    var fs = require('fs');
    var spargonautFileName = "GET_foo.txt_spargonaut.com.json";
    var mockedSpargonautFile = "{ \"name\" :\"spargonaut\", \"url\" : \"http://spargonaut.com\", \"type\" : \"GET\" }";

    afterEach(function() {
        sinon.restore(fs);
    });

    describe('#getApiRequestJSONFiles', function() {
        it('should ignore filenames that start with a dot', function() {
            var mockedFileArray = ['.gitkeep', 'GET_foo.txt_bar.com'];
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
            var mockedFooFile = "{\"name\" : \"foo\", \"url\" : \"http://example.com\", \"type\" : \"GET\" }";
            sinon.stub(fs, 'readFileSync')
                .onFirstCall().returns(mockedFooFile)
                .onSecondCall().returns(mockedSpargonautFile);

            var fooFileName = "GET_something.txt_foo.com.json";
            sinon.stub(fs, 'readdirSync').returns([fooFileName, spargonautFileName]);

            var expectedFooJSON = { name: 'foo', url: 'http://example.com', type: 'GET' };
            var expectedSpargonautJSON = { name: 'spargonaut', url: 'http://spargonaut.com', type: 'GET' };

            var expectedArray = [expectedFooJSON, expectedSpargonautJSON];

            var actualArray = apiParser.getApiModels();
            actualArray.should.eql(expectedArray);
        });
    });

    describe('#createApiModelsFile', function() {

        var modelsFilenameAndPath = '../js/models.js'

        it('should create the models file', function() {
            var mockedFooFile = "{\"name\" : \"foo\", \"url\" : \"http://example.com\", \"type\" : \"GET\" }";
            var fsReadStub = sinon.stub(fs, 'readFileSync').returns(mockedFooFile);
            var fsWriteStub = sinon.stub(fs, 'writeFileSync');

            apiParser.createApiModelsFile(modelsFilenameAndPath);
            assert(fsWriteStub.calledOnce);
        });

        it('should modify the models file with the api models', function() {
            var mockedFooFile = "{\"name\":\"foo\",\"url\":\"http://example.com\",\"type\":\"GET\"}";
            var fsReadStub = sinon.stub(fs, 'readFileSync').returns(mockedFooFile);

            var fsMock = sinon.mock(fs);
            var expectation = fsMock.expects('writeFileSync').withArgs(modelsFilenameAndPath);
            
            apiParser.createApiModelsFile(modelsFilenameAndPath);
            expectation.verify();
        });
    });
});
