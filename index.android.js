var frame = require('ui/frame');
var Color = require("color").Color;
var snackbar = null;

// .simple(string snackText) is the simplest method available to construct a native snackbar
exports.simple = function (snackText) {
    return new Promise(function (resolve, reject) {
        try {

            if (snackText) {
                var timeout = 3000; 
                
                console.log(snackbar);
                
                // Create the native snackbar, save the object incase we need to dismiss
                snackbar = android.support.design.widget.Snackbar.make(frame.topmost().currentPage.android, snackText, timeout);
                
                var snackCallback = android.support.design.widget.Snackbar.Callback.extend({
                    onDismissed: function (snackbar, event) {
                        resolve({
                                command: "Dismiss",
                                reason: "Timeout",
                                snackbar: snackbar,
                                event: event
                            });
                    }
                });

                var callback = new snackCallback();

                snackbar.setCallback(callback);

                //Show the snackbar
                snackbar.show();  
            } else {
                reject('no snackText'); //There's a problem, reject the call
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
            if (!options.actionText) {
                options.actionText = "Close"; //Default value, no need to fallback with promises
            } 
            
            // construct the native snackbar
            snackbar = android.support.design.widget.Snackbar.make(frame.topmost().currentPage.android, options.snackText, options.hideDelay);

            // Check for hideDelay - required
            if (!options.hideDelay) {
                options.hideDelay = 3000;
            }

            // Create the OnClickListener for the Action of the Snackbar
            var listener = new android.view.View.OnClickListener({
                onClick: function(args){
                    console.log("Action triggered");
                    resolve({
                        command: "Action",
                        snackbar: snackbar,
                        event: args
                    });
                }
            });
            
            // Set the action text, click listener
            snackbar.setAction(options.actionText, listener);

            // Set custom color
            if (options.actionTextColor) {
                var color = new Color(options.actionTextColor);
                snackbar.setActionTextColor(color.android);
            }

            
            var snackCallback = android.support.design.widget.Snackbar.Callback.extend({
                onDismissed: function (snackbar, event) {
                    if (event == 2) {
                        //event 2 is TIMEOUT (no user interaction)
                        console.log("Dismiss from timeout");
                        resolve({
                            command: "Dismiss",
                            reason: "Timeout",
                            snackbar: snackbar,
                            event: event
                        });
                    }
                    else if(event == 1){
                        //Dismiss via action
                        console.log("Dismiss callback for action");
                    }
                },

                onShown: function (snackbar) { 
                    
                }
            });

            var callback = new snackCallback();

            snackbar.setCallback(callback);

            snackbar.show();
        } catch (ex) {
            console.log("Error in snackbar.action: " + ex);
            reject(ex);
        }
    });
}

exports.dismiss = function (options) {
    return new Promise(function (resolve, reject) {
        if (snackbar) {
            try{
                snackbar.dismiss();
                
                //Return AFTER the item is dismissed, 200ms delay on android
                setTimeout(function(){
                    resolve(
                    {
                        action: "Dismissed",
                        reason: "Forced",
                        snackbar: snackbar
                    });
                }, 200);
            }
            catch(ex){
                console.log(ex);
                reject(ex);
            }
               
        }else{
            resolve(
            {
                action: "None",
                message: "No actionbar to dismiss"
            });
        }
    });
}

exports.getSnackbar = function () {
    return snackbar;
}