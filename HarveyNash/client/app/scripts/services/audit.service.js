(function () {
  "use strict";

  angular.module('app')
    .factory('RoomService', function($http) {
      var url = 'http://localhost:3000/api/v1/sessions';

      var centerStageAdd = function( roomId, userId ) {
        console.log('audit.service#centerStageAdd:' + roomId + ',' + userId);
        return $http.post( url + '/' + roomId + '/center_stage/' + userId );
      }

      var centerStageRemove = function( roomId, userId ) {
        console.log('audit.service#centerStageRemove:' + roomId + ',' + userId);
        return $http.delete( url + '/' + roomId + '/center_stage/' + userId );
      }

      var centerStageIds = function(roomId) {
        console.log('audit.service#getCenterStageIds:' + roomId);
        return $http.get( url + '/' + roomId  + '/center_stage');
      }

      var getCredentials = function(roomId,userId) {
        console.log("#getCredentials, roomId:" + roomId + ", userId:" + userId);
        return $http.get(url+'/'+roomId+'/credentials?userId='+userId);
      }

      var getRoomData = function(roomId) {
        return $http.get(url + '/' + roomId);
      }

      return {
        centerStageAdd: centerStageAdd,
        centerStageRemove: centerStageRemove,
        centerStageIds: centerStageIds,
        getCredentials: getCredentials,
        getRoomData: getRoomData
      }
    });
})();
