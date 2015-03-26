(function () {
  "use strict";

  angular.module('app')
    .controller('UserController', function(UserService, $scope, $location, $routeParams, $rootScope) {
      var userCtrl = this;
      $scope.user = JSON.parse(localStorage.auth_token);


      UserService.getUsers().success(function (data) {
        userCtrl.users = data;
        console.log(data);
        // _.each(userCtrl.users, function(item, index, array){
        //
        //   console.log(item.username, item.id);
        // })
      });

      $scope.selection=[{}];

      $scope.toggleSelection = function toggleSelection(userName) {
        var idx = $scope.selection.indexOf(userName);
        // is currently selected
        if (idx > -1) {
          $scope.selection.splice(idx, 1);
        }
        // is newly selected
        else {
          $scope.selection.push(userName);
        }
        console.log($scope.selection);
      };

      // userCtrl.questions = UserService.getQuestion();

      UserService.getSingleUser($routeParams.userid).success(function(data) {
        userCtrl.singleUser = data;
        console.log(data.id);
      });

      userCtrl.currentIndex = $routeParams.userid;

      userCtrl.updateInfo = function (user) {
        UserService.editUser(user);

      };

      userCtrl.toggleShow = function () {
        userCtrl.form = !userCtrl.form;
      }

      userCtrl.form = false;


      UserService.getEvents()
        .success( function(eventData) {
          console.log(userCtrl);
          console.log(eventData.sessions);
          userCtrl.events = eventData.sessions;
          console.log("EVENTS:::");
          console.log(userCtrl.events);
        })
        .error( function(error) {
          console.log("There be an air-roar!");
        });

      // userCtrl.event = UserService.getEvent();

      // UserService.addNewEvent().success(function (newEvent) {
      //   userCtrl.addNewEvent = newEvent;
      //   console.log(newEvent);
      //   $scope.newEvent = {};
      // });

      userCtrl.addNewEvent = function (newEvent) {
        UserService.addNewEvent(newEvent);
        console.log(newEvent);
        $scope.newEvent = {};
        console.log(userCtrl.events);

     };
      $scope.sessionPage = function() {
        $scope.user = JSON.parse(localStorage.auth_token);
        console.log(user.id);


      };



    });
})();
