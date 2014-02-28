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
/*jslint unparam: true*/
test("ajaxSuccessCallback test: valid json", function () {
    'use strict';
    ajaxSuccessCallback(function (message) {
        ok(message === "test message");
    },
        {
            text: "test message"
        });
});


test("ajaxSuccessCallback test: invalid type", function () {
    'use strict';
    expect(0);
    ajaxSuccessCallback(function (message) {
        ok(false);
    },
        {
            text: 123
        });
});

test("ajaxSuccessCallback test: json with unneeded fields", function () {
    'use strict';
    expect(0);
    ajaxSuccessCallback(function (message) {
        ok(false);
    },
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
    },
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
    },
        {

        });
});


test("createMessageBox test", function () {
    'use strict';
    ok($("#message").length !== 0);
});

test("showMessage test", function () {
    'use strict';
    showMessage("ololo");
    ok($("#message").text() === "ololo");
});

asyncTest("buttonOnClickHandler test", function () {
    'use strict';
    buttonOnClickHandler({target: {} });

    setTimeout(function () {
        ok($("#message").text().indexOf("Hello world!") !== -1);

        $("#box").remove();
        start();
    }, 1000);
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

