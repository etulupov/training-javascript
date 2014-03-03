/*global console */
/*global alert */
/*global JsonValidator */
/*jshint -W079 */

/**
 * The URL for AJAX queries
 * @type {string}
 */
var AJAX_QUERY_URL = "/json";


/**
 * Returns source of event
 * @param event the event
 * @return {EventTarget|Object} the source
 */
function getSourceFromEvent(e) {
    'use strict';
    var event = e || window.event;

    return event.target || event.srcElement;
}

/**
 * Defines console object if it not exists (for compatibility with older browsers)
 */
function defineLogIfNotExists() {
    'use strict';

    if (typeof console !== "object" || !console) {
        window.console = {
            log: function (message) {
                alert(message);
            }
        };
    }
}

/**
 * Defines Object.keys if it not exists (for compatibility with older browsers)
 */
function defineObjectKeysIfNotExists() {
    'use strict';

    if (!Object.keys) {
        Object.keys = function (obj) {
            var keys = [], k;
            for (k in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, k)) {
                    keys.push(k);
                }
            }
            return keys;
        };
    }
}

var JsonValidator = {
    /**
     * Validates json-object
     * @param json the object
     * @param rules pairs key => value type
     * @return {Array}
     */
    validate: function (json, rules) {
        'use strict';
        var error = [], key, keys, i, checkResult, propertyType;

        keys = Object.keys(rules);
        for (i = 0; i < keys.length; i += 1) {
            key = keys[i];
            if (!json.hasOwnProperty(key)) {
                error.push("json hasn't property " + key);
            }
        }
        keys = Object.keys(json);
        for (i = 0; i < keys.length; i += 1) {
            key = keys[i];
            propertyType = typeof json[key];
            checkResult = propertyType !== rules[key];

            if (!rules.hasOwnProperty(key)) {
                error.push("json has unknown property " + key);
            } else if (checkResult) {
                error.push(key + "[" + (typeof json[key]) +
                    "] isn't of " + rules[key]);
            }
        }

        return (error.length !== 0) ? error : true;
    }
};

/**
 * AJAX success callback
 * @param callback message callback
 * @param json the json object
 */
function ajaxSuccessCallback(callback, json) {
    'use strict';
    console.log(JSON.stringify(json));

    var rules, result;

    rules = {
        "text": "string"
    };

    result = JsonValidator.validate(json, rules);

    if (result === true) {
        callback(json.text);
    } else {
        alert(result);
        console.log(result);
    }
}



/**
 * This class represents an observable object. An observable object can have one or more observers.
 */
function Observable() {
    'use strict';
    this.observer = [];
}

Observable.prototype = {
    observer: [],

    /**
     * Adds observer to list
     * @param observer the observer object
     */
    addObserver: function (observer) {
        'use strict';
        this.observer.push(observer);
    },

    /**
     * Notifies all registered observer
     */
    notifyObservers: function() {
        'use strict';
        var i;

        for (i = 0; i < this.observer.length; i += 1) {
            this.observer[i].update();
        }
    }
};

/**
 * This class represents model object
 */
function Model() {
    'use strict';
    this.data = "";
    this.observable = new Observable();
}

Model.prototype = {
    data: "",
    observable: null,

    /**
     * Sets the data value and notifies all subscribers
     * @param data
     */
    setData: function(value) {
        'use strict';
        this.data = value;
        this.observable.notifyObservers();
    },

    /**
     * Gets the data value
     * @returns {*}
     */
    getData: function() {
        'use strict';
        return this.data;
    }
};

