(function () {
  "use strict";

  angular.module('register')
    .controller('AuthService', function($scope, $routeParams, $http) {
      var url = '';


    var newUser = function (user) {
      $http.post(url, user);
    };

    return {
      newUser: newUser
    };
  });
})();
