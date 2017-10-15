

var key = "AIzaSyD7M2bnCmImthSaTjJEwOqo8PqsSkTK4GQ";
var playlistId = "UULk_WVpcnHJMVAR2Fzg9FkA";

const YOUTUBE_URL = 'https://www.youtube.com/embed/';


myApp.factory('youtubeService', function ($http) {
    return {
        getPlaylistVideos: function(playListId) {
        return  $http.get('https://www.googleapis.com/youtube/v3/playlistItems', {params :{ part: 'snippet', maxResults: 10, playlistId: playlistId, key: key }});       
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
                    let url = YOUTUBE_URL+itemsList[index].snippet.resourceId.videoId;
                    let videoItem = {
                        "title" : title,
                        "url" : url
                    };
                    $scope.videoSources.push(videoItem);
            }
        }

        function onError(error){

                  $log.error('failure loading playlist', error);
        }
        
}]);




