var app = require('./app.js');

var scheduledRequests;

console.log('starting up');
app.buildNodes(document);

startScheduledRequest = function () {
    scheduledRequests = app.startScheduledRequests(document);
};

stopScheduledRequest = function () {
    app.stopScheduledRequests(scheduledRequests);
};
