var nodeBuilder = {

    buildContentNode : function (apiModelName) { 
        return '<div class="shape-content">' + apiModelName + '</div>';
    },

    buildNodeFrom : function (apiModel) {
        var contentNode = this.buildContentNode(apiModel.name);
        return '<div class="shape">' + contentNode + '</div>';
    }
    
};

module.exports = nodeBuilder;
