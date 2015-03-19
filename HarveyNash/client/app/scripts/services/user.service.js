(function () {
  "use strict";

  angular.module('app')
    .factory('UserService', function($http, LocalService, $rootScope) {
      var url = "http://localhost:3000/api/v1/profile"
      /* return {
         user: function() {
         if(LocalService.get('auth_token')) {
         return angular.fromJson(LocalService.get('auth_token')).user;
         } else {
         return {};
         }
         }
         }; */

      var getUsers = function () {
        return $http.get(url);
      };

      var getSingleUser = function(id) {
        return $http.get(url + '/' + id);
      };

      var getEvents = function (events) {
        return $http.get(url + '/' + events);
      };


      var addNewEvent = function (event) {
  // boots.push(boot);
      $http.post(url, event);
      $rootScope.$broadcast('event:created');
    };


      return {
        getUsers: getUsers,
        getSingleUser: getSingleUser,
        getEvents: getEvents,
        addEvent: addNewEvent

      }
    });

})();
