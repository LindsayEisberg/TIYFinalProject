(function () {
  "use strict";

  angular.module('app')
    .controller('RoomController', function($scope,RoomService,OTSession,$routeParams) {
      var RoomCtrl = this;
      var roomId = $routeParams.roomId;
      var userId = $routeParams.userId;
      // initialize scope values like opentok-meet
      // $scope.streams = OTSession.streams;
      // $scope.publishing = true;
      // $scope.screenBig = true;
      // $scope.connected = false;
      // $scope.leaving = false;

      // $scope.screenPublisherProps = {
      //   name: 'screen',
      //   style: {
      //     nameDisplayMode: 'off'
      //   },
      //   publishAudio: false,
      //   videoSource: 'screen'
      // };
      // var facePublisherPropsHD = {
      //   name: 'face',
      //   width: '100%',
      //   height: '100%',
      //   style: {
      //     nameDisplayMode: 'off'
      //   },
      //   resolution: '1280x720',
      //   frameRate: 30
      // },
      //     facePublisherPropsSD = {
      //       name: 'face',
      //       width: '100%',
      //       height: '100%',
      //       style: {
      //         nameDisplayMode: 'off'
      //       }
      //     };
      // $scope.facePublisherProps = facePublisherPropsHD;

      // $scope.notMine = function(stream) {
      //   return stream.connection.connectionId !== $scope.session.connection.connectionId;
      // };

      RoomService.getRoomData(roomId)
        .success(function(roomData) {
          console.log(roomData);
          $scope.name = roomData.session.name;
          $scope.desc = roomData.session.description;
          $scope.active = roomData.session.active;
          $scope.moderators = roomData.session.moderators;
          $scope.subscribers = roomData.session.subscribers;
        });

      // get the room credentials which includes:
      // - OTApiKey
      // - OTSessionId
      // - OTToken
      RoomService.getCredentials(roomId, userId)
        .success(function(credData) {
          console.log(credData);
          // upon success, initialize the session using our new
          // credentials
          if ($scope.session) {
            $scope.session.disconnect();
          }
          OTSession.init(credData.OTApiKey, credData.OTSessionId, credData.OTToken, function(err, session) {
            $scope.session = session;
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
        });
    });
})();
