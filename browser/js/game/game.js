'use strict';
app.config(function($stateProvider) {

    $stateProvider.state('game', {
        url: '/game/:gameId',
        templateUrl: 'js/game/game.html',
        controller: 'GameCtrl'
    });

});

app.controller('GameCtrl', function($scope, $stateParams, $firebaseObject, GameSetup, GamePlay) {

    $scope.gameId = $stateParams.gameId;

	$scope.currentGame = GameSetup.current.game;
	$scope.currentCards = GameSetup.current.cards;
	$scope.currentUsers = GameSetup.current.users;
	$scope.currentUser = GameSetup.current.user;

	$scope.currentCards.$loaded()
	.then(function() {
	});

	$scope.takeCard = function() {

		var cardCoins = $scope.currentCards.currentCard.coins;
		$scope.currentUser.coins = Number($scope.currentUser.coins) + Number(cardCoins);

		if (!$scope.currentUser.cards) $scope.currentUser.cards = [];
		$scope.currentUser.cards.push($scope.currentCards.currentCard);
		$scope.currentUser.$save();

		GamePlay.setCurrentCard($scope.currentCards);

	};

	$scope.placeCoin = function() {
		$scope.currentCards.currentCard.coins = Number($scope.currentCards.currentCard.coins) + 1;
		$scope.currentUser.coins = Number($scope.currentUser.coins) - 1;
		$scope.currentCards.$save();
		$scope.currentUser.$save();
	};

});
