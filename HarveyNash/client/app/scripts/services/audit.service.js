(function () {
  "use strict";

  angular.module('app')
    .factory('RoomService', function($http, $q, $window) {
      var baseURL = 'http://localhost:3000/api/v1/sessions'
      return {
        getRoom: function(baseURL, room) {
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
