'use strict';
app.factory('GamePlay', function($firebaseObject, GameSetup) {

	var setCurrentCard = function(currentCards) {

		var randomCard = getRandomCard(currentCards.cardDeck);

		currentCards.currentCard = {
			value: randomCard,
			coins: 0
		};

		delete currentCards.cardDeck[randomCard];

		function getRandomCard(cardDeck) {
			var randomCard;
			var count = 0;

			for (var card in cardDeck) {
				if (Math.random() < 1/++count) randomCard = card;
			}

			return randomCard;
		}

	};

	var setPlayOrder = function(currentUsers) {

		var playerCount = 0;
		angular.forEach(currentUsers, function(userInfo, user) {
			if (user.indexOf('$') < 0) playerCount++;
		});

		var orderArr = [];
		angular.forEach(currentUsers, function(userInfo, user) {
			if (user.indexOf('$') < 0) {
				var order = Math.floor(Math.random() * playerCount) + 1;
				while (orderArr.indexOf(order) < 0) {
					userInfo.order = order;
					orderArr.push(order);
				}
			}
		});

	};

	return {
		setCurrentCard,
		setPlayOrder
	};

});
