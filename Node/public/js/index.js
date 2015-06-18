/**
 * Created by Umer on 6/16/2015.
 */
var networkFunc = new Network();
var msgObj = new Message();
var URL = "http://localhost:3030/data/";
var nick = "";
var timeStamp = new Date().getTime();
var pointer = 0;
var finalMessage = {};
$(function () {

    $("#nickDone").on("click", function () {
        if ($("#chooseNickTxt").val() == "") {
            alert("Choose a valid nick!");
        } else {
            nick = $("#chooseNickTxt").val();
        }
        $("#nickChoice").hide();
        $("#userNick").show();
        $("#finalNick").text(nick);
    });


    msgObj.sendMessage();
    msgObj.recieveMessage();


});
