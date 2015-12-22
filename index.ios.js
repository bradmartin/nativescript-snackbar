var snackbar = null;

// .simple(string: snackText) is the simplest method available to construct a native snackbar
exports.simple = function (snackText) {
    return new Promise(function (resolve, reject) {

        try {
            snackbar = SSSnackbar.snackbarWithMessageActionTextDurationActionBlockDismissalBlock(
                snackText,
                "Close",
                3,
                function (args) {
                    //Action, Do Nothing, just close it
                    snackbar.dismiss()
                },
                function (args) {
                    //Dismissal, Do Nothing
                }
            );

            snackbar.show();
            resolve(true);

        } catch (ex) {
            console.log(ex);
            reject(ex);
        }

    });
}

// .action ({ snackText, hideDelay, actionText, actionTextColor, actionClickFunction, dismissalCallback })
exports.action = function (options) {
    return new Promise(function (resolve, reject) {

        try {

            if (!options.hideDelay) {
                options.hideDelay = 3000;
            }

            snackbar = SSSnackbar.snackbarWithMessageActionTextDurationActionBlockDismissalBlock(
                options.snackText,
                options.actionText,
                options.hideDelay / 1000,
                options.actionClickFunction,
                options.dismissalCallback
                );

            snackbar.show();
            resolve(true);

        } catch (ex) {
            console.log(ex);
            reject(ex);
        }

    });
}

exports.dismiss = function (options) {
    if (snackbar !== null || snackbar != "undefined") {
        snackbar.dismiss();
    }
}

exports.getSnackbar = function () {
    return snackbar;
}