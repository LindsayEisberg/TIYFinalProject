(function () {
  'use strict';

  angular.module('app')
    .controller('LoginController', function(AuthService, $scope, $route, $location) {
      var loginCtrl = this;

      $scope.errors = [];

      loginCtrl.login = function () {
        if($scope.loginForm.$valid) {
          loginCtrl.errors = [];
          AuthService.login(loginCtrl.user).success(function (result) {
            // $location.path('/');
            $location.path( '/profile/' + result.id );
            console.log(result.id);
          }).error(function(err) {
            $scope.errors.push(err);
            console.log(err);
          });
        }
      };


    });

})();
