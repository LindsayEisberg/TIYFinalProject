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
    'user',
    'register',
    'auditorium'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'common/views/main.html',
        controller: 'MainCtrl as main'
      })
      .when('/not-found', {
         templateUrl: "common/views/404.html"
       })
       .otherwise({
         redirectTo: '/not-found'
       });
   });
