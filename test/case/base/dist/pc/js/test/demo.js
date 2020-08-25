define('wSubWidget',[], function() {
    var widget = {
        init: function() {
            var el = document.getElementById('tDemo');
            var i = 0;
            setInterval(function() {
                el.innerHTML = ++i;
            }, 1000);
        }
    };
    return widget;
});

require(['wSubWidget'], function(wSubWidget) {
    wSubWidget.init();
});

define("components/t-demo/t-demo.js", function(){});

