/**
 * Created by Umer on 6/16/2015.
 */
function postData(dataToStore) {
    $.ajax({
        url: 'http://datastore.asadmemon.com/us',
        type: 'POST',
        contentType: 'application/json',
        data: dataToStore,
        success: function (res) {
            console.log(res);
        }
    });
}


function triggerClickOnEnter() {
    $("#txtTodo").keyup(function (e) {
        if (e.keyCode == 13) {
            value = $(this).val();
            if (value != "") {
                $("#btnAddTodo").click();
            }
        }
    });

}