(function() {

    var wayPointObject, timeout, siteContentHeight, showcaseInterval,
        showCaseFade = 6000,
        headerOffset = 150,
        windowInnerHeight = 0,
        scrollPos = 0,
        currentImage = 0,
        wayPoints = {};

    var header = document.querySelector('header'),
        headerContent = document.querySelector('#header-content'),
        headerSlider = document.querySelector('#header-slider'),
        banner = document.querySelector('#banner'),
        slides = document.querySelectorAll('#header-slider > div'),
        captions = document.querySelectorAll('#header-slider > div .caption'),
        content = document.querySelector('article'),
        wrapper = document.querySelector('#wrapper'),
        nav = document.querySelector('nav'),
        navTop = document.querySelector('nav.title'),
        navFooter = document.querySelector('footer > div.notes'),
        footer = document.querySelector('footer'),
        main = document.querySelector('main');

    var debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    var stretchHeader = function() {
        windowInnerHeight = window.innerHeight;
        siteContentHeight = main.clientHeight;
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
        onScroll();
    };

    var currentFrame;
    var scrollToTop = function(scrollDuration, element, offset) {
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
                currentFrame = requestAnimationFrame(step);
            }
        }
        if (!!currentFrame) cancelAnimationFrame(currentFrame);
        currentFrame = requestAnimationFrame(step);
    }

    var runShowCase = function(first) {
        if (slides.length > 1) {
            requestAnimationFrame(function() {
                if (!!first) {
                    captions[0].classList.add('caption-up');
                    slides[0].style.opacity = 1;
                } else {
                    for (var i = 0; i < slides.length; i++) {
                        slides[i].style.opacity = 0;
                        captions[i].classList.remove('caption-up');
                    }
                    currentImage = (currentImage != slides.length - 1) ? currentImage + 1 : 0;
                    slides[currentImage].style.opacity = 1;
                    captions[currentImage].classList.add('caption-up');
                }
            });
        }
    }

    var resetShowcaseInterval = function() {
        if (slides.length > 1) {
            if (showcaseInterval)
                clearInterval(showcaseInterval);
            showcaseInterval = setInterval(function() {
                runShowCase();
            }, showCaseFade);
        }
    };

    var navState;
    var setMenu = function() {
        if (scrollPos > windowInnerHeight && (navState == 'up' | !!!navState)) {
            navState = 'down';
            navTop.classList.add('nav-up');
        } else if (scrollPos < windowInnerHeight && (navState == 'down' | !!!navState)) {
            navState = 'up';
            navTop.classList.remove('nav-up');
        }
    };

    var scrollFrame,
        headerVisible = true,
        footerVisible = true;

    var onScroll = function() {
        // Reset showcase lest we tax the browser too much
        resetShowcaseInterval();
        scrollPos = window.scrollY;

        if (!!scrollFrame) cancelAnimationFrame(scrollFrame);
        scrollFrame = requestAnimationFrame(function() {
            setMenu();
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
                footer.style.transform = 'translate3d(0,' + ((windowInnerHeight - amount) * 0.7) + 'px,0)';
                navFooter.style.transform = 'translate3d(0,' + ((windowInnerHeight - amount) * 1.5) + 'px,0)';
                if (!footerVisible) footerVisible = true;
            } else if (footerVisible) {
                footerVisible = false;
                footer.style.transform = 'translate3d(0,' + windowInnerHeight + 'px,0)';
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
                    wayPointObject.waypoint.classList.remove('active');
                    wayPointObject.menu.classList.remove('active');
                }
                wayPointObject = obj;
                wayPointObject.waypoint.classList.add('active');
                wayPointObject.menu.classList.add('active');
            }
        });
    };

    window.onload = function(e) {
        stretchHeader();
    }

    document.addEventListener('DOMContentLoaded', function() {

        windowInnerHeight = window.innerHeight;
        scrollPos = window.scrollY;

        stretchHeader();
        onScroll();
        resetShowcaseInterval();
        runShowCase();
        setMenu();

        window.addEventListener('resize', function() {
            stretchHeader();
        }, false);

        window.addEventListener('wheel', function() {
            if (!!currentFrame) {
                cancelAnimationFrame(currentFrame);
                currentFrame = null;
            }
        });

        window.addEventListener('scroll', onScroll);

        [].forEach.call(document.querySelectorAll('[data-scroll]'), function(item) {
            item.addEventListener('click', function(event) {
                event.preventDefault();
                scrollToTop(1500, document.querySelector(item.hash || item.dataset.scroll), (item.hash || item.dataset.scroll) == '#home' ? 0 : 150);
            });
        });
    });

})();
