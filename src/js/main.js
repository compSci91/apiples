var app = require('./app.js');

var callFrequencyMinutes = 1;
var scheduledRequests;

console.log('starting up');
app.buildNodes(document);

startScheduledRequest = function () {
    scheduledRequests = app.startScheduledRequests(callFrequencyMinutes, document);
};

stopScheduledRequest = function () {
    app.stopScheduledRequests(scheduledRequests);
};
