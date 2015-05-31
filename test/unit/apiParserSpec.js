var should = require('should');
var sinon = require('sinon');

var apiParser = require('../../js/apiParser.js');

describe('apiParser', function() {
    describe.only('#getApiRequestJSONFiles', function() {
        it('should keep some shit straight', function() {
            apiParser.should.be.type('object');
            apiParser.parseApiFiles.should.be.type('function');
            apiParser.getApiRequestJSONFiles.should.be.type('function');
        });

        it('should ignore filenames that start with a dot', function() {
            var mockedFileArray = ['.gitkeep', 'GET_foo.txt_bar.com'];

            var fs = require('fs');
            sinon.stub(fs, 'readdirSync').returns(mockedFileArray);

            var actualApiRequestArray = apiParser.getApiRequestJSONFiles();
            var expectedApiRequestArray = ['GET_foo.txt_bar.com'];

            actualApiRequestArray.should.eql(expectedApiRequestArray);
        });        
    });
});
