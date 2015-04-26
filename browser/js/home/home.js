app.config(function($stateProvider) {

    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl'
    });

});

app.controller('HomeCtrl', function($scope, $state, $q, $firebaseObject, GameSetup) {

    $scope.formType = 'create';

    $scope.gameForm = {
        gameId: GameSetup.gameIdGenerator(),
        username: null
    };

    $scope.setFormType = function(type) {

        $scope.formType = type;

        $scope.error = null;

        if (type === 'create') $scope.gameForm.gameId = GameSetup.gameIdGenerator();
        else $scope.gameForm.gameId = null;

    };

    $scope.enterWaitingRoom = function(gameForm) {

		GameSetup.prepareGame(gameForm, $scope.formType)
		.then(function() {
			$state.go('game.waitingRoom', { gameId: gameForm.gameId });
		})
		.catch(function(error) {
			$scope.error = error;
		});

    };

});
