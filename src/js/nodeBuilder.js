var nodeBuilder = {
    buildContentNode : function (apiModelName) { 
        return "<div class='shape-content'>" + apiModelName + "</div>";
    },

    buildNodeFrom : function (apiModel) {
        var contentNode = this.buildContentNode(apiModel.name);
        return "<div class='shape' id='" + apiModel.name + "'>" + contentNode + "</div>";
    },

    buildErrorMessageNode : function () {
        var errorMessage = "<div class='error'>No API Models were found.<br>Did you generate the file?<br>Do you have any api models in the 'apis' directory?</div>";
        return this.buildContentNode(errorMessage);
    }
};

module.exports = nodeBuilder;
