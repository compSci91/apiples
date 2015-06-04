var nodeBuilder = {
    buildContentNode : function (apiModelName) { 
        return '<div class="shape-content">' + apiModelName + '</div>';
    },

    buildNodeFrom : function (apiModel) {
        var contentNode = this.buildContentNode(apiModel.name);
        return '<div class="shape">' + contentNode + '</div>';
    },

    buildErrorMessageNode : function () {
        var errorMessage = 'No API Models were found.  Did you generate the file?';
        return this.buildContentNode(errorMessage);
    }
};

module.exports = nodeBuilder;
