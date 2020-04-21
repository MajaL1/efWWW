myApp.controller('HomeCtrl', [function () {
    console.log('HomeCtrl--');

    angular.element(document).ready(function () {
        console.log('HomeCtrl1--');

        // highlight the scroll item

        var height1 = $('.about-div-1').height();
        var height3 = $('.about-div-3').height();
        console.log(height1);
        console.log(height3);
        var position1 = $('.about-div-1').position().top;
        console.log(" a top: " + position1);

        var position3 = $('.about-div-3').position().top;
        console.log(" c top: " + position3);
        $(window).on('scroll', function () {

            $('.about-div-1, .about-div-3, .about-div-4').removeClass('active');

            $('.about-description, .about-div-border-2, .about-div-border-3').removeClass('border-left');

            var st = $(document).scrollTop();

            if (st < position1 + height1) {
                console.log(":::: st::: : " + st);
                console.log(" position1: " + position1);
                console.log(" positio3: " + position3);

                console.log("position1, position3", position1 + position3);

                $('.about-div-1').addClass('active');
                $('.about-description').addClass('border-left');

            }
            if (st > position1 + height1) {
                /*   $(".about-2").addClass("border")
        */
                console.log("2 scrollTop: ", st)
                $('.about-div-3').addClass('active');
                $('.about-div-1').removeClass('active');
                $('.about-div-border-2').addClass('border-left');

            }
        })


    });
}]);