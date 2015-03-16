(function () {
  'use strict';

  angular.module('app')
    .controller('LoginController', function(AuthService, $scope, $route, $location) {
      var loginCtrl = this;

      $scope.errors = [];

      loginCtrl.login = function () {
        if(loginCtrl.loginForm.$valid) {
          AuthService.login(loginCtrl.user).success(function (result) {
            $location.path('/profile/:userId');
          }).error(function(err) {
            $scope.errors.push(err);
          });
        }
      };


    });

})();
