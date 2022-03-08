var App = {};

App.Debugger = {
    _defaults: {
        windowWidth: $(window).width(),
        windowHeight: $(window).height(),
        body: $('body'),
        window: $(window),
        whCalc: true,
    },
    init: function (options) {
        let settings;
        App.Debugger.setSettings(options);
        settings = App.Debugger.getSettings();
        if (settings.whCalc) {
            App.Debugger.whCalc(settings);
        }
    },
    setSettings: function (options) {
        let settings;
        settings = {
            ...App.Debugger._defaults,
            ...options
        };
        App.Debugger._settings = settings;
    },
    getSettings: function () {
        return App.Debugger._settings;
    },
    whCalc: function (settings) {

        if (settings.windowWidth > 572) {

            let alertTemplate = `<div class="alert alert-secondary js-debugger-alert" role="alert"></div>`;
            settings.body.append(alertTemplate);
            let $debuggerAlert = $('.js-debugger-alert');

            $debuggerAlert.css({
                "position": "fixed",
                "top": "0",
                "right": "0",
                "z-index": "2500"
            });

            $debuggerAlert.text(`w:${settings.windowWidth}, h: ${settings.windowHeight}`);

            settings.window.on("resize", function () {
                $debuggerAlert.text(`w:${settings.windowWidth}, h: ${settings.windowHeight}`);
            });

            $debuggerAlert.on({
                mouseover: () => $debuggerAlert.css("opacity", "0.2"),
                mouseleave: () => $debuggerAlert.css("opacity", "1"),
                dblclick: () => $debuggerAlert.hide()
            });

        }
    }

}

App.Slider = {
    _defaults: {
        sliderHero: $('.js-sliderHero'),
        sliderHeroProgressBar: $(".js-sliderHero-progress-bar"),
        sliderBlog: $('.js-sliderBlog'),
        sliderOurTeam: $('.js-sliderOurTeam')
    },
    init: function (options) {
        let settings;
        App.Slider.setSettings(options);
        settings = App.Slider.getSettings();
        if (settings.sliderHero.length) App.Slider.sliderHero(settings);
        if (settings.sliderBlog.length) App.Slider.sliderBlog();
        if (settings.sliderOurTeam.length) App.Slider.sliderOurTeam();
    },
    setSettings: function (options) {
        let settings;
        settings = {
            ...App.Slider._defaults,
            ...options
        };
        App.Slider._settings = settings;
    },
    getSettings: function () {
        return App.Slider._settings;
    },
    sliderHero: function (settings) {
        return new Swiper(".js-sliderHero", {
            spaceBetween: 0,
            slidesPerView: 1,
            centeredSlides: true,
            speed: 2000,
            grabCursor: true,
            autoplay: {
                delay: 5500,
                // disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".js-sliderHero-btn-next",
                prevEl: ".js-sliderHero-btn-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                dynamicBullets: true,
            },
            on: {
                init: function () {
                    settings.sliderHeroProgressBar.removeClass("animate active");
                    settings.sliderHeroProgressBar.eq(0).addClass("animate active");
                },
                slideChangeTransitionStart: function () {
                    settings.sliderHeroProgressBar.removeClass("animate active");
                    settings.sliderHeroProgressBar.eq(0).addClass("active");
                },
                slideChangeTransitionEnd: function () {
                    settings.sliderHeroProgressBar.eq(0).addClass("animate");
                }
            }
        })
    },
    sliderBlog: function () {
        return new Swiper(".js-sliderBlog", {
            spaceBetween: 0,
            slidesPerView: 1,
            speed: 1000,
            grabCursor: true,
            navigation: {
                nextEl: ".js-sliderBlog-btn-next",
                prevEl: ".js-sliderBlog-btn-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                dynamicBullets: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
            },
        })
    },
    sliderOurTeam: function () {
        return new Swiper(".js-sliderOurTeam", {
            spaceBetween: 30,
            slidesPerView: 1,
            autoHeight: true,
            grabCursor: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".js-sliderOurTeam-btn-next",
                prevEl: ".js-sliderOurTeam-btn-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                dynamicBullets: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
            },
        })
    }
}

