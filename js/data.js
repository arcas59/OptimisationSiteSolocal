// Collects client data and updates cookies used by smart sites
ar expireDays = 365,visitLength = 30 * 60000;
$.setCookie("dm_timezone_offset", (new Date()).getTimezoneOffset(), expireDays);
function setSmartSiteCookies() {
    setSmartSiteCookiesInternal("dm_this_page_view","dm_last_page_view","dm_total_visits","dm_last_visit");
}
$.DM.events.on("afterAjax", setSmartSiteCookies);
setSmartSiteCookies();