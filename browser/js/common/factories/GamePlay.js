'use strict';
app.factory('GamePlay', function(GameSetup) {

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

	var setPlayOrder = function(currentGame, currentUsers) {

		angular.forEach(currentUsers, function(userInfo, user) {
			if (user.indexOf('$') < 0) currentGame.playerCount++;
		});

		var orderArr = [];
		for (var i = 0; i < currentGame.playerCount; i++) orderArr[i] = i + 1;
		angular.forEach(currentUsers, function(userInfo, user) {
			if (user.indexOf('$') < 0) {
				var orderIndex = Math.floor(Math.random() * orderArr.length);
				userInfo.order = orderArr.splice(orderIndex, 1)[0];
			}
		});

	};

	var setActivePlayer = function(currentGame, currentUsers) {

		var newOrder;
		if (!currentGame.activePlayer) newOrder = 1;
		else newOrder = currentUsers[currentGame.activePlayer].order + 1;
		if (newOrder > currentGame.playerCount) newOrder = 1;

		console.log(newOrder);
		angular.forEach(currentUsers, function(userInfo, user) {
			if (user.indexOf('$') < 0) {
				if (userInfo.order === newOrder) {
					currentGame.activePlayer = userInfo.username;
				}
			}
		});

	};

	return {
		setCurrentCard,
		setPlayOrder,
		setActivePlayer
	};

});
