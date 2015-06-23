APIPLES
=======
<b>tl;dr:</b> its like postman, but automated, and less informative (for now)

### Some prerequisites:  
#### For development I'm using:  
- nodejs 0.10.31  
- grunt-cli 0.1.13  
- grunt 0.4.5  
- all other dependencies and versions are listed in packages.json (or at least should be), and can be install with:
>npm install  


### Have you ever worked on a project that depended on an API that you had no control over?
- or worse, that API you depend on, depends on another API (or more)?  
- and one of those APIs would go down occasionally?  
- and it would take you a good bit of wondering.... "Did my new code break the application, or is one of the APIs down again?"  

Let's compare apiples to apiples shall we?
------------------------------------------
    ... or at the very least, eliminate some of the potential problem areas.

This application is a rather trivial monitor of RESTful API services.
It displays a box in a browser window for each API you want to monitor.  
It does this by sending an API request for each API and awaiting a response.  
If the response is successful, it turns the box green.  
If the response fails, it turns the box red.  
Simple as that.  

## To install and/or run:
- Create API models and save them in the 'apis' directory
- from the command line (note: you'll need grunt-cli installed globally):  
  > npm install  
  > grunt run  
- Open a browser and navigate to: localhost:9000   
- Click the 'start requests' button when you're ready to start the timed requests.  
- Click the 'stop requests' button when you're ready to stop the timed requests, or just close the browser window.  
...and wait.  



### About the API models that YOU need to create  
Yea, you've got a little legwork to make this app do your bidding.  
For each API call that you want to monitor, you'll need to create a separate json file and copy it to the 'apis' directory.  
The api models need to be in the following format:    

    {
        "name" : "this is the name that you want to appear in the box in your browser window.  it has to be unique....  and don't make it too long",
        "url" : "http://the-api-url-youre-wanting-to-monitor.com",
        "type" : "your request verb.... i.e. GET, POST, etc",
        "contentType" : "need to specify a content-type?  we got ya covered",
        "data" : "the data you're wanting to send, like, for a POST",
        "dataType" : "kinda self explanatory",
        "schedule": "*/1 * * * *"
    }
The values (i.e. values on the right of the semicolon) are semi-optional (except 'name' and 'url'), the values on the left are not.
Most of these values map directly to a jquery.ajax body; feel free to browse that documentation for more information.
 


#### Dynamic Dates
Apiples has the ability to generate dynamic dates for key/value pairs in your 'data' block.  For example, lets say today's date is June 18th of 2015.
In the API call, you need information for a date in the future, so you hardcode that date in your apiModel file.
Unfortunately, once that date has passed, you now have to update your apiModel file.
With Apiples, you can get around this by using the 'DYNAMIC-\#' as the value to whatever key you need to set a date for, where the hash sign is replaced by the number of days in the future you want to be used.

For example, if you put this as the value block to your 'data' key:

    {
        "request-date" : "DYNAMIC-2"
    }

The date generated for the request call would use a date two days in the future in the format of 'YYYY-MM-DD'



#### Schedule
Apiples uses a cron-type schedule as defined by [node-schedule](https://www.npmjs.com/package/node-schedule).  
The schedule included in the example above fires off an API request once every minute.  
If you omit the schedule key/value pair, it will use the default value of once every 5 minutes.  


Note:
- there isn't a whole lot of output in the main browser window (other than the color of the DIVs).  you can get information about what is going on under the covers by opening up the browsers developer tools dashboard and looking in the console and the network activity.
- its a work in progress, and still rather young, so don't complain about its shortcomings, but don't hesitate to let me know what you would like it to do.  Or better yet, feel free to fork the repo and contribute.  Don't forget your tests. 