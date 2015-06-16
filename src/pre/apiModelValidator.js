module.exports = {
    areValidModels : function (apiModels) {
        for (var i = 0; i < apiModels.length; i++) {
            for (var j = i + 1; j < apiModels.length; j++) {
                if (apiModels[i].name === apiModels[j].name) {
                    throw new Error('API Models are invalid. Duplicate names were found.');
                }
            }
        }
    }
};