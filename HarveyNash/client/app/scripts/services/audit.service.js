(function () {
  "use strict";

  angular.module('app')
    .factory('RoomService', function($scope, $routeParams, $http, $q, baseURL, $window, room) {
      return {
        getRoom: function() {
          var deferred = $q.defer();
          $http.get(baseURL + room).success(function(roomData) {
            deferred.resolve(roomData);
          });
          return deferred.promise;
        },
        changeRoom: function() {
          $window.location.href = baseURL;
        }
      };
    });
})();
