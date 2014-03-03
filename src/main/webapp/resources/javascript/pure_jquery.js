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
/*global Model*/

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
 * This class represents view object
 * @param model the model
 * @param updateText the update text callback
 */
function View(model) {
    'use strict';
    this.model = model;

    model.observable.addObserver(this);

    createMessageBox();
}

View.prototype = {
    /**
     * Setup click listener
     */
    setClickListener: function (handler) {
        'use strict';
        $('#button').click(handler);
    },

    /**
     * Calls when model was changed
     */
    update: function () {
        'use strict';
        var message = this.model.getData();
        $("#box").fadeOut('fast');
        $("#message").text(message);
        $("#box").fadeIn('fast');
    }
};

/**
 * This class represents controller object
 */
function Controler(model, view) {
    'use strict';

    this.model = model;
    this.view = view;
}

Controler.prototype = {


    init: function () {
        'use strict';

        var model = this.model,
            handler = function (data) {
                model.setData(data);
            },
            errorHandler = function(data) {
                alert(data);
                console.log(data);
            };

        // Set button click listener implementation
        this.view.setClickListener(function (event) {
            var button = getSourceFromEvent(event);

            $(button).attr("disabled", true);

            $.ajaxSetup({cache: false});
            $.getJSON(AJAX_QUERY_URL)
                .done(function (json) {
                    ajaxSuccessCallback(handler, errorHandler, json);
                })
                .fail(function (jqxhr, textStatus, error) {
                    console.log(textStatus + " " + error);
                })
                .always(function () {
                    $(button).attr("disabled", false);
                });
        });
    }
};


/**
 * Setup on page load
 */
$(window).load(function () {
    'use strict';
    defineLogIfNotExists();
    defineObjectKeysIfNotExists();

    var model = new Model(),
        view = new View(model),
        controller = new Controler(model, view);

    controller.init();
});
