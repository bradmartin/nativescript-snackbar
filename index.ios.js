var snackbar = null;

// .simple(string: snackText) is the simplest method available to construct a native snackbar
exports.simple = function (snackText) {
    return new Promise(function (resolve, reject) {
        var timeout = 3; 
        
        try {
            snackbar = SSSnackbar.snackbarWithMessageActionTextDurationActionBlockDismissalBlock(
                snackText,
                getActionText(),
                timeout,
                function (args) {
                    //Action, Do Nothing, just close it
                    snackbar.dismiss(); //Force close
                    resolve({
                        command: "Dismiss",
                        reason: "Manual",
                        snackbar: snackbdebuggar,
                        event: args
                    });
                },
                function (args) {
                    //Dismissal, Do Nothing
                    resolve({
                        command: "Dismiss",
                        reason: "Timeout",
                        snackbar: snackbar,
                        event: args
                    });
                }
            );

            snackbar.show();
            

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
                function(args){
                    resolve({
                        command: "Action",
                        snackbar: snackbar,
                        event: args
                    });
                },
                function(args){
                    resolve({
                        command: "Dismiss",
                        reason: "Timeout",
                        snackbar: snackbar,
                        event: args
                    });
                }
                );

            snackbar.show();

        } catch (ex) {
            console.log(ex);
            reject(ex);
        }

    });
}

exports.dismiss = function (options) {
    return new Promise(function (resolve, reject) {
    if (snackbar !== null && snackbar != "undefined") {
            try{
                snackbar.dismiss();
                
                //Return AFTER the item is dismissed, 200ms delay on iOS
                setTimeout(function(){
                    resolve(
                    {
                        action: "Dismiss",
                        reason: "Manual",
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

function getActionText(){
    var actionText = NSBundle.mainBundle().objectForInfoDictionaryKey("NSSnackBarActionText");
    if(actionText != "" && actionText != null){
        return actionText;
    }else{
         return "Close";   
    }
}

exports.getSnackbar = function () {
    return snackbar;
}