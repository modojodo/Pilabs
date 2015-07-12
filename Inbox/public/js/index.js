/**
 * Created by Umer on 6/19/2015.
 */

$(function () {
    msgViewerIsEmpty();
    var lastMsgSelected = "";
    var cls = false;

    $(document).on('click', '.msg-list-container', function () {
        if (lastMsgSelected != "") {
            lastMsgSelected.removeClass("msg-list-container-selected");
            lastMsgSelected.removeClass("animated flash");
        }
        //$('#msg-txt-wrapper').addClass("msg-list-container-selected");

        //$('#msg-viewer').show();


        $(this).addClass("msg-list-container-selected");
        $(this).addClass("animated flash");
        var emailId, subj, msg;
        emailId = $(this).find($('.email-wrapper')).text();
        subj = $(this).find($('.subject-wrapper')).text();
        msg = $(this).find($('.text-wrapper')).text();
        $('#msg-viewer').html('	<div class="row" id="sender-info"><div class="col-lg-2"><div id="user-img" class="animated bounceIn"><i class="fa fa-user fa-2x"></i></div></div><div class="col-lg-4"><div id="sender-email" class="info animated bounceIn">' + emailId + '</div><div id="sender-subj" class="animated bounceIn">' + subj + '</div>  </div> <div class="col-lg-4"><div class="sender-date"> <div class="label">22/6/2015</div></div></div></div><div class="row"><div id="message-body"> <div id="msg-txt-wrapper" class="animated fadeIn">' + msg + ' </div></div> </div>');
        //$('#sender-email').text(emailId);
        //$('#sender-subj').text(subj);
        //$('#msg-txt-wrapper').text(msg);
        lastMsgSelected = $(this);

    });
    $(document).on('click', '.msgCheck', function (e) {
        e.stopPropagation();
    });
    $(document).on('click', '.starMark', function (e) {
        e.stopPropagation();
       var dataToStore= {
            "id": $(this).parent().attr('data-id'),
            "star": true
        }
        $.ajax({
            url: 'http://localhost:3030/label',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(dataToStore),
            success: function (res) {
                console.log(res);
            }
        });
    });
    var inboxMessages = [];

//Initializing the modal
    $('#composeBtn').on("click", function () {
        $('#composeModal').modal();
    });


    $(window).on('load', function () {
        loadInbox();
    });

    $('#inboxMail').on('click', function () {
        loadInbox();
    });

    function appendMsgList(arr, fn) {
        var startType= "";


        if (arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
                if(arr[i].star==true){
                    startType='fa-star';

                }else{
                    startType='fa-star-o';
                }
                $('#msgs-list').append('<div class="btn-default msg-list-container"><div class="msg-list-wrapper"><div class="col-lg-2 operation-holder" data-id="' + arr[i]._id + '"><input class="msgCheck" type="checkbox"/><br/><i class="starMark fa '+startType+' btn-default btn btn-default star-icon"></i></div><div class="col-lg-10 content-holder" ><div class="email-wrapper">' + arr[i].senderEmail + '</div><div class="subject-wrapper">' + arr[i].subject + '</div> <div class="text-wrapper"> ' + arr[i].msg + '</div> </div></div> </div>');
            }
        } else if ($.trim($("#msgs-list").html()) == '') {
            fn();
        }
    }

    //function appendStarMsgList(){
    //
    //
    //
    //}


    function loadInbox() {
        $.get('http://localhost:3030/getmsg', function (res) {
            inboxMessages = res;
            makeInboxEmpty();
            appendMsgList(inboxMessages, inboxIsEmpty);
        });
    }


    var sentMsg = [];
    $("#sentMail").on('click', function () {
        $.get('http://localhost:3030/sent', function (res) {
            sentMsg = res;
            makeInboxEmpty();
            appendMsgList(sentMsg, sentBoxIsEmpty);

        });


    });


    function msgViewerIsEmpty() {

        if ($.trim($("#msg-viewer").html()) == '') {

            $("#msg-viewer").html('<p id="msgViewerInfo"><i class="fa fa-hand-o-left"></i> Hey I\'m a <b>mail viewer</b>, select any mail from inbox to make use of me. <i class="fa fa-smile-o"></i> </p>');
        }
    }

    function makeInboxEmpty() {
        $('#msgs-list').empty();
    }

    function inboxIsEmpty() {
        $('#msgs-list').html('<p><b>Wohoo! There are no messages to read! :)</b></p>');
    }

    function sentBoxIsEmpty() {
        $('#msgs-list').html('<p><b>Uh, oh. You haven\'t sent any email!</b></p>');
    }


})
;
