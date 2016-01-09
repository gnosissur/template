window.requestIdleCallback = window.requestIdleCallback ||
function (callback) {
    var start = Date.now();
    return setTimeout(function () {
        callback({
            didTimeout: false,
            timeRemaining: function () {
                return Math.max(0, 50 - (Date.now() - start));
            }
        });
    }, 1);
};

window.cancelIdleCallback = window.cancelIdleCallback ||
function (id) {
    clearTimeout(id);
};

(function() {

    var wayPointObject, timeout, siteContentHeight,
        headerOffset = 150,
        windowInnerHeight = 0,
        scrollPos = 0,
        header = document.querySelector('header'),
        headerContent = document.querySelector('#header-content'),
        headerSlider = document.querySelector('#header-slider'),
        banner = document.querySelector('#banner'),
        content = document.querySelector('article'),
        wrapper = document.querySelector('#wrapper'),
        nav = document.querySelector('nav'),
        navFooter = document.querySelector('footer > div.notes'),
        footer = document.querySelector('footer'),
        main = document.querySelector('main');

    // LINKS & SCROLLING
    var links = document.querySelectorAll('[data-scroll]');
    if (!!links.length) {

        links.frame;
        links.scrollToTop = function(scrollDuration, element, offset) {
            var scrollCount = 0,
                scrollMargin = 0,
                scrollStep, cosParameter, treshold,
                elementOffset = (scrollPos + element.getBoundingClientRect().top + offset).toFixed(1);

            if (Math.abs(scrollPos - elementOffset) < 10) return;
            var step = function() {
                scrollStep = Math.PI / (scrollDuration / 15);
                cosParameter = (scrollPos - elementOffset) / 2;
                scrollCount = scrollCount + 1;
                scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
                treshold = (scrollPos - scrollMargin).toFixed(1);
                if (treshold != elementOffset) {
                    window.scrollTo(0, treshold);
                    links.frame = requestAnimationFrame(step);
                }
            }
            if (!!links.frame) cancelAnimationFrame(links.frame);
            links.frame = requestAnimationFrame(step);
        };

        [].forEach.call(links, function(item) {
            item.addEventListener('click', function(event) {
                event.preventDefault();
                links.scrollToTop(1000, document.querySelector(item.hash || item.dataset.scroll), (item.hash || item.dataset.scroll) == '#home' ? 0 : 1);
            });
        });
    }

    // MENU
    var menu = document.querySelector('nav.title');
    if (!!menu) {
        var navState;
        menu.toggle = function() {
            if (!!!menu) return;
            if (scrollPos >= windowInnerHeight && (navState == 'up' | !!!navState)) {
                navState = 'down';
                menu.classList.add('nav-up');
            } else if (scrollPos < windowInnerHeight && (navState == 'down' | !!!navState)) {
                navState = 'up';
                menu.classList.remove('nav-up');
            }
        };
    }

    // WAYPOINTS
    var wayPoints = {};
    var queryWaypoints = function() {
        [].forEach.call(document.querySelectorAll('main, section'), function(item) {
            if (!!item.id) {
                wayPoints[item.id] = {
                    item: item,
                    offset: item.getBoundingClientRect().top + scrollPos,
                    menu: document.querySelector('nav a[href="#' + item.id + '"]'),
                    waypoint: document.querySelector('nav.waypoints a[href="#' + item.id + '"]')
                };
            }
        });
    };

    // SHOWCASE
    var sliders = document.querySelectorAll('.header-slider');
    if (!!sliders.length) {
        var interval = 3000, count = 1;
        [].forEach.call(sliders, function(slider) {
            slider.slides = slider.querySelectorAll('.header-slider > div');
            slider.captions = slider.querySelectorAll('.header-slider > div .caption');
            slider.currentImage = 0;
            slider.showcaseInterval = undefined;
            slider.showcaseFade = interval + (count++ * 1000);
        });

        sliders.run = function(slider) {
            if (slider.slides.length > 1) {
                requestIdleCallback(function() {
                    for (var i = 0; i < slider.slides.length; i++) {
                        slider.slides[i].style.opacity = 0;
                        if (slider.captions.length > 1) slider.captions[i].classList.remove('caption-up');
                    }
                    slider.currentImage = (slider.currentImage != slider.slides.length - 1) ? slider.currentImage + 1 : 0;
                    slider.slides[slider.currentImage].style.opacity = 1;
                    if (slider.captions.length > 1) slider.captions[slider.currentImage].classList.add('caption-up');
                });
            }
        };

        sliders.reset = function() {
            [].forEach.call(sliders, function(slider) {
                if (slider.slides.length > 1) {
                    if (slider.showcaseInterval)
                        clearInterval(slider.showcaseInterval);
                    slider.showcaseInterval = setInterval(function() {
                        sliders.run(slider);
                    }, slider.showcaseFade);
                }
            });
        };
    }

    var stretchHeader = function() {
        windowInnerHeight = window.innerHeight;
        siteContentHeight = main.clientHeight;
        queryWaypoints();
        onScroll();
    };

    var scrollFrame,
        headerVisible = true,
        footerVisible = true;
    var onScroll = function() {
        // Reset showcase lest we tax the browser too much
        scrollPos = window.scrollY;
        if (!!scrollFrame) cancelAnimationFrame(scrollFrame);
        scrollFrame = requestAnimationFrame(function() {

            if (!!sliders.length) sliders.reset();
            if (!!menu) menu.toggle();

            if (scrollPos <= windowInnerHeight) {
                header.style.transform = 'translate3d(0,' + -(scrollPos * 0.4) + 'px,0)';
                headerContent.style.transform = 'translate3d(0,' + -(scrollPos * 0.2) + 'px,0)';
                if (!headerVisible) headerVisible = true;
            } else if (headerVisible) {
                headerVisible = false;
                header.style.transform = 'translate3d(0,' + -windowInnerHeight + 'px,0)';
            }

            var limit = siteContentHeight - windowInnerHeight * 2;
            if (scrollPos >= limit) {
                var amount = scrollPos - limit;
                if (!!footer) footer.style.transform = 'translate3d(0,' + ((windowInnerHeight - amount) * 0.7) + 'px,0)';
                if (!!navFooter) navFooter.style.transform = 'translate3d(0,' + ((windowInnerHeight - amount) * 1.5) + 'px,0)';
                if (!footerVisible) footerVisible = true;
            } else if (footerVisible) {
                footerVisible = false;
                if (!!footer) footer.style.transform = 'translate3d(0,' + windowInnerHeight + 'px,0)';
            }

            var cur = undefined,
                obj = undefined;
            Object.keys(wayPoints).forEach(function(key) {
                var point = wayPoints[key];
                var treshold = Math.abs(point.offset - scrollPos);
                if (cur == undefined || treshold < cur) {
                    cur = treshold;
                    obj = point;
                }
            });

            if (!!obj && obj != wayPointObject) {
                if (!!wayPointObject) {
                    if (!!wayPointObject.waypoint) wayPointObject.waypoint.classList.remove('active');
                    if (!!wayPointObject.menu) wayPointObject.menu.classList.remove('active');
                }
                wayPointObject = obj;
                if (!!wayPointObject.waypoint) wayPointObject.waypoint.classList.add('active');
                if (!!wayPointObject.menu) wayPointObject.menu.classList.add('active');
            }
        });
    };

    document.addEventListener('DOMContentLoaded', function() {
        windowInnerHeight = window.innerHeight;
        scrollPos = window.scrollY;

        stretchHeader();
        onScroll();

        window.addEventListener('wheel', function() {
            if (!!links.frame) {
                cancelAnimationFrame(links.frame);
                links.frame = null;
            }
        });

        window.onload = stretchHeader;
        window.addEventListener('resize', stretchHeader);
        window.addEventListener('scroll', onScroll);
    });

})();
