myApp.controller('SpinnerCtrl', ['$scope', function ($scope) {
    console.log('SpinnerCtrl--');
    $scope.showSpinner = true;
    angular.element(document).ready(function () {
        console.log('SpinnerCtrl1--');
        $(scope).showSpinner = true;

    })

}]);
