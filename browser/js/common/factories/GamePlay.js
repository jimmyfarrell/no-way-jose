'use strict';
app.factory('GamePlay', function($firebaseObject, $firebaseArray) {

    var cardsRef = new Firebase('https://dazzling-torch-382.firebaseio.com/cards');
	var allCards = $firebaseObject(cardsRef);

	var setCurrentCard = function(currentCards) {

		var randomCard = getRandomCard(currentCards.cardDeck);

		currentCards.currentCard = {};
		currentCards.currentCard[randomCard] = { coins: 0 };
		delete currentCards.cardDeck[randomCard];

		return randomCard;
		//.then(function() {
			//currentCards.cardDeck = $firebaseArray(currentCards.$ref().child('cardDeck'));
			//return currentCards.cardDeck.$loaded();
		//})
		//.then(function() {
			//return currentCards.cardDeck.$remove(randIndex);
		//});
	};

	return {
		setCurrentCard: setCurrentCard
	};

});

function getRandomCard(cardDeck) {
    var randomCard;
    var count = 0;
    for (var card in cardDeck)
        if (Math.random() < 1/++count)
           randomCard = card;
    return randomCard;
}
