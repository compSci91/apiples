var app = {
    buildNodes : function(doc) {
        var wrapperDiv = doc.getElementById('wrapper');
        wrapperDiv.innerHTML = '<div>foo</div>';
    }
}

module.exports = app;
