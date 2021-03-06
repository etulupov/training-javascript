/*global $*/
/*global test*/
/*global asyncTest*/
/*global ok*/
/*global start*/
/*global expect*/
/*global ajaxSuccessCallback*/
/*global showMessage*/
/*global buttonOnClickHandler*/
/*global JsonValidator*/
/*global Observable*/
/*global Model*/
/*global Controller*/
/*global View*/
/*jslint unparam: true*/
/*jslint browser: true*/

test("ajaxSuccessCallback test: valid json", function () {
    'use strict';
    ajaxSuccessCallback(function (message) {
        ok(message === "test message");
    }, null,
        {
            text: "test message"
        });
});


test("ajaxSuccessCallback test: invalid type", function () {
    'use strict';
    expect(0);
    ajaxSuccessCallback(function (message) {
        ok(false);
    }, null,
        {
            text: 123
        });
});

test("ajaxSuccessCallback test: json with unneeded fields", function () {
    'use strict';
    expect(0);
    ajaxSuccessCallback(function (message) {
        ok(false);
    }, null,
        {
            text: "test message",
            q: "zz",
            p: "zz"
        });
});


test("ajaxSuccessCallback test: json with no text field", function () {
    'use strict';
    expect(0);
    ajaxSuccessCallback(function (message) {
        ok(false);
    }, null,
        {
            q: "zz",
            p: "zz"
        });
});


test("ajaxSuccessCallback test: empty json", function () {
    'use strict';
    expect(0);
    ajaxSuccessCallback(function (message) {
        ok(false);
    }, null,
        {

        });
});


test("createMessageBox test", function () {
    'use strict';
    ok($("#message").length !== 0);
});

test("MVC test", function () {
    'use strict';

    var model = new Model(),
        view = new View(model);

    view.model.setData("ololo"); // Trick: JSLint told that the view is a unused variable, I couldn't fix this warning.

    ok($("#message").text() === "ololo");
});

test("JsonValidator test: valid object", function () {
    'use strict';
    ok(JsonValidator.validate({test: "test"}, {test: "string"}));
});

test("JsonValidator test: object has more properties then needs", function () {
    'use strict';
    ok(JsonValidator.validate({test: "test", test2: 123}, {test: "string"}) !== true);
});

test("JsonValidator test: object hasn't required property", function () {
    'use strict';
    ok(JsonValidator.validate({test2: 123}, {test: "string"}) !== true);
});

test("JsonValidator test: object has property with different type", function () {
    'use strict';
    ok(JsonValidator.validate({test: 123}, {test: "string"}) !== true);
});

test("Observable test: check one observer", function () {
    'use strict';
    var observable = new Observable();
    observable.addObserver({
        update: function() {
            ok(true);
        }
    });

    observable.notifyObservers();
});

test("Observable test: check multiple observers", function () {
    'use strict';
    var observable = new Observable(),
        result1 = false,
        result2 = false;

    observable.addObserver({
        update: function() {
            result1 = true;
        }
    });

    observable.addObserver({
        update: function() {
            result2 = true;
        }
    });

    observable.notifyObservers();

    ok(result1 && result2);
});
