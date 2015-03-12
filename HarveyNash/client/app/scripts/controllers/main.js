'use strict';

/**
 * @ngdoc function
 * @name app.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('MainCtrl', function ($scope, $location) {
    $scope.joinRoom = function () {
      $location.path('/room');
    }
  });
