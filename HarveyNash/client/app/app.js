'use strict';

/**
 * @ngdoc overview
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */
angular
  .module('app', [
    'opentok',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMessages'

  ])
  .config(function ($routeProvider, authProvider, $httpProvider, $locationProvider, jwtInterceptorProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'AuthController as AuthCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController as loginCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthController as AuthCtrl'
      })
      .when('/auditorium/:roomId', {
        templateUrl: 'views/auditorium.html',
        controller: 'RoomController as roomCtrl'
      })
      .when('/browse', {
        templateUrl: 'views/browse.html',
        controller: 'RoomController as roomCtrl'
      })
      .when('/newEvent/:userId', {
        templateUrl: 'views/createEvent.html',
        controller: 'UserController as userCtrl'
      })
      .when('/profile/:userId', {
         templateUrl: "views/profile.html",
         controller: 'UserController as userCtrl'
       })
      .when('/not-found', {
         templateUrl: "views/404.html"
       })
       .otherwise({
         redirectTo: '/not-found'
       });

     });
