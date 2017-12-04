var myApp = angular.module("myApp", ['ui.router']);

myApp.config(function ($stateProvider, $urlRouterProvider, $sceDelegateProvider) {

    $urlRouterProvider.when("", "/about_me");

    $stateProvider
       .state("about_me", {
            url: "/about_me",
            templateUrl: "/views/about_me.html",
            controller: "AboutMeCtrl"
        })
       .state("concerts", {
            url: "/concerts",
            templateUrl: "/views/concerts.html",
            controller: "ConcertsCtrl"
        })
       .state("other", {
            url: "/other",
            templateUrl: "/views/other.html",
            controller: "OtherCtrl"
        })
       .state("music", {
            url: "/music",
            templateUrl: "/views/music.html",
            controller: "MusicCtrl"
        })
       .state("video", {
            url: "/video",
            templateUrl: "/views/video.html",
            controller: "VideoCtrl"
        })
       .state("sejkspir", {
           url: "/sejkspir",
           templateUrl: "/views/sejkspir.html",
           controller: "SejkspirCtrl"
       })
       ;

       $sceDelegateProvider.resourceUrlWhitelist(['**']);
});