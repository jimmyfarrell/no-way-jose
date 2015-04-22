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
			$scope.allPoints = GamePlay.calculateResults($scope.currentUsers);
		}
	});

	$scope.$watch('currentCards.currentCard', function(newCard, oldCard) {
		var cardCount = 0;
		angular.forEach($scope.currentCards.cardDeck, function(cardInfo, card) {
			cardCount++;
		});
		$scope.cardCount = cardCount;
	});

	$scope.acceptCard = function() {

		$scope.currentUser.coins =
			Number($scope.currentUser.coins) +
			Number($scope.currentCards.currentCard.coins);

		if (!$scope.currentUser.cards) $scope.currentUser.cards = {};

		$scope.currentUser.cards[$scope.currentCards.currentCard.value] =
			$scope.currentCards.currentCard;

		var timestamp = Date.now();
		$scope.currentChat[timestamp] = {
			system: true,
			text: `${ $scope.currentUser.username } took card ${ $scope.currentCards.currentCard.value }`,
			timestamp
		};

		if ($scope.cardCount === 0) {
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
