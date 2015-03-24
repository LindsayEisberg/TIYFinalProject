(function () {
  "use strict";

  angular.module('app')
    .controller('UserController', function(UserService, $scope, $location, $routeParams, $rootScope) {
      var userCtrl = this;

      UserService.getUsers().success(function (data) {
        userCtrl.users = data;
      });

      UserService.getSingleUser($routeParams.userid).success(function(data) {
        userCtrl.singleUser = data;
        console.log(data.id);

      });

      userCtrl.currentIndex = $routeParams.userid;

      userCtrl.updateInfo = function (user) {
        UserService.editUser(user);

};



    });
  })();
