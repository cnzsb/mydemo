requirejs.config({
    paths: {
        jquery: '../../../js/jquery.min'
    }
});

requirejs(['jquery', 'scrollto'], function ($, scrollto) {
    var scroll = new scrollto.ScrollTo({
        dest: 500,
        speed: 10
    });

    // $('#backTop').on('click', scroll.move);
    // 调整this的指向
    $('#backTop').on('click', $.proxy(scroll.move, scroll));
});

/*requirejs(['jquery'], function ($) {
    $('#backTop').on('click', move);
    $(window).on('scroll', function () {
        checkPosition($(window).height() / 2);
    });

    checkPosition($(window).height() / 2);

    function move () {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    }

    function go () {
        $('html, body').scrollTop(0);
    }

    function checkPosition(pos) {
        if ($(window).scrollTop() > pos) {
            $('#backTop').fadeIn();
        } else {
            $('#backTop').fadeOut();
        }
    }
});*/