function initMap() {
    function e(e, i, o, t, l, n, r, s) {
        var a = function() {
            var e = !1;
            return function(i) {
                return void 0 !== i && (e = i), e
            }
        }();
        iw = new google.maps.InfoWindow, google.maps.event.addListener(e, 'click', function() {
            if (a()) iw.close(), a(!1);
            else {
                var p = '<div style=\'color:#000;background-color:#fff;padding:5px;width:150px;\'><h4>' + o + '</h4><p>' + t + '<p><p>' + l + '<p><a href=\'mailto:' + n + '\' >' + n + '<a><a href=\'' + s + '\'\' >' + r + '<a></div>';
                iw = new google.maps.InfoWindow({
                    content: p,
                    maxWidth: 200
                }), iw.open(i, e), a(!0)
            }
        }), google.maps.event.addListener(iw, 'closeclick', function() {
            a(!1)
        })
    }
    var o = {
            center: new google.maps.LatLng(47.990, 7.837954),
            zoom: 14,
            zoomControl: !0,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL
            },
            disableDoubleClickZoom: !1,
            mapTypeControl: !1,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
            },
            scaleControl: !1,
            scrollwheel: !1,
            panControl: !0,
            streetViewControl: !1,
            draggable: !0,
            overviewMapControl: !1,
            overviewMapControlOptions: {
                opened: !1
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
                featureType: 'landscape',
                elementType: 'geometry',
                stylers: [{
                    color: '#FFFAF0'
                }]
            }, {
                featureType: 'water',
                stylers: [{
                    color: '#d9edf7'
                }]
            }, {
                featureType: 'road',
                elementType: 'labels',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
                featureType: 'transit',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
                featureType: 'administrative',
                elementType: 'geometry',
                stylers: [{
                    lightness: 40
                }]
            }, {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{
                    visibility: 'on',
                    color: '#c5dac6'
                }]
            }, {
                featureType: 'landscape.natural.terrain',
                elementType: 'geometry.fill',
                stylers: [{
                    visibility: 'on'
                }, {
                    color: '#CCAA88'
                }, {
                    lightness: 40
                }]
            }, {
                featureType: 'landscape.man_made',
                elementType: 'geometry.fill',
                stylers: [{
                    visibility: 'on'
                }, {
                    color: '#EEEEEE'
                }]
            }, {
                featureType: 'road',
                stylers: [{
                    visibility: 'simplified'
                }, {
                    color: '#FF0000'
                }, {
                    gamma: 9
                }]
            }, {
                featureType: 'road.highway',
                stylers: [{
                    visibility: 'on'
                }, {
                    color: '#FF0000'
                }, {
                    gamma: 8
                }]
            }, {
                featureType: 'road.highway.controlled_access',
                stylers: [{
                    visibility: 'on'
                }, {
                    color: '#FF0000'
                }, {
                    gamma: 4
                }]
            }, {
                featureType: 'road',
                elementType: 'labels',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
                featureType: 'poi.government',
                elementType: 'geometry',
                stylers: [{
                    visibility: 'on'
                }, {
                    color: '#DDDDDD'
                }]
            }, {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{
                    visibility: 'on'
                }, {
                    color: '#CCCCCC'
                }]
            }, {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{
                    visibility: 'on'
                }, {
                    color: '#AAAAAA'
                }, {
                    gamma: 4
                }]
            }]
        },
        t = document.querySelector('footer > div.map'),
        l = new google.maps.Map(t, o),
        n = [
            ['Gnosis Freiburg', '...', '01638652868', 'gnosissur@gmail.com', 'http://gnosissur.github.io', 47.999999, 7.84210429999996, 'https://mapbuildr.com/assets/img/markers/solid-pin-red.png'],
            ['Gnosis Berlin', 'undefined', 'undefined', 'undefined', 'undefined', 52.52000659999999, 13.404953999999975, 'https://mapbuildr.com/assets/img/markers/solid-pin-red.png']
        ];
    for (i = 0; i < n.length; i++) 'undefined' == n[i][1] ? description = '' : description = n[i][1], 'undefined' == n[i][2] ? telephone = '' : telephone = n[i][2], 'undefined' == n[i][3] ? email = '' : email = n[i][3], 'undefined' == n[i][4] ? web = '' : web = n[i][4], 'undefined' == n[i][7] ? markericon = '' : markericon = n[i][7], marker = new google.maps.Marker({
        icon: markericon,
        position: new google.maps.LatLng(n[i][5], n[i][6]),
        map: l,
        title: n[i][0],
        desc: description,
        tel: telephone,
        email: email,
        web: web
    }), 'http://' != web.substring(0, 7) ? link = 'http://' + web : link = web, e(marker, l, n[i][0], description, telephone, email, web, link)
}
var map;
