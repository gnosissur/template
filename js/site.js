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

window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

(function() {

    if (typeof loadCSS !== 'undefined' && mobileAndTabletcheck()) loadCSS('/mobile.css', document.getElementById("loadcss"));

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
                }, {timeout: 1000});
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

                // Just in case
                requestIdleCallback(function() {
                    siteContentHeight = main.clientHeight;
                });
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
