localStorage['serviceURL'] = "http://localhost:36908/DatingService.svc/";
var serviceURL = localStorage['serviceURL'];

var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar: false, hScroll: false });

var app = {

    getUserlist: function () {
        $('#busy').show();
        $.ajax({
            type: "GET",
            url: serviceURL + 'GetAllUsers',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            success: app.onGetSuccess,
            error: app.onAjaxError
        });
    },

    onGetSuccess: function (data) {
        $('#busy').hide();
        $('#userList li').remove();
        users = data.GetAllUsersResult;
        $.each(users, app.loadData);
        setTimeout(function () {
            scroll.refresh();
        });
        $('.header').toggle(true);
        $('.splash').toggle(false);
        $('.new-user-registration-link').toggle(false);
        $('.new-user-registration-password').toggle(false);
        $('.new-user-registration-email').toggle(false);
        $('.profile').toggle(false);
        $('.audio').toggle(false);
        $('.search-profile').toggle(false);
        $('#wrapper').toggle(true);
        $('.login-block').toggle(false);
        $('.forgot-login-link').toggle(false);
    },

    loadData: function (index, user) {
        $('#userList').append('<li><a href="userdetails.html?id=' + user.UserId + '">' +
                '<p class="line1">' + index + 1 + ' ' + user.LoginId + '</p>' +
                '<p class="line2">' + user.Height + ' ' + user.Weight + '</p>' + '</a></li>');
    },

    logIn: function () {
        //console.log('logIn');
        app.clearError();
        $.ajax({
            type: "POST",
            url: serviceURL + 'ValidateUser',
            data: '{"loginId": "' + $('#login-id-text').val() + '", "password": "' + $('#password-text').val() + '"}',
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
            app.showAlert('Your search preferences are outdated. Please update.', 'Search Preferences');
            app.getUserlist();
        }
        else {
            app.setError('Username and password is not correct.');
        }
    },

    setError: function (message) {
        $('.error-label').text(message);
    },

    clearError: function () {
        $('.error-label').text('');
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
        $('.new-user-registration-password').toggle(false);
        $('.new-user-registration-email').toggle(false);
        $('.profile').toggle(false);
        $('.audio').toggle(false);
        $('.search-profile').toggle(false);
        $('#wrapper').toggle(false);
        $('.login-block').toggle(false);
        $('.forgot-login-link').toggle(false);
        setTimeout(this.initialize(), 100);
    },

    renderHomeView: function () {
        $('.busy').hide();
        $('.header').toggle(true);
        $('.splash').toggle(false);
        $('.new-user-registration-link').toggle(true);
        $('.new-user-registration-password').toggle(false);
        $('.new-user-registration-email').toggle(false);
        $('.profile').toggle(false);
        $('.audio').toggle(false);
        $('.search-profile').toggle(false);
        $('#wrapper').toggle(false);
        $('.login-block').toggle(true);
        $('.forgot-login-link').toggle(true);

        $('#new-user-button').bind('click', function () {
            $('.splash').toggle(false);
            $('.new-user-registration-link').toggle(false);
            $('.new-user-registration-password').toggle(true);
            $('.new-user-registration-email').toggle(false);
            $('.profile').toggle(false);
            $('.audio').toggle(false);
            $('.search-profile').toggle(false);
            $('#wrapper').toggle(false);
            $('.login-block').toggle(false);
            $('.forgot-login-link').toggle(false);
        })

        $('#login-button').bind('click', function () {
            app.logIn();
        })

        $('#sign-up-button').bind('click', function () {
            app.signUp();
            $('#header').text('Dark Room');
        })

        $('#next-button').bind('click', function () {
            app.next();
            $('#header').text('Profile Settings');
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
            $('.new-user-registration-password').toggle(false);
            $('.new-user-registration-email').toggle(false);
            $('.profile').slideToggle(true);
            $('.audio').toggle(false);
            $('.search-profile').toggle(false);
            $('#wrapper').toggle(false);
            $('.login-block').toggle(false);
            $('.forgot-login-link').toggle(false);
        })
    },

    signUp: function () {
        app.clearError();
        if ($('#new-password-text').val() != '') {
            if ($('#terms-check').is(":checked")) {
                if ($('#older-than-21-check').is(":checked")) {
                    var password = $('#new-password-text').val();
                    var loginId = app.randomString(6, '#aA');
                    user.Password = password;
                    user.LoginId = loginId;
                    $('#login-id-label').text(loginId);

                    $('.new-user-registration-link').toggle(false);
                    $('.new-user-registration-password').toggle(false);
                    $('.new-user-registration-email').toggle(true);
                    $('.profile').toggle(false);
                    $('.audio').toggle(false);
                    $('.search-profile').toggle(false);
                    $('#wrapper').toggle(false);
                    $('.login-block').toggle(false);
                    $('.forgot-login-link').toggle(false);
                }
                else {
                    app.setError('You must be older than 21 years of age to user dark room.');
                }
            }
            else {
                app.setError('Please check the terms and conditions.');
            }
        }
        else {
            app.setError('Please enter a new password.');
        }
    },

    next: function () {
        app.saveInfo();
    },

    validateEmail: function () {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test($('#email').val()) === false) {
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
        $('.new-user-registration-password').toggle(false);
        $('.new-user-registration-email').toggle(false);
        $('.profile').toggle(false);
        $('.audio').slideToggle(true);
        $('.search-profile').toggle(false);
        $('#wrapper').toggle(false);
        $('.login-block').toggle(false);
        $('.forgot-login-link').toggle(false);
    },

    saveInfo: function () {
        console.log('saveInfo');
        if (app.validateEmail()) {
            var input =
                {
                    "user": {
                        "UserId": 0,
                        "LoginId": user.LoginId,
                        "Password": user.Password,
                        "Email": $('#email').val(),
                        "Sex": null,
                        "Age": null,
                        "Weight": null,
                        "Height": null,
                        "TimeForDating": null,
                        "Recording": null
                    }
                };
            $.ajax({
                type: "PUT",
                url: "http://localhost:36908/DatingService.svc/AddUser",
                data: JSON.stringify(input),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                success: app.onSaveSuccess,
                error: app.onAjaxError
            });
        }
        else {
            app.setError('Invalid email address.');
        }
    },

    onSaveSuccess: function (data) {
        $('#userid').val(data.AddUserResult.UserId);
        $('.new-user-registration-link').toggle(false);
        $('.new-user-registration-password').toggle(false);
        $('.new-user-registration-email').toggle(false);        
        $('.profile').slideToggle(true);
        $('.audio').toggle(false);
        $('.search-profile').toggle(false);
        $('#wrapper').toggle(false);
        $('.login-block').toggle(false);
        $('.forgot-login-link').toggle(false);
    },

    onAjaxError: function (xhr, ajaxOptions, error) {
        app.setError(xhr.responseText);
    },

    saveProfile: function () {
        console.log('saveProfile');
        $('.new-user-registration-link').toggle(false);
        $('.new-user-registration-password').toggle(false);
        $('.new-user-registration-email').toggle(false);
        $('.profile').toggle(false);
        $('.audio').toggle(false);
        $('.search-profile').slideToggle(true);
        $('#wrapper').toggle(false);
        $('.login-block').toggle(false);
        $('.forgot-login-link').toggle(false);
    },

    saveSearchPreferences: function () {
        console.log('saveSearchPreferences');
        $('.new-user-registration-link').toggle(false);
        $('.new-user-registration-password').toggle(false);
        $('.new-user-registration-email').toggle(false);
        $('.profile').toggle(false);
        $('.audio').toggle(false);
        $('.search-profile').toggle(false);
        $('#wrapper').slideToggle(true);
        $('.login-block').toggle(false);
        $('.forgot-login-link').toggle(false);
    },

    recordAudio: function () {
        console.log('recordAudio');
        $('.new-user-registration-link').toggle(false);
        $('.new-user-registration-password').toggle(false);
        $('.new-user-registration-email').toggle(false);
        $('.profile').toggle(false);
        $('.audio').slideToggle(true);
        $('.search-profile').toggle(false);
        $('#wrapper').toggle(false);
        $('.login-block').toggle(false);
        $('.forgot-login-link').toggle(false);
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

//app.renderSplash();
app.initialize();