'use strict';

app.factory('GamePlay', function($q, $firebaseObject, $firebaseArray) {

    var gamesRef = new Firebase('https://dazzling-torch-382.firebaseio.com/games');
    var cardsRef = new Firebase('https://dazzling-torch-382.firebaseio.com/cards');
    var usersRef = new Firebase('https://dazzling-torch-382.firebaseio.com/users');

	var allGames = $firebaseObject(gamesRef);
	var allCards = $firebaseObject(cardsRef);
	var allUsers = $firebaseObject(usersRef);

    var current = {};

    var gameIdGenerator = function() {
        return (Math.random() + 1).toString(36).slice(2, 7);
    };

    var createCardDeck = function() {

        var firstCard = 3;
        var lastCard = 35;
        var cardDeck = [];

        for (var i = firstCard; i <= lastCard; i++) {
            var card = { value: i };

            cardDeck.push(card);
        }

        return cardDeck;

    };

    var doesGameExist = function(gameId) {
		return allGames[gameId];
    };

    var createNewGame = function(gameId) {

        var newGame = { startTime: Firebase.ServerValue.TIMESTAMP };
        var newCards = { cardDeck: createCardDeck() };

		allGames[gameId] = newGame;
		allGames.$save()
		.then(function(gamesRef) {
			current.game = $firebaseObject(gamesRef.child(gameId));
		});

		allCards[gameId] = newCards;
		allCards.$save()
		.then(function(cardsRef) {
			current.cards = $firebaseObject(cardsRef.child(gameId));
		});

    };

    var addUserToGame = function(gameId, username) {

        var newUser = { username: username, coins: '11' };

		if (!current.users) {
			current.users = $firebaseArray(usersRef.child(gameId));
		}

		return current.users.$add(newUser)
		.then(function(userRef) {
			current.user = $firebaseObject(userRef);
		});

    };

    return {
        gameIdGenerator: gameIdGenerator,
        doesGameExist: doesGameExist,
        createNewGame: createNewGame,
        addUserToGame: addUserToGame,
		current: current
    };

});
