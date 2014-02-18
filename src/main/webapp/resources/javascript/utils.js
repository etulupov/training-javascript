/**
 * The URL for AJAX queries
 * @type {string}
 */
var AJAX_QUERY_URL = "/js-training/json";


/**
 * Returns source of event
 * @param event the event
 * @return {EventTarget|Object} the source
 */
function getSourceFromEvent(event) {
    var event = event || window.event;

    return event.target || event.srcElement;
}

/**
 * Defines console object if it not exists (for compatibility with older browsers)
 */
function defineLogIfNotExists() {
    if (typeof console != "object" || !console) {
        window.console = {
            log: function () {
            }
        };
    }
}


JsonValidator = {
    /**
     * Validates json-object
     * @param json the object
     * @param rules pairs key => value type
     * @return {Array}
     */
    validate: function (json, rules) {
        var error = [];
        for (var key in rules) {
            if (!json.hasOwnProperty(key)) {
                error.push("json hasn't property " + key);
            }
        }
        for (var key in json) {
            if (!rules.hasOwnProperty(key)) {
                error.push("json has unknown property " + key);
            } else if (typeof json[key] != rules[key]) {
                error.push(key + "[" + (typeof json[key]) +
                    "] isn't of " + rules[key]);
            }
        }

        return (error.length != 0) ? error : true;
    }
};

/**
 * AJAX success callback
 * @param callback message callback
 * @param json the json object
 */
function ajaxSuccessCallback(callback, json) {
    console.log(json);

    var rules = {
        "text": "string"
    };
    var result = JsonValidator.validate(json, rules);

    if (result === true) {
        callback(json.text);
    } else {
        // CR1: Probably is it better to display to user that something is wrong?
        console.log(result);
    }
}