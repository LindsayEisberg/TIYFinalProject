(function () {
  "use strict";

  angular.module('app')
    .controller('RoomController', function(RoomService, $scope, OTSession, apiKey, sessionId, token) {
      var roomCtrl = this;
      roomCtrl.notMine = function(stream) {
        return stream.connection.connectionId != roomCtrl.session.connection.connectionId;
      };

      RoomService.getRoom().then(function (roomData) {
        if(roomCtrl.session) {
          roomCtrl.session.disconnect();
        }

        roomCtrl.p2p = roomData.p2p;
        roomCtrl.room = roomData.room;
        // roomCtrl.ShareURL = baseURL === '/' ? $window.location.href : baseURL + roomData.room;
        roomCtrl.streams = OTSession.streams;
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
