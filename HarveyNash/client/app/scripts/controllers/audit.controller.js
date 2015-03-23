(function () {
  "use strict";

  angular.module('app')
    .controller('RoomController', function($scope,RoomService,OTSession,TB,$routeParams) {
      var RoomCtrl = this;
      $scope.initialized = false;      
      $scope.roomId = $routeParams.roomId;
      $scope.currentUserId = $routeParams.userId;
      $scope.stageMembers = [];
      $scope.showIt = false;

      $scope.init = function() {
        // get current stage members
        RoomService.centerStageIds($scope.roomId)
          .success(function(ids) {
            console.log("centerStageIds:" + ids);
            $scope.stageMembers = ids;
          });
        // get room data
        $scope.getRoomData($scope.roomId);
        // get join room
        $scope.joinRoom($scope.roomId, $scope.currentUserId)
      };

      $scope.getRoomData = function(roomId) {
        RoomService.getRoomData(roomId)
          .success(function(roomData) {
            console.log(roomData);
            $scope.name = roomData.session.name;
            $scope.desc = roomData.session.description;
            $scope.active = roomData.session.active;
            $scope.moderators = roomData.session.moderators;
            $scope.subscribers = roomData.session.subscribers;
          });
      };
      
      // initialize session
      $scope.joinRoom = function(roomId, userId) {
        // get the room credentials which includes:
        // - OTApiKey
        // - OTSessionId
        // - OTToken
        RoomService.getCredentials(roomId, userId)
          .success(function(credData) {
            console.log(credData);
            $scope.credData = credData;
            // 
            if ($scope.session) {
              $scope.session.disconnect();
            }
            OTSession.init(credData.OTApiKey, credData.OTSessionId, credData.OTToken, function(err, session) {
              $scope.session = session;
              $scope.session.apiKey = credData.OTApiKey;
              var connectDisconnect = function(connected) {
                $scope.$apply(function() {
                  $scope.connected = connected;
                  if (!connected) {
                    $scope.publishing = false;
                  }
                });
              };
              if ((session.is && session.is('connected')) || session.connected) {
                connectDisconnect(true);
              }
              $scope.session.on('sessionConnected', connectDisconnect.bind($scope.session, true));
              $scope.session.on('sessionDisconnected', connectDisconnect.bind($scope.session, false));
            });
            $scope.streams = OTSession.streams;
            $scope.initialized = true;
          });
      };

      // put a user on the center stage
      $scope.centerStageAdd = function(newCenterStageUserId) {
        // add the user to the center stage
        RoomService.centerStageAdd($scope.roomId,newCenterStageUserId)
          .success(function(ids) {
            $scope.stageMembers.push(newCenterStageUserId);
            
            console.log($scope.stageMembers);
          });
      };

      // return true if the given user_id is currently on the center
      // stage
      $scope.isCenterStage = function() {
        return $scope.initialized && _.includes($scope.stageMembers, Number($scope.currentUserId));
      };

      // run teh codez
      $scope.init();

    });
})();
