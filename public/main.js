var myApp = angular.module("myApp", ['ngRoute']);

angular.module("myApp.templates", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("public/views/about_me", "<div>test1</div>");
    $templateCache.put("public/views/concerts", "<div>test3</div>");
    $templateCache.put("public/views/music", "<div>test4</div>");
    $templateCache.put("public/views/video", "<div>test5</div>");
    $templateCache.put("public/views/other", "<div>test6</div>");
}]);

myApp.controller("MusicCtrl");
myApp.controller("VideoCtrl");


myApp.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider', function ($routeProvider, $locationProvider, $sceDelegateProvider) {

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
    $routeProvider.otherwise({
        redirectTo: '/'
    });

    $sceDelegateProvider.resourceUrlWhitelist(['**']);
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);
