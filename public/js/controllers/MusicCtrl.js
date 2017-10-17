myApp.controller('MusicCtrl', function ($scope, $state, $stateParams) {
    console.log('Music controller');

    $scope.audioSources = [];
    $scope.audioSingleList = [];

    $scope.loadAudios = function() {

    	var audioDataList = [ {"title": "Upanje", "url": "assets/music/Skarabeji - Upanje.mp3"},
    						  {"title": "Vrtimo se", "url": "assets/music/Skarabeji - Vrtimo se.mp3"},
    						  {"title": "Lep sončen dan (LSD)", "url": "assets/music/Skarabeji - Lep sončen dan.mp3"},
    						  {"title": "Odšla sta v noč", "url": "assets/music/Skarabeji - Odsla sta v noc.mp3"},
                              {"title": "To ni navaden dan", "url": "assets/music/Skarabeji - To ni navaden dan.mp3"},
                              {"title": "Zapornik", "url": "assets/music/Skarabeji - Zapornik.mp3"},
                              {"title": "Rock", "url": "assets/music/Skarabeji - Rock.mp3"},
                              {"title": "Drugo dejanje", "url": "assets/music/Skarabeji - Drugo dejanje.mp3"},
                              {"title": "Sam", "url": "assets/music/Skarabeji - Sam.mp3"},
                              {"title": "Solza", "url": "assets/music/Skarabeji - Solza.mp3"},
                              {"title": "Gibaj sm pa ke", "url": "assets/music/Skarabeji - Gibaj sm pa ke.mp3"}
    	 ];

		for (i=0; i<audioDataList.length; i++){
	    	$scope.audioSources.push(audioDataList[i]);
		}

        var audioSingleSourcesList = [ {"title": "Želja", "url": "assets/music/Zelja.mp3"},
                              {"title": "Kaplja", "url": "assets/music/Kaplja.mp3"}
         ];

        for (i=0; i<audioSingleSourcesList.length; i++){
            $scope.audioSingleList.push(audioSingleSourcesList[i]);
        }
	  

	    console.log('------ audiosingleSources: ', $scope.audioSingleList);
	}();
	 
$scope.download = function(document) {
    DownloadFileFactory.download(document).$promise.then(function(data) {
      var url = URL.createObjectURL(new Blob([data]));
      var a = document.createElement('a');
      a.href = url;
      a.download = 'document_name';
      a.target = '_blank';
      a.click();
    })
    .catch(function(error) {
      // catching error here
    })
  }

app.factory('DownloadFileFactory', function($scope, $resource) {  
  $resource('document/:id", { id: "@id" }, {
    download: {
      method: 'GET',
      responseType: 'arraybuffer'
    }
  })
})

});
