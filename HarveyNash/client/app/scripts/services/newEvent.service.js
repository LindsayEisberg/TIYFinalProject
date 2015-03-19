
(function () {
  "use strict";
angular.module('app')
  .factory('EventService', function($http, $rootScope) {
    var events = [
      {
        name: 'Event Name',
        description: 'Event Descrip',
        date: '10/20/15 12:00 AM'
      }
    ];

    var getEvents = function (events) {
      // return $http.get(url + '/' + events);
      return events;
    };

    var getSingleEvent = function(index) {
  return events[index];
};

    var addNewEvent = function (event) {
      events.push(event);
      console.log(events);
    // $http.post(url, event);
    // $rootScope.$broadcast('event:created');
  };

  return {
    events: events,
    getEvents: getEvents,
    getEvent: getSingleEvent,
    addNewEvent: addNewEvent
  }


  });
})();
