myApp.controller('VideoCtrl', function ($scope, $state, $stateParams) {
    console.log('Video controller');

    const YOUTUBE_URL = 'https://www.youtube.com/embed/';
    /*** TODO: pridobi listo video-v iz youtube kanala ***/

    $scope.videoSources = [];

    $scope.loadVideos = function() {

    	/*var videoDataList = [ {"title": "Novi videospot Izlet", "url": "https://www.youtube.com/embed/ciXcjzHimjs"},
    						  {"title": "Snemanje za nov komad 'Sposti se'", "url": "https://www.youtube.com/embed/pcEHZIQJTZk"},
    						  {"title": "Utrinki iz koncerta v Vopa baru Kranjska gora", "url": "https://www.youtube.com/embed/iCFaep-7GW8"},
    						  {"title": "Nov videospot", "url": "https://www.youtube.com/embed/KDMuK_9KtaE"}
    	 ];
		for (i=0; i<videoDataList.length; i++){
	    	$scope.videoSources.push(videoDataList[i]);
		}
	    console.log('videosources: ', $scope.videoSources); */

	   
		    var apiKey = 'AIzaSyD7M2bnCmImthSaTjJEwOqo8PqsSkTK4GQ';

		    gapi.client.setApiKey(apiKey);
		    gapi.client.load('youtube', 'v3', function() {

	        request = gapi.client.youtube.search.list({
	            part: 'snippet',
	            channelId: 'UCLk_WVpcnHJMVAR2Fzg9FkA',
	            order: 'date',
	            type: 'video'

        });

        request.execute(function(response) {
                console.log('response: ', response);
                let itemsList = response.items;

                for(index in itemsList){
                	let title = itemsList[index].snippet.title;
                	let url = YOUTUBE_URL+itemsList[index].id.videoId;
                	let videoItem = {
                		"title" : title,
                		"url" : url
                	};
                	console.log('videoItem, ', videoItem);
                	$scope.videoSources.push(videoItem);
                }

                /** here we call the response.items */

        });
    });

	}();
}
);