App.Site = {
    _defaults: {
        aos: false,
        scrollToTop: false,
        scrolledHelper: {
            isEnabled: false,
            isFixedHeader: false,
        },
        templateGallery: {
            isEnabled: false,
            class: $('.js-template-gallery')
        },
        $header: $('.js-header'),
        $win: $(window),
        $doc: $(document),
        $html: $("html"),
        $body: $("body"),
    },
    init: function (options) {
        let settings;
        App.Site.setSettings(options);
        settings = App.Site.getSettings();

        if (settings.aos == true) App.Site.aos();
        if (settings.scrollToTop == true) App.Site.scrollToTop(settings);
        if (settings.scrolledHelper.isEnabled == true) App.Site.scrolledHelper(settings);
        if (settings.templateGallery.isEnabled == true) App.Site.templateGallery(settings);
    },
    setSettings: function (options) {
        let settings;
        settings = {
            ...App.Site._defaults,
            ...options
        };
        App.Site._settings = settings;
    },
    getSettings: function () {
        return App.Site._settings;
    },
    aos: function () {
        AOS.init();
    },
    scrolledHelper: function (settings) {
        var lastScrollTop = 0;
        var lastScrollTopTime;
        var $header = settings.$header;

        settings.$win.on("scroll", function () {

            var scrollTop = settings.$win.scrollTop();
            var isScrolledToTop = scrollTop < lastScrollTop;
            var headerOffsetTop = settings.scrolledHelper.isFixedHeader ? 0 : $header.offset().top;
            var scrollLimit = $header.length > 0
                ? $header.outerHeight() + headerOffsetTop + 48
                : 16;

            var isScrolled = scrollTop >= scrollLimit;
            var scrollLargeLimit = scrollLimit * 4;
            var scrolledHalf = scrollTop > (settings.$doc.height() / 2);

            settings.$html.toggleClass("is-scrolled", isScrolled);
            settings.$html.toggleClass("is-not-scrolled", !isScrolled);
            settings.$html.toggleClass("is-scrolled-large", scrollTop >= scrollLargeLimit);
            settings.$html.toggleClass("is-scrolled-half", scrolledHalf);

            setTimeout(function () {
                settings.$html.toggleClass("is-scrolled-ready", isScrolled);
            }, 16);

            clearTimeout(lastScrollTopTime);
            lastScrollTopTime = setTimeout(function () {
                settings.$html.toggleClass(
                    "is-scrolled-to-top",
                    isScrolled && isScrolledToTop
                );
            }, 0);
            lastScrollTop = scrollTop;

        });
    },
    scrollToTop: function (settings) {
        let onScrollToTop = function (e) {
            e.preventDefault();
            $("html,body").animate({ scrollTop: 0 }, 600);
        };
        settings.$doc.on("click", '[data-scroll-to="top"]', onScrollToTop);
        settings.$doc.on("click", 'a[href="#top"]', onScrollToTop);
    },
    templateGallery: function (settings) {
        $.each(settings.templateGallery.class, function () {
            $(this).find('a').magnificPopup({
                type: 'image',
                mainClass: 'mfp-fade',
                gallery: {
                    enabled: true
                },
                zoom: {
                    enabled: true,
                    duration: 300,
                    easing: 'ease-in-out',
                }
            });
        });
    },
}

App.Slider.init();
App.Debugger.init({
    whCalc: true
});
App.Site.init({
    aos: true,
    scrollToTop: true,
    scrolledHelper: {
        isEnabled: true,
        isFixedHeader: true,
        headerClass: $('.js-header'),
    },
    templateGallery: {
        isEnabled: true,
        class: $('.js-template-gallery')
    },
});
