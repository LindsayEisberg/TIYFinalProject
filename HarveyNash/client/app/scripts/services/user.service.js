(function () {
  "use strict";

  angular.module('app')
    .factory('UserService', function($scope, $rootScope, $http, LocalService) {
      var users = [
        {
          name: "Lindsay",
          email: "lindsay.eisberg@gmail.com",
          username: "testUser"
        }
      ];

      return {
        user: function() {
          if(LocalService.get('auth_token')) {
            return angular.fromJson(LocalService.get('auth_token')).user;
          } else {
            return {};
          }
        }
      };

      var getUsers = function () {
        return users;
      };

      var getSingleUser = function(index) {
        return users[index];
      };

      return {
        getUsers: getUsers,
        getUser: getSingleUser
      }
    });
})();
