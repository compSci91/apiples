var successColor = '#0d0';
var failColor = '#f00';
var timedOutColor = '#ff0';

var firstURL = 'http://jsonplaceholder.typicode.com/posts'
var secondURL = 'http://spargonaut.com/foo.txt'
var timeoutURL = 'http://jsonplaceholder.typicode.com:81'
var urls = [firstURL, secondURL, timeoutURL];

var timerInterval = 10000;

function makeRequest(urlToHit, baseDomain) {
	var node = document.getElementById(baseDomain);
	$.ajax({
		method: "GET",
		url: urlToHit,
		cache: false
	})
	.done(changeNodeColorForSuccess(node))
	.fail(changeNodeColorForFailure(node));
};

function changeNodeColorForFailure(node) {
	return function(xhr, msg) {
		node.style.background = failColor;
	};
};

function changeNodeColorForSuccess(node) {
	return function(xhr, msg) {
		node.style.background = successColor;	
	}
};

function buildNodes() {
	for (var i in urls) {
		var wrapperDiv = document.getElementById('wrapper');
		wrapperDiv.innerHTML += createMonitorDiv(urls[i], i);
	}
};

function getBaseDomainFrom(url) {
	var domainPieces = url.split('//');
	var topDomain = domainPieces[1].split('.')[0];
	return topDomain;
};

function createMonitorDiv(url, index) {
	var baseDomain = getBaseDomainFrom(url) + index;
	return "<div class='shape' id='" + baseDomain + "'><div class='shape-content'>" + baseDomain + "</div></div>";
};

function makeRequests() {
	console.log('making the requests');
	for (var i in urls) {
		var url = urls[i];
		var baseDomain = getBaseDomainFrom(url) + i
		makeRequest(url, baseDomain);
	}
};

var timedAction;
function startTimedAction() {
	timedAction = setInterval(makeRequests, timerInterval);	
};

function stopTimedAction() {
	clearInterval(timedAction);
};