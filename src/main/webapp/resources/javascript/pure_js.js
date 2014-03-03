/*global defineLogIfNotExists*/
/*global defineObjectKeysIfNotExists*/
/*global getSourceFromEvent*/
/*global AJAX_QUERY_URL*/
/*global ajaxSuccessCallback*/
/*global showMessage*/
/*global console*/
/*global Model*/
/*global alert*/



/**
 * Returns ajax client
 * @return {Object} ajax client
 */
function getXmlHttp() {
    'use strict';
    var xmlhttp;
    /*global ActiveXObject*/
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e1) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e2) {
            xmlhttp = false;
        }
    }

    if (!xmlhttp && XMLHttpRequest !== 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }

    return xmlhttp;
}


/**
 * Execute AJAX-query
 * This function like JQuery $.getJSON
 *
 * @param url the url
 * @param success success callback
 * @param fail fail callback
 * @param always always callback
 */
function getJSON(url, success, fail, always) {
    'use strict';
    var READY_STATE = 4,
        HTTP_OK_STATUS = 200,
        http = getXmlHttp();

    http.onreadystatechange = function () {
        if (http.readyState === READY_STATE) {
            if (http.status === HTTP_OK_STATUS) {
                // This function like JQuery $.getJSON
                try {
                    success(JSON.parse(http.responseText));
                } catch (e) {
                    fail("Can't parse json!", http.responseText);
                }
            } else {
                fail("Can't load json!", null);
            }

        }
        always();
    };
    http.open('GET', url, true);
    http.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2005 00:00:00 GMT");
    http.send(null);
}


/**
 * Creates div for displaying the message
 */
function createMessageBox() {
    'use strict';
    var element = document.createElement("div"),
        box = document.getElementById("box");

    element.id = "message";

    if (box === null) {
        box = document.body;
    }

    box.appendChild(element);
    element.appendChild(document.createTextNode("Click button to download the data..."));
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
        var button = document.getElementById("button");
        if (button !== null) {
            button.onclick = handler;
        }
    },

    /**
     * Calls when model was changed
     */
    update: function () {
        'use strict';
        var messageBox = document.getElementById("message"),
            message = this.model.getData();
        messageBox.replaceChild(document.createTextNode(message), messageBox.firstChild);
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
    init: function() {
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
        this.view.setClickListener(function(event) {
            var button = getSourceFromEvent(event);
            button.disabled = true;

            getJSON(AJAX_QUERY_URL, function (json) {
                ajaxSuccessCallback(handler, errorHandler, json);
            }, function (error, text) {
                console.log(error + " " + text);
            }, function () {
                button.disabled = false;
            });
        });
    }
};

/**
 * Setup on page load
 */
window.onload = function () {
    'use strict';
    defineLogIfNotExists();
    defineObjectKeysIfNotExists();

    var model = new Model(),
        view = new View(model),
        controller = new Controler(model, view);

    controller.init();
};



