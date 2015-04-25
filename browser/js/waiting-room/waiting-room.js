'use strict';
app.config(function($stateProvider) {

	$stateProvider.state('game.waitingRoom', {
		url: '/waiting-room',
		templateUrl: 'js/waiting-room/waiting-room.html',
		controller: 'WaitingRoomCtrl'
	});

});

app.controller('WaitingRoomCtrl', function($scope, $state, $timeout, GamePlay) {

	$scope.allJoined = false;

	$scope.startGame = function() {

		GamePlay.setPlayOrder($scope.currentGame, $scope.currentUsers);
		GamePlay.setCurrentCard($scope.currentCards);

		$timeout(function() {
            $state.go('^.gameRoom');
        }, 1000);

	};

	$scope.enterGameRoom = function() {
		$state.go('^.gameRoom');
	};

	$scope.$watch('currentUsers', function(newUsers, oldUsers) {

        $scope.newPlayerJoined = true;
        $timeout(function() {
            $scope.newPlayerJoined = false;
        }, 2000);

		var playerCount = 0;

		angular.forEach(newUsers, function(userInfo, user) {
			if (user.indexOf('$') < 0) playerCount++;
		});

		$scope.playerCount = playerCount;
		if ($scope.currentGame) $scope.currentGame.playerCount = playerCount;

	});

	$scope.$watch('currentGame.status', function(newStatus, oldStatus) {

		if (newStatus === 'playing' && oldStatus === 'waiting') {
			$scope.allJoined = true;
		}

	});

});
