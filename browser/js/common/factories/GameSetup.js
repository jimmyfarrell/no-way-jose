'use strict';

app.factory('GameSetup', function($q, $firebaseObject) {

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
        var cardDeck = {};

        for (var i = firstCard; i <= lastCard; i++) {
            cardDeck[i] = { coins: 0 };
        }

        return cardDeck;

    };

    var doesGameExist = function(gameId) {
		return allGames[gameId];
    };

    var createNewGame = function(gameId) {

        var newGame = {
			status: 'waiting',
			startTime: Firebase.ServerValue.TIMESTAMP
		};
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

		return allUsers.$loaded()
		.then(function() {

			if (!allUsers[gameId]) {
				allUsers[gameId] = {};
				return allUsers.$save();
			}

		})
		.then(function() {
			current.users = $firebaseObject(usersRef.child(gameId));
			return current.users.$loaded();
		})
		.then(function() {

			current.users[username] = { coins: 11 };
			return current.users.$save();

		})
		.then(function() {

			current.user = $firebaseObject(current.users.$ref().child(username));
			return current.user.$loaded();

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
