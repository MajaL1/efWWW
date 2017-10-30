

var key = "AIzaSyD7M2bnCmImthSaTjJEwOqo8PqsSkTK4GQ";
//var playlistId = "gftNFEGZAR4";
//var playlistId = "UULk_WVpcnHJMVAR2Fzg9FkA";
var playlistId = "PL_nl4EVD9m76KvUEJPNefNGunGimFA0yH";

const YOUTUBE_URL = 'https://www.youtube.com/embed/';

// GET GET https://www.googleapis.com/youtube/v3/videos


myApp.factory('youtubeService', function ($http) {
    return {
        getPlaylistVideos: function(playListId) {
        return  $http.get('https://www.googleapis.com/youtube/v3/playlistItems', {params :{ part: 'snippet,contentDetails,statistics', maxResults: 20, playlistId: playlistId}});       
    }
}                
});


myApp.controller('VideoCtrl', ['$http', '$scope', 'youtubeService', function ($http, $scope, youtubeService) {

        $scope.playlistVideos = [];
        $scope.videoSources = [];

        console.log('Start VideoCtrl');

        var promise = youtubeService.getPlaylistVideos(playlistId);

        promise.then(onSuccess, onError);


        function onSuccess(event){

            // QH3CgebBKrE
            // https://www.youtube.com/watch?v=QH3CgebBKrE

            let itemsList = event.data.items;

                for(index in itemsList){
                    let title = itemsList[index].snippet.title;
                    console.log('//////////////////////', itemsList[index]);
                    /*let url = YOUTUBE_URL+itemsList[index].snippet.resourceId.videoId;
                    let videoItem = {
                        "title" : title,
                        "url" : url
                    };
                    $scope.videoSources.push(videoItem); */
            }
        }

        function onError(error){

                  $log.error('failure loading playlist', error);
        }
        
}]);




