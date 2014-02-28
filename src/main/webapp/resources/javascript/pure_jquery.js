/*global  $*/
/*global defineLogIfNotExists*/
/*global defineObjectKeysIfNotExists*/
/*global getSourceFromEvent*/
/*global AJAX_QUERY_URL*/
/*global ajaxSuccessCallback*/
/*global showMessage*/
/*global console*/
/*global alert*/
/*jslint unparam: true*/

/**
 * Button click listener implementation
 * @param event the event
 */
function buttonOnClickHandler(event) {
    'use strict';
    var button = getSourceFromEvent(event);

    $(button).attr("disabled", true);

    $.ajaxSetup({cache: false});
    $.getJSON(AJAX_QUERY_URL)
        .done(function (json) {
            ajaxSuccessCallback(showMessage, json);
        })
        .fail(function (jqxhr, textStatus, error) {
            console.log(textStatus + " " + error);
        })
        .always(function () {
            $(button).attr("disabled", false);
        });

}

/**
 * Displays message
 * @param message the message
 */
function showMessage(message) {
    'use strict';
    $("#box").fadeOut('fast');
    $("#message").text(message);
    $("#box").fadeIn('fast');
}


/**
 * Creates div for displaying the message
 */
function createMessageBox() {
    'use strict';
    var box = $('#box');
    if (box.length === 0) {
        box = $("body");
    }
    $('<div>', {
        id: 'message'
    }).appendTo(box)
        .text('Click button to download the data');
}

/**
 * Setup click listener
 */
function setupClickListener() {
    'use strict';
    $('#button').click(buttonOnClickHandler);
}

/**
 * Setup on page load
 */
$(window).load(function () {
    'use strict';
    defineLogIfNotExists();
    defineObjectKeysIfNotExists();
    createMessageBox();
    setupClickListener();
});
