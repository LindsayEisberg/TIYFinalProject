(function () {
  "use strict";

  angular.module('app')
    .factory('UserService', function($http, LocalService, $rootScope) {
      var url = "http://localhost:3000/api/v1/profile";
      var eventUrl = 'http://localhost:3000/api/v1/sessions'

      var events = [
      { 
        name: 'Event Name',
        description: 'Event Descrip',
        date: '10/20/15 12:00 AM',
        guests: 'yes',
        moderators: [
          { id: 1, username: 'tnesland'},
          {id: 2, username: 'foo'}
        ],
        subscribers:
         [
           { id: 1, username: 'Kelli'},
           {id: 2, username: 'Bob Saget'}
         ],
         topic: 'Technology'
      }
    ];

    var getEvents = function (events) {
      return $http.get(eventUrl);
      // return events;
    };

    var getSingleEvent = function(eventId) {
      // return events[index];
      console.log('single event' + eventId);
      return $http.get(eventUrl + '/' + eventId)

};

    var addNewEvent = function (eventUrl, eventId) {
      // events.push(event);
      console.log('add new event: ' + eventUrl + '/' + eventId);
      return $http.post(eventUrl + '/' + eventId);
    // $rootScope.$broadcast('event:created');
  };

      var getUsers = function () {
        return $http.get(url);
      };

      var getSingleUser = function(id) {
        return $http.get(url + '/' + id);
      };

      var updateInfo = function (user, id) {
                // return boots;
                $http.put(url + '/' + id, user);
                $rootScope.$broadcast('user:updated');

            };

      return {
        getUsers: getUsers,
        getSingleUser: getSingleUser,
        editUser: updateInfo,
        events: events,
        getEvents: getEvents,
        getEvent: getSingleEvent,
        addNewEvent: addNewEvent

      }
    });


})();

//sessions
//userid(owner), moderator,

//event listing
//owner
  //owner has other moderators
