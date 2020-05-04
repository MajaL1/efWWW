myApp.controller('HomeCtrl', [function () {
    console.log('HomeCtrl--');

    angular.element(document).ready(function () {
        console.log('HomeCtrl1--');

        var height1 = $('.about-div-1').height();
        var height2 = $('.about-div-2').height();

        var height3 = $('.about-div-3').height();
        var height4 = $('.about-div-3').height();

        console.log(height1);
        console.log(height3);
        var position1 = $('.about-div-1').position().top;
        console.log(" a top: " + position1);
        var position2 = $('.about-div-2').position().top;


        var position3 = $('.about-div-3').position().top;
        var position4 = $('.about-div-4').position().top;

        console.log(" c top: " + position3);
        $(window).on('scroll', function () {

            // shape title border

            $('.about-div-1, .about-div-3, .about-div-2').removeClass('active');


            var st = $(document).scrollTop();

            if (st < position1 + height1 - 50) {
                $('.shape.shape-1').addClass("shape-border");
                $('.svg-wrapper.wrapper-1').click(function () {
                    $('.shape.shape-1').toggleClass('shape-border');
                });

                /*    console.log(":::: st::: : " + st);
                   console.log(" position1: " + position1);
                   console.log(" positio3: " + position3);
   
                   console.log("position1, position3", position1 + position3);
    */
                $('.about-div-2').removeClass('active');
                $('.about-div-3').removeClass('active');
                $('.about-div-4').removeClass('active');
                $('.about-div-1').addClass('active');
                $('.shape.shape-3, .shape.shape-4, .shape.shape-2').removeClass('shape-border');


            }
            else if (st < position2 + height2 - 50) {

                $('.shape.shape-2').addClass("shape-border");
                $('.svg-wrapper.wrapper-2').click(function () {
                    $('.shape.shape-2').toggleClass('shape-border');
                });
                $('.about-div-2').addClass('active');
                $('.about-div-1').removeClass('active');
                $('.about-div-3').removeClass('active');
                $('.about-div-4').removeClass('active');
                $('.shape.shape-3, .shape.shape-4, .shape.shape-1').removeClass('shape-border');



            }
            else if (st < position3 + height3 - 50) {
                $('.shape.shape-3').addClass("shape-border");
                $('.svg-wrapper.wrapper-3').click(function () {
                    $('.shape.shape-3').toggleClass('shape-border');
                });
                $('.about-div-3').addClass('active');
                $('.about-div-1').removeClass('active');
                $('.about-div-2').removeClass('active');
                $('.about-div-4').removeClass('active');
                $('.shape.shape-2, .shape.shape-4, .shape.shape-1').removeClass('shape-border');



            }
            else { // if (st > position1 + height1) {
                debugger
                $('.shape.shape-4').addClass("shape-border");
                $('.svg-wrapper.wrapper-4').click(function () {
                    $('.shape.shape-4').toggleClass('shape-border');
                });
                console.log("4 scrollTop: ", st)
                $('.about-div-4').addClass('active');
                $('.about-div-1').removeClass('active');
                $('.about-div-3').removeClass('active');
                $('.about-div-2').removeClass('active');
                $('.shape.shape-3, .shape.shape-2, .shape.shape-1').removeClass('shape-border');


            }
        })
    });

    var gallery = document.querySelector('.gallery');
    var galleryItems = document.querySelectorAll('.gallery-item');
    var itemWidth = 30; // percent: as set in css

    var featured = document.querySelector('.featured-item');

    var leftBtn = document.querySelector('.move-btn.left');
    var rightBtn = document.querySelector('.move-btn.right');
    var leftInterval;
    var rightInterval;

    var scrollRate = 0.2;
    var left;

    function selectItem(e) {
        if (e.target.classList.contains('active')) return;

        featured.style.backgroundImage = e.target.style.backgroundImage;

        for (var i = 0; i < galleryItems.length; i++) {
            if (galleryItems[i].classList.contains('active'))
                galleryItems[i].classList.remove('active');
        }

        e.target.classList.add('active');
    }

    function galleryWrapLeft() {
        var first = gallery.children[0];
        gallery.removeChild(first);
        gallery.style.left = -itemWidth + '%';
        gallery.appendChild(first);
        gallery.style.left = '0%';
    }

    function galleryWrapRight() {
        var last = gallery.children[gallery.children.length - 1];
        gallery.removeChild(last);
        gallery.insertBefore(last, gallery.children[0]);
        gallery.style.left = '-30%';
    }

    function moveLeft() {
        left = left || 0;

        leftInterval = setInterval(function () {
            gallery.style.left = left + '%';

            if (left > -itemWidth) {
                left -= scrollRate;
            } else {
                left = 0;
                galleryWrapLeft();
            }
        }, 1);
    }

    function moveRight() {
        //Make sure there is element to the leftd
        if (left > -itemWidth && left < 0) {
            left = left - itemWidth;

            var last = gallery.children[gallery.children.length - 1];
            gallery.removeChild(last);
            gallery.style.left = left + '%';
            gallery.insertBefore(last, gallery.children[0]);
        }

        left = left || 0;

        leftInterval = setInterval(function () {
            gallery.style.left = left + '%';

            if (left < 0) {
                left += scrollRate;
            } else {
                left = -itemWidth;
                galleryWrapRight();
            }
        }, 1);
    }

    function stopMovement() {
        clearInterval(leftInterval);
        clearInterval(rightInterval);
    }

    leftBtn.addEventListener('mouseenter', moveLeft);
    leftBtn.addEventListener('mouseleave', stopMovement);
    rightBtn.addEventListener('mouseenter', moveRight);
    rightBtn.addEventListener('mouseleave', stopMovement);


    //Start this baby up
    (function init() {
        var images = [
            './assets/img/Elvis_2-md.jpg',
            './assets/img/Elvis4_md.jpg',
            './assets/img/modri-album_md.jpg',
            './assets/img/rdeci_album-md.jpg',
            './assets/img/sejkspir_md.jpg',
            './assets/img/elvis2.jpg',
            './assets/img/skarabeji-naslovnica-md.png',
            './assets/img/sejkspir_2_md.jpg',


        ];

        //Set Initial Featured Image
        featured.style.backgroundImage = 'url(' + images[0] + ')';

        //Set Images for Gallery and Add Event Listeners
        for (var i = 0; i < galleryItems.length; i++) {
            galleryItems[i].style.backgroundImage = 'url(' + images[i] + ')';
            galleryItems[i].addEventListener('click', selectItem);
        }
    })();
}]);