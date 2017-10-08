myApp.controller('WorkCtrl', function ($scope, $state, $stateParams) {
	console.log('Work controller');
	$scope.data = 'ççççççççççç mora biti WORK view';

	$scope.iconPictureList = ["http://localhost:3000/img/logo_0.png",
							  "http://localhost:3000/img/logo_1.png",
							  "http://localhost:3000/img/logo_2.png",
							  "http://localhost:3000/img/logo_3.png",
							  "http://localhost:3000/img/logo_4.png",
							  "http://localhost:3000/img/logo_5.png",
							  "http://localhost:3000/img/logo_6.png",
							  "http://localhost:3000/img/logo_7.png",
							  "http://localhost:3000/img/logo_8.png",
							  "http://localhost:3000/img/logo_9.png"];

	/*$('img.image-list').hover(
	  $scope.onImageHoverOn,
	  $scope.onImageHoverOff
	  );
*/
	$scope.makeLargeIcon = function(icon){

		let firstIndex = icon.indexOf("/img") + 5;
		let lastIndex = icon.lastIndexOf(".png");
		let iconClassName = icon.substring(firstIndex, lastIndex);

		document.getElementsByClassName(iconClassName).width= "300";
		document.getElementsByClassName(iconClassName).height= "300";
		/*$('.'+iconClassName).width(100);
		$('.'+iconClassName).height(100);
		$('.'+iconClassName).fadeOut( 100 );*/
	    console.log('1111111 on hover');
	}

	$scope.makeSmallIcon = function(icon){
		let firstIndex = icon.indexOf("/img") + 5;
		let lastIndex = icon.lastIndexOf(".png");
		let iconClassName = icon.substring(firstIndex, lastIndex);

		$('.'+iconClassName).width(50);
		$('.'+iconClassName).height(50);
		$('.'+iconClassName).fadeOut( 100 );
	    console.log('1111111 on hover');
	}
});