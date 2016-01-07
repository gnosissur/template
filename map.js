(function(){var d=null;function e(a){return function(b){this[a]=b}}function h(a){return function(){return this[a]}}var j;
function k(a,b,c){this.extend(k,google.maps.OverlayView);this.c=a;this.a=[];this.f=[];this.ca=[53,56,66,78,90];this.j=[];this.A=!1;c=c||{};this.g=c.gridSize||60;this.l=c.minimumClusterSize||2;this.J=c.maxZoom||d;this.j=c.styles||[];this.X=c.imagePath||this.Q;this.W=c.imageExtension||this.P;this.O=!0;if(c.zoomOnClick!=void 0)this.O=c.zoomOnClick;this.r=!1;if(c.averageCenter!=void 0)this.r=c.averageCenter;l(this);this.setMap(a);this.K=this.c.getZoom();var f=this;google.maps.event.addListener(this.c,
"zoom_changed",function(){var a=f.c.getZoom();if(f.K!=a)f.K=a,f.m()});google.maps.event.addListener(this.c,"idle",function(){f.i()});b&&b.length&&this.C(b,!1)}j=k.prototype;j.Q="https://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m";j.P="png";j.extend=function(a,b){return function(a){for(var b in a.prototype)this.prototype[b]=a.prototype[b];return this}.apply(a,[b])};j.onAdd=function(){if(!this.A)this.A=!0,n(this)};j.draw=function(){};
function l(a){if(!a.j.length)for(var b=0,c;c=a.ca[b];b++)a.j.push({url:a.X+(b+1)+"."+a.W,height:c,width:c})}j.S=function(){for(var a=this.o(),b=new google.maps.LatLngBounds,c=0,f;f=a[c];c++)b.extend(f.getPosition());this.c.fitBounds(b)};j.z=h("j");j.o=h("a");j.V=function(){return this.a.length};j.ba=e("J");j.I=h("J");j.G=function(a,b){for(var c=0,f=a.length,g=f;g!==0;)g=parseInt(g/10,10),c++;c=Math.min(c,b);return{text:f,index:c}};j.$=e("G");j.H=h("G");
j.C=function(a,b){for(var c=0,f;f=a[c];c++)q(this,f);b||this.i()};function q(a,b){b.s=!1;b.draggable&&google.maps.event.addListener(b,"dragend",function(){b.s=!1;a.L()});a.a.push(b)}j.q=function(a,b){q(this,a);b||this.i()};function r(a,b){var c=-1;if(a.a.indexOf)c=a.a.indexOf(b);else for(var f=0,g;g=a.a[f];f++)if(g==b){c=f;break}if(c==-1)return!1;b.setMap(d);a.a.splice(c,1);return!0}j.Y=function(a,b){var c=r(this,a);return!b&&c?(this.m(),this.i(),!0):!1};
j.Z=function(a,b){for(var c=!1,f=0,g;g=a[f];f++)g=r(this,g),c=c||g;if(!b&&c)return this.m(),this.i(),!0};j.U=function(){return this.f.length};j.getMap=h("c");j.setMap=e("c");j.w=h("g");j.aa=e("g");
j.v=function(a){var b=this.getProjection(),c=new google.maps.LatLng(a.getNorthEast().lat(),a.getNorthEast().lng()),f=new google.maps.LatLng(a.getSouthWest().lat(),a.getSouthWest().lng()),c=b.fromLatLngToDivPixel(c);c.x+=this.g;c.y-=this.g;f=b.fromLatLngToDivPixel(f);f.x-=this.g;f.y+=this.g;c=b.fromDivPixelToLatLng(c);b=b.fromDivPixelToLatLng(f);a.extend(c);a.extend(b);return a};j.R=function(){this.m(!0);this.a=[]};
j.m=function(a){for(var b=0,c;c=this.f[b];b++)c.remove();for(b=0;c=this.a[b];b++)c.s=!1,a&&c.setMap(d);this.f=[]};j.L=function(){var a=this.f.slice();this.f.length=0;this.m();this.i();window.setTimeout(function(){for(var b=0,c;c=a[b];b++)c.remove()},0)};j.i=function(){n(this)};
function n(a){if(a.A)for(var b=a.v(new google.maps.LatLngBounds(a.c.getBounds().getSouthWest(),a.c.getBounds().getNorthEast())),c=0,f;f=a.a[c];c++)if(!f.s&&b.contains(f.getPosition())){for(var g=a,u=4E4,o=d,v=0,m=void 0;m=g.f[v];v++){var i=m.getCenter();if(i){var p=f.getPosition();if(!i||!p)i=0;else var w=(p.lat()-i.lat())*Math.PI/180,x=(p.lng()-i.lng())*Math.PI/180,i=Math.sin(w/2)*Math.sin(w/2)+Math.cos(i.lat()*Math.PI/180)*Math.cos(p.lat()*Math.PI/180)*Math.sin(x/2)*Math.sin(x/2),i=6371*2*Math.atan2(Math.sqrt(i),
Math.sqrt(1-i));i<u&&(u=i,o=m)}}o&&o.F.contains(f.getPosition())?o.q(f):(m=new s(g),m.q(f),g.f.push(m))}}function s(a){this.k=a;this.c=a.getMap();this.g=a.w();this.l=a.l;this.r=a.r;this.d=d;this.a=[];this.F=d;this.n=new t(this,a.z(),a.w())}j=s.prototype;
j.q=function(a){var b;a:if(this.a.indexOf)b=this.a.indexOf(a)!=-1;else{b=0;for(var c;c=this.a[b];b++)if(c==a){b=!0;break a}b=!1}if(b)return!1;if(this.d){if(this.r)c=this.a.length+1,b=(this.d.lat()*(c-1)+a.getPosition().lat())/c,c=(this.d.lng()*(c-1)+a.getPosition().lng())/c,this.d=new google.maps.LatLng(b,c),y(this)}else this.d=a.getPosition(),y(this);a.s=!0;this.a.push(a);b=this.a.length;b<this.l&&a.getMap()!=this.c&&a.setMap(this.c);if(b==this.l)for(c=0;c<b;c++)this.a[c].setMap(d);b>=this.l&&a.setMap(d);
a=this.c.getZoom();if((b=this.k.I())&&a>b)for(a=0;b=this.a[a];a++)b.setMap(this.c);else if(this.a.length<this.l)z(this.n);else{b=this.k.H()(this.a,this.k.z().length);this.n.setCenter(this.d);a=this.n;a.B=b;a.ga=b.text;a.ea=b.index;if(a.b)a.b.innerHTML=b.text;b=Math.max(0,a.B.index-1);b=Math.min(a.j.length-1,b);b=a.j[b];a.da=b.url;a.h=b.height;a.p=b.width;a.M=b.textColor;a.e=b.anchor;a.N=b.textSize;a.D=b.backgroundPosition;this.n.show()}return!0};
j.getBounds=function(){for(var a=new google.maps.LatLngBounds(this.d,this.d),b=this.o(),c=0,f;f=b[c];c++)a.extend(f.getPosition());return a};j.remove=function(){this.n.remove();this.a.length=0;delete this.a};j.T=function(){return this.a.length};j.o=h("a");j.getCenter=h("d");function y(a){a.F=a.k.v(new google.maps.LatLngBounds(a.d,a.d))}j.getMap=h("c");
function t(a,b,c){a.k.extend(t,google.maps.OverlayView);this.j=b;this.fa=c||0;this.u=a;this.d=d;this.c=a.getMap();this.B=this.b=d;this.t=!1;this.setMap(this.c)}j=t.prototype;
j.onAdd=function(){this.b=document.createElement("DIV");if(this.t)this.b.style.cssText=A(this,B(this,this.d)),this.b.innerHTML=this.B.text;this.getPanes().overlayMouseTarget.appendChild(this.b);var a=this;google.maps.event.addDomListener(this.b,"click",function(){var b=a.u.k;google.maps.event.trigger(b,"clusterclick",a.u);b.O&&a.c.fitBounds(a.u.getBounds())})};function B(a,b){var c=a.getProjection().fromLatLngToDivPixel(b);c.x-=parseInt(a.p/2,10);c.y-=parseInt(a.h/2,10);return c}
j.draw=function(){if(this.t){var a=B(this,this.d);this.b.style.top=a.y+"px";this.b.style.left=a.x+"px"}};function z(a){if(a.b)a.b.style.display="none";a.t=!1}j.show=function(){if(this.b)this.b.style.cssText=A(this,B(this,this.d)),this.b.style.display="";this.t=!0};j.remove=function(){this.setMap(d)};j.onRemove=function(){if(this.b&&this.b.parentNode)z(this),this.b.parentNode.removeChild(this.b),this.b=d};j.setCenter=e("d");
function A(a,b){var c=[];c.push("background-image:url("+a.da+");");c.push("background-position:"+(a.D?a.D:"0 0")+";");typeof a.e==="object"?(typeof a.e[0]==="number"&&a.e[0]>0&&a.e[0]<a.h?c.push("height:"+(a.h-a.e[0])+"px; padding-top:"+a.e[0]+"px;"):c.push("height:"+a.h+"px; line-height:"+a.h+"px;"),typeof a.e[1]==="number"&&a.e[1]>0&&a.e[1]<a.p?c.push("width:"+(a.p-a.e[1])+"px; padding-left:"+a.e[1]+"px;"):c.push("width:"+a.p+"px; text-align:center;")):c.push("height:"+a.h+"px; line-height:"+a.h+
"px; width:"+a.p+"px; text-align:center;");c.push("cursor:pointer; top:"+b.y+"px; left:"+b.x+"px; color:"+(a.M?a.M:"black")+"; position:absolute; font-size:"+(a.N?a.N:11)+"px; font-family:Arial,sans-serif; font-weight:bold");return c.join("")}window.MarkerClusterer=k;k.prototype.addMarker=k.prototype.q;k.prototype.addMarkers=k.prototype.C;k.prototype.clearMarkers=k.prototype.R;k.prototype.fitMapToMarkers=k.prototype.S;k.prototype.getCalculator=k.prototype.H;k.prototype.getGridSize=k.prototype.w;
k.prototype.getExtendedBounds=k.prototype.v;k.prototype.getMap=k.prototype.getMap;k.prototype.getMarkers=k.prototype.o;k.prototype.getMaxZoom=k.prototype.I;k.prototype.getStyles=k.prototype.z;k.prototype.getTotalClusters=k.prototype.U;k.prototype.getTotalMarkers=k.prototype.V;k.prototype.redraw=k.prototype.i;k.prototype.removeMarker=k.prototype.Y;k.prototype.removeMarkers=k.prototype.Z;k.prototype.resetViewport=k.prototype.m;k.prototype.repaint=k.prototype.L;k.prototype.setCalculator=k.prototype.$;
k.prototype.setGridSize=k.prototype.aa;k.prototype.setMaxZoom=k.prototype.ba;k.prototype.onAdd=k.prototype.onAdd;k.prototype.draw=k.prototype.draw;s.prototype.getCenter=s.prototype.getCenter;s.prototype.getSize=s.prototype.T;s.prototype.getMarkers=s.prototype.o;t.prototype.onAdd=t.prototype.onAdd;t.prototype.draw=t.prototype.draw;t.prototype.onRemove=t.prototype.onRemove;
})();

