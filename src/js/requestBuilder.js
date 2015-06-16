var jquery = require('jquery');

var requestBuilder = {

    makeRequest : function (apiModel, node) {
        var ajaxBody = this.createAjaxBody(apiModel);
        var failureCallback = this.createCallbackForFailure(node);
        var successCallback = this.createCallbackForSuccess(node);

        return function () {
            jquery.ajax(ajaxBody)
            .fail(failureCallback)
            .done(successCallback);
        };
    },

    createCallbackForFailure : function (node) {
        return function (xhr, msg) {
            node.className = 'shape failed';
            console.log('api request failed');
        }
    },

    createCallbackForSuccess : function (node) {
        return function (xhr, msg) {
            node.className = 'shape success';
            console.log('api request done');
        }
    },

    createAjaxBody : function (apiModel) {
        return {
            url: apiModel.url,
            type: apiModel.type,
            data: apiModel.data,
            contentType: apiModel.contentType,
            dataType: apiModel.dataType
        };
    }
};
module.exports = requestBuilder;