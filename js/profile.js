var serviceURL = localStorage['serviceURL'];
var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar: false, hScroll: false });

$(window).load(function () {
    setTimeout(loadContactDetails, 100);
});

function loadContactDetails() {
    $('#sex').val(user.Sex);
    $('#age').val(user.Age);
    $('#weight').val(user.Weight);
    $('#height').val(user.Height);
    $('#timezone').val(user.TimeZone);
    loadLanguages();
    $('#body-type').val(user.BodyType);
    $('#ethnic-background').val(user.EthnicBackground);
    $('#smoking-habit').val(user.SmokingHabit);
    $('#relationship-status').val(user.SmokingHabit);
    loadLimits();
}

function loadLanguages() {

}

function loadLimits() {

}

function setInitialValues() {
    $('#age-text').val($('#age').val());
    $('#weight-text').val($('#weight').val());
    $('#height-text').val($('#height').val());
}

