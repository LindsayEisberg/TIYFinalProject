(function () {
  "use strict";

  angular.module('app')
    .controller('RoomController', function($scope,RoomService,OTSession,TB,$routeParams) {
      var RoomCtrl = this;
      $scope.initialized = false;
      $scope.roomId = $routeParams.roomId;
      $scope.currentUserId = $routeParams.userId;
      $scope.roomMembers = [];
      $scope.roomMembers.push(Number($scope.currentUserId));
      $scope.stageMembers = [];
      $scope.showIt = false;

      $scope.init = function() {
        // get room data
        $scope.getRoomData($scope.roomId)
        // get join room
        $scope.joinRoom($scope.roomId, $scope.currentUserId);
        // get current stage members
        RoomService.centerStageIds($scope.roomId)
          .success(function(ids) {
            console.log("centerStageIds:" + ids);
            $scope.stageMembers = ids;
          });
        
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
            };
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
                $scope.session.signal({type:'stageChange'});
                $scope.session.signal({type:'infoChange'});
              };
              $scope.session.on('sessionConnected', function() {
                connectDisconnect.bind($scope.session, true);
                $scope.session.signal({type:'stageChange'});
                $scope.session.signal({type:'infoChange'});
              });
              $scope.session.on('sessionDisconnected', connectDisconnect.bind($scope.session, false));
              // register for the signals we need
              $scope.session.on("signal:infoChange", function(event) {
                console.log("Room info has changed!!!");
                $scope.$apply( function() {
                  $scope.roomMembers = _.map($scope.session.connections.where(),
                                             function(con) { return Number(con.data); });
                });
              });
              $scope.session.on("signal:addToCenterStage", function(event) {
                var userId = event.data;
                console.log("Adding user to center stage: " + userId);
                $scope.$apply(function(){
                  $scope.stageMembers.push(userId);
                });
              });
              $scope.session.on("signal:removeFromCenterStage", function(event) {
                var userId = event.data;
                console.log("Removing user from center stage: " + userId);
                var idx = $scope.stageMembers.indexOf(userId);
                $scope.$apply(function() {
                  $scope.stageMembers.splice(idx, 1);
                });
              });
              $scope.session.on('connectionCreated'), function(event) {
                var userId = JSON.parse(event.connection.data);
                console.log("User has joined room: " + userId);
                $scope.session.signal({type:'infoChange'});
              };
              $scope.session.on('connectionDestroyed', function(event) {
                var userId = JSON.parse(event.connection.data);
                console.log("User has left room: " + userId);
                $scope.session.signal({type:'infoChange'});
              });
              $scope.streams = OTSession.streams;
              $scope.initialized = true;
            });
          });
      };

      // add or remove a user from center stage
      $scope.centerStageToggle = function(userId) {
        if ($scope.isCenterStage(userId)) {
          $scope.centerStageRemove(userId);
        } else {
          $scope.centerStageAdd(userId);
        };
      };
      
      // put a user on the center stage
      $scope.centerStageAdd = function(userId) {
        // add the user to the center stage
        $scope.session.signal({type:'addToCenterStage', data:userId});
      };

      // remove a user from the center stage
      $scope.centerStageRemove = function(userId) {
        $scope.session.signal({type:'removeFromCenterStage', data:userId});
      };


      //initializing text chat for users in a session
      $scope.addNewMessage = function (newMessage) {
        // RoomService.addNewMessage(newMessage);
        $scope.posts.push(newMessage);
        console.log(newMessage);
        $scope.newMessage = {};
        console.log(messages);

};
      // return true if the given user_id is currently on the center
      // stage
      $scope.isCenterStage = function(userId) {
        return _.includes($scope.stageMembers, Number(userId));
      };

      $scope.present = function(userId) {
        return $scope.initialized && _.includes($scope.roomMembers, userId);
      };

      // run teh codez
      $scope.init();
    });
})();
