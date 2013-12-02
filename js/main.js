localStorage['serviceURL'] = "http://localhost:36908/DatingService.svc/";
var serviceURL = localStorage['serviceURL'];

var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar: false, hScroll: false });

var app = {

    //getUserlist: function () {
    //    $('#busy').show();
    //    $.ajax({
    //        type: "GET",
    //        url: serviceURL + 'GetAllUsers',
    //        contentType: 'application/json; charset=utf-8',
    //        dataType: "json",
    //        success: app.onGetSuccess,
    //        error: app.onAjaxError
    //    });
    //},

    //onGetSuccess: function (data) {
    //    $('#busy').hide();
    //    $('#userList li').remove();
    //    users = data.GetAllUsersResult;
    //    $.each(users, app.loadData);
    //    setTimeout(function () {
    //        scroll.refresh();
    //    });
    //    $('.header').toggle(true);
    //    $('.splash').toggle(false);
    //    $('.new-user-registration-link').toggle(false);
    //    $('.new-user-registration-password').toggle(false);
    //    $('.new-user-registration-email').toggle(false);
    //    $('.profile').toggle(false);
    //    $('.audio').toggle(false);
    //    $('.search-profile').toggle(false);
    //    $('#wrapper').toggle(true);
    //    $('.login-block').toggle(false);
    //    $('.forgot-login-link').toggle(false);
    //    $('.bottom-bar-1').toggle(false);
    //    $('.bottom-bar-2').toggle(false);
    //    $('.security').toggle(false);
    //    $('.about').toggle(false);
    //},

    //loadData: function (index, user) {
    //    $('#userList').append('<li><a href="userdetails.html?id=' + user.UserId + '">' +
    //            '<p class="line1">' + index + 1 + ' ' + user.LoginId + '</p>' +
    //            '<p class="line2">' + user.Height + ' ' + user.Weight + '</p>' + '</a></li>');
    //},

    logIn: function () {
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
        if (data.ValidateUserResult.UserId != null) {
            //$('#userid').val(data.ValidateUserResult.UserId);
            app.loadUserData(data);
            if ($('#check-save-login').is(":checked")) {
                this.store.storeLoginId(data.ValidateUserResult.loginId);
            }
            app.showAlert('Your search preferences are outdated. Please update.', 'Search Preferences');
            app.getUserlist();
        }
        else {
            app.setError('Username and password is not correct.');
        }
    },

    loadUserData: function (data) {
        user.Sex = data.ValidateUserResult.Sex;
        user.Age = data.ValidateUserResult.Age;;
        user.Weight = data.ValidateUserResult.Weight;
        user.Height = data.ValidateUserResult.Height;
        user.TimeZone = data.ValidateUserResult.TimeZone;
        user.BodyType = data.ValidateUserResult.BodyType;
        user.EthnicBackground = data.ValidateUserResult.EthnicBackground;
        user.SmokingHabit = data.ValidateUserResult.SmokingHabit;
        user.RelationshipStatus = data.ValidateUserResult.RelationshipStatus;
        user.Languages = data.ValidateUserResult.Languages;
        //user.Limits = app.getLimits();
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
        $('.bottom-bar-1').toggle(false);
        $('.bottom-bar-2').toggle(false);
        $('.security').toggle(false);
        $('.about').toggle(false);
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
        $('.bottom-bar-1').toggle(false);
        $('.bottom-bar-2').toggle(false);
        $('.security').toggle(false);
        $('.about').toggle(false);

        $('#new-user-button').bind('click', function () {
            $.ajax({
                type: "GET",
                url: serviceURL + 'Account',
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                success: app.onGetUniqueId,
                error: app.onAjaxError
            });

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
            $('.bottom-bar-1').toggle(false);
            $('.bottom-bar-2').toggle(false);
            $('.security').toggle(false);
            $('.about').toggle(false);
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
            //$('#header').text('Profile Settings');
            //$('#header-left-button').text('Back');
            //$('#header-right-button').text('Profile Settings');
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

        $('#secure-information-editing').bind('click', function () {
            app.showSecurity();
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
            $('.bottom-bar-1').toggle(false);
            $('.bottom-bar-2').toggle(false);
            $('.security').toggle(false);
            $('.about').toggle(false);
        })

        $('#email-login-password').bind('click', function () {
            app.sendEmail();
        })

        $('input[type="range"]').bind('change', function (e) {
            app.getValue(e, $(this));
        })

        $('#terms-link').bind('click', function () {
            $('#terms-div').toggle();
        })

        $('#privacy-link').bind('click', function () {
            $('#privacy-div').toggle();
        })

        $('#header-right-button').bind('click', function () {
            //if ($('#header').val() == 'Security' && $('#header-right-button').val() == 'Edit') {
                window.localStorage.setItem("applanguage", $('#app-language').val());
                window.localStorage.setItem("forgetlogin", $('#myonoffswitch').val());
            //}
        })

        $('#about').bind('click', function () {
            app.showAbout();
        })

        $('#save-security-button').bind('click', function () {
            window.localStorage.setItem("applanguage", $('#app-language').val());
            window.localStorage.setItem("forgetlogin", $('#myonoffswitch').val());
        })
    },

    showAbout: function () {
        $('.new-user-registration-link').toggle(false);
        $('.new-user-registration-password').toggle(false);
        $('.new-user-registration-email').toggle(false);
        $('.profile').slideToggle(false);
        $('.audio').toggle(false);
        $('.search-profile').toggle(false);
        $('#wrapper').toggle(false);
        $('.login-block').toggle(false);
        $('.forgot-login-link').toggle(false);
        $('.bottom-bar-1').toggle(false);
        $('.bottom-bar-2').toggle(false);
        $('.security').toggle(false);
        $('.about').toggle(true);
    },

    showSecurity: function () {        
        $('#app-language').val(window.localStorage.getItem("applanguage"));
        $('#myonoffswitch').val(window.localStorage.setItem("forgetlogin"));

        $('.new-user-registration-link').toggle(false);
        $('.new-user-registration-password').toggle(false);
        $('.new-user-registration-email').toggle(false);
        $('.profile').slideToggle(false);
        $('.audio').toggle(false);
        $('.search-profile').toggle(false);
        $('#wrapper').toggle(false);
        $('.login-block').toggle(false);
        $('.forgot-login-link').toggle(false);
        $('.bottom-bar-1').toggle(false);
        $('.bottom-bar-2').toggle(false);
        $('.security').toggle(true);
        $('.about').toggle(false);
    },

    getValue: function (e, element) {
        e.preventDefault();
        var textbox = '#' + element[0].id + '-text';
        $(textbox).val(element.val());
    },

    sendEmail: function () {
        app.clearError();
        $.ajax({
            type: "POST",
            url: serviceURL + 'Account/Email',
            data: '{"loginId": "' + user.LoginId + '", "password": "' + user.Password + '", "email": "' + user.Email + '"}',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            success: app.onSendEmailSuccess,
            error: app.onAjaxError
        });
    },

    onSendEmailSuccess: function () {
        app.showAlert('Your login and password has been sent to the provided email address.', 'Message Sent');
    },

    onGetUniqueId: function (data) {
        user.LoginId = data.GetUniqueLoginIdResult;
        $('#new-login-text').val(user.LoginId);
    },

    signUp: function () {
        app.clearError();
        if ($('#new-password-text').val() != '') {
            if ($('#new-secure-code').val() != '') {
                if ($('#check-terms').is(":checked")) {
                    if ($('#check-older-than-21').is(":checked")) {
                        var password = $('#new-password-text').val();
                        var secureCode = $('#new-secure-code').val();
                        user.Password = password;
                        user.SecureCode = secureCode;
                        $('#login-id-label').text(user.LoginId);

                        $('.new-user-registration-link').toggle(false);
                        $('.new-user-registration-password').toggle(false);
                        $('.new-user-registration-email').toggle(true);
                        $('.profile').toggle(false);
                        $('.audio').toggle(false);
                        $('.search-profile').toggle(false);
                        $('#wrapper').toggle(false);
                        $('.login-block').toggle(false);
                        $('.forgot-login-link').toggle(false);
                        $('.bottom-bar-1').toggle(true);
                        $('.bottom-bar-2').toggle(false);
                        $('.security').toggle(false);
                        $('.about').toggle(false);
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
                app.setError('Please enter a secured code');
            }
        }
        else {
            app.setError('Please enter a password.');
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
        $('.bottom-bar-1').toggle(false);
        $('.bottom-bar-2').toggle(false);
        $('.security').toggle(false);
        $('.about').toggle(false);
    },

    saveInfo: function () {
        console.log('saveInfo');
        user.Email = $('#email').val();
        if (app.validateEmail()) {
            var input =
                {
                    "user": {
                        "UserId": 0,
                        "LoginId": user.LoginId,
                        "Password": user.Password,
                        "Email": user.Email,
                        "SecureCode": user.SecureCode,
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

    topBarEvents: function () {
        var leftText = $('#header-left-button').text();
        var rightText = $('#header-right-button').text();
        if (leftText = 'Back') {

        }
        if (rightText == 'Done' || rightText == 'Edit') {
            app.saveProfile();
        }
    },

    //setInitialValues: function () {
    //    $('#age-text').val($('#age').val());
    //    $('#weight-text').val($('#weight').val());
    //    $('#height-text').val($('#height').val());
    //},

    onSaveSuccess: function (data) {
        user.UserId = data.AddUserResult.UserId;
        app.setInitialValues();
        //$('.new-user-registration-link').toggle(false);
        //$('.new-user-registration-password').toggle(false);
        //$('.new-user-registration-email').toggle(false);
        //$('.profile').toggle(true);
        //$('.audio').toggle(false);
        //$('.search-profile').toggle(false);
        //$('#wrapper').toggle(false);
        //$('.login-block').toggle(false);
        //$('.forgot-login-link').toggle(false);
        //$('.bottom-bar-1').toggle(false);
        //$('.bottom-bar-2').toggle(true);
        //$('.security').toggle(false);
        //$('.about').toggle(false);
    },

    getUserDetails: function () {
        
    },

    onAjaxError: function (xhr, ajaxOptions, error) {
        //app.setError(xhr.responseText);
        app.showAlert(xhr.responseText, 'Error');
    },

    saveProfile: function () {
        user.Sex = $('#sex').val();
        user.Age = $('#age').val();
        user.Weight = $('#weight').val();
        user.Height = $('#height').val();
        user.TimeZone = $('#timezone').val();
        user.BodyType = $('#body-type').val();
        user.EthnicBackground = $('#ethnic-background').val();
        user.SmokingHabit = $('#smoking-habit').val();
        user.RelationshipStatus = $('#relationship-status').val();
        user.Languages = app.getLanguages();
        user.Limits = app.getLimits();

        var input =
                {
                    "user": {
                        "UserId": user.UserId,
                        "LoginId": user.LoginId,
                        "Password": user.Password,
                        "Email": user.Email,
                        "SecureCode": user.SecureCode,
                        "Sex": user.Sex,
                        "Age": user.Age,
                        "Weight": user.Weight,
                        "Height": user.Height,
                        "TimeZone": user.TimeZone,
                        "TimeForDating": null,
                        "LastLogin": null,
                        "Recording": null,
                        "BodyType": user.BodyType,
                        "EthnicBackground": user.EthnicBackground,
                        "SmokingHabit": user.SmokingHabit,
                        "RelationshipStatus": user.RelationshipStatus,
                        "Languages": [user.Languages],
                        "Limits": [user.Limits]
                    }
                };
        $.ajax({
            type: "PUT",
            url: "http://localhost:36908/DatingService.svc/User/" + user.UserId,
            data: JSON.stringify(input),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            success: app.onSaveProfileSuccess,
            error: app.onAjaxError
        });

        $('.new-user-registration-link').toggle(false);
        $('.new-user-registration-password').toggle(false);
        $('.new-user-registration-email').toggle(false);
        $('.profile').toggle(false);
        $('.audio').toggle(false);
        $('.search-profile').toggle(true);
        $('#wrapper').toggle(false);
        $('.login-block').toggle(false);
        $('.forgot-login-link').toggle(false);
        $('.bottom-bar-1').toggle(false);
        $('.bottom-bar-2').toggle(false);
        $('.security').toggle(false);
        $('.about').toggle(false);
    },

    onSaveProfileSuccess: function () {
        app.getUserlist();
    },

    getLanguages: function () {
        var languages = new Array();
        //$.map((('#language-div input[type=checkbox]').is(":checked")), function (element) {
        //    return { "LanguageId": $(this).val(), "Name": $('label[for="'+ this +'"]').html() }
        //    }).join(',');

        $('#language-div input[type=checkbox]:checked').each(function (index, element) {
            languages[index] = '{ "LanguageId": ' + $(element).val() + ', "Name": "' + $('label[for="' + this.id + '"]').html() + '" }';
        })
        return eval("(" + languages.join(',') + ")");
    },

    getLimits: function () {
        var limits = new Array();
        $('#limits-div input[type=checkbox]:checked').each(function (index, element) {
            limits[index] = '{ "LimitId": ' + $(element).val() + ', "Name": "' + $('label[for="' + this.id + '"]').html() + '" }';
        })
        return eval("(" + limits.join(',') + ")");
    },

    saveSearchPreferences: function () {
        $('.new-user-registration-link').toggle(false);
        $('.new-user-registration-password').toggle(false);
        $('.new-user-registration-email').toggle(false);
        $('.profile').toggle(false);
        $('.audio').toggle(false);
        $('.search-profile').toggle(false);
        $('#wrapper').slideToggle(true);
        $('.login-block').toggle(false);
        $('.forgot-login-link').toggle(false);
        $('.bottom-bar-1').toggle(false);
        $('.bottom-bar-2').toggle(false);
        $('.security').toggle(false);
        $('.about').toggle(false);
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
        $('.bottom-bar-1').toggle(false);
        $('.bottom-bar-2').toggle(false);
        $('.security').toggle(false);
        $('.about').toggle(false);
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
//app.initialize();