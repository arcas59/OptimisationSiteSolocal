(function() {
    var campaign = (/utm_campaign=([^&]*)/).exec(window.location.search);
    if (campaign && campaign != null && campaign.length > 1) {
        campaign = campaign[1];
        document.cookie = "_dm_rt_campaign=" + campaign + ";expires=" + new Date().getTime() + 24*60*60*1000 + ";domain=" + window.location.hostname + ";path=/";
        
   }
}
());