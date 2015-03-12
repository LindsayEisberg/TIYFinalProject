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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/room', {
        templateUrl: 'views/video.html',
        controller: 'VideoCtrl'
      })
      .when('/not-found', {
         templateUrl: "views/404.html"
       })
       .otherwise({
         redirectTo: '/not-found'
       });
   });
