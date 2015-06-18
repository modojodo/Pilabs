/**
 * Created by Umer on 6/17/2015.
 */

function View() {
}


View.prototype.listenNickClick = function () {

    $("#nickDone").on("click", function () {
        var controllerForView = Controller.getInstance();
        controllerForView.getNickFromView();
    });
}
View.prototype.sendMessage = function () {
    $("#sendBtn").on("click", function () {
        var controllerForView = Controller.getInstance();
        controllerForView.getMessageFromView();
    });
}




