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
    'ngRoute',
    'opentok',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngMessages'

  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController as mainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/main.html',
        controller: 'LoginController as loginCtrl'
      })
      .when('/register', {
        templateUrl: 'views/main.html',
        controller: 'AuthController as AuthCtrl'
      })
      .when('/auditorium/', {
        templateUrl: 'views/auditorium.html',
        controller: 'RoomController as roomCtrl'
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
      .when('/profile/:userid', {
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
