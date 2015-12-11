var app = require("application");

// .simple(View page, string snackText) is the simplest method available to construct a native snackbar
exports.simple = function (page, snackText) {

    if (page.android && snackText) {

        // Create the native snackbar
        var snackbar = android.support.design.widget.Snackbar;
        // Now call the snackbar .make() and .show() methods
        snackbar.make(page.android, snackText, 3000)
                .show();
    }

};

// exports.actionSnackbar = function(page, snackText, hideDelay, actionText, actionClickFunction) {
exports.action = function (options) {
        try {
            // Just making sure we are on Android for the native approach
            // Will see about integrating a cocoapod for iOS version
            if (app.android) {

                // Make sure user sent actionText and actionClickFunction
                // if undefined then we will pass the page, snackText arguments to the simple() method.
                if (!options.actionText || !options.actionClickFunction) {
                    console.log("No actionText or actionClickFunction sent in the options. Falling back to .simple() method");
                    exports.simple(options.page, options.snackText);
                } else {

                    // Create the OnClickListener for the Action of the Snackbar
                    var listener;
                    if (options.actionClickFunction) {
                        listener = new android.view.View.OnClickListener({
                            onClick: options.actionClickFunction
                        });
                    }

                    // Check for hideDelay - required
                    if (!options.hideDelay) {
                        options.hideDelay = 3000;
                    }

                    // Create the native snackbar
                    var snackbar = android.support.design.widget.Snackbar;

                    // Use the .make(), .setAction() methods to add text and functionality to the snackbar.
                    snackbar.make(options.page.android, options.snackText, options.hideDelay)
                                               .setAction(options.actionText, listener)
                                               .show();

                };

            };
        } catch (ex) {
            console.log(ex);
        }

};