var mapData = mapData || { };
if (!!!mapData.zoom) mapData.zoom = 2;
if (!!!mapData.lat) mapData.lat = 0;
if (!!!mapData.lng) mapData.lng = 0;
if (!!!mapData.scrollwheel) mapData.scrollwheel = false;

var locations = [

    // Greek
    ['Olimpo', 'Centro de Capacitación Superior M. AEON 13, Lumisial Pistis Sophia', '(+30) 693 93 04 152', '', '', 39.986643, 22.280334, '/images/pin.png'],
    ['Athenas', 'Lumisial Michael', '(+30) 6942919983', 'soul-integration@hotmail.com', '', 37.953828, 23.703401, '/images/pin.png'],
    ['Thessalonika', 'Lumisial Kether', '(+30) 6978445052', 'pazegk@yahoo.gr', '', 40.639847, 22.938330, '/images/pin.png'],
    ['Larisa', 'Lumisial Esculapio', '(+30) 6974544719', 'ekmektzogloupantelis@gmail.com', '', 39.635044, 22.411780, '/images/pin.png'],
    ['Xania, Kreta', 'Lumisial Netzach', '(+30) 697-4584536', 'iosif3g@gmail.com', '', 35.511656, 24.019509, '/images/pin.png'],
    ['Karditsa', 'Lumisial Las Nereidas', '(+30) 693-8677770', 'tovalsamo@otenet.gr', '', 39.361323, 21.922236, '/images/pin.png'],
    ['Iraklio, Kreta', '', '(+30) 697 - 4584536', 'makisstathatos@gmail.com', '', 35.340752, 25.144357, '/images/pin.png'],
    ['Bolos', '', '(+30) 6974544719', 'paschos.nik@gmail.com', '', 39.362781, 22.942139, '/images/pin.png'],
    ['Patra', '', '(+30) 697-3234705', 'magapios@yahoo.gr', '', 38.247877, 21.734500, '/images/pin.png'],
    ['Rethymno, Kreta', '', '(+30) 697 - 4584536', 'iosif3g@gmail.com', '', 35.365945, 24.481763, '/images/pin.png'],
    ['Lamia', '', '(+30) 693-8677770', 'tovalsamo@otenet.gr', '', 38.896940, 22.435015, '/images/pin.png'],
    ['Ioannina', '', '(+30) 693 66 79 731', 'kissos.gn@gmail.com', '', 39.668809, 20.852851, '/images/pin.png'],
    ['Syros', '', '(+30) 697 25 05 656', 'gemistosvasilis@yahoo.gr', '', 37.443961, 24.914210, '/images/pin.png'],
    ['Cerres', '', '(+30) 697 25 05 656', 'gemistosvasilis@yahoo.gr', '', 41.092566, 23.541290, '/images/pin.png'],
    ['Dodekanisa', '', '(+30) 6942919983', 'soul-integration@hotmail.com', '', 35.994088, 26.998586, '/images/pin.png'],
    ['Kabala', '', '(+30) 694 61 57 062', 'koukos_n@yahoo.com', '', 40.938684, 24.412882, '/images/pin.png'],
    ['Trikala', '', '(+30) 6974841338', '', '', 39.559515, 21.768080, '/images/pin.png'],
    ['Corintos', '', '(+30) 6978783208', '', '', 37.943119, 22.931942, '/images/pin.png'],

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
        marker = new google.maps.Marker({
            icon: markericon,
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
        markers.push(marker);
        bindInfoWindow(marker, map, locations[i][0], description, telephone, email, web, link);
    }

    var markerCluster = new MarkerClusterer(map, markers, {
        gridSize: 10,
        styles: [{
            url: '/images/pin.png',
            height: 32,
            width: 20,
            anchor: [-18, 0],
            textColor: '#ffffff',
            textSize: 10,
            iconAnchor: [15, 48]
        }]
    });
}









var map, script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&callback=initMap';
script.async = true;
script.defer = true;
document.body.appendChild(script);
