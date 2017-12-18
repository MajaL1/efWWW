myApp.controller('VisitCounterCtrl', function ($scope, $state, $stateParams, $http) {
    console.log('VisitCounter controller');

    var incrementPageCount = function(){

        $http.get('/api/visit-counter')
            .success(function(data) {
                console.log(data);
               
    		    var numVisits;
    		    if(data!=null){
                   
                    if (!isNaN(parseFloat(data)) && isFinite(data)){
                        numVisits = parseInt(data) + 1;
                    }
                }else {
                    
                    // todo: skrij cel div za stevec
                     $(".page-counter").css( "visibility", "hidden");
    		    	numVisits = 1015;
    		    }
                $scope.counter = numVisits;

                $http({
                    method: 'POST',
                    url: '/api/update-counter',
                    data: {'count': $scope.counter}
                })
                .then(function(response) {
                    
                });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });	
    }
    incrementPageCount();
});
