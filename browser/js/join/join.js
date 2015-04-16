app.config(function($stateProvider) {

    $stateProvider.state('join', {
        url: '/join',
        templateUrl: 'js/join/join.html',
        controller: 'JoinCtrl'
    });

});

app.controller('JoinCtrl', function($scope, $state, $q, $firebaseObject, GamePlay) {

    $scope.formType = 'create';

    $scope.gameForm = {
        gameId: GamePlay.gameIdGenerator(),
        username: null
    };

    $scope.setFormType = function(type) {

        $scope.formType = type;

        if (type === 'create') $scope.gameForm.gameId = GamePlay.gameIdGenerator();
        else $scope.gameForm.gameId = null;

    };

    $scope.goToGame = function(gameForm) {

        var gameExists = GamePlay.doesGameExist(gameForm.gameId);

		if ($scope.formType === 'join' && !gameExists) {
			$scope.error = 'Game ID does not exist. Try again or create a new game.';
			$scope.$digest();
			return;
		}
		else {
			GamePlay.createNewGame(gameForm.gameId);
		}

		GamePlay.addUserToGame(gameForm.gameId, gameForm.username)
		.then(function() {
			$state.go('game', { gameId: gameForm.gameId });
		});

    };

});
