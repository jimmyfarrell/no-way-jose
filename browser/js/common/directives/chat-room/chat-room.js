'use strict';
app.directive('chatRoom', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/chat-room/chat-room.html',
		link: function(scope, element, attrs) {

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
