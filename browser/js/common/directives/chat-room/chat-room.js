'use strict';
app.directive('chatRoom', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/chat-room/chat-room.html',
		link: function(scope, element, attrs) {

			var joinTimestamp = Date.now();
			scope.currentChat[joinTimestamp] = {
				system: true,
				text: `${ scope.currentUser.username } has joined`,
				timestamp: joinTimestamp
			};

			scope.sendMessage = function(messageText) {

				var timestamp = Date.now();
				scope.currentChat[timestamp] = {
					username: scope.currentUser.username,
					text: messageText,
					timestamp
				};

				scope.messageText = null;

			};

		}
	};
});
