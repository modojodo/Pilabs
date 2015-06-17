/**
 * Created by Umer on 6/17/2015.
 */

function Network() {

    this.postMessage = function (urlToPost) {
        $.ajax({
            url: urlToPost + timeStamp,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(finalMessage),
            success: function (res) {
                console.log(res);
            }
        });
    }


    this.getMessage = function (urlToGet, callback) {
        $.get(urlToGet, callback);
    }

}