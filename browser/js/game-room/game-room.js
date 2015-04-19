'use strict';
app.config(function($stateProvider) {

	$stateProvider.state('game.gameRoom', {
		url: '/game-room',
		templateUrl: 'js/game-room/game-room.html',
		controller: 'GameRoomCtrl'
	});

});

app.controller('GameRoomCtrl', function($scope, GamePlay) {

	$scope.takeCard = function() {

		$scope.currentUser.coins = Number($scope.currentUser.coins) + Number($scope.currentCards.currentCard.coins);
		if (!$scope.currentUser.cards) $scope.currentUser.cards = {};
		$scope.currentUser.cards[$scope.currentCards.currentCard.value] = $scope.currentCards.currentCard;
		GamePlay.setCurrentCard($scope.currentCards);
		GamePlay.setActivePlayer($scope.currentGame, $scope.currentUsers);

	};

	$scope.placeCoin = function() {

		$scope.currentCards.currentCard.coins = Number($scope.currentCards.currentCard.coins) + 1;
		$scope.currentUser.coins = Number($scope.currentUser.coins) - 1;
		GamePlay.setActivePlayer($scope.currentGame, $scope.currentUsers);

	};


});
