'use strict';
app.config(function($stateProvider) {

	$stateProvider.state('game.gameRoom', {
		url: '/game-room',
		templateUrl: 'js/game-room/game-room.html',
		controller: 'GameRoomCtrl'
	});

});

app.controller('GameRoomCtrl', function($scope, GamePlay) {

	$scope.$watch('currentGame.status', function(newStatus, oldStatus) {
		if (newStatus === 'finished') {
			GamePlay.calculateResults($scope.currentUsers);
		}
	});

	$scope.acceptCard = function() {

		$scope.currentUser.coins =
			Number($scope.currentUser.coins) +
			Number($scope.currentCards.currentCard.coins);

		if (!$scope.currentUser.cards) $scope.currentUser.cards = {};

		$scope.currentUser.cards[$scope.currentCards.currentCard.value] =
			$scope.currentCards.currentCard;

		if (Object.keys($scope.currentCards.cardDeck).length === 0) {
			$scope.currentGame.status = 'finished';
			return;
		}

		GamePlay.setCurrentCard($scope.currentCards);

	};

	$scope.declineCard = function() {

		$scope.currentCards.currentCard.coins =
			Number($scope.currentCards.currentCard.coins) + 1;

		$scope.currentUser.coins =
			Number($scope.currentUser.coins) - 1;

		GamePlay.setActivePlayer($scope.currentGame, $scope.currentUsers);

	};


});
