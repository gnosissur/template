var mapData = mapData || { };
if (!!!mapData.zoom) mapData.zoom = 2;
if (!!!mapData.lat) mapData.lat = 0;
if (!!!mapData.lng) mapData.lng = 0;
if (!!!mapData.scrollwheel) mapData.scrollwheel = false;

var map, locations = [

    // Greek
    ['Olimpo', 'Centro de Capacitación Superior M. AEON 13, Lumisial Pistis Sophia', '(+30) 693 93 04 152', '', '', 39.986643, 22.280334, '/images/pin_pulse.png'],
    ['Athenas', 'Lumisial Michael', '(+30) 6942919983', 'soul-integration@hotmail.com', '', 37.953828, 23.703401, '/images/pin.png'],
    ['Thessalonika', 'Lumisial Kether', '(+30) 6978445052', 'pazegk@yahoo.gr', '', 40.639847, 22.938330, '/images/pin.png'],
    ['Larisa', 'Lumisial Esculapio', '(+30) 6974544719', 'ekmektzogloupantelis@gmail.com', '', 39.635044, 22.411780, '/images/pin.png'],
    ['Xania, Kreta', 'Lumisial Netzach', '(+30) 697-4584536', 'iosif3g@gmail.com', '', 35.511656, 24.019509, '/images/pin.png'],
    ['Karditsa', 'Lumisial Las Nereidas', '(+30) 693-8677770', 'tovalsamo@otenet.gr', '', 39.361323, 21.922236, '/images/pin.png'],
    ['Iraklio, Kreta', '', '(+30) 697 - 4584536', 'makisstathatos@gmail.com', '', 35.340752, 25.144357, '/images/pin_orange.png'],
    ['Bolos', '', '(+30) 6974544719', 'paschos.nik@gmail.com', '', 39.362781, 22.942139, '/images/pin_orange.png'],
    ['Patra', '', '(+30) 697-3234705', 'magapios@yahoo.gr', '', 38.247877, 21.734500, '/images/pin_orange.png'],
    ['Rethymno, Kreta', '', '(+30) 697 - 4584536', 'iosif3g@gmail.com', '', 35.365945, 24.481763, '/images/pin_orange.png'],
    ['Lamia', '', '(+30) 693-8677770', 'tovalsamo@otenet.gr', '', 38.896940, 22.435015, '/images/pin_orange.png'],
    ['Ioannina', '', '(+30) 693 66 79 731', 'kissos.gn@gmail.com', '', 39.668809, 20.852851, '/images/pin_orange.png'],
    ['Syros', '', '(+30) 697 25 05 656', 'gemistosvasilis@yahoo.gr', '', 37.443961, 24.914210, '/images/pin_orange.png'],
    ['Cerres', '', '(+30) 697 25 05 656', 'gemistosvasilis@yahoo.gr', '', 41.092566, 23.541290, '/images/pin_orange.png'],
    ['Dodekanisa', '', '(+30) 6942919983', 'soul-integration@hotmail.com', '', 35.994088, 26.998586, '/images/pin_orange.png'],
    ['Kabala', '', '(+30) 694 61 57 062', 'koukos_n@yahoo.com', '', 40.938684, 24.412882, '/images/pin_orange.png'],
    ['Trikala', '', '(+30) 6974841338', '', '', 39.559515, 21.768080, '/images/pin_orange.png'],
    ['Corintos', '', '(+30) 6978783208', '', '', 37.943119, 22.931942, '/images/pin_orange.png'],

    // Italy
    ['Sordevolo (Biella)', 'Templo de curacion, Lumisial Uriel', '(+39) 320 3555985', 'biella@gnostico.it', '', 45.575964, 7.973140, '/images/pin.png'],
    ['Milano', 'Lumisial Kether', '(+39) 335 7089301', 'milano@gnostico.it', '', 45.466691, 9.185928, '/images/pin.png'],
    ['Bergamo', 'Lumisial Rafael', '(+39) 348 2608030', 'bergamo@gnostico.it', '', 45.700322, 9.676909, '/images/pin.png'],
    ['Genova', 'Lumisial Lakhsmi', '(+39) 392 3439236', 'genova@gnostico.it', '', 44.408580, 8.947434, '/images/pin.png'],
    ['Bologna', 'Lumisial Ra Hoor Khu', '(+39) 333 3606875', 'bologna@gnostico.it', '', 44.498745, 11.342005, '/images/pin.png'],

    // Germany
    ['Berlin', 'Lumisial Rafael', '', 'gnosis.kultur@gmail.com', 'http://gnosissur.github.io', 52.530606, 13.403416, '/images/pin.png'],
    ['Freiburg', '', '+49(0)1638652868', 'gnosissur@gmail.com', 'http://gnosissur.github.io', 47.999999, 7.84210429999996, '/images/pin.png'],

    // Spain
    ['Valencia', 'Lumisial Michael', '', 'valencia@gnosis-samael-lakhsmi.org', '', 39.488548, -0.386228, '/images/pin.png'],
    ['Tenerife', 'Lumisial Aton', '722702113', 'cultivandoando@gmail.com', '', 28.297835, -16.628790, '/images/pin.png'],
    ['Badajoz', '', '670513269', 'prabamananda@yahoo.es', '', 38.880729, -6.971023, '/images/pin.png'],

    // Switzerland
    ['Zürich', '', '+41 22 543 07 31', 'gnosis.helvetia@gmail.com', '', 47.384344, 8.539453, '/images/pin.png'],
    ['St. Gallen', '', '+49(0)1638652868', 'gnosissur@gmail.com', '', 47.428262, 9.376210, '/images/pin.png'],

    // England
    ['Inglaterra', '', '0044 7482 291696', 'fanikatri@gmail.com', '', 53.589267, -0.654595, '/images/pin.png'],

    // USA
    ['Allentown', '', '347-545-8461', 'carlosgnosis@outlook.com', '', 40.612324, -75.489165, '/images/pin.png'],

    // Uruguay
    ['Santa Ana (Colonia)', 'Centro de Capacitación Superior M. RA HOOR KHU, Lumisial Isis', '', '', '', -34.788450, -55.467023, '/images/pin.png'],
    ['Maldonado', 'Lumisial Gabriel', '094937750', 'carlosarragua2@hotmail.com', '', -34.900963, -54.950638, '/images/pin.png'],
    ['Colonia', 'Lumisial Samael Aun Weor', '094131354', 'filadelfia_64@hotmail.com', '', -34.459253, -57.833860, '/images/pin.png'],
    ['Nueva Palmira', '', '095925872', 'javierz50@hotmail.com', '', -33.875750, -58.402013, '/images/pin.png'],
    ['Paysandu', 'Lumisial Atman', '07237455', 'elclubdelavida@adinet.com.uy', '', -32.307307, -58.076608, '/images/pin.png'],
    ['Paysandu', 'Lumisial Anael', '094909699', 'horaciogallo64@yahoo.es', '', -32.314021, -58.090950, '/images/pin.png'],
    ['San Jose', 'Lumisial Rafael', '095925872', 'wsjalily@gmail.com', '', -34.631070, -56.617267, '/images/pin.png'],
    ['Flores', 'Lumisial Michael', '43644829', 'omarbequio@hotmail.com', '', -33.513441, -56.895779, '/images/pin.png'],
    ['Montevideo', 'Lumisial Michael', '43644829', 'omarbequio@hotmail.com', '', -33.513441, -56.895779, '/images/pin.png'],
];

