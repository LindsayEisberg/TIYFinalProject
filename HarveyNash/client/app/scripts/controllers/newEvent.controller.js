(function () {
  "use strict";
    angular.module('app')
    .controller('EventController', function (EventService, $scope, $routeParams) {
      var eventCtrl = this;

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

    });

})();


// addEvent: addNewEvent (event)
// addHero: addSuperHero (her0)
