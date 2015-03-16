

/**
 * @ngdoc function
 * @name app.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */


(function () {
  "use strict";

  angular.module('app')
    .controller('MainCtrl', function($scope, $location) {
      var main = this;
      main.login = true;
      main.toggleShow = function () {
        main.login = main.login === false ? true: false;
      }
    });
})();
