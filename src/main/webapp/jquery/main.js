/**
 * Setup on page load
 */
$(window).load(function () {
    defineLogIfNotExists();
    createMessageBox();
    setupClickListener();
});


/**
 * Button click listener implementation
 * @param event the event
 */
function buttonOnClickHandler(event) {
    var button = getSourceFromEvent(event);

    $(button).attr("disabled", true);


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
    $("#box").fadeOut('fast');
    $("#message").text(message);
    $("#box").fadeIn('fast');
}


/**
 * Creates div for displaying the message
 */
function createMessageBox() {
    var box = $('#box');
    if (box.length == 0) {
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
    $('#button').click(buttonOnClickHandler);
}
