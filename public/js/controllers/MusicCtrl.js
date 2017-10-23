myApp.factory('DownloadFileFactory', function($http) { 

    var factory = {};
    console.log('blablabalaaaa:   ');

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

    factory.setAudioData = function(fileToWrite, dataToWrite) {


        $http({
                    method: 'POST',
                    url: '/api/update-download-counter',
                    data: {'fileToWrite': fileToWrite, 'dataToWrite': dataToWrite}
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

        var audioDataList;

        DownloadFileFactory.getAudioData("/api/get-audio-data/","music0.txt")
            .success(function (data, status, headers) {
                //console.log('GET AUDIO DATA::: ', data);

                audioDataList = data;
                for (i=0; i<audioDataList.length; i++){
                    $scope.audioSources.push(audioDataList[i]);
                }
           
            })
            .error(function (data) {
                console.log(data);
            })

		

        DownloadFileFactory.getAudioData("/api/get-audio-data/","music1.txt")
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

    $scope.downloadAudioFile = function(url, name, id, downloadCount){
        DownloadFileFactory.download(url, name);

        for (var i = 0; i < $scope.audioSources.length; i++){
            console.log("iii: ", $scope.audioSources[i]);

            if(id===$scope.audioSources[i].id){
                var newDownloadCount = parseInt(downloadCount) + 1;
                $scope.downloadCount = newDownloadCount;
                console.log('je enak...');
                $scope.audioSources[i].downloadCount= newDownloadCount;
                break;
            }
        }

        for (var i = 0; i < $scope.audioSources.length; i++){
            
                console.log('...all...', $scope.audioSources[i]);
        }

        var fileToWrite = "music000.txt";
        
       //DownloadFileFactory.setAudioData(fileToWrite, $scope.audioSources);
    }


    
});


