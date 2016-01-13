WebFontConfig = {
    custom: {
        families: ['Gotham-Medium'],
        urls: ['/fonts/fonts.css', '/fonts/font-awesome.min.css']
    },
    google: {
        families: ['Open Sans:400']
    },
};
(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();
