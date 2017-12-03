myApp.controller('SejkspirCtrl', function ($scope, $state, $stateParams) {
	var mainBodyDiv = angular.element( document.querySelector( '.main-body-div' ) );
	mainBodyDiv.css('background-color','#FFF7C8');
	mainBodyDiv.css('width','100%');

	var sejkspirDiv = angular.element( document.querySelector( '.sejkspir-div' ) );
	sejkspirDiv.css('margin-top', '0px');
	sejkspirDiv.css('width', '100%');

});
