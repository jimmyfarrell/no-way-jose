'use strict';

app.factory('GameSetup', function($q, $firebaseObject) {

    var gamesRef = new Firebase('https://dazzling-torch-382.firebaseio.com/games');
    var cardsRef = new Firebase('https://dazzling-torch-382.firebaseio.com/cards');
    var usersRef = new Firebase('https://dazzling-torch-382.firebaseio.com/users');
	var chatsRef = new Firebase('https://dazzling-torch-382.firebaseio.com/chats');

	var allGames = $firebaseObject(gamesRef);
	var allCards = $firebaseObject(cardsRef);
	var allUsers = $firebaseObject(usersRef);
	var allChats = $firebaseObject(chatsRef);

    var current = {};

    var gameIdGenerator = function() {
        return (Math.random() + 1).toString(36).slice(2, 7);
    };

    var doesGameExist = function(gameId) {
		return allGames.$loaded()
		.then(function() {
			return allGames[gameId];
		});
    };

	var gameInProgress = function(gameId) {
		return allGames[gameId].status === 'playing';
	};

    var createCardDeck = function() {

        var firstCard = 3;
        var lastCard = 35;
        var cardDeck = {};

        for (var i = firstCard; i <= lastCard; i++) {
            cardDeck[i] = {
				value: i,
				coins: 0
			};
        }

		var cardsArr = Object.keys(cardDeck);
		for (var j = 0; j < 9; j++) {
			var randIndex = Math.floor(Math.random() * cardsArr.length);
			var removeCard = cardsArr[randIndex];
			delete cardDeck[removeCard];
			cardsArr.splice(randIndex, 1);
		}

		console.log(cardDeck);
        return cardDeck;

    };

    var createAndLoadGame = function(gameId) {

        var newGame = {
			status: 'waiting',
			playerCount: 0,
			activePlayer: null,
			startTime: Firebase.ServerValue.TIMESTAMP
		};
        var newCards = { cardDeck: createCardDeck() };

		var gamesAndCardsPromises = [];
		allGames[gameId] = newGame;
		allGames.$save()
		.then(function(gamesRef) {
			current.game = $firebaseObject(gamesRef.child(gameId));
			gamesAndCardsPromises.push(current.game.$loaded());
		});

		allCards[gameId] = newCards;
		allCards.$save()
		.then(function(cardsRef) {
			current.cards = $firebaseObject(cardsRef.child(gameId));
			gamesAndCardsPromises.push(current.cards.$loaded());
		});

		return $q.all(gamesAndCardsPromises)
		.then(function() {
			return loadGame(gameId);
		});

    };

	var loadGame = function(gameId) {

		return allGames.$loaded()
		.then(function() {
			current.game = $firebaseObject(gamesRef.child(gameId));
			return current.game.$loaded();
		})
		.then(function() {
			return allCards.$loaded();
		})
		.then(function() {
			current.cards = $firebaseObject(cardsRef.child(gameId));
			return current.cards.$loaded();
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

			current.users[username] = {
				username,
				coins: 11,
				order: 0
			};

			return current.users.$save();

		})
		.then(function() {

			current.user = $firebaseObject(current.users.$ref().child(username));
			return current.user.$loaded();

		});

    };

	var createChatRoom = function(gameId) {

		return allChats.$loaded()
		.then(function() {

			var timestamp = Date.now();
			var firstMessage = {};
			firstMessage[timestamp] = {
				username: 'MrRoboto',
				text: 'Welcome to the chat room.',
				timestamp: Date.now()
			};
			allChats[gameId] = firstMessage;
			return allChats.$save();

		})
		.then(function() {

			current.chat = $firebaseObject(chatsRef.child(gameId));
			return current.chat.$loaded();

		});

	};

    return {
        gameIdGenerator,
        doesGameExist,
		gameInProgress,
        createAndLoadGame,
		loadGame,
        addUserToGame,
		createChatRoom,
		current
    };

});
