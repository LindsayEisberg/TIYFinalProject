(function () {
  "use strict";

  angular.module('app')
    .controller('AuthController', function(AuthService, $scope, $location, $routeParams) {
      var authCtrl = this;

      authCtrl.register = function () {
        if($scope.userForm.$valid) {
          authCtrl.errors = [];
          AuthService.register(authCtrl.user).success(function (id) {
            console.log("RegisterController#register: " + id.id)
            $location.path('/profile/' + id.id);
          }).error(function(err) {
            // $scope.errors.push(err)
             _.each(err.errors, function(value, key) {
                console.log(key + " " + value);
              });
          });
        }
      };


    });
})();
