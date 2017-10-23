myApp.factory('DownloadFileFactory', function($http) { 

    var factory = {};
    console.log('blablabalaaaa:   ');
    factory.download = function(url, name) {

        $http({
            method: 'GET',
            url: url,
            params: { url: url, name: name },
            responseType: 'arraybuffer'
        })
        .success(function (data, status, headers) {

            headers = headers();
            var filename = headers['x-filename'];
            var contentType = headers['content-type'];
            var linkElement = document.createElement('a');
            try {

                var blob = new Blob([data], { type: contentType });
                var url = window.URL.createObjectURL(blob);

                linkElement.setAttribute('href', url);
                linkElement.setAttribute("download", name);

                var clickEvent = new MouseEvent("click", {

                    "view": window,
                    "bubbles": true,
                    "cancelable": false
                });
                linkElement.dispatchEvent(clickEvent);

            } catch (ex) {
                console.log(ex);

            }
        })
        .error(function (data) {
            console.log(data);
        });
    }
   return factory;
});



myApp.controller('MusicCtrl', function (DownloadFileFactory ,$scope, $state, $stateParams, $http) {
    console.log('Music controller');

    $scope.audioSources = [];
    $scope.audioSingleList = [];


    $scope.loadAudios = function() {

    	var audioDataList = [ {"title": "Upanje", "url": "assets/music/Skarabeji - Upanje.mp3", id: "1"},
    						  {"title": "Vrtimo se", "url": "assets/music/Skarabeji - Vrtimo se.mp3", id: "2"},
    						  {"title": "Odšla sta v noč", "url": "assets/music/Skarabeji - Odsla sta v noc.mp3", id: "3"},                            {"title": "To ni navaden dan", "url": "assets/music/Skarabeji - To ni navaden dan.mp3"},
                              {"title": "Zapornik", "url": "assets/music/Skarabeji - Zapornik.mp3", id: "3"},
                              {"title": "Rock", "url": "assets/music/Skarabeji - Rock.mp3", id: "4"},
                              {"title": "Drugo dejanje", "url": "assets/music/Skarabeji - Drugo dejanje.mp3", id: "5"},
                              {"title": "Sam", "url": "assets/music/Skarabeji - Sam.mp3", id: "6"},
                              {"title": "Gibaj sm pa ke", "url": "assets/music/Skarabeji - Gibaj sm pa ke.mp3", id: "7"}
    	 ];

		for (i=0; i<audioDataList.length; i++){
	    	$scope.audioSources.push(audioDataList[i]);
		}

        var audioSingleSourcesList = [ {"title": "Želja", "url": "assets/music/Zelja.mp3", id: "8"},
                              {"title": "Kaplja", "url": "assets/music/Kaplja.mp3", id: "9"},
				       {"title": "Mi smo tabol", "url": "assets/music/Mi smo tabol.mp3", id: "10"},
				       {"title": "Valentinovo", "url": "assets/music/Valentinovo.mp3", id: "11"}
         ];

        for (i=0; i<audioSingleSourcesList.length; i++){
            $scope.audioSingleList.push(audioSingleSourcesList[i]);
        }
	  

	    console.log('------ audiosingleSources: ', $scope.audioSingleList);
	}

    $scope.loadAudios();


    $scope.downloadAudioFile = function(url, name){
        DownloadFileFactory.download(url, name);
    }


    
});


