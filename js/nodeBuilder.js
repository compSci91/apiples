var nodeBuilder = {

    buildNodeFrom : function(apiModel) { 
        return '<div class="shape-content">' + apiModel.name + '</div>';
    }
    
};

module.exports = nodeBuilder;
