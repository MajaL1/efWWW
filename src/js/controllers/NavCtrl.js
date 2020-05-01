myApp.controller('NavCtrl', ['$scope', function ($scope) {
    console.log('NavCtrl--');

    $scope.changeClass = function () {
        if ($scope.class == "toggle")
            $scope.class = "";
        else {
            $scope.class == "toggle"
        }
    };
}]);
