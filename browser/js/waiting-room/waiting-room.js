'use strict';
app.config(function($stateProvider) {

	$stateProvider.state('game.waitingRoom', {
		url: '/waiting-room',
		templateUrl: 'js/waiting-room/waiting-room.html',
		controller: 'WaitingRoomCtrl'
	});

});

app.controller('WaitingRoomCtrl', function($scope, $state, $window, GamePlay) {

	$scope.goToGame = function() {
		GamePlay.setPlayOrder($scope.currentGame, $scope.currentUsers);
		GamePlay.setCurrentCard($scope.currentCards);
		GamePlay.setActivePlayer($scope.currentGame, $scope.currentUsers);
	};

	$scope.$watch('currentUsers', function(newUsers, oldUsers) {
		var userOrdersArr = [];

		angular.forEach(newUsers, function(userInfo, user) {
			if (user.indexOf('$') < 0) userOrdersArr.push((userInfo.order));
		});

		if (userOrdersArr.every(order => !!order)) $scope.currentGame.status = 'playing';
	});

	$scope.$watch('currentGame.status', function(newStatus, oldStatus) {
		if (newStatus === 'playing' && oldStatus === 'waiting') {
			$window.alert('All players have joined. Entering the game room.');
			$state.go('^.gameRoom');
		}
	});

});
