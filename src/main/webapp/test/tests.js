test("ajaxSuccessCallback test: valid json", function () {
    ajaxSuccessCallback(function (message) {
            ok(message == "test message");
        },
        {
            text: "test message"
        });
});


test("ajaxSuccessCallback test: invalid type", function () {
    expect(0);
    ajaxSuccessCallback(function (message) {
            ok(false);
        },
        {
            text: 123
        });
});

test("ajaxSuccessCallback test: json with unneeded fields", function () {
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
    expect(0);
    ajaxSuccessCallback(function (message) {
            ok(false);
        },
        {

        });
});


test("createMessageBox test", function () {
    ok($("#message").length != 0);
});

test("showMessage test", function () {
    showMessage("ololo")
    ok($("#message").text() == "ololo");
});

asyncTest("buttonOnClickHandler test", function () {

    buttonOnClickHandler({target: new Object()});

    setTimeout(function () {
        ok($("#message").text().indexOf("Hello world!") != -1);

        $("#box").remove();
        start();
    }, 1000);
});

// CR1 Please add test for JsonValidator with different arguments