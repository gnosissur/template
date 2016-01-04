function initMap(){function e(e,i,o,t,l,n,r,s){var a=function(){var e=!1;return function(i){return void 0!==i&&(e=i),e}}();iw=new google.maps.InfoWindow,google.maps.event.addListener(e,"click",function(){if(a())iw.close(),a(!1);else{var p="<div style='color:#000;background-color:#fff;padding:5px;width:150px;'><h4>"+o+"</h4><p>"+t+"<p><p>"+l+"<p><a href='mailto:"+n+"' >"+n+"<a><a href='"+s+"'' >"+r+"<a></div>";iw=new google.maps.InfoWindow({content:p, maxWidth: 200}),iw.open(i,e),a(!0)}}),google.maps.event.addListener(iw,"closeclick",function(){a(!1)})}var o={center:new google.maps.LatLng(47.996371,7.837954),zoom:14,zoomControl:!0,zoomControlOptions:{style:google.maps.ZoomControlStyle.SMALL},disableDoubleClickZoom:!1,mapTypeControl:!1,mapTypeControlOptions:{style:google.maps.MapTypeControlStyle.HORIZONTAL_BAR},scaleControl:!1,scrollwheel:!1,panControl:!0,streetViewControl:!1,draggable:!0,overviewMapControl:!1,overviewMapControlOptions:{opened:!1},mapTypeId:google.maps.MapTypeId.ROADMAP,styles:[{featureType:"road",elementType:"geometry",stylers:[{visibility:"off"}]},{featureType:"poi",elementType:"geometry",stylers:[{visibility:"off"}]},{featureType:"landscape",elementType:"geometry",stylers:[{color:"#FFFAF0"}]},{featureType:"water",stylers:[{color:"#d9edf7"}]},{featureType:"road",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"transit",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry",stylers:[{lightness:40}]},{featureType:"poi.park",elementType:"geometry",stylers:[{visibility:"on",color:"#c5dac6"}]},{featureType:"landscape.natural.terrain",elementType:"geometry.fill",stylers:[{visibility:"on"},{color:"#CCAA88"},{lightness:40}]},{featureType:"landscape.man_made",elementType:"geometry.fill",stylers:[{visibility:"on"},{color:"#EEEEEE"}]},{featureType:"road",stylers:[{visibility:"simplified"},{color:"#FF0000"},{gamma:9}]},{featureType:"road.highway",stylers:[{visibility:"on"},{color:"#FF0000"},{gamma:8}]},{featureType:"road.highway.controlled_access",stylers:[{visibility:"on"},{color:"#FF0000"},{gamma:4}]},{featureType:"road",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"poi.government",elementType:"geometry",stylers:[{visibility:"on"},{color:"#DDDDDD"}]},{featureType:"transit.station",elementType:"geometry",stylers:[{visibility:"on"},{color:"#CCCCCC"}]},{featureType:"transit.line",elementType:"geometry",stylers:[{visibility:"on"},{color:"#AAAAAA"},{gamma:4}]}]},t=document.getElementById("map"),l=new google.maps.Map(t,o),n=[["Gnosis Freiburg","...","01638652868","gnosissur@gmail.com","http://gnosissur.github.io",47.999999,7.84210429999996,"https://mapbuildr.com/assets/img/markers/solid-pin-red.png"],["Gnosis Berlin","undefined","undefined","undefined","undefined",52.52000659999999,13.404953999999975,"https://mapbuildr.com/assets/img/markers/solid-pin-red.png"]];for(i=0;i<n.length;i++)"undefined"==n[i][1]?description="":description=n[i][1],"undefined"==n[i][2]?telephone="":telephone=n[i][2],"undefined"==n[i][3]?email="":email=n[i][3],"undefined"==n[i][4]?web="":web=n[i][4],"undefined"==n[i][7]?markericon="":markericon=n[i][7],marker=new google.maps.Marker({icon:markericon,position:new google.maps.LatLng(n[i][5],n[i][6]),map:l,title:n[i][0],desc:description,tel:telephone,email:email,web:web}),"http://"!=web.substring(0,7)?link="http://"+web:link=web,e(marker,l,n[i][0],description,telephone,email,web,link)}var map;

(function() {

    var showCaseFade = 6000,
        headerOffset = 150,
        windowInnerHeight = 0,
        siteContentHeight = undefined,
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
        content = document.querySelector('article'),
        wrapper = document.querySelector('#wrapper'),
        nav = document.querySelector('nav'),
        navTop = document.querySelector('#menu'),
        navFooter = document.querySelector('nav.links'),
        footer = document.querySelector('footer'),
        main = document.querySelector('main');

    var debounce = function(func, wait, immediate) {
    	var timeout;
    	return function() {
    		var context = this, args = arguments;
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

    var stretchHeader = function(calcContent) {
        windowInnerHeight = window.innerHeight;
        if (!!calcContent) siteContentHeight = main.clientHeight;
        [].forEach.call(document.querySelectorAll('main, section'), function(item) {
            wayPoints[item.id] = {
                item: item,
                offset: item.getBoundingClientRect().top + scrollPos,
                menu: document.querySelector('nav a[href="#' + item.id + '"]'),
                waypoint: document.querySelector('#waypoints a[href="#' + item.id + '"]')
            };
        });
    };

    var currentFrame = undefined;
    var scrollToTop = function(scrollDuration, element, offset) {
        var scrollCount = 0, scrollMargin = 0, scrollStep, cosParameter, treshold,
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

    window.onload = function(e){
        stretchHeader();
    }

    document.addEventListener("DOMContentLoaded", function() {
        var frame, outOfBounds = false,
            navState, timeout;

        windowInnerHeight = window.innerHeight;
        scrollPos = window.scrollY;

        var setMenu = function() {
            if (scrollPos > windowInnerHeight && (navState == 'up' | !!!navState)) {
                navState = 'down';
                navTop.classList.add('nav-up');
            } else if (scrollPos < windowInnerHeight && (navState == 'down' | !!!navState)) {
                navState = 'up';
                navTop.classList.remove('nav-up');
            }
        };

        stretchHeader(false);
        resetShowcaseInterval();
        runShowCase(true);
        setMenu();

        window.addEventListener('resize', function() {
            stretchHeader(true);
        }, false);

        window.addEventListener('wheel', function () {
            if (!!currentFrame) {
                cancelAnimationFrame(currentFrame);
                currentFrame = null;
            }
        });

        window.addEventListener('scroll', function() {
            // Reset showcase lest we tax the browser too much
            resetShowcaseInterval();
            scrollPos = window.scrollY;

            if (!!frame) cancelAnimationFrame(frame);
            frame = requestAnimationFrame(function() {
                setMenu();
                if (scrollPos <= windowInnerHeight) {
                    scrollOffset = scrollPos;
                    header.style.transform = 'translate3d(0,' + -(scrollPos / 2) + 'px,0)';
                    headerContent.style.transform = 'translate3d(0,' + -(scrollPos * 0.2) + 'px,0)';
                    if (outOfBounds) {
                        header.style.display = 'block';
                        outOfBounds = false;
                    }
                } else if (!outOfBounds) {
                    scrollOffset = windowInnerHeight;
                    outOfBounds = true;
                    header.style.display = 'none';
                }

                var limit = main.clientHeight - windowInnerHeight * 2;
                if (scrollPos >= limit) {
                    var amount = scrollPos - limit;
                    footer.style.transform = 'translate3d(0,' + ((windowInnerHeight - amount) / 2 ) + 'px,0)';
                    navFooter.style.transform = 'translate3d(0,' + ((windowInnerHeight - amount) * 1.5 ) + 'px,0)';
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
