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

    $scope.enterWaitingRoom = function(gameForm) {

		function joiningExistingGame() {
			var gameExists = GameSetup.doesGameExist(gameForm.gameId);
		}

		function joinOrCreate() {
			if ($scope.formType === 'join') {
			}
		}

		GameSetup.doesGameExist(gameForm.gameId)
		.then(function(gameExists) {
			if ($scope.formType === 'join') {

				if (!gameExists) {
					throw 'Game ID does not exist.';
				}

				else {
					var playing = GameSetup.gameInProgress(gameForm.gameId);

					if (playing) throw 'Game is already in progress.';
					else return GameSetup.loadGame(gameForm.gameId);
				}

			}

			else {
				return GameSetup.createAndLoadGame(gameForm.gameId);
			}

			if (!gameExists && $scope.formType === 'join') {
				throw 'Game ID does not exists. Try again or create a new game.';
			}
			return joinOrCreate();
		})
		.then(function() {
			return GameSetup.addUserToGame(gameForm.gameId, gameForm.username);
		})
		.then(function(addUserPromise) {
			$state.go('game.waitingRoom', { gameId: gameForm.gameId });
		})
		.catch(function(error) {
			$scope.error = error;
		});

    };

});
