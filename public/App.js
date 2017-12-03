var myApp = angular.module("myApp", ['ui.router']);

myApp.config(function ($stateProvider, $urlRouterProvider, $sceDelegateProvider) {

    $urlRouterProvider.when("", "/about_me");

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
       .state("aktualno", {
            url: "/aktualno",
            templateUrl: "/views/aktualno.html",
            controller: "AktualnoCtrl"
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