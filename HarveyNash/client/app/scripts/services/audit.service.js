(function () {
  "use strict";

  angular.module('app')
    .factory('RoomService', function($http) {
      var url = 'http://localhost:3000/api/v1/sessions';

      var getCredentials = function(roomId,userId) {
        console.log("#getCredentials, roomId:" + roomId + ", userId:" + userId);
        return $http.get(url+'/'+roomId+'/credentials?userId='+userId);
      };

      var getRoomData = function(roomId) {
        return $http.get(url + '/' + roomId);
      }
      
      return {
        getCredentials: getCredentials,
        getRoomData: getRoomData
      }
    });
})();
