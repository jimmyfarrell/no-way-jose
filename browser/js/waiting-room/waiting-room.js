'use strict';
app.config(function($stateProvider) {

	$stateProvider.state('game.waitingRoom', {
		url: '/waiting-room',
		templateUrl: 'js/waiting-room/waiting-room.html',
		controller: 'WaitingRoomCtrl'
	});

});

app.controller('WaitingRoomCtrl', function($scope, $state, GameSetup, GamePlay) {

	$scope.goToGame = function() {
		GamePlay.setPlayOrder($scope.currentUsers);
		GamePlay.setCurrentCard($scope.currentCards);
		$scope.currentGame.status = 'playing';
	};

	$scope.$watch('currentGame.status', function(newStatus, oldStatus) {
		if (newStatus === 'playing' && oldStatus === 'waiting')
			$state.go('^.gameRoom');
	});

});
