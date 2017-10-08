myApp.controller('HomeCtrl', function ($scope, $state, $stateParams, $interval) {
    console.log('Home Controller');
    $scope.data = '======Tukaj mora biti Home view';


    var backgroundPicture = $('.front-image');
    var counter = 1;
    $scope.backgroundsList = ['http://localhost:3000/front/mountains-front-1.jpg', 'http://localhost:3000/front/mountains-front-2.jpg', 'http://localhost:3000/front/mountains-front-3.jpg', 'http://localhost:3000/front/mountains-front-4.jpg', 'http://localhost:3000/front/mountains-front-5.jpg'];
    	

    var backgroundPictureInterval = $interval(function(){


        backgroundPicture.fadeOut(2000, function(){
                
                if (counter == $scope.backgroundsList.length){
                    counter = 0;
                }

                console.log('reading url: ', 'url('+$scope.backgroundsList[counter]+')', ', counter: ', counter);   
                
                backgroundPicture.css('background-image', 'url('+$scope.backgroundsList[counter]+')');
                backgroundPicture.fadeIn(2000);
                counter++;
            
            });
        }, 5000);

    //register this listener inside your controller where interval belongs.
    $scope.$on('$destroy', function(){
        $interval.cancel(backgroundPictureInterval);
    });

});