jQuery.DM.updateWidthAndHeight();
$(window).resize(function () {
});
$(window).bind("orientationchange", function (e) {
    $.layoutManager.initLayout();
});
$(document).resize(function () {
});