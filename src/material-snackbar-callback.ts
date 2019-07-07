import { SnackBar } from './snackbar.android';

export class TNS_MaterialDesignBaseCallback extends com.google.android.material
  .snackbar.BaseTransientBottomBar.BaseCallback<
  com.google.android.material.snackbar.Snackbar
> {
  public resolve = null;
  private _owner: WeakRef<SnackBar>;

  constructor(owner: WeakRef<SnackBar>) {
    super();
    this._owner = owner;
    return global.__native(this);
  }

  onDismissed(
    snackbar: com.google.android.material.snackbar.Snackbar,
    event: number
  ) {
    // if the dismiss was not caused by the action button click listener
    if (
      event !==
      com.google.android.material.snackbar.BaseTransientBottomBar.BaseCallback
        .DISMISS_EVENT_ACTION
    ) {
      this.resolve({
        command: 'Dismiss',
        reason: this._owner.get()._getReason(event),
        event: event
      });
    }
  }

  onShown(snackbar: com.google.android.material.snackbar.Snackbar) {
    // console.log('callback onShown fired');
  }
}
