var snackbar = null;

// .simple(string: snackText) is the simplest method available to construct a native snackbar
exports.simple = function (snackText) {
    return new Promise(function (resolve, reject) {
        
        try {
            snackbar = SSSnackbar.snackbarWithMessageActionTextDurationActionBlockDismissalBlock(
                snackText,
                getActionText(),
                3,
                function (args) {
                    //Action, Do Nothing, just close it
                    snackbar.dismiss(); //Force close
                    resolve({
                        action: "Closed"
                    });
                },
                function (args) {
                    //Dismissal, Do Nothing
                    resolve({
                        action: "Timeout"
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
                        command: "Action"
                    });
                },
                function(args){
                    resolve({
                        command: "Dismiss"
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
    if (snackbar !== null || snackbar != "undefined") {
        return new Promise(function (resolve, reject) {
            try{
                snackbar.dismiss();
                
                //Return AFTER the item is dismissed, 200ms delay on iOS
                setTimeout(function(){
                    resolve(
                    {
                        action: "Dismissed"
                    });
                }, 200);
            }
            catch(ex){
                console.log(ex);
                reject(ex);
            }
               
        });
    }
}

exports.getSnackbar = function () {
    return snackbar;
}

function getActionText(){
    var actionText = NSBundle.mainBundle().objectForInfoDictionaryKey("NSSnackBarActionText");
    if(actionText != "" && actionText != null){
        return actionText;
    }else{
         return "Close";   
    }
}