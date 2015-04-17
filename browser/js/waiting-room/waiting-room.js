'use strict';
app.config(function($stateProvider) {

	$stateProvider.state('game.waitingRoom', {
		url: '/waiting-room',
		templateUrl: 'js/waiting-room/waiting-room.html',
		controller: 'WaitingRoomCtrl'
	});

});

app.controller('WaitingRoomCtrl', function($scope, $state) {

	$scope.goToGame = function() {
		$scope.currentGame.status = 'playing';
		$state.go('^.gameRoom');
	};

});
