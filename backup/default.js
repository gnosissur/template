(function() {

    var showCaseFade = 6000,
        headerOffset = 150,
        scrollPos = 0,
        scrollOffset = 0,
        showcaseInterval = undefined,
        currentImage = 0,
        wayPoints = {},
        wayPointObject = undefined;

    var header = document.querySelector('header'),
        headerContent = document.querySelector('#header-content'),
        headerSlider = document.querySelector('#header-slider'),
        banner = document.querySelector('#banner'),
        slides = document.querySelectorAll('#header-slider > div'),
        captions = document.querySelectorAll('#header-slider > div .caption'),
        content = document.querySelector('#content'),
        wrapper = document.querySelector('#wrapper'),
        nav = document.querySelector('nav'),
        navTop = document.querySelector('#navigation-top'),
        footer = document.querySelector('footer');

    var stretchHeader = function() {
        headerSliderHeight = window.innerHeight;
        [].forEach.call(document.querySelectorAll('#home, section:not(.section-quote), footer'), function(item) {
            wayPoints[item.id] = {
                item: item,
                offset: item.getBoundingClientRect().top + scrollPos,
                menu: document.querySelector('#nav a[href="#' + item.id + '"]').parentNode,
                waypoint: document.querySelector('#scrolljack a[href="#' + item.id + '"]')
            };
        });

        content.style.marginTop  = (headerSliderHeight + 100) + 'px';
    };
    stretchHeader();

    var currentFrame = undefined;
    var scrollToTop = function(scrollDuration, element, offset) {
        var scrollCount = 0, scrollMargin = 0, scrollStep, cosParameter, treshold,
            elementOffset = (scrollPos + element.getBoundingClientRect().top + offset).toFixed(0);

console.log(scrollPos + " " + element.getBoundingClientRect().top + " = " + elementOffset)

        if (Math.abs(scrollPos - elementOffset) < 10) return;
        var step = function() {
            scrollStep = Math.PI / (scrollDuration / 15);
            cosParameter = (scrollPos - elementOffset) / 2;
            scrollCount = scrollCount + 1;
            scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
            treshold = (scrollPos - scrollMargin).toFixed(0);
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
        if (showcaseInterval)
            clearInterval(showcaseInterval);
        showcaseInterval = setInterval(function() {
            runShowCase();
        }, showCaseFade);
    };

    window.onload = function(e){

    }

    document.addEventListener("DOMContentLoaded", function() {
        var frame, outOfBounds = false,
            navState, timeout;
        scrollPos = window.scrollY;

        var setMenu = function() {
            var limit = headerSliderHeight + 100;
            if (scrollPos > limit && (navState == 'up' | !!!navState)) {
                navState = 'down';
                navTop.classList.add('nav-up');
            } else if (scrollPos < limit && (navState == 'down' | !!!navState)) {
                navState = 'up';
                navTop.classList.remove('nav-up');
            }
        };

        stretchHeader();
        resetShowcaseInterval();
        runShowCase(true);
        setMenu();

        window.addEventListener('resize', function() {
            stretchHeader();
        }, false);

        window.addEventListener('scroll', function() {
            // Reset showcase lest we tax the browser too much
            resetShowcaseInterval();
            scrollPos = window.scrollY;

            if (!!frame) cancelAnimationFrame(frame);
            frame = requestAnimationFrame(function() {
                setMenu();
                var limit = headerSliderHeight + 200;
                if (scrollPos < limit) {
                    scrollOffset = scrollPos;
                    header.style.transform = 'translate3d(0,' + -(scrollPos/2) + 'px,0)';
                    headerContent.style.transform = 'translate3d(0,' + -(scrollPos*0.2) + 'px,0)';
                    outOfBounds = false;
                } else if (!outOfBounds) {
                    scrollOffset = limit;
                    outOfBounds = true;
                }

                var cur = undefined, obj = undefined;
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
        });

        [].forEach.call(document.querySelectorAll('[data-scroll]'), function(item) {
            item.addEventListener("click", function(event) {
                event.preventDefault();
                scrollToTop(1500, document.querySelector(item.hash || item.dataset.scroll), (item.hash || item.dataset.scroll) == "#home" ? 0 : 150);
            });
        });
    });

})();
