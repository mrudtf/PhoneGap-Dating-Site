var serviceURL = localStorage['serviceURL'];
var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar: false, hScroll: false });

$(window).load(function () {
    setTimeout(getAllContacts, 100);

    $('#back').bind('click', function () {

    })

    $('#all').bind('click', function () {

    })

    $('#online').bind('click', function () {

    })

    $('#number-of-contacts').bind('click', function () {

    })

    $('#search-preferences').bind('click', function () {
        window.location.replace('searchpreferences.html');
    })

    $('#profile').bind('click', function () {
        window.location.replace('profile.html');
    })
});

$(document).ajaxError(function (event, request, settings) {
    $('#busy').hide();
    alert("Error accessing the server");
});

function getAllContacts() {
    $('#busy').show();
    $.ajax({
        type: "GET",
        url: serviceURL + 'GetAllUsers',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: onGetSuccess,
        error: common.onAjaxError
    });
}

function getOnlineContacts() {
    $('#busy').show();
    $.ajax({
        type: "GET",
        url: serviceURL + 'GetAllUsers',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: onGetSuccess,
        error: common.onAjaxError
    });
}

function onGetSuccess(data) {
    $('#busy').hide();
    $('#userList li').remove();
    users = data.GetAllUsersResult;
    $.each(users, loadData);
    setTimeout(function () {
        scroll.refresh();
    });
}

function loadData(index, user) {
    $('#userList').append('<li><a href="userdetails.html?id=' + user.UserId + '">' +
            '<p class="line1">' + index + 1 + ' ' + user.LoginId + '</p>' +
            '<p class="line2">' + user.Height + ' ' + user.Weight + '</p>' + '</a></li>');
};