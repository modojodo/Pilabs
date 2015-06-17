function getAndUpdate() {
    $.get('http://datastore.asadmemon.com/us', function (res) {
        objectArr = res;
        if (objectArr.constructor === Array) {
            storage = objectArr;
        }
        var state;
        var task;
        for (i = 0; i < objectArr.length; i++) {
            state = objectArr[i].state;
            task = objectArr[i].task;
            var checked = "checked";
            var strikeout = 'style="text-decoration:line-through"';
            var muteText= "text-muted";
            if (state == true) {
                $("#pending-todos").append('<div class="todo-holder" data-id="' + i + '"><label><input type="checkbox" class="todo-checkbox list-font" ' + checked + ' /> <span class="todo list-font '+muteText+'" ' + strikeout + ' >' + task + '</label></div>');
            } else {
                $("#pending-todos").append('<div class="todo-holder" data-id="' + i + '"><label><input type="checkbox" class="todo-checkbox list-font" /> <span class="todo list-font">' + task + '</label></div>');
            }
        }
    });
}
