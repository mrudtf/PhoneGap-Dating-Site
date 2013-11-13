var app = {

    renderHomeView: function () {
        $('#new-user-button').bind('click', function () {
            var loginId = app.randomString(6, '#aA');
            var password = app.randomString(6, '#');
            $('#login-id-label').text(loginId);
            $('#password-label').text(password);

            $('.new-user-registration-link').toggle(false);
            $('.new-user-registration').toggle(true);
            $('.profile').toggle(false);
            $('.audio').toggle(false);
            $('.search-profile').toggle(false);
            $('online-users').toggle(false);
            $('.login-block').toggle(false);
        })

        $('#save-info-button').bind('click', function () {
            app.saveInfo();
        })

        $('#save-profile-button').bind('click', function () {
            app.saveProfile();
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
            $('.profile').toggle(true);
            $('.audio').toggle(false);
            $('.search-profile').toggle(false);
            $('online-users').toggle(false);
            $('.login-block').toggle(false);
        })
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
        $('.audio').toggle(true);
        $('.search-profile').toggle(false);
        $('online-users').toggle(false);
        $('.login-block').toggle(false);
    },

    saveInfo: function () {
        console.log('saveInfo');
        $('.new-user-registration-link').toggle(false);
        $('.new-user-registration').toggle(false);
        $('.profile').toggle(true);
        $('.audio').toggle(false);
        $('.search-profile').toggle(false);
        $('online-users').toggle(false);
        $('.login-block').toggle(false);
    },

    saveProfile: function () {
        console.log('saveProfile');
        $('.new-user-registration-link').toggle(false);
        $('.new-user-registration').toggle(false);
        $('.profile').toggle(false);
        $('.audio').toggle(false);
        $('.search-profile').toggle(true);
        $('online-users').toggle(false);
        $('.login-block').toggle(false);
    },

    saveSearchPreferences: function () {
        console.log('saveSearchPreferences');
        $('.new-user-registration-link').toggle(false);
        $('.new-user-registration').toggle(false);
        $('.profile').toggle(false);
        $('.audio').toggle(false);
        $('.search-profile').toggle(false);
        $('online-users').toggle(true);
        $('.login-block').toggle(false);
    },

    recordAudio: function () {
        console.log('recordAudio');
        $('.new-user-registration-link').toggle(false);
        $('.new-user-registration').toggle(false);
        $('.profile').toggle(false);
        $('.audio').toggle(true);
        $('.search-profile').toggle(false);
        $('online-users').toggle(false);
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

app.initialize();