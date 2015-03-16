(function () {
  "use strict";

  angular.module('app')
    .controller('AuthController', function(AuthService, $scope, $location) {
      var authCtrl = this;

      authCtrl.register = function () {
        AuthService.register(authCtrl.user).then(function () {
          $location.path('/profile/:userId');
        });
        console.log(authCtrl.user);
      };


    });
})();
