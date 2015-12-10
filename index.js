var app = require("application");

exports.makeSnackbar = function(page, text, delay, actionText, listenerCallback) {
    // Just making sure we are on Android for the native approach
    // Will see about finding someone to help with iOS side
    if (app.android) 
    
        // First, lets create the OnClickListener callback for the Action of the Snackbar
        var listener = new android.view.View.OnClickListener({
            onClick: listenerCallback
        });
        
        // Second, create the native snackbar
        var snackbar = android.support.design.widget.Snackbar;
        
        
        // Last, use the .make(), .setAction() methods to add text and functionality to the snackbar.
        snackbar.make(page.android, text, delay)
                .setAction(actionText, listener)
                .show();
                
    }
}
