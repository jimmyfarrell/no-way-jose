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
	};

	$scope.$watch('currentUsers', function(newUsers, oldUsers) {
		console.log(newUsers);
		var userOrdersArr = [];

		angular.forEach(newUsers, function(userInfo, user) {
			if (user.indexOf('$') < 0) userOrdersArr.push((userInfo.order));
		});

		if (userOrdersArr.every(order => !!order)) $scope.currentGame.status = 'playing';
	});

	$scope.$watch('currentGame.status', function(newStatus, oldStatus) {
		if (newStatus === 'playing' && oldStatus === 'waiting') $state.go('^.gameRoom');
	});

});
