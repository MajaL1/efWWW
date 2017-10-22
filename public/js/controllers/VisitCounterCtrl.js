myApp.controller('VisitCounterCtrl', function ($scope, $state, $stateParams, $http) {
    console.log('2222 VisitCounter controller');

    var incrementPageCount = function(){

        $http.get('/api/visit-counter')
            .success(function(data) {
                console.log(data);
               
    		    var numVisits;
    		    if(data!=null){
    		    	numVisits = parseInt(data) + 1;
    		    } else {
    		    	numVisits = 1015;
    		    }
                $scope.counter = numVisits;

                console.log("llllllllllllllllllll", $scope.counter);

                $http({
                    method: 'POST',
                    url: '/api/update-counter',
                    data: {'count': $scope.counter}
                })
                .then(function(response) {
                    console.log("ABC", response);
                }); 
    		    console.log('new number of visits... ', numVisits);
    		     
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });	
    }
    incrementPageCount();

});