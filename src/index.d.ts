import { View } from "tns-core-modules/ui/core/view";
/**
 * Represents the SnackBar.
 */
export declare class SnackBar {
  /**
   * Shows a simple SnackBar.
   * @param {string} - The SnackBar text.
   * @param {string} - The color of the snackbar text.backgroundColor * Android Only *
   * @param {string} - The background color of the snackbar. * Android Only *
   * @param {number} - The max lines for the text of the snackbar. * Android Only *
   * @param {boolean} - Set RTL for the textview of the snackbar. * Android Only *
   * @param {View} - The View to which the snackbar will be attached. Default to topmost().currentPage. * Android Only *
   */
  simple(
    snackText: string,
    textColor?: string,
    backgroundColor?: string,
    maxLines?: number,
    isRTL?: boolean,
    view?: View
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
  /**
   * The action button text of the snackbar.
   */
  actionText: string;

  /**
   * The text of the snackbar.
   */
  snackText: string;

  /**
   * Delay to hide the snackbar.
   */
  hideDelay: number;

  /**
   * Action Text Color of the snackbar.
   */
  actionTextColor?: string;

  /**
   * Text Color of the snackbar.
   */
  textColor?: string;

  /**
   * Background Color of the snackbar.
   */
  backgroundColor?: string;
  /**
   * *Android Only*
   * Set the maxLines if you are displaying a long string of text and it will wrap.
   */
  maxLines?: number;

  /**
   * *Android Only*
   * Use RTL for textview of snackbar.
   */
  isRTL?: boolean;

  /**
   * *Android Only*
   * The View to which the snackbar will be attached. Useful with modals.
   * Default to topmost().currentPage
   */
  view?: View;
}

export enum DismissReasons {
  SWIPE = 'Swipe',
  ACTION = 'Action',
  TIMEOUT = 'Timeout',
  MANUAL = 'Manual',
  CONSECUTIVE = 'Consecutive'
}
