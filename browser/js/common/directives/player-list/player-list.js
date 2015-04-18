'use strict';
app.directive('playerList', function(GameSetup) {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/player-list/player-list.html',
		link: function(scope, element, attrs) {

		scope.$watch('currentUsers', function(newUsers, oldUsers) {

			var users = {};

			angular.forEach(newUsers, function(userInfo, user) {

				if (user.indexOf('$') < 0) {
					if (userInfo.cards) {
						angular.forEach(userInfo.cards, function(cardInfo, card) {
							cardInfo.value = parseInt(cardInfo.value);
						});
					}
					users[user] = userInfo;
				}

			});

			scope.users = users;

		});

		}
	};
});
