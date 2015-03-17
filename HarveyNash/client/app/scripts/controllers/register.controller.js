(function () {
  "use strict";

  angular.module('app')
    .controller('AuthController', function(AuthService, $scope, $location, $routeParams) {
      var authCtrl = this;

      authCtrl.register = function () {
        AuthService.register(authCtrl.user).then(function (id) {
          $location.path('/profile/' + id);
        });
        console.log(authCtrl.user);
      };


    });
})();
