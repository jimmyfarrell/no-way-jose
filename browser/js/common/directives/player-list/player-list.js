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

							let userCards = [];
							angular.forEach(userInfo.cards, function(cardInfo, card) {
								userCards.push(parseInt(cardInfo.value));
							});
							userCards = userCards.sort();

							let groupedCards = [];
							console.log('userCards', userCards)
							while (userCards.length > 1) {
								let searchValue = userCards.shift();
								let group = [searchValue];
								while (userCards[0] - searchValue === 1) {
									var searchValue = userCards.shift();
									group.push(searchValue);
								}
								console.log('group', group)
								groupedCards.push(group);
							}
							console.log('userCards #2', userCards)
							console.log('groupedCards #1', groupedCards)
							if (userCards.length) groupedCards.push(userCards);
							console.log(groupedCards)
							scope.groupedCards = groupedCards;

						}
						users[user] = userInfo;
					}
				});

				scope.users = users;

			});

		}
	};

});

app.filter('ordinal', function() {
	return function(input) {
		var s = ["th", "st", "nd", "rd"],
			v = input % 100;
		return input + ( s[(v - 20) % 10] || s[v] || s[0]);
	}
});
