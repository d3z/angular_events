(function() {

    'use strict';

    var express = require('express');
    var request = require('request');
    var app = express();
    app.use(express.static('public'));

    var EVENTS_URL = 'https://api.meetup.com/nigmaio/events';

    app.get('/events', function(req, res) {
       request(EVENTS_URL, function(err, _, json){
           var events = JSON.parse(json);
           var eventNames = events.map(function(event) { return event.name; });
           res.json(eventNames);
       });
    });

    app.listen(3000, function() {
        console.log('The Angular Events server is listening on port 3000');
    });

}());