'use strict';
app.factory('GamePlay', function() {

	var setCurrentCard = function(currentCards) {

		var randomCard = getRandomCard(currentCards.cardDeck);

		currentCards.currentCard = {
			value: randomCard,
			coins: 0
		};

		delete currentCards.cardDeck[randomCard];

	};

	var getRandomCard = function (cardDeck) {
		var randomCard;
		var count = 0;

		for (var card in cardDeck) {
			if (Math.random() < 1/++count) randomCard = card;
		}

		return randomCard;
	};

	var setPlayOrder = function(currentGame, currentUsers) {

		var playerCount = 0;
		angular.forEach(currentUsers, function(userInfo, user) {
			if (user.indexOf('$') < 0) playerCount++;
		});

		var orderArr = [];
		var activePlayer = '';

		for (var i = 0; i < playerCount; i++) orderArr[i] = i + 1;

		angular.forEach(currentUsers, function(userInfo, user) {

			if (user.indexOf('$') < 0) {
				let orderIndex = Math.floor(Math.random() * orderArr.length);

				if (orderArr[orderIndex] === 1) activePlayer = userInfo.username;
				userInfo.order = orderArr.splice(orderIndex, 1)[0];
			}

		});

		currentGame.playerCount = playerCount;
		currentGame.activePlayer = activePlayer;
		currentGame.status = 'playing';

	};

	var setActivePlayer = function(currentGame, currentUsers) {

		var activePlayer = '';
		var newOrder = currentUsers[currentGame.activePlayer].order + 1;

		if (newOrder > currentGame.playerCount) newOrder = 1;

		angular.forEach(currentUsers, function(userInfo, user) {

			if (user.indexOf('$') < 0 && userInfo.order === newOrder) {
				activePlayer = userInfo.username;
			}

		});

		currentGame.activePlayer = activePlayer;

	};

	var calculateResults = function(currentUsers) {

		var allPoints = [];
		angular.forEach(currentUsers, function(userInfo, user) {

			if (user.indexOf('$') < 0) {
				var userPoints = 0;
				if (userInfo.groupedCards) {
                    angular.forEach(userInfo.groupedCards, function(group) {
                        userPoints += parseInt(group[0]);
                    });
                }
				userPoints -= userInfo.coins;
				allPoints.push({
					username: userInfo.username,
					points: userPoints
				});
			}

		});

		return allPoints;

	};

	return {
		setCurrentCard,
		setPlayOrder,
		setActivePlayer,
		calculateResults
	};

});
