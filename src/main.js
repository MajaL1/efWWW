var myApp = angular.module("myApp", ['ngRoute']);

angular.module("myApp.templates", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("public/views/domov", "<div>test1</div>");
    $templateCache.put("public/views/koncerti", "<div>test3</div>");
    $templateCache.put("public/views/glasba", "<div>test4</div>");
    $templateCache.put("public/views/video", "<div>test5</div>");
}]);
myApp.controller("NavCtrl");

myApp.controller("MusicCtrl");
myApp.controller("VideoCtrl");
myApp.controller("HomeCtrl");

myApp.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider', function ($routeProvider, $locationProvider, $sceDelegateProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
        .when("/", {
            url: "/domov",
            templateUrl: "/views/domov.html",
        })
        .when("/domov", {
            url: "/domov",
            templateUrl: "/views/domov.html",
            controller: "HomeCtrl"
        })
        .when("/koncerti", {
            url: "/koncerti",
            templateUrl: "/views/koncerti.html"
        })
        .when("/glasba", {
            url: "/glasba",
            templateUrl: "/views/glasba.html",
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
