'use strict';
app.factory('GamePlay', function($firebaseObject, $firebaseArray) {

    var cardsRef = new Firebase('https://dazzling-torch-382.firebaseio.com/cards');
	var allCards = $firebaseObject(cardsRef);

	var setCurrentCard = function(currentCards) {
		var randIndex;

		currentCards.$loaded()
		.then(function() {
			currentCards.cardDeck = $firebaseArray(currentCards.$ref().child('cardDeck'));
			return currentCards.cardDeck.$loaded();
		})
		.then(function() {
			randIndex = Math.floor(Math.random() * currentCards.cardDeck.length);

			currentCards.currentCard = angular.copy(currentCards.cardDeck[randIndex]);
			currentCards.currentCard.coins = 0;
			return currentCards.cardDeck.$remove(randIndex);
		})
		.then(function() {
			return currentCards.$save();
		});
	};

	return {
		setCurrentCard: setCurrentCard
	};

});
