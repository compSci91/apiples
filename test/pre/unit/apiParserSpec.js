var should = require('should');
var sinon = require('sinon');

var apiParser = require('../../../src/pre/apiParser.js');

describe('apiParser', function() {
    describe('#getApiRequestJSONFiles', function() {

        var fs = require('fs');
        var spargonautFileName = "GET_foo.txt_spargonaut.com.json";
        var mockedSpargonautFile = "{ \"name\" :\"spargonaut\", \"url\" : \"http://spargonaut.com\", \"type\" : \"GET\" }";

        afterEach(function() {
            sinon.restore(fs);
        });

        it('should ignore filenames that start with a dot', function() {
            var mockedFileArray = ['.gitkeep', 'GET_foo.txt_bar.com'];
            sinon.stub(fs, 'readdirSync').returns(mockedFileArray);

            var actualApiRequestArray = apiParser.getApiRequestJSONFiles();

            var expectedApiRequestArray = ['GET_foo.txt_bar.com'];

            actualApiRequestArray.should.eql(expectedApiRequestArray);
        });        

        it('should create an apiRequest object from an apiRequest.JSON file', function() {
            sinon.stub(fs, 'readFileSync').returns(mockedSpargonautFile);

            var actualApiJSON = apiParser.getApiRequest(spargonautFileName);

            var expectedJSON = { name: 'spargonaut', url: 'http://spargonaut.com', type: 'GET' };

            actualApiJSON.should.eql(expectedJSON);
        });

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
});
