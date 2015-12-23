var app = require('application');
var frame = require('ui/frame');
var Color = require("color").Color;
var snackbar = null;

// .simple(string snackText) is the simplest method available to construct a native snackbar
exports.simple = function (snackText) {
    return new Promise(function (resolve, reject) {
        try {
            if (snackText) {
                var timeout = 3000; 

                // Create the native snackbar, save the object incase we need to dismiss
                snackbar = android.support.design.widget.Snackbar.make(frame.topmost().currentPage.android, snackText, timeout);
                
                var callback = new simpleSnackCallback();
                
                callback.resolve = resolve;

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

            // Check for hideDelay - required
            if (!options.hideDelay) {
                options.hideDelay = 3000;
            }
            
            // construct the native snackbar
            snackbar = android.support.design.widget.Snackbar.make(frame.topmost().currentPage.android, options.snackText, options.hideDelay);
           

            // Create the OnClickListener for the Action of the Snackbar
            var listener = new android.view.View.OnClickListener({
                onClick: function(args){
                    resolve({
                        command: "Action",
                        snackbar: snackbar,
                        event: args
                    });
                }
            });
            
            // Set the action text, click listener
            snackbar.setAction(options.actionText, listener);

            if(app.android){
                // Set custom color
                if (options.actionTextColor) {
                    var color = new Color(options.actionTextColor);
                    snackbar.setActionTextColor(color.android);
                }
            }
            
            var callback = new actionSnackCallback();
            
            callback.resolve = resolve;

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
                        action: "Dismiss",
                        reason: getReason(3),
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

function getReason(value){
    if(value == 1){
        return "Action";
    }
    else if(value == 4){
        return "Consecutive";
    }
    else if(value == 3){
        return "Manual";
    }
    else if(value == 0){
        return "Swipe";
    }
    else if(value == 2){
        return "Timeout";
    }
}


// Moved the extend OUTSIDE of the function, you only need to extend the callback once...
var simpleSnackCallback = android.support.design.widget.Snackbar.Callback.extend({
    resolve: null, 
       onDismissed: function (snackbar, event) {
            this.resolve({  
                    command: "Dismiss",
                    reason: getReason(event),
                    snackbar: snackbar,
                    event: event
                });             
        }
});


var actionSnackCallback =  android.support.design.widget.Snackbar.Callback.extend({
    resolve: null, 
    onDismissed: function (snackbar, event) {
        if (event != 1) {
            this.resolve({
                command: "Dismiss",
                reason: getReason(event),
                snackbar: snackbar,
                event: event
            });
        }
    }
});