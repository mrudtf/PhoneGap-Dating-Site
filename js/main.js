var app = {

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
            url: "http://localhost:36908/DatingService.svc/ValidateUser",
            data: JSON.stringify(input),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            success: app.onValidateSuccess,
            error: app.onAjaxError
        });
    },

    onValidateSuccess: function (data) {
        console.log(data.ValidateUserResult.UserId);
        if (data.ValidateUserResult.UserId != null) {
            $('#userid').val(data.ValidateUserResult.UserId);
            if ($('#save-login').is(":checked")) {
                this.store.storeLoginId(data.ValidateUserResult.loginId);
            }
        }
        else {
            $('.error-label').text('Username and password is not correct.');
        }
    },

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },

    renderSplash: function () {
        $('.busy').show();
        $('.header').toggle(false);
        $('.splash').toggle(true);
        $('.new-user-registration-link').toggle(false);
        $('.new-user-registration').toggle(false);
        $('.profile').toggle(false);
        $('.audio').toggle(false);
        $('.search-profile').toggle(false);
        $('.online-users').toggle(false);
        $('.login-block').toggle(false);
        setTimeout(this.initialize(), 100);
    },

    renderHomeView: function () {
        $('.busy').hide();
        $('.header').toggle(true);
        $('.splash').toggle(false);
        $('.new-user-registration-link').toggle(true);
        $('.new-user-registration').toggle(false);
        $('.profile').toggle(false);
        $('.audio').toggle(false);
        $('.search-profile').toggle(false);
        $('.online-users').toggle(false);
        $('.login-block').toggle(true);

        $('#new-user-button').bind('click', function () {
            var loginId = app.randomString(6, '#aA');
            var password = app.randomString(6, '#');
            $('#login-id-label').text(loginId);
            $('#password-label').text(password);

            $('.splash').toggle(false);
            $('.new-user-registration-link').toggle(false);
            $('.new-user-registration').toggle(true);
            $('.profile').toggle(false);
            $('.audio').toggle(false);
            $('.search-profile').toggle(false);
            $('.online-users').toggle(false);
            $('.login-block').toggle(true);
        })

        $('#login-button').bind('click', function () {
            app.logIn();
        })

        $('#save-info-button').bind('click', function () {
            app.saveInfo();
        })

        $('#save-profile-button').bind('click', function () {
            app.saveProfile();
        })

        $('#save-search-profile-button').bind('click', function () {
            app.saveSearchPreferences();
        })

        $('#record-audio-button').bind('click', function () {
            app.recordAudio();
        })

        $('#start-record-button').bind('click', function () {
            app.startRecording();
        })

        $('#stop-record-button').bind('click', function () {
            app.stopRecording();
        })

        $('#play-button').bind('click', function () {
            app.startRecording();
        })

        $('#stop-button').bind('click', function () {
            app.stopRecording();
        })

        $('#record-complete-button').bind('click', function () {
            $('.new-user-registration-link').toggle(false);
            $('.new-user-registration').toggle(false);
            $('.profile').slideToggle(true);
            $('.audio').toggle(false);
            $('.search-profile').toggle(false);
            $('.online-users').toggle(false);
            $('.login-block').toggle(false);
        })
    },

    validateEmail: function () {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(user.Email.val()) === false) {
            return false;
        }
        return true;
    },

    randomString: function (length, chars) {
        var mask = '';
        if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
        if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (chars.indexOf('#') > -1) mask += '0123456789';
        if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
        var result = '';
        for (var i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
        return result;
    },

    startRecording: function (fileName) {
        var src = fileName;
        this.mediaRec = new Media(src,
            onSuccess,
            function (err) {
                console.log("startRecording():Audio Error: " + err.code);
            });
        this.mediaRec.startRecord();
    },

    onSuccess: function () {
        console.log("onSuccess");
    },

    stopRecording: function () {
        this.mediaRec.stopRecord();
    },

    recordAudio: function () {
        console.log("recordAudio");
        $('.new-user-registration-link').toggle(false);
        $('.new-user-registration').toggle(false);
        $('.profile').toggle(false);
        $('.audio').slideToggle(true);
        $('.search-profile').toggle(false);
        $('.online-users').toggle(false);
        $('.login-block').toggle(false);
    },

    saveInfo: function () {
        console.log('saveInfo');
        if ($('#terms-check').is(":checked")) {
            if (app.validateEmail()) {
                var input =
                    {
                        "user": {
                            "UserId": 0,
                            "LoginId": user.LoginId,
                            "Password": user.Password,
                            "Email": user.Email.val(),
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
                    url: "http://localhost:36908/DatingService.svc/AddUser",
                    data: JSON.stringify(input),
                    contentType: 'application/json; charset=utf-8',
                    dataType: "json",
                    success: app.onSaveSuccess,
                    error: app.onAjaxError
                });
            }
            else {
                $('.error-label').text('Invalid email address.');
            }
        }
        else {
            $('.error-label').text('Please check the terms and conditions.');
        }
    },

    onSaveSuccess: function (data) {
        $('#userid').val(data.AddUserResult.UserId);
        $('.new-user-registration-link').toggle(false);
        $('.new-user-registration').toggle(false);
        $('.profile').slideToggle(true);
        $('.audio').toggle(false);
        $('.search-profile').toggle(false);
        $('.online-users').toggle(false);
        $('.login-block').toggle(false);
    },

    onAjaxError: function (xhr, ajaxOptions, error) {
        $('.error-label').text(xhr.responseText);
    },

    saveProfile: function () {
        console.log('saveProfile');
        $('.new-user-registration-link').toggle(false);
        $('.new-user-registration').toggle(false);
        $('.profile').toggle(false);
        $('.audio').toggle(false);
        $('.search-profile').slideToggle(true);
        $('.online-users').toggle(false);
        $('.login-block').toggle(false);
    },

    saveSearchPreferences: function () {
        console.log('saveSearchPreferences');
        $('.new-user-registration-link').toggle(false);
        $('.new-user-registration').toggle(false);
        $('.profile').toggle(false);
        $('.audio').toggle(false);
        $('.search-profile').toggle(false);
        $('.online-users').slideToggle(true);
        $('.login-block').toggle(false);
    },

    recordAudio: function () {
        console.log('recordAudio');
        $('.new-user-registration-link').toggle(false);
        $('.new-user-registration').toggle(false);
        $('.profile').toggle(false);
        $('.audio').slideToggle(true);
        $('.search-profile').toggle(false);
        $('.online-users').toggle(false);
        $('.login-block').toggle(false);
    },

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },

    initialize: function () {
        var self = this;
        this.store = new LocalStorageStore(function () {
            self.renderHomeView();
        });
    }
};

app.renderSplash();

var user = {
    UserId: $('#userid'),
    LoginId: $('#login-id-label').text() != '' ? $('#login-id-label').text() : $('#login-id-text').value(),
    Password: $('#password-label').text() != '' ? $('#password-label').text() : $('#password-text').value(),
    Email: $('#email'),
    Sex: $('#sex'),
    Age: $('#age'),
    Weight: $('#weight'),
    Height: $('#height'),
    TimeForDating: $('#time-for-dating'),
    Recording: $('#record-complete-button')
};