myApp.factory('DownloadFileFactory', ['$http', function ($http) {

    var factory = {};

    factory.download = function (url, name, id) {

        $http({
                method: 'GET',
                url: url,
                params: {
                    url: url,
                    name: name
                },
                responseType: 'arraybuffer'
            })
            .success(function (data, status, headers) {

                headers = headers();
                var filename = headers['x-filename'];
                var contentType = headers['content-type'];
                var linkElement = document.createElement('a');
                try {

                    var blob = new Blob([data], {
                        type: contentType
                    });
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
    }]);


myApp.controller('MusicCtrl', ['DownloadFileFactory', '$scope', '$http', function (DownloadFileFactory, $scope, $http) {

    $scope.audioSkarabejiList = [];
    $scope.audioSingleList = [];


    $scope.loadAudios = function () {

        var audioDataList;
        $scope.audioSkarabejiList.push({
            "title": "Upanje",
            "url": "assets/music/Skarabeji - Upanje.mp3"
        });
        $scope.audioSkarabejiList.push({
            "title": "Vrtimo se",
            "url": "assets/music/Skarabeji - Vrtimo se.mp3"
        });
        $scope.audioSkarabejiList.push({
            "title": "Odsla sta v noc",
            "url": "assets/music/Skarabeji - Odsla sta v noc.mp3"
        });
        $scope.audioSkarabejiList.push({
            "title": "Navaden dan",
            "url": "assets/music/Skarabeji - Navaden dan.mp3"
        });
        $scope.audioSkarabejiList.push({
            "title": "Rock",
            "url": "assets/music/Skarabeji - Rock.mp3"
        });
        $scope.audioSkarabejiList.push({
            "title": "Drugo dejanje",
            "url": "assets/music/Skarabeji - Drugo dejanje.mp3"
        });
        $scope.audioSkarabejiList.push({
            "title": "Sam",
            "url": "assets/music/Skarabeji - Sam.mp3"
        });
        $scope.audioSkarabejiList.push({
            "title": "Gibaj sm pa ke",
            "url": "assets/music/Skarabeji - Gibaj sm pa ke.mp3"
        });



        var audioSingleSources = [{
            "title": "Zgornjesavska dolina",
            "url": "assets/music/Zgornjesavska dolina.mp3",
            "id": "8",
            "categoryId": "8"
        }, {
            "title": "Mesto jekla in narcis",
            "url": "assets/music/Mesto jekla in narcis.mp3",
            "id": "8",
            "categoryId": "8"
        }, {
            "title": "Želja",
            "url": "assets/music/Zelja.mp3",
            "id": "18",
            "categoryId": "8"
        }, {
            "title": "Kaplja",
            "url": "assets/music/Kaplja.mp3",
            "id": "9",
            "categoryId": "2"
        }, {
            "title": "Mi smo tabol",
            "url": "assets/music/Mi smo tabol.mp3",
            "id": "10",
            "categoryId": "2"
        }, {
            "title": "Valentinovo",
            "url": "assets/music/Valentinovo.mp3",
            "id": "11",
            "categoryId": "2"
        }];

        for (i = 0; i < audioSingleSources.length; i++) {
            $scope.audioSingleList.push(audioSingleSources[i]);
        }
    }

    $scope.loadAudios();

    $scope.downloadAudioFile = function (url, name, id, downloadCount, fileToWrite) {
        DownloadFileFactory.download(url, name);
    }
}]);
