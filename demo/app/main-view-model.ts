import { SnackBar, SnackBarOptions } from 'nativescript-snackbar';
import { Observable } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';

export class HelloWorldModel extends Observable {
  private _SnackBar: SnackBar;
  public snackText: string;
  public actionText: string;
  public jsonResult: string;

  constructor(mainPage: Page) {
    super();

    this._SnackBar = new SnackBar();
    this.snackText =
      'Snackbar Text on a really freaking lone max line number, this is only 3 max lines but it could be more :) so I will keep rambling on and on and on and on until the cows come home. Hope this works well.';
    this.actionText = 'Okay';
    this.jsonResult = '';
  }

  public showSimple() {
    this._SnackBar.simple(this.get('snackText'), null, null, 3, true).then(args => {
      this.set('jsonResult', JSON.stringify(args));
    });
  }

  public showAction() {
    let options: SnackBarOptions = {
      actionText: this.get('actionText'),
      textColor: '#333',
      actionTextColor: '#ff4081',
      backgroundColor: '#d3c454',
      snackText: this.get('snackText'),
      hideDelay: 3500
    };

    this._SnackBar.action(options).then(args => {
      if (args.command === 'Action') {
        this.set('jsonResult', JSON.stringify(args));
      } else {
        this.set('jsonResult', JSON.stringify(args));
      }
    });
  }
}
