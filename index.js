var app = require("application");
var frame = require('ui/frame');
var snackbar = null;

// .simple(string snackText) is the simplest method available to construct a native snackbar
exports.simple = function (snackText) {
    var duration = 3000;
    
    if (app.android) {
        if(snackText){
            // Create the native snackbar
            
            // Now call the snackbar .make() and .show() methods
            snackbar = android.support.design.widget.Snackbar.make(frame.topmost().currentPage.android, snackText, duration);
            snackbar.show();
        }
    } else {

        try{
            snackbar = SSSnackbar.snackbarWithMessageActionTextDurationActionBlockDismissalBlock(
                snackText,
                "Close",
                duration / 1000,
                function(args){
                    //Action, Do Nothing, just close it
                    snackbar.dismiss()
                },
                function(args){
                    //Dismissal, Do Nothing
                }
            )

            snackbar.show();
        }catch(args){
            console.log(args);
        }
        
        return;
    };

};

// exports.actionSnackbar = function(snackText, hideDelay, actionText, actionClickFunction) {
exports.action = function (options) {
        try {
            // Check for hideDelay - required
            if (!options.hideDelay) {
                options.hideDelay = 3000;
            }

            if (app.android) {

                // Make sure user sent actionText and actionClickFunction
                // if undefined then we will pass the snackText argument to the simple() method.
                if (!options.actionText || !options.actionClickFunction) {
                    console.log("No actionText or actionClickFunction sent in the options. Falling back to .simple() method");
                    exports.simple(options.snackText);
                } else {

                    // Create the OnClickListener for the Action of the Snackbar
                    var listener;
                    if (options.actionClickFunction) {
                        listener = new android.view.View.OnClickListener({
                            onClick: options.actionClickFunction
                        });
                    }


                    // Use the .make(), .setAction() methods to add text and functionality to the snackbar.
                     snackbar = android.support.design.widget.Snackbar.make(frame.topmost().currentPage.android, options.snackText, options.hideDelay);
                     snackbar.setAction(options.actionText, listener);
                     snackbar.show();                 
                };

            }else{
               //IOS
                  snackbar = SSSnackbar.snackbarWithMessageActionTextDurationActionBlockDismissalBlock(
                            options.snackText,
                            options.actionText,
                            options.hideDelay / 1000,
                            options.actionClickFunction,
                            function(args){
                                //Dismissal, not available on android...
                            }
            )

            snackbar.show();
            };
        } catch (ex) {
            console.log(ex);
        }

};

exports.dismiss = function (options) {
    if(snackbar !== null || snackbar != "undefined"){
        if (app.android) {
            snackbar.dismiss();
        }
        else{
            //iOS
            snackbar.dismiss();
        }
    }   
}

exports.getSnackbar = function(){
    return snackbar;
}