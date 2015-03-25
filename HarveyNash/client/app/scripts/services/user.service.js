(function () {
  "use strict";

  angular.module('app')
    .factory('UserService', function($http, LocalService, $rootScope) {
      var url = "http://localhost:3000/api/v1/profile";
      var eventUrl = 'http://localhost:3000/api/v1/sessions'
      // var events = [
      //   { 
      //     name: 'Demo Day Fun Time',
      //     description: 'Show what we have done so far and hope it works',
      //     date: '03/25/15 1:00 PM',
      //     guests: 'yes',
      //     moderators: [
      //       { id: 6, username: 'tnesland'},
      //       {id: 29, username: 'lindsay'}
      //     ],
      //     subscribers:
      //     [
      //       { id: 1, username: 'Kelli'},
      //       {id: 2, username: 'Bob Saget'}
      //     ],
      //     topic: 'Technology'
      //   }
      // ];

    var getEvents = function () {
      return $http.get(eventUrl);
    };
      
    var getSingleEvent = function(eventId) {
      // return events[index];
      console.log('single event' + eventId);
      return $http.get(eventUrl + '/' + eventId)

};

    var addNewEvent = function (event) {
      // events.push(event);
      console.log('add new event: ' + eventUrl);
      return $http.post(eventUrl, event);
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
