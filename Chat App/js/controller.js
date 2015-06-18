/**
 * Created by Umer on 6/17/2015.
 */


function Controller() {

}
//  Get Nick and update nick in the model
Controller.prototype.getNickFromView = function () {
    var controllerForModel = Model.getInstance();
    if ($("#chooseNickTxt").val() == "") {
        alert("Choose a valid nick!");
    } else {
        controllerForModel.nick = $("#chooseNickTxt").val();
        $("#nickChoice").hide();
        $("#userNick").show();
        $("#finalNick").text(controllerForModel.nick);
    }
}


Controller.getInstance = function () {
    if (Controller.instance)return Controller.instance;
    else {
        Controller.instance = new Controller();
        return Controller.instance;
    }
}


// get message from view and pass to the model

Controller.prototype.getMessageFromView = function () {
    var controllerForModel = Model.getInstance();

    if (controllerForModel.nick == "") {
        alert("please enter the nick first!");
    } else if ($("#messageBox").val() !== "") {


        var message = $("#messageBox").val();

        controllerForModel.finalMessage =
        {
            "timeStamp": controllerForModel.timeStamp,
            "msg": controllerForModel.message,
            "nick": controllerForModel.nick
        }
        var controllerForModel = Model.getInstance();

        networkFunc.postMessage(controllerForModel.URL);
        controllerForModel.msg = $("#messageBox").val("");

    } else {
        alert("Cannot send an empty message!");
    }

}


// get message from  model and pass to view


Controller.prototype.listenNewMessages = function () {

    setInterval(function () {
        var controllerForModel = Model.getInstance();
        controllerForModel.getMessage();
    }, 2000);
}




