'use strict';
app.config(function($stateProvider) {

    $stateProvider.state('game', {
        url: '/game/:gameId',
        templateUrl: 'js/game/game.html',
        controller: 'GameCtrl'
    });

});

app.controller('GameCtrl', function($scope, $stateParams, GameSetup) {

	GameSetup.current.gameId = $stateParams.gameId;

	GameSetup.current.game.$bindTo($scope, 'currentGame');
	GameSetup.current.cards.$bindTo($scope, 'currentCards');
	GameSetup.current.users.$bindTo($scope, 'currentUsers');
	GameSetup.current.user.$bindTo($scope, 'currentUser');
	GameSetup.current.chat.$bindTo($scope, 'currentChat');

});
