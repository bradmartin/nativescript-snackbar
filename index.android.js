var frame = require('ui/frame');
var Color = require("color").Color;
var snackbar = null;

// .simple(string snackText) is the simplest method available to construct a native snackbar
exports.simple = function (snackText) {
    return new Promise(function (resolve, reject) {
        try {
            if (snackText) {
                // Create the native snackbar using .make() and .show()
                snackbar = android.support.design.widget.Snackbar.make(frame.topmost().currentPage.android, snackText, 3000)
                    .show();
                resolve(true);
            } else {
                resolve('no snackText');
            }
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
            // Make sure user sent actionText and actionClickFunction
            // if undefined then we will call .simple using the snackText
            if (!options.actionText || !options.actionClickFunction) {

                console.log("No actionText or actionClickFunction sent in the options. Falling back to .simple() method");
                exports.simple(options.snackText);

            } else {

                // construct the native snackbar
                snackbar = android.support.design.widget.Snackbar.make(frame.topmost().currentPage.android, options.snackText, options.hideDelay);

                // Check for hideDelay - required
                if (!options.hideDelay) {
                    options.hideDelay = 3000;
                }

                // Create the OnClickListener for the Action of the Snackbar       
                var listener;
                if (options.actionClickFunction) {
                    listener = new android.view.View.OnClickListener({
                        onClick: options.actionClickFunction
                    });
                }

                // Set the action text, click listener
                snackbar.setAction(options.actionText, listener);

                // Set custom color
                if (options.actionTextColor) {
                    var color = new Color(options.actionTextColor);
                    snackbar.setActionTextColor(color.android);
                }

                // Check for dismissalBlock
                if (options.dismissalCallback && typeof options.dismissalCallback === "function") {

                    var snackCallback = android.support.design.widget.Snackbar.Callback.extend({
                        onDismissed: function (snackbar, event) {
                            //event 2 is TIMEOUT (no user interaction)
                            if (event === 2 || event === "2") {
                                options.dismissalCallback()
                            }
                        },

                        onShown: function (snackbar) { }

                    });

                    var callback = new snackCallback();

                    snackbar.setCallback(callback);
                }

                snackbar.show();

                resolve(true);

            };
        } catch (ex) {
            console.log("Error in snackbar.action: " + ex);
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