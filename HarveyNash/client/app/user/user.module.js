(function() {
angular.module('user', [
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
      .when('/newEvent/:userId', {
        templateUrl: 'user/views/createEvent.html',
        controller: 'UserController as userCtrl'
      })
      .when('/profile/:userId', {
         templateUrl: "user/views/profile.html",
         controller: 'UserController as userCtrl'
       })
       .otherwise({
         redirectTo: '/not-found'
       });
   });
 })();
