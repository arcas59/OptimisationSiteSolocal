window.customWidgetsFunctions["00f7540e9d5448ebbeca82c1efff5bf9~165"] = function (element, data, api) {
    /* API call to get external id */
    var external_id = dmAPI.getSiteExternalId();
    var partner_id = "";
    /* Grab the second id from the pipe delimited string. Eg: 12345678|197138|cse-imagerie-medicale-numerique|710777364|1336862184  */
    if (external_id) {
        var set_partner_id = external_id.split("|")[1];
        if (set_partner_id) {
            partner_id = set_partner_id;
        }
    }
     var api_key  = "wDzEj33dd76WBKTMFo6RLeYrV72TpMIfEMEaM7kKyTJ";
    var page_size = 10;
    var api_call = "https://wpm.yelsterdigital.com/api/v1.0/publisher/feed?api_key=" + api_key + "&format=json&location_partner_id=" + partner_id + "&page_size=" + page_size;
    /* set the api call */
    var content_type = "&content_type=social_post";
    if (data.config.content_type === "daily_menu") {
        content_type = "&content_type=daily_menu";
    }
    api_call = api_call + content_type;
    /* variable for the JSON response to the api call */
    var myData = "";
    /* Makes the api call and returns the JSON */
    function api_get(api_call) {
        var result = null;
        $.ajax({
            async: false,url: api_call,dataType: "json",success: function(data) {
                result = data;
            }
            ,error: function(xhr) {
                console.log( "error" );
                var error_msg = JSON.stringify(xhr.responseJSON.detail);
                if(window.parent.document.URL.indexOf("solocaldudaadmin.eu-responsivesiteeditor.com/preview")>=0 || document.domain !== 'solocaldudaadmin.eu-responsivesiteeditor.com' ){
                    $(".hideComponent").hide();
                }
                 else {
                    $("#" + element.id).find(".solocal-header").hide();
                    $("#" + element.id).find(".solocal-header").hide();
                    $("#" + element.id).find(".solocal-body").hide();
                    $("#" + element.id).find(".solocal-footer").hide();
                    $("#" + element.id).find(".solocal-error-info").text(error_msg);
                }
            }
        });
        return result;
    }
    /* If content_type dropdown is specified */
    if ((data.config.content_type === "social_post") || (data.config.content_type === "daily_menu")) {
        /* This sets the default titles */
        var title = "Actualité";
        if (data.config.content_type === "daily_menu") {
            title = "Ardoise";
        }
        /* This sets the title if it is user specified */
        if (data.config.title) {
            title = data.config.title;
        }
        /* Insert the title in the html */
        $("#" + element.id).find(".solocal-title").text(title);
        /* We only want the first item from the feed for the on page widget */
        var ind = 0;
        json_data = api_get(api_call);
        if (!json_data) {
            $("#" + element.id).find(".solocal-error").show();
            /* Check: number of events > 0 */
        }
         else if (!json_data.data[ind] || json_data.count === 0) {
            if(window.parent.document.URL.indexOf("solocaldudaadmin.eu-responsivesiteeditor.com/preview")>=0 || document.domain !== 'solocaldudaadmin.eu-responsivesiteeditor.com' ){
                $(".hideComponent").hide();
            }
             else {
                $("#" + element.id).find(".solocal-header").hide();
                $("#" + element.id).find(".solocal-header").hide();
                $("#" + element.id).find(".solocal-body").hide();
                $("#" + element.id).find(".solocal-footer").hide();
                $("#" + element.id).find(".solocal-no-content").show();
            }
        }
         else {
            /* Check if content exists and cap the content at 256 chars if necessary */
            var main_content = "";
            var max_len= 256;
            if (json_data.data[ind].content && json_data.data[ind].content !== "") {
                main_content = json_data.data[ind].content;
                if (main_content.length > max_len) {
                    main_content = main_content.substring(0, max_len) + ' <a class="solocal-link-allnews" href="#">...voir la suite</a>';
                }
            }
            /* Check if an image exists */
            var main_image_url = "";
            if (json_data.data[ind].photos && json_data.data[ind].photos.length > 0) {
                main_image_url = json_data.data[ind].photos[0].url;
                $("#" + element.id).find(".solocal-content-image").show();
            }
             else {
                $("#" + element.id).find(".solocal-content-image").hide();
            }
            /* Check if a URL exists */
            var url = "#";
            if (json_data.data[ind].url && json_data.data[ind].url !== "") {
                url = json_data.data[ind].url;
            }
             else {
                $("#" + element.id).find(".solocal-button-link" ).hide();
            }
            /* populate the on-page widget */
            var datestring = solocalDate(json_data.data[ind].publish_at);
            $("#" + element.id).find(".solocal-publish-at").text("Publié le " + datestring);
            $("#" + element.id).find(".solocal-content-text" ).html(main_content);
            $("#" + element.id).find(".solocal-content-image" ).attr("src", main_image_url);
            $("#" + element.id).find(".solocal-button-link" ).attr({
                "href": url, "raw_url": url
            });
            /* If this is a menu, set up the Repas and Servi Le */
            if (data.config.content_type === "daily_menu") {
                $("#" + element.id).find(".solocal-menu-details" ).show();
                $("#" + element.id).find(".solocal-servi" ).text(solocalDate(json_data.data[ind].daily_menu.meal_date));
                $("#" + element.id).find(".solocal-repas" ).text(json_data.data[ind].daily_menu.meal_type);
            }
        }
    }
    function load_modal(modal_data, modal_status) {
        /* Title the modal */
        $("#" + element.id).find(".solocal-title").text(title);
        if (modal_status === "new_modal") {
            var modal_body = "";
        }
        /* This is the url for the next page from the api */
        var loadmore = modal_data.next;
        /* populate the modal pop-up */
        $.each(modal_data.data, function (key, value) {
            /* Only add html for an image if there is one */
            var modal_image = "";
            if (value.photos && value.photos.length > 0) {
                modal_image = '<img style="text-align: left; margin-top: 5px;" src="' + value.photos[0].url + '" />';
            }
            /* Only add a button if there is a url */
            modal_url = "";
            if (value.url) {
                modal_url = '<a type="url" class="solocal-button-link" href="' + value.url + '" raw_url="' + value.url + '" target="_blank">';
                modal_url = modal_url + '<div class="dmWidget call-to-action"><span class="text">Clique ici</span></div></a>';
            }
            /* Only add the menu items if this is a daily_menu return */
            var daily_menu = "";
            if (value.daily_menu) {
                daily_menu = '<div class="solocal-menu-details"><p>';
                if (value.daily_menu.meal_date) {
                    daily_menu = daily_menu + '<b>Servi le: <span class="solocal-servi">' + value.daily_menu.meal_date + '</span></b><br />';
                }
                if (value.daily_menu.meal_type) {
                    daily_menu = daily_menu + '<b>Repas: <span class="solocal-repas">' + value.daily_menu.meal_type + '</span></b>';
                }
                daily_menu = daily_menu + '</p></div>';
            }
            modal_body = '<div class="solocal-widget-modal">';
            modal_body = modal_body + '<div class="solocal-modal-container">';
            modal_body = modal_body + '<div class="solocal-body">';
            modal_body = modal_body + '<p class="solocal-publish-at">Publié le ' + solocalDate(value.publish_at) + '</p>';
            modal_body = modal_body + modal_image;
            modal_body = modal_body + '<p class="solocal-content-text">' + value.content + '</p>';
            modal_body = modal_body + daily_menu;
            modal_body = modal_body + modal_url;
            modal_body = modal_body + '</div></div><hr class="solocal-hr"></div>';
            $("#" + element.id).find(".solocal-modal-content").append(modal_body);
        });
        if (loadmore) {
            $("#" + element.id).find(".solocal-modal-content").append('<div class="solocal-load-more" style="opacity: 0;">' + loadmore + '</div>');
        }
         else {
            $("#" + element.id).find(".solocal-modal-content").append('<div class="solocal-load-end" style="text-align: center; color: #ddd;"><i></i></div>');
        }
        // return loadmore;
        /* the infinite scroll! */
        $("#" + element.id).find(".solocal-modal").scroll(function() {
            /* If we hit the last element unattach the scroll so no js errors */
            if ($("#" + element.id).find(".solocal-load-end").length) {
                return 0;
            }
            var offset  = $("#" + element.id).find(".solocal-load-more").offset().top;
            var height  = $("#" + element.id).find(".solocal-modal").innerHeight();
            var scrolltop  = $("#" + element.id).find(".solocal-modal").scrollTop();
            var scrollheight  = $("#" + element.id).find(".solocal-modal")[0].scrollHeight;
            var sandh = scrolltop + height;
            if ((scrolltop + height) >= (scrollheight-150)) {
                /* Grab the "next" link and then remove the element */
                var next_link = $("#" + element.id).find(".solocal-load-more").text();
                $("#" + element.id).find(".solocal-load-more").remove();
                /* Get the next page of content */
                var more_modal_data = api_get(next_link);
                if (more_modal_data) {
                    load_modal(more_modal_data,'existing');
                }
            }
        });
        /* show the modal */
        $("#" + element.id).find(".solocal-link-allnews").click(function() {
            /* First lets make sure we have a clean modal */
            $("#" + element.id).find(".solocal-modal-content").empty();
            $("#" + element.id).find(".solocal-modal-content").html('<h2 class="solocal-title" style="margin-left: 60px;">News</h2><hr class="solocal-hr">');
            var modal_json = api_get(api_call);
            load_modal(modal_json, 'new_modal');
            $("#" + element.id).find(".solocal-modal").show();
        });
         /* hide the modal */
        $("#" + element.id).find(".solocal-modal-close").click(function() {
            $("#" + element.id).find(".solocal-modal").hide();
        });
        /* hide the modal if background is clicked */
        window.onclick = function(event) {
            if (event.target == $("#" + element.id).find(".solocal-modal")[0]) {
                $("#" + element.id).find(".solocal-modal").hide();
            }
        }
        /* Format the date in Solocal format */
        function solocalDate(publish_at) {
            var parts = publish_at.split(/[\s+.]+/);
            var date_parts = parts[0].split('-');
            var date_string = date_parts[1] + "/" + date_parts[2] + "/" + date_parts[0] + " " + parts[1];
            d = new Date(date_string);
            var datestring = ("0" + d.getDate()).slice(-2) + "/" + ("0"+(d.getMonth()+1)).slice(-2) + "/" +d.getFullYear() + " à " + ("0" + d.getHours()).slice(-2) + "h" + ("0" + d.getMinutes()).slice(-2);
            return datestring;
        }
        /* Turn outline shadow on and off */
        if (!data.config.shadow) {
            $("#" + element.id).find(".solocal-widget").css("box-shadow","none");
        }
        /* Turn popup outline shadow on and off */
        if (!data.config.popup_shadow) {
            $("#" + element.id).find(".solocal-modal-body").css("box-shadow","none");
        }
    };
