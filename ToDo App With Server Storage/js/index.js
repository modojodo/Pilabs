var count = 0;
$(function () {
    var storage = [];
    var objectArr = [];

    $(window).on("load", function () {
        getAndUpdate();
    });

    storeOnClick();
    triggerClickOnEnter();
    storeOnCheckBoxChange();
});