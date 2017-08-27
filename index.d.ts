/**
 * Represents the SnackBar.
 */
export declare class SnackBar {
  /**
    * Shows a simple SnackBar.
    * @param {string} - The SnackBar text.
    * @param {string} - The color of the snackbar text.backgroundColor * Android Only *
    * @param {string} - The background color of the snackbar. * Android Only *
    * @returns {number} Android color int
    */
  simple(
    snackText: string,
    textColor?: string,
    backgroundColor?: string
  ): Promise<any>;

  /**
     * Show a SnackBar with Action
     */
  action(options: SnackBarOptions): Promise<any>;

  /**
     * Manually Dismiss an active SnackBar.
     */
  dismiss(): Promise<any>;
}

export interface SnackBarOptions {
  actionText: string;
  snackText: string;
  hideDelay: number;
  actionTextColor?: string;
  textColor?: string;
  backgroundColor?: string;
}
