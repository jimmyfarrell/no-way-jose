'use strict';
app.config(function($stateProvider) {

	$stateProvider.state('game.gameRoom', {
		url: '/game-room',
		templateUrl: 'js/game-room/game-room.html',
		controller: 'GameRoomCtrl'
	});

});

app.controller('GameRoomCtrl', function($scope, $timeout, GamePlay) {

	$scope.$watch('currentUsers', function(newUsers, oldUsers) {
		var takenCardsCount = 0;

		angular.forEach(newUsers, function(userInfo, user) {

			if (user.indexOf('$') < 0) {
				angular.forEach(userInfo.cards, function(cardInfo, cards) {
					takenCardsCount++;
				});
			}

		});

		if (takenCardsCount === 24) {

            var allPoints = GamePlay.calculateResults(newUsers);
            var winners = [];

            allPoints.forEach(function(user) {

                if (!winners.length || winners[0].points === user.points) {
                    winners.push(user);
                }
                else if (winners[0].points > user.points) {
                    winners = [user];
                }

            });

            if (winners.length > 1) $scope.tie = true;

            var winningPoints = winners[0].points;
            var nonWinners = allPoints.filter(function(user) {
                return user.points > winningPoints;
            });

            console.log('nonWinners', nonWinners)
            console.log('winners', winners)
            $scope.winners = winners;
            $scope.nonWinners = nonWinners;

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

		if (!$scope.currentUser.cards) $scope.currentUser.cards = {};

		$scope.currentUser.cards[$scope.currentCards.currentCard.value] =
			$scope.currentCards.currentCard;

		$scope.currentUser.coins =
			Number($scope.currentUser.coins) +
			Number($scope.currentCards.currentCard.coins);

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
        $scope.pleaseWait = true;
        $timeout(function() {
            $scope.pleaseWait = false;
        }, 3000);

	};

	$scope.declineCard = function() {

		$scope.currentCards.currentCard.coins =
			Number($scope.currentCards.currentCard.coins) + 1;

		$scope.currentUser.coins =
			Number($scope.currentUser.coins) - 1;

		GamePlay.setActivePlayer($scope.currentGame, $scope.currentUsers);

	};


});
