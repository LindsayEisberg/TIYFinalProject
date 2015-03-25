(function () {
  "use strict";
    angular.module('app')
    .controller('EventController', function (EventService, UserService, $scope, $routeParams, $location) {
      var eventCtrl = this;
      $scope.user = JSON.parse(localStorage.auth_token);

        UserService.getUsers().success(function (data) {
        $scope.users = data;
        console.log(data);
      });


      eventCtrl.toggleShow = function () {
        eventCtrl.form = !eventCtrl.form;
      }

      eventCtrl.form = false;

            eventCtrl.events = EventService.events;

            eventCtrl.event = EventService.getEvent();

            eventCtrl.addNewEvent = function (newEvent) {
              EventService.addNewEvent(newEvent);
              console.log(newEvent);
              $scope.newEvent = {};
              console.log(eventCtrl.events);

      };
      $scope.sessionPage = function() {
        $scope.user = JSON.parse(localStorage.auth_token);
        console.log(user.id);
        

      };
      
    });

})();




