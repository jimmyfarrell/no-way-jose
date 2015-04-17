'use strict';
app.config(function($stateProvider) {

	$stateProvider.state('game.gameRoom', {
		url: '/game-room',
		templateUrl: 'js/game-room/game-room.html',
		controller: 'GameRoomCtrl'
	});

});

app.controller('GameRoomCtrl', function($scope, GamePlay) {

	console.log($scope.currentUser)
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
