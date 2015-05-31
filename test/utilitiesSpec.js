var assert = require('assert');
var utilities = require('../js/utilities');

describe('utilities', function() {
    describe('#getTopLevelDomainNameFrom', function() {
        it('should parse off the top level domain name from a given url', function(){
            var url = 'http://myurl.com';
            var expectedTopLevelDomain = 'myurl';
            var actualTopLevelDomain = utilities.getTopLevelDomainNameFrom(url);
            assert.equal(actualTopLevelDomain, expectedTopLevelDomain);
        });
    });
});
