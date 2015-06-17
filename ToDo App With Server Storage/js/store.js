/**
 * Created by Umer on 6/16/2015.
 */
function storeOnClick() {

    $("#btnAddTodo").click(function (e) {
        var value = $("#txtTodo").val();
        if (value !== "") {
            $("#pending-todos").append('<div class="todo-holder" data-id="' + count + '"><label><input type="checkbox" class="todo-checkbox list-font" /> <span class="todo">' + value + '</label></div>');
            $("#txtTodo").val("");

            storage.push({
                "state": false,
                "task": value
            });
            count++;
            postData(JSON.stringify(storage))
        }
    });
}


function storeOnCheckBoxChange() {
    $(document.body).on('click', ".todo-checkbox", function () {
        var index = $(this).parent().parent().attr("data-id");
        index = parseInt(index);

        if ($(this).is(":checked")) {
            $(this).next(".todo").css("text-decoration", "line-through");
            $(this).next(".todo").addClass("text-muted");
            storage[index].state = true;
        } else {
            $(this).next(".todo").css("text-decoration", "none");
            $(this).next(".todo").removeClass("text-muted");
            storage[index].state = false;
        }
        postData(JSON.stringify(storage));
    });
}


