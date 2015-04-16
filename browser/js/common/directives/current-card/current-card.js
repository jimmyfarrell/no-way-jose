'use strict';
app.directive('currentCard', function(GameSetup, GamePlay, $firebaseArray) {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/current-card/current-card.html',
		link: function(scope, element, attrs) {

			GamePlay.setCurrentCard(scope.currentCards);

		}
	};
});
