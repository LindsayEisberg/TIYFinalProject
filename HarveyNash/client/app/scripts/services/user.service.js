(function () {
  "use strict";

  angular.module('app')
    .factory('UserService', function($http, LocalService, $rootScope) {
      var url = "http://localhost:3000/api/v1/profile"


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
        editUser: updateInfo


      }
    });


})();
