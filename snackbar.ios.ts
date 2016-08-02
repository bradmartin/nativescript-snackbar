// var snackbar = null;
// var isDismissedManual = false;
// let snackbar = null;
// let isDismissedManual: boolean = false;
declare var NSBundle, SSSnackbar: any;

export class SnackBar {
    private _snackbar = null;
    private _isDismissedManual: boolean = false;


    public simple(snackText: string) {
        return new Promise((resolve, reject) => {
            let timeout = 3;

            try {
                this._snackbar = SSSnackbar.snackbarWithMessageActionTextDurationActionBlockDismissalBlock(
                    snackText,
                    this._getActionText(),
                    timeout,
                    function (args) {
                        //Action, Do Nothing, just close it
                        this._snackbar.dismiss(); //Force close
                        resolve({
                            command: "Dismiss",
                            reason: "Manual",
                            event: args
                        });
                    },
                    function (args) {
                        //Dismissal, Do Nothing
                        resolve({
                            command: "Dismiss",
                            reason: "Timeout",
                            event: args
                        });
                    }
                );

                this._snackbar.show();

            } catch (ex) {
                console.log(ex);
                reject(ex);
            }

        });

    }


    public action(options) {
        return new Promise((resolve, reject) => {

            try {

                if (!options.hideDelay)
                    options.hideDelay = 3000;

                this._snackbar = SSSnackbar.snackbarWithMessageActionTextDurationActionBlockDismissalBlock(
                    options.snackText,
                    options.actionText,
                    options.hideDelay / 1000,
                    function (args) {
                        resolve({
                            command: "Action",
                            event: args
                        });
                    },
                    function (args) {
                        let reason = (this._isDismissedManual) ? "Manual" : "Timeout";
                        this._isDismissedManual = false; //reset
                        resolve({
                            command: "Dismiss",
                            reason: reason,
                            event: args
                        });
                    }
                );

                this._snackbar.show();

            } catch (ex) {
                console.log(ex);
                reject(ex);
            }

        });
    }


    public dismiss(options) {
        return new Promise(function (resolve, reject) {
            if (this._snackbar !== null && this._snackbar != "undefined") {
                try {
                    this._isDismissedManual = true;
                    this._snackbar.dismiss();

                    //Return AFTER the item is dismissed, 200ms delay
                    setTimeout(function () {
                        resolve({
                            action: "Dismiss",
                            reason: "Manual"
                        });
                    }, 200);

                } catch (ex) {
                    reject(ex);
                }

            } else {
                resolve({
                    action: "None",
                    message: "No actionbar to dismiss"
                });
            }
        });
    }


    public getSnackbar() {
        return this._snackbar;
    }


    private _getActionText() {
        var actionText = NSBundle.mainBundle().objectForInfoDictionaryKey("NSSnackBarActionText");
        if (actionText != "" && actionText != null) {
            return actionText;
        } else {
            return "Close";
        }
    }


}