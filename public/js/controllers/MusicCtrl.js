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
   DownloadFileFactory.download(document).$promise.then(function(result) {
      var url = URL.createObjectURL(new Blob([result.data]));
      var a = document.createElement('a');
      a.href = url;
      a.download = result.filename;
      a.target = '_blank';
      a.click();
    })
    .catch(resourceError)
    .catch(function(error) {
      console.log(error.data); // in JSON
    });
  }
  }

app.factory('DownloadFileFactory', function($scope, $resource) {  
 $resource('document/:Id", { Id: "@Id" }, {
    download: {
      method: 'GET',
      responseType: 'arraybuffer',
      transformResponse: function(data, headers) {
        return {
          data: data,
          filename: parseHeaderFilename(headers)
        }
      }
    }
  });
});

app.service('getHeaderFilename', function() {  
  return function(headers) {
    var header = headers('content-disposition');
    var result = header.split(';')[1].trim().split('=')[1];
    return result.replace(/"/g, '');
  }
});

app.service('resourceError', function($q) {  
  var arrayBufferToString = function(buff) {
    var charCodeArray = Array.apply(null, new Uint8Array(buff));
    var result = '';
    for (i = 0, len = charCodeArray.length; i < len; i++) {
        code = charCodeArray[i];
       result += String.fromCharCode(code);
    }
    return result;
  }

  return function(error) {
    error.data = angular.fromJson(arrayBufferToString(error.data.data));
    return $q.reject(error);
  }
});

});
