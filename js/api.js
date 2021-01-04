dmAPI.loadScript(window.rtCommonProps['common.resources.cdn.host'] + '/libs/lozad/1.15.0/lozad.min.js', function () {
    dmAPI.runOnReady('lozadInit', function () {
        window.document.querySelectorAll('img.lazy').forEach(function (img) {
            img.addEventListener('load', function (event) {
                var img = event.target;
                img.style.filter = 'blur(0)';
                setTimeout(function () {
                    $(img).closest('.imageWidget').addClass('lazyLoaded');
                }
                , 250)
            });
        });
        lozad('.lazy', {
            threshold: 0.1,loaded: function (element) {
                if (element.getAttribute('data-background-image')) {
                    element.style.setProperty('background-image',"url('" + element.getAttribute('data-background-image') + "')","important");
                }
            }
        }
        ).observe();
    });
});