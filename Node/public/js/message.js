/**
 * Created by Umer on 6/17/2015.
 */


function Message() {

    this.sendMessage = function () {
        $("#sendBtn").on("click", function () {

            if (nick == "") {
                alert("please enter the nick first!");
            } else if ($("#messageBox").val() !== "") {


                var message = $("#messageBox").val();

                finalMessage =
                {
                    "timeStamp": timeStamp,
                    "msg": message,
                    "nick": nick
                }

                networkFunc.postMessage(URL);
                $("#messageBox").val("");

            } else {
                alert("Cannot send an empty message!");
            }

        });
    }

    getMessageCallback = function (res) {
        serverMessages = res;
        allMessages = [];
        for (m in serverMessages) {
            allMessages.push(serverMessages[m]);
        }
        for (i = pointer; i < allMessages.length; i++) {
            $("#messageContainer").append(' <div class="row message-row"><div class="btn btn-default message"><span class="nick">' + allMessages[i].nick + '</span><br><span class="msg">' + allMessages[i].msg + '</span></div></div>');
            $("#chatarea").scrollTop($("#chatarea").height());

        }
        pointer = allMessages.length;
    }

    this.recieveMessage = function () {
        var serverMessages = [];
        var pointer = 0;
        var allMessages = [];
        setInterval(function () {
            networkFunc.getMessage(URL, getMessageCallback)
        }, 2000);
    }

}
