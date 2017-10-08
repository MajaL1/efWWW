myApp.controller('VideoCtrl', function ($scope, $state, $stateParams) {
    console.log('Video controller');

    /*** TODO: pridobi listo video-v iz youtube kanala ***/

    $scope.videoSources = [];

    $scope.loadVideos = function() {

    	var videoDataList = [ {"title": "Novi videospot Izlet", "url": "https://www.youtube.com/embed/ciXcjzHimjs"},
    						  {"title": "Snemanje za nov komad 'Sposti se'", "url": "https://www.youtube.com/embed/pcEHZIQJTZk"},
    						  {"title": "Utrinki iz koncerta v Vopa baru Kranjska gora", "url": "https://www.youtube.com/embed/iCFaep-7GW8"},
    						  {"title": "Nov videospot", "url": "https://www.youtube.com/embed/KDMuK_9KtaE"}
    	 ];
		for (i=0; i<videoDataList.length; i++){
	    	$scope.videoSources.push(videoDataList[i]);
		}
	  

	    console.log('videosources: ', $scope.videoSources);
	}();


	$scope.changeUrlString = function(){

		for (videoUrlSrc in $scope.videoSources){
			console.log('lllllllllllllllllllllllllllll: ', videoUrlSrc.url);

		}

	}();
}
);

