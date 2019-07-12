import { Color } from 'tns-core-modules/color';
import { View } from 'tns-core-modules/ui/core/view';
import { topmost } from 'tns-core-modules/ui/frame';
import { DismissReasons, SnackBarOptions } from './snackbar.common';
export * from './snackbar.common';

declare const global: any;

const Snackbar_Namespace = useAndroidX()
  ? com.google.android.material.snackbar
  : (android.support as any).design.widget;
const SNACKBAR_TEXT_ID = useAndroidX()
  ? (com.google.android.material as any).R.id.snackbar_text
  : (android.support as any).design.R.id.snackbar_text;

function useAndroidX() {
  return (
    global.androidx &&
    com.google &&
    com.google.android &&
    com.google.android.material
  );
}

export class SnackBar {
  private _snackbar: any;

  constructor() {}

  // TODO: use an object for the options
  public simple(
    snackText: string,
    textColor?: string,
    backgroundColor?: string,
    maxLines?: number,
    isRTL?: boolean,
    view?: View
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (!snackText) {
          reject('Snack text is required.');
          return;
        }

        const attachToView =
          (view && view.android) || topmost().currentPage.android;
        this._snackbar = Snackbar_Namespace.Snackbar.make(
          attachToView,
          snackText,
          3000
        );

        this._snackbar.setText(snackText);

        // set text color
        if (textColor && Color.isValid(textColor)) {
          this._setTextColor(textColor);
        }

        // set background color
        if (backgroundColor && Color.isValid(backgroundColor)) {
          this._setBackgroundColor(backgroundColor);
        }

        // determine which snackbar namespace is used for the correct callback implementation
        const cb = new TNS_SnackbarBaseCallback(new WeakRef(this));
        cb.resolve = resolve; // handles the resolve of the promise
        this._snackbar.addCallback(cb);

        // https://github.com/bradmartin/nativescript-snackbar/issues/33
        if (maxLines) {
          const sbView = this._snackbar.getView();
          const tv = sbView.findViewById(
            SNACKBAR_TEXT_ID
          ) as android.widget.TextView;
          tv.setMaxLines(maxLines);
        }

        // set RTL for snackbar
        // https://github.com/bradmartin/nativescript-snackbar/issues/26
        if (isRTL === true) {
          const sbView = this._snackbar.getView();
          const tv = sbView.findViewById(
            SNACKBAR_TEXT_ID
          ) as android.widget.TextView;

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

        const attachToView =
          (options.view && options.view.android) ||
          topmost().currentPage.android;
        this._snackbar = Snackbar_Namespace.Snackbar.make(
          attachToView,
          options.snackText,
          options.hideDelay
        );

        this._snackbar.setText(options.snackText);
        this._snackbar.setDuration(options.hideDelay);

        const listener = new android.view.View.OnClickListener({
          onClick: args => {
            resolve({
              command: 'Action',
              reason: this._getReason(1),
              event: args
            });
          }
        });

        // set the action text, click listener
        this._snackbar.setAction(options.actionText, listener);

        // set text color of the TextView in the Android SnackBar
        if (options.textColor && Color.isValid(options.textColor)) {
          this._setTextColor(options.textColor);
        }

        if (options.actionTextColor && Color.isValid(options.actionTextColor)) {
          this._snackbar.setActionTextColor(
            new Color(options.actionTextColor).android
          );
        }

        // set background color
        if (options.backgroundColor && Color.isValid(options.backgroundColor)) {
          this._setBackgroundColor(options.backgroundColor);
        }

        // set maxLines for the textview
        // https://github.com/bradmartin/nativescript-snackbar/issues/33
        if (options.maxLines) {
          const sbView = this._snackbar.getView();

          const tv = sbView.findViewById(
            SNACKBAR_TEXT_ID
          ) as android.widget.TextView;

          tv.setMaxLines(options.maxLines);
        }

        // set RTL for snackbar
        // https://github.com/bradmartin/nativescript-snackbar/issues/26
        if (options.isRTL === true) {
          const sbView = this._snackbar.getView();

          const tv = sbView.findViewById(
            SNACKBAR_TEXT_ID
          ) as android.widget.TextView;

          tv.setLayoutDirection(android.view.View.LAYOUT_DIRECTION_RTL);
        }

        const cb = new TNS_SnackbarBaseCallback(new WeakRef(this));
        cb.resolve = resolve; // handles the resolve of the promise
        this._snackbar.addCallback(cb);

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
              reason: this._getReason(3)
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

  public _getReason(value: number) {
    switch (value) {
      // Indicates that the Snackbar was dismissed via a swipe.
      case 0:
        return DismissReasons.SWIPE;
      // Indicates that the Snackbar was dismissed via an action click.
      case 1:
        return DismissReasons.ACTION;
      // Indicates that the Snackbar was dismissed via a swipe.
      case 2:
        return DismissReasons.TIMEOUT;
      // Indicates that the Snackbar was dismissed via a call to dismiss().
      case 3:
        return DismissReasons.MANUAL;
      // Indicates that the Snackbar was dismissed from a new Snackbar being shown.
      case 4:
        return DismissReasons.CONSECUTIVE;
      default:
        return DismissReasons.UNKNOWN;
    }
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
      console.log('setting text color...', SNACKBAR_TEXT_ID);
      const mainTextView = this._snackbar
        .getView()
        .findViewById(SNACKBAR_TEXT_ID) as android.widget.TextView;
      console.log('textview', mainTextView);

      mainTextView.setTextColor(new Color(color).android);
    }
  }
}

export class TNS_SnackbarBaseCallback extends Snackbar_Namespace
  .BaseTransientBottomBar.BaseCallback<any> {
  public resolve = null;
  private _owner: WeakRef<SnackBar>;

  constructor(owner: WeakRef<SnackBar>) {
    super();
    this._owner = owner;
    return global.__native(this);
  }

  onDismissed(snackbar: any, event: number) {
    // if the dismiss was not caused by the action button click listener
    if (event !== 1) {
      this.resolve({
        command: 'Dismiss',
        reason: this._owner.get()._getReason(event),
        event: event
      });
    }
  }

  onShown(snackbar: any) {
    // console.log('callback onShown fired');
  }
}
