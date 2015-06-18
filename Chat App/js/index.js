/**
 * Created by Umer on 6/16/2015.
 */

$(function () {

   var viewObj = new View();

    viewObj.listenNickClick();
    viewObj.sendMessage();


    var contObj=  new Controller();
    contObj.listenNewMessages();


});
