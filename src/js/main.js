var app = require('./app.js');

var callFrequencyMinutes = 1;

console.log('starting up');
app.buildNodes(document);

startTimedAction = function () {
    console.log('starting the timed actions');
    app.buildScheduledRequests(callFrequencyMinutes, document);
};
