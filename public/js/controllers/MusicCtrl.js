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
       return factory;
    });


myApp.controller('MusicCtrl', function (DownloadFileFactory ,$scope, $state, $stateParams, $http) {

    $scope.audioSkarabejiList = [];
    $scope.audioSingleList = [];


    $scope.loadAudios = function() {

        var audioDataList;

        DownloadFileFactory.getAudioData("/api/get-audio-data/","skarabeji.json")
            .success(function (data, status, headers) {
                audioDataList = data;
                for (i=0; i<audioDataList.length; i++){
                    $scope.audioSkarabejiList.push(audioDataList[i]);
                }
           
            })
            .error(function (data) {
                console.log(data);
            })

		

        DownloadFileFactory.getAudioData("/api/get-audio-data/","singli.json")
            .success(function (data, status, headers) {

                audioSingleSourcesList = data;
                for (i=0; i<audioSingleSourcesList.length; i++){
                    $scope.audioSingleList.push(audioSingleSourcesList[i]);
                }
            })
            .error(function (data) {
                console.log(data);
            })
    }

    $scope.loadAudios();

    $scope.downloadAudioFile = function(url, name, id, downloadCount, fileToWrite){
        DownloadFileFactory.download(url, name);
    }    
});


