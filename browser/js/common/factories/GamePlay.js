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
		for (var i = 0; i < playerCount; i++) orderArr[i] = i + 1;
		angular.forEach(currentUsers, function(userInfo, user) {
			if (user.indexOf('$') < 0) {
				var orderIndex = Math.floor(Math.random() * orderArr.length);
				userInfo.order = orderArr.splice(orderIndex, 1)[0];
			}
		});
		console.log(currentUsers)

	};

	return {
		setCurrentCard,
		setPlayOrder
	};

});
