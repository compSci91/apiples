var should = require('should');

describe('apiModelValidator', function(){
    var apiModelValidator = require('../../../src/pre/apiModelValidator.js');

    it('should return if the apiModels have unique names', function () {
        var mockApiModels = [{name: 'different'}, {name: 'names'}];
        apiModelValidator.areValidModels.bind(null, mockApiModels).should.not.throw();
    });

    it('should throw an error if the name value in any of the apiModels is duplicated', function () {
        var mockApiModels = [{name: 'sameNames'}, {name: 'sameNames'}];
        apiModelValidator.areValidModels.bind(null, mockApiModels).should.throw('API Models are invalid. Duplicate names were found.');
    });
});