function bindInfoWindow(marker, map, title, desc, telephone, email, web, link) {
    var infoWindowVisible = (function() {
        var currentlyVisible = false;
        return function(visible) {
            if (visible !== undefined) currentlyVisible = visible;
            return currentlyVisible;
        };
    }());
    iw = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function() {
        if (infoWindowVisible()) {
            iw.close();
            infoWindowVisible(false);
        } else {
            var html = "<div style='color:#000;background-color:#fff;padding:5px;width:150px;'><h4>" + title + "</h4><p>" + desc + "<p><p>" + telephone + "<p><a href='mailto:" + email + "' >" + email + "<a><a href='" + link + "'' >" + web + "<a></div>";
            iw = new google.maps.InfoWindow({
                content: html,
                maxWidth: 300
            });
            iw.open(map, marker);
            infoWindowVisible(true);
        }
    });
    google.maps.event.addListener(iw, 'closeclick', function() {
        infoWindowVisible(false);
    });
}

function initMap() {
    requestIdleCallback(createMap);
}

function createMap() {
    var mapOptions = {
        minZoom: 2,
        maxZoom: 18,
        center: new google.maps.LatLng(mapData.lat, mapData.lng),
        zoom: mapData.zoom,
        zoomControl: true,
        zoomControlOptions: { style: google.maps.ZoomControlStyle.LARGE },
        disableDoubleClickZoom: false,
        mapTypeControl: false,
        scaleControl: true,
        scrollwheel: mapData.scrollwheel,
        panControl: false,
        streetViewControl: false,
        draggable: true,
        overviewMapControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#FFFAF0"}]},{"featureType":"water","stylers":[{"color":"#d9edf7"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"lightness":40}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"visibility":"on","color":"#c5dac6"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#CCAA88"},{"lightness":40}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#EEEEEE"}]},{"featureType":"road","stylers":[{"visibility":"simplified"},{"color":"#FF0000"},{"gamma":9}]},{"featureType":"road.highway","stylers":[{"visibility":"on"},{"color":"#FF0000"},{"gamma":8}]},{"featureType":"road.highway.controlled_access","stylers":[{"visibility":"on"},{"color":"#FF0000"},{"gamma":4}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.government","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#DDDDDD"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#CCCCCC"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#AAAAAA"},{"gamma":4}]}]
    }
    var mapElement = document.querySelector('div.map');
    var map = new google.maps.Map(mapElement, mapOptions);
    var markers = [];
    for (i = 0; i < locations.length; i++) {
        if (locations[i][1] == 'undefined') { description = ''; }
        else { description = locations[i][1]; }
        if (locations[i][2] == 'undefined') { telephone = ''; }
        else { telephone = locations[i][2]; }
        if (locations[i][3] == 'undefined') { email = ''; }
        else { email = locations[i][3]; }
        if (locations[i][4] == 'undefined') { web = ''; }
        else { web = locations[i][4]; }
        if (locations[i][7] == 'undefined') { markericon = ''; }
        else { markericon = locations[i][7]; }

        var size = i > 0 ? 50 : 70;
        marker = new google.maps.Marker({
            icon: new google.maps.MarkerImage(markericon, null, null, null, new google.maps.Size(size, size)),
            position: new google.maps.LatLng(locations[i][5], locations[i][6]),
            map: map,
            title: locations[i][0],
            desc: description,
            tel: telephone,
            email: email,
            web: web
        });
        if (web.substring(0, 7) != "http://")
            link = "http://" + web;
        else
            link = web;
        if (i > 0) markers.push(marker);
        bindInfoWindow(marker, map, locations[i][0], description, telephone, email, web, link);
    }

    var markerCluster = new MarkerClusterer(map, markers, {
        gridSize: 30,
        styles: [{
            url: '/images/pin_blue.png',
            height: 70,
            width: 70,
            anchor: [-10, 0],
            textColor: '#ffffff',
            textSize: 16,
            iconAnchor: [15, 48]
        }]
    });
}

requestIdleCallback(function() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.23&callback=initMap';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
});
