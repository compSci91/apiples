var moment = require('moment');

var dynamicContent = {
    generateDynamicDates: function (dataModel)   {
        for (var key in dataModel) {
            if (dataModel.hasOwnProperty(key)) {
                if (this.isDynamicDate(dataModel, key)) {
                    var daysIntoFuture = dataModel[key].substring(8);
                    dataModel[key] = moment().add(Number(daysIntoFuture), "days").format("YYYY-MM-DD")
                }
            }
        }
        return dataModel;
    },

    isDynamicDate : function (dataModel, key) {
        var dynamicRegExp = new RegExp(/DYNAMIC-\d+/);
        var dateRegExp = new RegExp('date', 'i');
        return (dateRegExp.test(key) && dynamicRegExp.test(dataModel[key]));
    }
};
module.exports = dynamicContent;