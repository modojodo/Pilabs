/**
 * Created by Umer on 6/15/2015.
 */

$(function () {

    $("#addTask").on("click", function () {
        if($("#toDoText").val()==""){
            alert("Please enter some task to perform");
        }else{
            var toDoText = $("#toDoText").val();
            var html=$('<tr class="tasks"><td ><input id="check" type="checkbox"/></td><td><li class="list-group-item">'+toDoText+'</li> </td> </tr>');
            $("#tasksToPerform>.table").append(html);
        }
        html.find("#check").on("change",function(){
            if(this.checked){
                $(this).parent($(".tasks")).remove();
            }
        });
    });




});