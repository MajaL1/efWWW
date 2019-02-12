var myApp = angular.module("myApp", ['ngRoute']);


myApp.config(function ($routeProvider, $locationProvider, $sceDelegateProvider) {

    //$urlRouterProvider.when("", "/about_me");

    //  $urlRouterProvider
    // .otherwise('/about_me'); 


    $locationProvider.html5Mode(true);

    $routeProvider
       .when("/about_me", {
            url: "/about_me",
            templateUrl: "/views/about_me.html",
            controller: "AboutMeCtrl"
        })
       .when("/concerts", {
            url: "/concerts",
            templateUrl: "/views/concerts.html",
            controller: "ConcertsCtrl"
        })
       .when("/other", {
            url: "/other",
            templateUrl: "/views/other.html",
            controller: "OtherCtrl"
        })
       .when("/music", {
            url: "/music",
            templateUrl: "/views/music.html",
            controller: "MusicCtrl"
        })
       .when("/video", {
            url: "/video",
            templateUrl: "/views/video.html",
            controller: "VideoCtrl"
        });
       $routeProvider.otherwise({redirectTo: '/'});
       /*.state("sejkspir", {
           url: "/sejkspir",
           templateUrl: "/views/sejkspir.html",
           controller: "SejkspirCtrl"
       }) */
     

       $sceDelegateProvider.resourceUrlWhitelist(['**']);
       $locationProvider.html5Mode({
                 enabled: true,
                 requireBase: false
          }); 
});