(function () {
  "use strict";

  angular.module('app')
    .controller('RoomController', function(RoomService, $scope, OTSession, apiKey, sessionId, token) {
      var roomCtrl = this;
      roomCtrl.publishing=false;
      roomCtrl.screenBig = true;
      roomCtrl.connected = false;

      roomCtrl.screenPublisherProps = {
        name: "screen",
        style: {nameDisplayMode:"off"},
        publishAudio: false,
        constraints: {
          video: {
            mandatory: {
              maxWidth: 1920,
              maxHeight: 1080
            },
            optional: []
          },
          audio: false
        },
        mirror: false,
        width: screen.width,
        height: screen.height,
        aspectRatio: screen.width  / screen.height
      };

      var facePublisherProps = {
        name: 'face',
        width: '100%',
        height: '100%',
        style: {
          nameDisplayMode: 'off'
        }
      };

      roomCtrl.facePublisherProps = facePublisherProps;




      roomCtrl.notMine = function(stream) {
        return stream.connection.connectionId != roomCtrl.session.connection.connectionId;
      };


      $scope.$on('changeSize', function (event) {
        if(event.targetScope.stream.oth_large === undefined) {
          event.targetScope.stream.oth_large = event.targetScope.stream.name !== "screen";
        } else {
          event.targetScope.stream.oth_large = !event.targetScope.stream.oth_large;
        }
        setTimeout(function () {
          event.targetScope.$emit('otLayout');
        }, 10);
      });

      RoomService.getRoom().then(function (roomData) {
        if(roomCtrl.session) {
          roomCtrl.session.disconnect();
        }

        roomCtrl.p2p = roomData.p2p;
        roomCtrl.room = roomData.room;
        // roomCtrl.ShareURL = baseURL === '/' ? $window.location.href : baseURL + roomData.room;

      OTSession.init(apiKey, sessionId, token, function(err, session) {
        console.log('session init', apiKey, sessionId, token);
        roomCtrl.session = session;
        var connectDisconnect = function (connected) {
          $scope.$apply(function () {
            $scope.connected = connected;
            if(!connected) $scope.publishing = false;
          });
        };
        if ((session.is && session.is('connected')) || session.connected) connectDisconnect(true);
        roomCtrl.session.on('sessionConnected', connectDisconnect.bind(roomCtrl.session, true));
        roomCtrl.session.on('sessionDisconnected', connectDisconnect.bind(roomCtrl.session, false));
      });
      roomCtrl.publishing = true;
    });
    roomCtrl.streams = OTSession.streams;



      // OTSession.session.on('connectionCreated', function(event) {
      //   console.log(event.connection.connectionId);
      //   roomCtrl.count++;
      // });


      // RoomService.getRoom().then(function (roomData) {
      //  if (roomCtrl.session) {
      //    roomCtrl.session.disconnect();
      //  }


      // roomCtrl.notMine = function (stream) {
      //   return stream.connection.connectionId != roomCtrl.session.connection.connectionId;
      // };
      //
      // RoomService.getRoom().then(function (roomData) {
      //   if (roomCtrl.session) {
      //     roomCtrl.session.disconnect();
      //   }
      //   roomCtrl.p2p = roomData.room;
      //   roomCtrl.shareURL = baseURL === '/' ? $window.location.href : baseURL + roomData.room;
      //
      //   OTSession.init(roomData.apiKey, roomData.sessionId, roomData.token, function (err, session) {
      //     roomCtrl.session = session;
      //
      //     var connectDisconnect = function (connected) {
      //       roomCtrl.$apply(function () {
      //         roomCtrl.connected = connected;
      //         if (!connected) $scope.publishing = false;
      //       });
      //     };
      //
      //     if ((session.is && session.is('connected')) || session.connected) connectDisconnect(true);
      //       roomCtrl.session.on('sessionConnected', connectDisconnect.bind(roomCtrl.session, true));
      //       roomCtrl.session.on('sessionDisconnected', connectDisconnect.bind(roomCtrl.session, false));
      //   });
      //
      //   roomCtrl.publishing = true;
      //
      // });


    }).value({
      apiKey: '45176582',
      sessionId: '2_MX40NTE3NjU4Mn5-MTQyNjYxMTk5NTAwNX5yRUJpUCtZOFJqQjNGL0pKbVlMNUpJM3l-fg',
      token: 'T1==cGFydG5lcl9pZD00NTE3NjU4MiZzaWc9YWQ0NzQxZjVjNmM5Zjc3ZWUxMzAwMjgxYjFkNjY4Mjk5YjIzNmU5Mzpyb2xlPXB1Ymxpc2hlciZzZXNzaW9uX2lkPTJfTVg0ME5URTNOalU0TW41LU1UUXlOall4TVRrNU5UQXdOWDV5UlVKcFVDdFpPRkpxUWpOR0wwcEtiVmxNTlVwSk0zbC1mZyZjcmVhdGVfdGltZT0xNDI2NjEyMDAxJm5vbmNlPTAuNTcyOTcwODAyODY2MzQxJmV4cGlyZV90aW1lPTE0MjkyMDM5Njg='
      });
})();
