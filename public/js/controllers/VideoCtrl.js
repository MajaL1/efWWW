
var key = "AIzaSyD7M2bnCmImthSaTjJEwOqo8PqsSkTK4GQ";

var playlistId = "PL_nl4EVD9m76KvUEJPNefNGunGimFA0yH";

const YOUTUBE_URL = 'https://www.youtube.com/embed/';


myApp.factory('youtubeService', function ($http) {
    return {
        getPlaylistVideos: function(playListId) {
        return  $http.get('https://www.googleapis.com/youtube/v3/playlistItems', {params :{ part: 'snippet, contentDetails', maxResults: 20, playlistId: playlistId, key: key}});       
    }
}                
});


myApp.controller('VideoCtrl', ['$http', '$scope', 'youtubeService', function ($http, $scope, youtubeService) {

        
        /***************************************  videos za Skarabeji  ***************************************/
        $scope.playlistVideos = [];
        $scope.videoSources = [];

        console.log('Start VideoCtrl');

        var promise = youtubeService.getPlaylistVideos(playlistId);

        promise.then(onSuccess, onError);

        function onSuccess(event){
            let itemsList = event.data.items;

                for(index in itemsList){
                    let title = itemsList[index].snippet.title;
                    let url = YOUTUBE_URL+itemsList[index].snippet.resourceId.videoId;
                    let videoItem = {
                        "title" : title,
                        "url" : url
                    };
                    $scope.videoSources.push(videoItem);
            }
        }

        function onError(error){
                  console.log('failure loading playlist', error);
        }
        
}]);




