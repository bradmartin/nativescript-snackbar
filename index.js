var app = require("application");

exports.actionSnackbar = function(page, snackText, hideDelay, actionText, actionClickFunction) {
    // Just making sure we are on Android for the native approach
    // Will see about finding someone to help with iOS side
    if (app.android) {
        
        // Make sure user sent actionText and actionClickFunction
        // if undefined then we will pass the page, snackText arguments to the simpleSnackbar() method.
        if (!actionText && !actionClickFunction) {
          exports.simpleSnackbar(page, snackText);  
        } else {
              var listener;
            
             // First, lets create the OnClickListener callback for the Action of the Snackbar
            if (actionClickFunction) {
                listener = new android.view.View.OnClickListener({
                  onClick: actionClickFunction
                });
            }
        
            // Check for hideDelay, actionText
            if (!hideDelay) {
                hideDelay = 3000;
            };
            
            if (!actionText) {
                actionText = "";
            };
        
            // Create the native snackbar
             var snackbar = android.support.design.widget.Snackbar;
             
            // Use the .make(), .setAction() methods to add text and functionality to the snackbar.
            snackbar.make(page.android, text, delay)
                .setAction(actionText, listener)
                .show();
                
        };
        
    }
};

// .simpleSnackbar(View page, string snackText) is the simplest method available to construct a native snackbar
exports.simpleSnackbar = function(page, snackText) {
    
    if (page.android && snackText) {
        
        // Create the native snackbar
        var snackbar = android.support.design.widget.Snackbar;
        
        // Now call the snackbar .make() and .show() methods
        snackbar.make(page.android, snackText, 3000)
                .show();
                
    };
};
