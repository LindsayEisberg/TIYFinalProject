(function () {
  "use strict";

  angular.module('app')
    .controller('AuthController', function(AuthService, $scope, $location, $routeParams) {
      var authCtrl = this;

      authCtrl.register = function () {
        AuthService.register(authCtrl.user).then(function (id) {
          console.log("RegisterController#register: " + id.data.id )
          $location.path('/profile/' + id.data.id);
        });
        console.log(authCtrl.user);
      };


    });
})();
