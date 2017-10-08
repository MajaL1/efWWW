myApp.controller('MusicCtrl', function ($scope, $state, $stateParams) {
    console.log('Music controller');

    $scope.audioSources = [];

    $scope.loadAudios = function() {

    	var audioDataList = [ {"title": "Izlet", "url": "assets/music/test4.mp3"},
    						  {"title": "Sposti se", "url": "assets/music/test4.mp3"},
    						  {"title": "Kaplja", "url": "assets/music/test4.mp3"},
    						  {"title": "Mesto jekla in narcis", "url": "assets/music/test4.mp3"}
    	 ];

		for (i=0; i<audioDataList.length; i++){
	    	$scope.audioSources.push(audioDataList[i]);
		}
	  

	    console.log('------ audioSources: ', $scope.audioSources);
	}();

});