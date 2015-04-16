app.config(function($stateProvider) {

    $stateProvider.state('game', {
        url: '/game/:gameId',
        templateUrl: 'js/game/game.html',
        controller: 'GameCtrl'
    });

});

app.controller('GameCtrl', function($scope, $stateParams, GamePlay) {

    var gameId = $stateParams.gameId;

	$scope.currentGame = GamePlay.current.game;
	$scope.currentCards = GamePlay.current.cards;
	$scope.currentUsers = GamePlay.current.users;
	$scope.currentUser = GamePlay.current.user;

});
