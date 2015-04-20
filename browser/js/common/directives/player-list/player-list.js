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

							var userCards = [];
							angular.forEach(userInfo.cards, function(cardInfo, card) {
								userCards.push(parseInt(cardInfo.value));
							});
							var sortedCards = userCards.sort((a, b) => a - b);
							userInfo.groupedCards = groupCards(sortedCards);

						}
						users[user] = userInfo;
					}
				});

				scope.users = users;

			});

			var groupCards = function(userCards) {
				console.log('userCards', userCards)
				var groupedCards = [];

				while (userCards.length > 1) {
					var group = [];
					var searchValue = userCards.shift();
					group.push(searchValue);

					while (userCards.length && userCards[0] - searchValue === 1) {
						console.log('searchValue', searchValue)
						searchValue = userCards.shift();
						group.push(searchValue);
					}

					console.log('group', group)
					groupedCards.push(group);
				}

				console.log('userCards 2', userCards)
				if (userCards.length) groupedCards.push(userCards);
				console.log(groupedCards)

				return groupedCards;
			};

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
