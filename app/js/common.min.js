jQuery(document).ready(function($)  {

    var reviewsSlider = document.querySelector('.reviews-slider')

    $(".custom-select").niceSelect();

    if (reviewsSlider) {
        var leftPos = $(".header .logo-img").offset().left;
        const swiper1 = new Swiper(reviewsSlider, {

            loop: true,
           
            breakpoints:{
                520:{
                    slidesPerView: "auto",
                    spaceBetween: 16,
                    grabCursor: true,
                },
                320:{
                    slidesPerView:1.1,
                    spaceBetween: 16,
                    grabCursor: true,
                },

            },
            navigation: {
                nextEl: '.reviews-nav .next',
                prevEl: '.reviews-nav .prev',
            },
        });
        $('.reviews-slider').css("margin-left", leftPos + "px");
    }


    $(window).resize(function () {
        if ($(".reviews-slider").length) {
            var leftPos = $(".header .logo-img").offset().left;
            $(".reviews-slider").css("margin-left", leftPos + "px");
        }


    })


    $('.mobile-btn').click(function () {
        $(this).toggleClass('open');
        $(".mobile-menu").toggleClass('open');

        if ($(".mobile-menu").hasClass('open')) {
            $('html').css('overflowY', 'hidden')
            const $scrollableElement = document.querySelector('.mobile-menu.open');
            scrollLock.addScrollableSelector($scrollableElement);

        }
        else {
            $('html').css('overflowY', 'auto')
        }
    })
    $('.documentation-menu-wrapper .current').click(function () {
        $('.documentation-menu-wrapper').toggleClass('open');
       $('.documentation-menu-wrapper .documentation-menu').fadeToggle();
    })


});

var header = document.querySelector(".header");
var sticky = header.offsetTop;

function myFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}
window.addEventListener("scroll", myFunction);
