(function () {
  "use strict";

  angular.module('app')
    .controller('RoomController', function($scope) {
      var roomCtrl = this;
      //
      // OTSession.init(apiKey, sessionId, token);
      // roomCtrl.streams = OTSession.streams;
      //
      // roomCtrl.room;
      // roomCtrl.joinRoom = function () {
      //   $window.location.href = $window.location.href + encodeURIComponent(userCtrl.room)
      // }
      //
      // RoomService.getRoom().then(function(roomData) {
      //   if(roomCtrl.session) {
      //     roomCtrl.session.disconnect();
      //   }
      //
      //   roomCtrl.p2p = roomData.p2p;
      //   roomCtrl.room = roomData.room;
      //   roomCtrl.shareURL = baseURL === '/' ? $window.location.href : baseURL + roomData.room;
      //
      //   OTSession.init(roomData.apiKey, roomData.sessionId, roomData.token, function (err, session) {
      //     roomCtrl.session = session;
      //     var connectDisconnect = function (connected) {
      //       roomCtrl.$apply(function () {
      //         roomCtrl.connected = connected;
      //         if(!connected) {
      //           roomCtrl.publishing = false;
      //         }
      //       });
      //     };
      //     if ((session.is && session.us('connected')) || session.connected) {
      //       connectDisconnect(true);
      //     }
      //
      //     roomCtrl.session.on('sessionConnected', connectDisconnect.bind(roomCtrl.session, true));
      //     roomCtrl.session.on('sessionDisconnected', connectDisconnect.bind(roomCtrl.session, false));
      //   });
      //   roomCtrl.publishing = true;
      // });
      //
      // roomCtrl.changeRoom = function() {
      //   if(!roomCtrl.leaving) {
      //     roomCtrl.leaving = true;
      //     roomCtrl.session.disconnect();
      //     roomCtrl.session.on('sessionDisconnected', function() {
      //       roomCtrl.$apply(function() {
      //         RoomService.changeRoom();
      //       });
      //     });
      //   }
      // };
    });
})();
