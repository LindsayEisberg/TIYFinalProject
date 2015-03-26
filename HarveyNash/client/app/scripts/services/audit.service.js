(function () {
  "use strict";

  angular.module('app')
    .factory('RoomService', function($http) {
      var url = 'http://localhost:3000/api/v1/sessions';

      var centerStageAdd = function( roomId, userId ) {
        console.log('audit.service#centerStageAdd:' + roomId + ',' + userId);
        return $http.post( url + '/' + roomId + '/center_stage/' + userId );
      };

      var centerStageRemove = function( roomId, userId ) {
        console.log('audit.service#centerStageRemove:' + roomId + ',' + userId);
        return $http.delete( url + '/' + roomId + '/center_stage/' + userId );
      };

      var centerStageIds = function(roomId) {
        console.log('audit.service#getCenterStageIds:' + roomId);
        return $http.get( url + '/' + roomId  + '/center_stage');
      };

      var declareEnter = function( roomId, userId ) {
        console.log("#declareEnter:" + roomId + "," + userId);
        return $http.post( url + "/" + roomId + "/enter/" + userId );
      };

      var declareExit = function( roomId, userId ) {
        console.log("#declareExit:" + roomId + "," + userId);
        return $http.post( url + "/" + roomId + "/exit/" + userId );
      };

      var getCredentials = function(roomId,userId) {
        console.log("#getCredentials, roomId:" + roomId + ", userId:" + userId);
        return $http.get(url+'/'+roomId+'/credentials?userId='+userId);
      };

      var getRoomData = function(roomId) {
        return $http.get(url + '/' + roomId);
      };

      var getQuestions = function(roomId) {
        return $http.get(url + '/' + roomId + '/questions');
      };

      var createQuestion = function(roomId, questionData) {
        var postUrl = url + '/' + roomId + '/questions'
        return $http.post(postUrl, questionData);
      };

      var updateQuestion = function(questionId, data) {
        return $http.patch('http://localhost:3000/api/v1/questions/' + questionId );
      };

      var deleteQuestion = function(questionId) {
        return $http.delete('http://localhost:3000/api/v1/questions/' + questionId);
      };

      // var addNewMessage = function (userId, message) {
      //   console.log("get message:" messages);
      //   return $http.post(url + '/' + '/' messages);
      //   $rootScope.$broadcast('message:created');
      // }

      return {
        centerStageAdd: centerStageAdd,
        centerStageRemove: centerStageRemove,
        centerStageIds: centerStageIds,
        declareEnter: declareEnter,
        declareExit: declareExit,
        getCredentials: getCredentials,
        getRoomData: getRoomData,
        getQuestions: getQuestions,
        createQuestion: createQuestion,
        updateQuestion: updateQuestion,
        deleteQuestion: deleteQuestion
        // addNewMessage: addNewMessage
      };

    });
})();
