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