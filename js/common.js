localStorage['serviceURL'] = "http://localhost:36908/MobileService.svc/";
var serviceURL = localStorage['serviceURL'];

var common = {
    onAjaxError: function (xhr, ajaxOptions, error) {
        common.showAlert(xhr.responseText, 'Error');
    },

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    }
};