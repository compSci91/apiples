To install:
note: must have grunt-cli installed
1. npm install
2. grunt run
This will compile your api models into the src/js/models.js file, run the unit tests, execute browserify, and start a server.
Open a browser and navigate to: localhost:9000 
Click the 'start requests' button to start the timed requests.
Click the 'stop requests' button to stop the timed requests.

To only compile api models:
1. grunt execute

To only run the unit tests:
1. grunt
note: the models.js file must be present.  you might need to run 'grunt execute' first.  yea, I know its bad, and I feel bad.



this is a tool to monitor flaky servers.
its intention is to periodically make requests to API servers to see if they are able to handle them (i.e. they are up)

it is still being developed and is currently only a Proof of concept.

to run:
(assuming you're using a mac, and already have python installed)
- open a terminal, and navigate to the project root of this project
- issues the command: python -m SimpleHTTPServer 8000
- open a browser and use the address: localhost:8000
- click the 'start timed action' button' to start monitoring (i.e. sending requests to the servers)
- click the 'stop timed action' button to stop monitoring (i.e. stop making requests to the servers)


notes:
- there isn't a whole lot of output in the main browser window (other than the color of the DIVs).  you can get information about what is going on under the covers by opening up the browsers developer tools dashboard and looking in the console and the network activity.
