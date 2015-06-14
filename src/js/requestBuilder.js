var Q = require('q');
var jquery = require('jquery');

var requestBuilder = {
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
    }
};
module.exports = requestBuilder;