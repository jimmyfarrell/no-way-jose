app.config(function($stateProvider) {

    $stateProvider.state('join', {
        url: '/join',
        templateUrl: 'js/join/join.html',
        controller: 'JoinCtrl'
    });

});

app.controller('JoinCtrl', function($scope, $state, $q, $firebaseObject, GameSetup) {

    $scope.formType = 'create';

    $scope.gameForm = {
        gameId: GameSetup.gameIdGenerator(),
        username: null
    };

    $scope.setFormType = function(type) {

        $scope.formType = type;

        if (type === 'create') $scope.gameForm.gameId = GameSetup.gameIdGenerator();
        else $scope.gameForm.gameId = null;

    };

    $scope.goToGame = function(gameForm) {

        var gameExists = GameSetup.doesGameExist(gameForm.gameId);

		if ($scope.formType === 'join' && !gameExists) {
			$scope.error = 'Game ID does not exist. Try again or create a new game.';
			$scope.$digest();
			return;
		}
		else {
			GameSetup.createNewGame(gameForm.gameId);
		}

		GameSetup.addUserToGame(gameForm.gameId, gameForm.username)
		.then(function() {
			$state.go('game', { gameId: gameForm.gameId });
		});

    };

});
