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




      return {
        getUsers: getUsers,
        getSingleUser: getSingleUser,


      }
    });
      

})();
