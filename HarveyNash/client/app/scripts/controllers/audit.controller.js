(function () {
  "use strict";

  angular.module('app')
    .controller('RoomController', function($scope, OTSession, apiKey, sessionId, token) {
      var roomCtrl = this;

      OTSession.init(apiKey, sessionId, token);
      roomCtrl.streams = OTSession.streams;

    }).value({
      apiKey: '45176582',
      sessionId: '2_MX40NTE3NjU4Mn5-MTQyNjYxMTk5NTAwNX5yRUJpUCtZOFJqQjNGL0pKbVlMNUpJM3l-fg',
      token: 'T1==cGFydG5lcl9pZD00NTE3NjU4MiZzaWc9YWQ0NzQxZjVjNmM5Zjc3ZWUxMzAwMjgxYjFkNjY4Mjk5YjIzNmU5Mzpyb2xlPXB1Ymxpc2hlciZzZXNzaW9uX2lkPTJfTVg0ME5URTNOalU0TW41LU1UUXlOall4TVRrNU5UQXdOWDV5UlVKcFVDdFpPRkpxUWpOR0wwcEtiVmxNTlVwSk0zbC1mZyZjcmVhdGVfdGltZT0xNDI2NjEyMDAxJm5vbmNlPTAuNTcyOTcwODAyODY2MzQxJmV4cGlyZV90aW1lPTE0MjkyMDM5Njg='
      });
})();
