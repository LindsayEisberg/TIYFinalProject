angular.module('app')
    .directive('videoChat', function () {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            title: '@'         },
        template: '<div id="publisher"></div> <div id="subscribers"></div>',
        // controller: RoomController, //Embed a custom controller in the directive
        link: function ($scope, element, attrs) {
          var session = TB.initSession(sessionId);
          var publisher = TB.initPublisher(apiKey, 'publisher');
          var apiKey = '45176582';
          var sessionId = '2_MX40NTE3NjU4Mn5-MTQyNjYxMTk5NTAwNX5yRUJpUCtZOFJqQjNGL0pKbVlMNUpJM3l-fg';
          var token = 'T1==cGFydG5lcl9pZD00NTE3NjU4MiZzaWc9YWQ0NzQxZjVjNmM5Zjc3ZWUxMzAwMjgxYjFkNjY4Mjk5YjIzNmU5Mzpyb2xlPXB1Ymxpc2hlciZzZXNzaW9uX2lkPTJfTVg0ME5URTNOalU0TW41LU1UUXlOall4TVRrNU5UQXdOWDV5UlVKcFVDdFpPRkpxUWpOR0wwcEtiVmxNTlVwSk0zbC1mZyZjcmVhdGVfdGltZT0xNDI2NjEyMDAxJm5vbmNlPTAuNTcyOTcwODAyODY2MzQxJmV4cGlyZV90aW1lPTE0MjkyMDM5Njg=';

          session.on({
            sessionConnected: function(event) {
              session.publish(publisher);
            },
            streamCreated: function(event) {
              var subContainer = document.createElement('div');
              subContainer.id = 'stream-' + event.stream.streamId;
              document.getElementById('subscribers').appendChild(subContainer);
              session.subscribe(event.stream, subContainer);
            }

          });
          session.connect(apiKey, token);
        } //DOM manipulation
    }
});
