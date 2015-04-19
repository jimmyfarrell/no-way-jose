'use strict';
app.config(function($stateProvider) {

	$stateProvider.state('game.waitingRoom', {
		url: '/waiting-room',
		templateUrl: 'js/waiting-room/waiting-room.html',
		controller: 'WaitingRoomCtrl'
	});

});

app.controller('WaitingRoomCtrl', function($scope, $state, GamePlay) {

	$scope.allJoined = false;

	$scope.startGame = function() {
		GamePlay.setPlayOrder($scope.currentGame, $scope.currentUsers);
		GamePlay.setCurrentCard($scope.currentCards);
		$state.go('^.gameRoom');
	};

	$scope.enterGameRoom = function() {
		$state.go('^.gameRoom');
	};

	$scope.$watch('currentGame.status', function(newStatus, oldStatus) {
		if (newStatus === 'playing' && oldStatus === 'waiting') {
			$scope.allJoined = true;
		}
	});

});
