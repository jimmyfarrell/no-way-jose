'use strict';
app.directive('sidebar', function(Sidebar) {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/sidebar/sidebar.html',
		link: function(scope, element, attrs) {
		}
	};
});
