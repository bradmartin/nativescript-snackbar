import { SnackBar, SnackBarOptions } from 'nativescript-snackbar';
import { Observable } from 'tns-core-modules/data/observable';
import { confirm } from 'tns-core-modules/ui/dialogs';
import { Page } from 'tns-core-modules/ui/page';
import { openUrl } from 'tns-core-modules/utils/utils';

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

  nStudioIconTap() {
    confirm({
      message:
        'nStudio, LLC. specializes in custom software applications ranging from mobile, web, desktop, server and more. Would you like to visit nstudio.io?',
      okButtonText: 'Yes',
      cancelButtonText: 'Close'
    }).then(result => {
      if (result) {
        openUrl('https://nstudio.io');
      }
    });
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
    console.log('action snackbar');

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

    console.log('snackbar', this._SnackBar);

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
