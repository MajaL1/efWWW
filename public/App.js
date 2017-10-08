var myApp = angular.module("myApp", ['ui.router']);

myApp.config(function ($stateProvider, $urlRouterProvider, $sceDelegateProvider) {

    $urlRouterProvider.when("", "/home");

    $stateProvider
        .state("home", {
            url: "/home",
            templateUrl: "/views/home.html",
            controller: "HomeCtrl"
        })
       .state("about_me", {
            url: "/about_me",
            templateUrl: "/views/about_me.html",
            controller: "AboutMeCtrl"
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
       .state("concerts", {
            url: "/concerts",
            templateUrl: "/views/concerts.html",
            controller: "ConcertsCtrl"
        })
       .state("gallery", {
           url: "/gallery",
           templateUrl: "/views/gallery.html",
           controller: "GalleryCtrl"
       })
       .state("sejkspir", {
           url: "/sejkspir",
           templateUrl: "/views/sejkspir.html",
           controller: "SejkspirCtrl"
       })
       ;

       $sceDelegateProvider.resourceUrlWhitelist(['**']);
});