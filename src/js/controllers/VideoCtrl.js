var key = "AIzaSyD7M2bnCmImthSaTjJEwOqo8PqsSkTK4GQ";

var channelId = "UCLk_WVpcnHJMVAR2Fzg9FkA";

var YOUTUBE_URL = 'https://www.youtube.com/embed/';


myApp.factory('youtubeService', function ($http) {
    return {
        /***** returns playlist items for album SKARABEJI,...  currently unused *****/
        getPlaylistVideos: function (playListId) {
            return $http.get('https://www.googleapis.com/youtube/v3/playlistItems', {
                params: {
                    part: 'snippet, contentDetails',
                    maxResults: 20,
                    playlistId: playlistId,
                    key: key
                }
            });
        },
        /****** returns playlists: SINGLI, SKARABEJI and SEJKSPIR BAND *********/
        getPlaylists: function (channelId) {
            return $http.get('https://www.googleapis.com/youtube/v3/playlists', {
                params: {
                    part: 'snippet, contentDetails',
                    maxResults: 20,
                    channelId: channelId,
                    key: key
                }
            });
        }
    }
});

(function (app) {
    myApp.controller('VideoCtrl', ['$http', '$scope', 'youtubeService', function ($http, $scope, youtubeService) {

        /***************************************  videos za Skarabeji  ***************************************/
        /* $scope.playlistVideos = [];
         $scope.videoSourcesSkarabeji = [];

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
                     $scope.videoSourcesSkarabeji.push(videoItem);
             }
         }

         function onError(error){
                   console.log('failure loading playlist', error);
         } */


        /****************************** end videos za skarabeji **********************************/



        /*****************************************  start get playlists  ********************************/

        $scope.playlistVideos = [];
        $scope.playlistSources = [];


        var promise = youtubeService.getPlaylists(channelId);

        promise.then(onSuccess, onError);

        function onSuccess(event) {
            var itemsList = event.data.items;
            for (index in itemsList) {

                /****  do not show favorites channel****/

                var title = itemsList[index].snippet.title;
                if (title !== 'Favorites') {
                    var playListId = (itemsList[index]).id;
                    var url = YOUTUBE_URL + "watch?list=" + playListId;
                    var videoItem = {
                        "title": title,
                        "url": url
                    };
                    $scope.playlistSources.push(videoItem);
                }
            }
        }

        function onError(error) {
            console.log('ERROR:: problem loading playlist', error);
        }

}]);
})(myApp);
