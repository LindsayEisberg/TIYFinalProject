(function() {
angular.module('auditorium', [
    'opentok',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'


  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/auditorium/:roomId', {
        templateUrl: 'auditorium/views/auditorium.html',
        controller: 'RoomController as roomCtrl'
      })
      .when('/browse', {
        templateUrl: 'auditorium/views/browse.html',
        controller: 'RoomController as roomCtrl'
      })
       .otherwise({
         redirectTo: '/not-found'
       });
   });
 })();
