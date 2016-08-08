/**
 * Represents the SnackBar.
 */
export declare class SnackBar {

    /**
    * Shows a simple SnackBar.
    * @param {string} - The SnackBar text.
    * @returns {number} Android color int
    */
    simple(snackText: string): Promise<any>;

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
    actionText: string,
    actionTextColor: string,
    snackText: string,
    hideDelay: number
}
