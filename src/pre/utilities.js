var utilities = {
    getTopLevelDomainNameFrom : function(url) {
        var domainPieces = url.split('//');
        var topDomain = domainPieces[1].split('.')[0];
       return topDomain;
    }
};

module.exports = utilities;
