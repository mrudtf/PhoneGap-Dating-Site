localStorage['serviceURL'] = "http://localhost:36908/DatingService.svc/";
var serviceURL = localStorage['serviceURL'];

var user = {

    getuserlist: function () {
        $('#busy').show();
        $.ajax({
            type: "GET",
            url: serviceURL + 'GetAllUsers',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            success: GetSuccess,
            error: GetError
        });
    },

    logIn: function () {
        console.log('logIn');

        var input =
            {
                "user": {
                    "UserId": null,
                    "LoginId": user.LoginId,
                    "Password": user.Password,
                    "Email": null,
                    "Sex": null,
                    "Age": null,
                    "Weight": null,
                    "Height": null,
                    "TimeForDating": null,
                    "Recording": null
                }
            };
        $.ajax({
            type: "POST",
            url: serviceURL + 'ValidateUser',
            data: JSON.stringify(input),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            success: user.onValidateSuccess,
            error: user.onAjaxError
        });
    },

    onValidateSuccess: function (data) {
        console.log(data.ValidateUserResult.UserId);
        if (data.ValidateUserResult.UserId != null) {
            $('#userid').val(data.ValidateUserResult.UserId);
            if ($('#save-login').is(":checked")) {
                this.store.storeLoginId(data.ValidateUserResult.loginId);
                this.showAlert('Your search preferences are outdated. Please update.', 'Search Preferences');
            }
        }
        else {
            $('.error-label').text('Username and password is not correct.');
        }
    },

    UserId: undefined,
    LoginId: undefined,
    Password: undefined,
    SecureCode: undefined,
    Email: undefined,
    Sex: undefined,
    Age: undefined,
    Weight: undefined,
    Height: undefined,
    TimeZone: undefined,
    TimeForDating: undefined,
    LastLogin: undefined,
    Recording: undefined,
    BodyType: undefined,
    EthnicBackground: undefined,
    SmokingHabit: undefined,
    RelationshipStatus: undefined,
    Languages: undefined,
    Limits: undefined
};