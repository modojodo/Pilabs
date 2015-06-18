/**
 * Created by Umer on 6/17/2015.
 */

function Model() {

    this.nick = "";
    this.URL = "http://datastore.asadmemon.com/chat/";
    this.timeStamp = new Date().getTime();
    this.msg = "";
    this.pointer = 0;
    this.finalMessage = {};
    this.allMessages = [];
    this.serverMessages = {};
}

Model.getInstance = function () {
    if (Model.instance)return Model.instance;
    else {
        Model.instance = new Model();
        return Model.instance;
    }
}

Model.prototype.postMessage = function (urlToPost) {
    $.ajax({
        url: urlToPost + timeStamp,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(this.finalMessage),
        success: function (res) {
            console.log(res);
        }
    });
}

Model.prototype.getMessage = function () {
    $.get(this.URL, function (res) {
            this.serverMessages = res;
            this.allMessages = [];
            console.log(this.serverMessages);
            for (var m in this.serverMessages) {
                this.allMessages.push(this.serverMessages[m]);
                console.log(this.serverMessages[])
            }
            console.log(this.allMessages.length);
            console.log(this.pointer);
            for (var i = Model.pointer; i < this.allMessages.length; i++)
            debugger;
                console.log((this.allMessages[i].nick))
                $("#messageContainer").append(' <div class="row message-row"><div class="btn btn-default message"><span class="nick">' + this.allMessages[i].nick + '</span><br><span class="msg">' + this.allMessages[i].msg + '</span></div></div>');
                $("#chatarea").scrollTop($("#chatarea").height());
                this.pointer = this.allMessages.length;
        }
    );
}

