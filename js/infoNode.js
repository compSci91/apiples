var utilities = require('./utilities.js');

var infoNode = {
    createContentNode : function(url) {
        var urlTLD = utilities.getTopLevelDomainNameFrom(url);
        return "<div class='shape-content'>" + urlTLD + "</div>";
    }
};

module.exports = infoNode;
