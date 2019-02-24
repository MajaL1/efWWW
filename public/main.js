var myApp = angular.module("myApp", ['ngRoute']);


myApp.config(function ($routeProvider, $locationProvider, $sceDelegateProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
       .when("/", {
            url: "/about_me",
            templateUrl: "/views/about_me.html",
        })
       .when("/about_me", {
            url: "/about_me",
            templateUrl: "/views/about_me.html"
        })
       .when("/concerts", {
            url: "/concerts",
            templateUrl: "/views/concerts.html"
        })
       .when("/other", {
            url: "/other",
            templateUrl: "/views/other.html"
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

       $sceDelegateProvider.resourceUrlWhitelist(['**']);
       $locationProvider.html5Mode({
                 enabled: true,
                 requireBase: false
          }); 
});