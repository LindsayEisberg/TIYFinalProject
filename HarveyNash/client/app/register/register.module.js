(function() {
angular.module('register', [
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
      .when('/login', {
        templateUrl: 'register/views/login.html',
        controller: 'AuthController as authCtrl'
      })
      .when('/register', {
         templateUrl: "register/views/register.html",
         controller: 'AuthController as authCtrl'
       })
       .otherwise({
         redirectTo: '/not-found'
       });
   });
 })();
