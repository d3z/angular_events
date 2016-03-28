(function() {

    'use strict';

    var app = angular.module('eventsApp', []);

    var eventNamesService = app.service('EventNamesService', ['$http', EventNamesService]);

    var eventsComponent = app.component('eventList', {
        template: 'Events: <ul><li ng-repeat="name in $ctrl.eventNames">{{name}}</li></ul>',
        controller: EventListController
    });

    function EventNamesService($http) {
        this.$http = $http;
    }

    EventNamesService.prototype.fetchEventNames = function() {
        var promise = this.$http.get('http://localhost:3000/events')
            .then(function(response){
                return response.data;
            })
        return promise;
    };

    function EventListController($scope, $element, $attrs, EventNamesService) {
        var self = this;
        EventNamesService.fetchEventNames()
            .then(function(eventNames){
                self.eventNames = eventNames;
            });
    }

}());
