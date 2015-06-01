var should = require('should');
var sinon = require('sinon');

var apiParser = require('../../js/apiParser.js');

describe('apiParser', function() {
    describe('#getApiRequestJSONFiles', function() {

        var fs = require('fs');

        afterEach(function() {
            sinon.restore(fs);
        });

        it('should keep some shit straight', function() {
            apiParser.should.be.type('object');
            apiParser.parseApiFiles.should.be.type('function');
            apiParser.getApiRequestJSONFiles.should.be.type('function');
        });

        it('should ignore filenames that start with a dot', function() {
            var mockedFileArray = ['.gitkeep', 'GET_foo.txt_bar.com'];
            sinon.stub(fs, 'readdirSync').returns(mockedFileArray);

            var actualApiRequestArray = apiParser.getApiRequestJSONFiles();

            var expectedApiRequestArray = ['GET_foo.txt_bar.com'];

            actualApiRequestArray.should.eql(expectedApiRequestArray);
        });        

        it('should create an apiRequest object from an apiRequest.JSON file', function() {
            var mockedSpargonautFile = "{ \"name\" :\"foo\", \"url\" : \"http://spargonaut.com\", \"type\" : \"GET\" }";
            sinon.stub(fs, 'readFileSync').returns(mockedSpargonautFile);

            var spargonautFileName = "GET_foo.txt_spargonaut.com.json";
            var actualApiJSON = apiParser.getApiRequest(spargonautFileName);

            var expectedJSON = { name: 'foo', url: 'http://spargonaut.com', type: 'GET' };

            actualApiJSON.should.eql(expectedJSON);
        });

        it('should create an array of apiRequest Objects from the json files in the api directory', function() {

            var mockedFooFile = "{\"name\" : \"foo\", \"url\" : \"http://example.com\", \"type\" : \"GET\" }";
            var mockedSpargonautFile = "{ \"name\" :\"spargonaut\", \"url\" : \"http://spargonaut.com\", \"type\" : \"GET\" }";
            sinon.stub(fs, 'readFileSync')
                .onFirstCall().returns(mockedFooFile)
                .onSecondCall().returns(mockedSpargonautFile);

            var spargonautFileName = "GET_foo.txt_spargonaut.com.json";
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
