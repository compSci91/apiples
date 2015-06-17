var dynamicContent = require('../../../src/js/dynamicContent.js');

describe('DynamicContent', function () {
    describe('#generateDyamicDates', function () {
        context('a dynamic date is specified in the data model of the apiModel', function () {
            it('should generate a date one day in the future', function () {
                var moment = require('moment');

                var dynamicDate = {
                    "departure-date": "DYNAMIC-3"
                };

                var actualDataModel = dynamicContent.generateDynamicDates(dynamicDate);

                var expectedDataModel = {
                    "departure-date": moment().add(3, "days").format("YYYY-MM-DD")
                };
                console.log('in test', expectedDataModel);
                actualDataModel.should.eql(expectedDataModel);
            });
        });

        context('a static date is specified in the data model of the apiModel', function () {
            it('should use the static date given in the data model', function () {

                var staticDate = {
                    "departure-date": "2015-06-17"
                };

                var actualDataModel = dynamicContent.generateDynamicDates(staticDate);

                var expectedDataModel = {
                    "departure-date": "2015-06-17"
                };

                actualDataModel.should.eql(expectedDataModel);
            });
        });
    });
});