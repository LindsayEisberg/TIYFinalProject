(function () {
  "use strict";

  angular.module('app')
    .controller('RoomController', function($scope,RoomService,OTSession,TB,$routeParams) {
      var RoomCtrl = this;
      $scope.initialized = false;
      $scope.roomId = $routeParams.roomId;
      $scope.currentUserId = $routeParams.userId;
      $scope.roomMembers = [];
      $scope.stageMembers = [];
      $scope.questions = [];
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
                console.log('65:CONNECTED');                
                connectDisconnect(true);
                $scope.initialized = true;
                $scope.session.signal({type:'stageChange'});
                $scope.session.signal({type:'infoChange'});
              };
              $scope.session.on('sessionConnected', function() {
                console.log('71:sessionConnected');                
                connectDisconnect.bind($scope.session, true);
                $scope.session.signal({type:'stageChange'});
                $scope.session.signal({type:'infoChange'});
              });
              $scope.session.on('sessionDisconnected', connectDisconnect.bind($scope.session, false));
              // register for the signals we need
              $scope.session.on("signal:infoChange", function(event) {
                console.log('79:signal:infoChange');
                $scope.$apply( function() {
                  $scope.roomMembers = _.map($scope.session.connections.where(),
                                             function(con) { return Number(con.data); });
                  console.log('RoomMembers: ' + $scope.roomMembers);
                });
              });
              $scope.session.on("signal:addToCenterStage", function(event) {
                console.log('86:singal:addToCenterStage');
                var userId = event.data;
                console.log("Adding user to center stage: " + userId);
                $scope.$apply(function(){
                  $scope.stageMembers.push(userId);
                });
              });
              $scope.session.on("signal:removeFromCenterStage", function(event) {
                console.log('94:signal:removeFromCenterStage');
                var userId = event.data;
                console.log("Removing user from center stage: " + userId);
                var idx = $scope.stageMembers.indexOf(userId);
                $scope.$apply(function() {
                  $scope.stageMembers.splice(idx, 1);
                });
              });
              $scope.session.on("signal:questionAsked", function(event) {
                console.log('signal:questionAsked');
                $scope.getQuestions();
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
            });
          });
      };

      // add or remove a user from center stage
      $scope.centerStageToggle = function(userId) {
        // if the user is a moderator...
        var moderatorIds = _.map($scope.moderators, function(obj) { return obj.id; });
        if (_.includes(moderatorIds, Number($scope.currentUserId))) {
          // ...perform the requested toggle
          if ($scope.isCenterStage(userId)) {
            $scope.centerStageRemove(userId);
          } else {
            $scope.centerStageAdd(userId);
          };
        }
      };

      // answer a question
      $scope.answerQuestion = function(question) {
        // if the user is a moderator...
        var moderatorIds = _.map($scope.moderators, function(obj) { return obj.id; });
        if (_.includes(moderatorIds, Number($scope.currentUserId))) {
          // ...add the user to the stage if the are not already
          console.log("Answering question:" + question);
          if (!$scope.isCenterStage(question.user_id)) {
            $scope.centerStageAdd(question.user_id);
          }
          RoomService.deleteQuestion(question.id)
            .success( function() {
              $scope.session.signal({type:'questionAsked'});
            });
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

      // return true if the given user_id is currently on the center
      // stage
      $scope.isCenterStage = function(userId) {
        return $scope.initialized && _.includes($scope.stageMembers, Number(userId));
      };

      $scope.present = function(userId) {
        return $scope.initialized &&
          ( userId == Number($scope.currentUserId) ||
            _.includes($scope.roomMembers, userId) );
      };

      // get all the questions
      $scope.getQuestions = function() {
        RoomService.getQuestions($scope.roomId)
          .success( function(data) {
            console.log(data);
            $scope.questions = data;
          });
      };
      $scope.getQuestions();

      // ask a question in the room
      $scope.askQuestion = function(newQuestionText, order) {
        var questionData = {text: newQuestionText, user_id: $scope.currentUserId, session_id: $scope.roomId, order_idx: 99};
        console.log(questionData);
        RoomService.createQuestion($scope.roomId, questionData)
          .success( function(data) {
            $scope.questions.push(data);
            $scope.session.signal({type:'questionAsked'});


          });
      };

      // run teh codez
      $scope.init();
    });
})();
