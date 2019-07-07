import { SnackBar, SnackBarOptions } from 'nativescript-snackbar';
import { Observable } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';

export class HelloWorldModel extends Observable {
  private _SnackBar: SnackBar;
  public snackText: string;
  public actionText: string;
  public jsonResult: string;

  private _colors = [
    '#c61b49',
    '#fff000',
    '#336699',
    '#f47742',
    '#047c3a',
    '#066c7a',
    '#ed0909',
    '#467c1a'
  ];

  constructor(mainPage: Page) {
    super();
    this._SnackBar = new SnackBar();
    this.snackText =
      'Snackbar Text on a really long max line number, this is only 3 max lines but it could be more :) so I will keep rambling on and on and on and on. Hope this works well.';
    this.actionText = 'Okay';
    this.jsonResult = '';
  }

  public showSimple() {
    // this._SnackBar = new SnackBar();

    this._SnackBar
      .simple('Hello from the 🍫 SnackBar 👋')
      .then(args => {
        console.log('SnackBar.simple() result', args);
        this.set('jsonResult', JSON.stringify(args));
      })
      .catch(error => {
        console.log('simple snackbar error', error);
      });
  }

  public showAction() {
    const options: SnackBarOptions = {
      actionText: this.get('actionText'),
      textColor: '#fff',
      actionTextColor: this._colors[
        Math.floor(Math.random() * this._colors.length)
      ],
      backgroundColor: this._colors[
        Math.floor(Math.random() * this._colors.length)
      ],
      snackText: this.get('snackText'),
      hideDelay: 3500
    };

    this._SnackBar.action(options).then(args => {
      console.log('SnackBar.action() result', args);
      if (args.command === 'Action') {
        this.set('jsonResult', JSON.stringify(args));
      } else {
        this.set('jsonResult', JSON.stringify(args));
      }
    });
  }
}
