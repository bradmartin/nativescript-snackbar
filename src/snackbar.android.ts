import { Color } from 'tns-core-modules/color';
import { topmost } from 'tns-core-modules/ui/frame';
import { SnackBarOptions } from './index';

// declare var android;

export class SnackBar {
  private _snackbar: android.support.design.widget.Snackbar;
  private _snackCallback = android.support.design.widget.Snackbar.Callback.extend({
    resolve: null,
    onDismissed(snackbar, event) {
      if (event !== 1) {
        this.resolve({
          command: 'Dismiss',
          reason: _getReason(event),
          event: event
        });
      }
    }
  });

  // TODO: use an object for the options
  public simple(
    snackText: string,
    textColor?: string,
    backgroundColor?: string,
    maxLines?: number,
    isRTL?: boolean
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (!snackText) {
          reject('Snack text is required.');
          return;
        }

        this._snackbar = android.support.design.widget.Snackbar.make(topmost().currentPage.android, snackText, 3000);

        // set text color
        if (textColor) {
          this._setTextColor(textColor);
        }

        // set background color
        if (backgroundColor) {
          this._setBackgroundColor(backgroundColor);
        }

        const callback = new this._snackCallback();
        callback.resolve = resolve;
        this._snackbar.setCallback(callback);

        // https://github.com/bradmartin/nativescript-snackbar/issues/33
        if (maxLines) {
          const sbView = this._snackbar.getView();
          const tv = sbView.findViewById(android.support.design.R.id.snackbar_text);
          tv.setMaxLines(maxLines);
        }

        // set RTL for snackbar
        // https://github.com/bradmartin/nativescript-snackbar/issues/26
        if (isRTL === true) {
          const sbView = this._snackbar.getView();
          const tv = sbView.findViewById(android.support.design.R.id.snackbar_text);
          tv.setLayoutDirection(android.view.View.LAYOUT_DIRECTION_RTL);
        }

        this._snackbar.show();
      } catch (ex) {
        reject(ex);
      }
    });
  }

  public action(options: SnackBarOptions) {
    return new Promise((resolve, reject) => {
      try {
        options.actionText = options.actionText ? options.actionText : 'Close';
        options.hideDelay = options.hideDelay ? options.hideDelay : 3000;

        this._snackbar = android.support.design.widget.Snackbar.make(
          topmost().currentPage.android,
          options.snackText,
          options.hideDelay
        );

        const listener = new android.view.View.OnClickListener({
          onClick: args => {
            resolve({
              command: 'Action',
              reason: _getReason(1),
              event: args
            });
          }
        });

        // set the action text, click listener
        this._snackbar.setAction(options.actionText, listener);

        // set text color
        if (options.textColor) {
          this._setTextColor(options.textColor);
        }

        if (options.actionTextColor) {
          // check color validity
          const colorIsValid = Color.isValid(options.actionTextColor);
          if (colorIsValid) {
            this._snackbar.setActionTextColor(new Color(options.actionTextColor).android);
          }
        }

        // set background color
        if (options.backgroundColor) {
          this._setBackgroundColor(options.backgroundColor);
        }

        // set maxLines for the textview
        // https://github.com/bradmartin/nativescript-snackbar/issues/33
        if (options.maxLines) {
          const sbView = this._snackbar.getView();
          const tv = sbView.findViewById(android.support.design.R.id.snackbar_text);
          tv.setMaxLines(options.maxLines);
        }

        // set RTL for snackbar
        // https://github.com/bradmartin/nativescript-snackbar/issues/26
        if (options.isRTL === true) {
          const sbView = this._snackbar.getView();
          const tv = sbView.findViewById(android.support.design.R.id.snackbar_text);
          tv.setLayoutDirection(android.view.View.LAYOUT_DIRECTION_RTL);
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
          // return AFTER the item is dismissed, 200ms delay
          setTimeout(() => {
            resolve({
              action: 'Dismiss',
              reason: _getReason(3)
            });
          }, 200);
        } catch (ex) {
          reject(ex);
        }
      } else {
        resolve({
          action: 'None',
          message: 'No actionbar to dismiss'
        });
      }
    });
  }

  private _setBackgroundColor(color) {
    // set background color
    if (color) {
      const sbView = this._snackbar.getView();
      sbView.setBackgroundColor(new Color(color).android);
    }
  }

  private _setTextColor(color) {
    if (color) {
      const mainTextView = this._snackbar.getView().findViewById(android.support.design.R.id.snackbar_text);
      mainTextView.setTextColor(new Color(color).android);
    }
  }
}

function _getReason(value) {
  if (value === 1) {
    return 'Action';
  } else if (value === 4) {
    return 'Consecutive';
  } else if (value === 3) {
    return 'Manual';
  } else if (value === 0) {
    return 'Swipe';
  } else if (value === 2) {
    return 'Timeout';
  }
}
