myApp.factory('DownloadFileFactory', function($http) { 

    var factory = {};
    
    factory.download = function(url, name, id) {

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

    factory.getAudioData = function(url, fileName) {

        return $http({
            method: 'GET',
            url: url+""+fileName 
            });
        }    
        console.log('-- factory: ', factory);
       return factory;
    });


myApp.controller('MusicCtrl', function (DownloadFileFactory ,$scope, $http) {

    $scope.audioSkarabejiList = [];
    $scope.audioSingleList = [];


    $scope.loadAudios = function() {

        var audioDataList;

        DownloadFileFactory.getAudioData("/api/get-audio-data/","skarabeji.json")
           .then(function successCallback(response) {
             audioDataList = response.data;
                for (i=0; i<audioDataList.length; i++){
                    $scope.audioSkarabejiList.push(audioDataList[i]);
                }
          }, function errorCallback(response) {
            console.log(response);
          });


		

        DownloadFileFactory.getAudioData("/api/get-audio-data/","singli.json")

            .then(function successCallback(response) {
             audioSingleSourcesList = response.data;
                for (i=0; i<audioSingleSourcesList.length; i++){
                    $scope.audioSingleList.push(audioSingleSourcesList[i]);
                }
          }, function errorCallback(response) {
            console.log(response);
          });
    }

    $scope.loadAudios();

    $scope.downloadAudioFile = function(url, name, id, downloadCount, fileToWrite){
        DownloadFileFactory.download(url, name);
    }    
});


