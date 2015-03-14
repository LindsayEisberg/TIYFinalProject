(function () {
  "use strict";

  angular.module('register')
    .controller('AuthController', function(AuthService, $scope, $location) {
      var authCtrl = this;

      authCtrl.addNewUser = function (user) {
        AuthService.newUser(user);
        $location.path('/profile/:userId');
      };
    });
})();
