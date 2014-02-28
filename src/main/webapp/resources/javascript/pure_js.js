/*global defineLogIfNotExists*/
/*global defineObjectKeysIfNotExists*/
/*global getSourceFromEvent*/
/*global AJAX_QUERY_URL*/
/*global ajaxSuccessCallback*/
/*global showMessage*/
/*global console*/

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

// CR1 I think in your case it is good to introduce MVC pattern (also it will be quite interesting if you introduce some
// event bus)

/**
 * Execute AJAX-query
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
                // CR1 You define JsonValidator, probably it is better to move all validation to some validator?
                // because you have two different functions to process error cases (here - fail and in JsonValidator)
                // it has a sense to have only one fil function provided by the invoker
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
 * Button click listener implementation
 * @param event the event
 */
function buttonOnClickHandler(event) {
    'use strict';
    var button = getSourceFromEvent(event);
    button.disabled = true;

    getJSON(AJAX_QUERY_URL, function (json) {
        ajaxSuccessCallback(showMessage, json);
    }, function (error, text) {
        console.log(error + " " + text);
    }, function () {
        button.disabled = false;
    });

}

/**
 * Displays message
 * @param message the message
 */
function showMessage(message) {
    'use strict';
    var messageBox = document.getElementById("message");
    messageBox.replaceChild(document.createTextNode(message), messageBox.firstChild);
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
 * Setup click listener
 */
function setupClickListener() {
    'use strict';
    var button = document.getElementById("button");
    if (button !== null) {
        button.onclick = buttonOnClickHandler;
    }
}

/**
 * Setup on page load
 */
window.onload = function () {
    'use strict';
    defineLogIfNotExists();
    defineObjectKeysIfNotExists();
    createMessageBox();
    setupClickListener();
};
