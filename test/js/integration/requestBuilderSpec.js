var moment = require('moment');

var requestBuilder = require('../../../src/js/requestBuilder.js');

describe('requestBuilderIntegration', function () {
    it('should create an ajax body with a dynamic date', function () {
        var some_sample_data = {
            foo : 'bar',
            biz : 'baz',
            some_dynamic_date : "DYNAMIC-3"
        };

        var sampleApiModel = {
            url: 'http://www.example.com',
            type: 'POST',
            data: some_sample_data,
            contentType: 'some_content_type',
            dataType: 'json',
            timeout: 6000
        };

        var actualRequestBody = requestBuilder.createAjaxBody(sampleApiModel);

        var expectedDataModel = {
            foo : 'bar',
            biz : 'baz',
            some_dynamic_date : moment().add(3, "days").format("YYYY-MM-DD")
        };

        var expectedAjaxBody = {
            url: 'http://www.example.com',
            type: 'POST',
            data: JSON.stringify(expectedDataModel),
            contentType: 'some_content_type',
            dataType: 'json',
            timeout: 6000
        };
        actualRequestBody.should.eql(expectedAjaxBody);
    });
});