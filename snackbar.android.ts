/// <reference path="./snackbar.d.ts" />
import { topmost } from "ui/frame";
import { Color } from "color";
import { SnackBarOptions } from "nativescript-snackbar";

declare var android: any;

export class SnackBar {
  private _snackbar: android.support.design.widget.Snackbar;
  private _snackCallback = android.support.design.widget.Snackbar.Callback.extend(
    {
      resolve: null,
      onDismissed(snackbar, event) {
        if (event != 1) {
          this.resolve({
            command: "Dismiss",
            reason: _getReason(event),
            event: event
          });
        }
      }
    }
  );

  public simple(snackText: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (snackText) {
          this._snackbar = android.support.design.widget.Snackbar.make(
            topmost().currentPage.android,
            snackText,
            3000
          );
          let callback = new this._snackCallback();
          callback.resolve = resolve;
          this._snackbar.setCallback(callback);
          this._snackbar.show();
        } else {
          reject("snackText is required"); //There's a problem, reject the call
        }
      } catch (ex) {
        reject(ex);
      }
    });
  }

  public action(options: SnackBarOptions) {
    return new Promise((resolve, reject) => {
      try {
        if (!options.actionText) options.actionText = "Close";
        if (!options.hideDelay) options.hideDelay = 3000;

        this._snackbar = android.support.design.widget.Snackbar.make(
          topmost().currentPage.android,
          options.snackText,
          options.hideDelay
        );

        let listener = new android.view.View.OnClickListener({
          onClick: args => {
            resolve({
              command: "Action",
              reason: _getReason(1),
              event: args
            });
          }
        });

        // Set the action text, click listener
        this._snackbar.setAction(options.actionText, listener);

        if (options.actionTextColor) {
          this._snackbar.setActionTextColor(
            new Color(options.actionTextColor).android
          );
        }

        let callback = new this._snackCallback();
        callback.resolve = resolve;
        this._snackbar.setCallback(callback);
        this._snackbar.show();
      } catch (ex) {
        reject(ex);
      }
    });
  }

  public dismiss() {
    return new Promise((resolve, reject) => {
      if (this._snackbar) {
        try {
          this._snackbar.dismiss();
          //Return AFTER the item is dismissed, 200ms delay
          setTimeout(() => {
            resolve({
              action: "Dismiss",
              reason: _getReason(3)
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
}

function _getReason(value) {
  if (value === 1) {
    return "Action";
  } else if (value === 4) {
    return "Consecutive";
  } else if (value === 3) {
    return "Manual";
  } else if (value === 0) {
    return "Swipe";
  } else if (value === 2) {
    return "Timeout";
  }
}
