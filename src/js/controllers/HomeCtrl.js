myApp.controller('HomeCtrl', [function () {
    console.log('HomeCtrl--');

    angular.element(document).ready(function () {
        console.log('HomeCtrl1--');

        // highlight the scroll item

        var a = $('.about-div-1').height();
        var b = $('.about-div-2').height();
        var c = $('.about-div-3').height();
        var d = $('.about-div-4').height();
        console.log(a);
        console.log(b);
        console.log(c);
        console.log(d);
        var position1 = $('.about-div-1').position().top;
        console.log(" a top: " + position1);
        var position2 = $('.about-div-2').position().top;
        console.log(" b top: " + position2);
        var position3 = $('.about-div-3').position().top;
        console.log(" c top: " + position3);
        var position4 = $('.about-div-4').position().top;
        console.log(" d top: " + position4);


        $(window).on('scroll', function () {

            $('.about-div-1, .about-div-2, .about-div-3, .about-div-4').removeClass('active');

            $('.about-description, .about-div-border-2, .about-div-border-3').removeClass('border-left');

            var st = $(document).scrollTop();

            if (st < position1 + 50) {


                $('.about-div-1').addClass('active');
                $('.about-description').addClass('border-left');

            }
            if (st > position2 - 50) {
                /*   $(".about-2").addClass("border")
        */
                console.log("2 scrollTop: ", st)
                $('.about-div-2').addClass('active');
                $('.about-div-1').removeClass('active');
                $('.about-div-border-2').addClass('border-left');

            }
            if (st > position3 - 50) {
                /*  $(".about-3").addClass("border")
        */
                console.log("3 scrollTop: ", st)
                $('.about-div-3').addClass('active');
                $('.about-div-2').removeClass('active');
                $('.about-div-border-3').addClass('border-left');

            }
            if (st > position4 - 100) {
                /* $(".about-4").addClass("border")
        */
                console.log("4 scrollTop: ", st)
                $('.about-div-3').addClass('active');
            }
        })


    });
}]);