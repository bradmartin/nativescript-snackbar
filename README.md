[![npm](https://img.shields.io/npm/v/nativescript-snackbar.svg)](https://www.npmjs.com/package/nativescript-snackbar)
[![npm](https://img.shields.io/npm/dt/nativescript-snackbar.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-snackbar)
[![GitHub forks](https://img.shields.io/github/forks/bradmartin/nativescript-snackbar.svg)](https://github.com/bradmartin/nativescript-snackbar/network)
[![GitHub stars](https://img.shields.io/github/stars/bradmartin/nativescript-snackbar.svg)](https://github.com/bradmartin/nativescript-snackbar/stargazers)
[![PayPal Donate](https://img.shields.io/badge/Donate-PayPal-ff4081.svg)](https://www.paypal.me/bradwayne88)

# NativeScript Snackbar :lollipop: :chocolate_bar:

Use the Material Design Snackbar in your {N} app, iOS uses [SSSnackbar Cocoapod](https://github.com/stonesam92/SSSnackbar)

### Snackbar Usage

![Snackbar](./screens/snackbar.gif)

## Installation

### NativeScript 4x

`tns plugin add nativescript-snackbar`

### NativeScript 3x-

`tns plugin add nativescript-snackbar@2.0.1` or just pin `nativescript-snackbar: 2.0.1` in your app's package.json - to avoid any build conflicts is why the latest has been bumped a major.

Requires Xcode 9+ to build for iOS, so update Xcode if needed.

## Usage

### TS

```typescript
import { SnackBar, SnackBarOptions } from "nativescript-snackbar";

// Create an instance of SnackBar
let snackbar = new SnackBar();

/// Show a simple snackbar with no actions
public showSimple() {
    snackbar.simple('Snackbar', 'red', '#fff', 3, false).then((args) => {
         this.set('jsonResult', JSON.stringify(args));
   })
}

/// Show an Action snack bar
public showAction() {
  let options: SnackBarOptions = {
    actionText: this.get('actionText'),
    actionTextColor: '#ff4081', // Optional, Android only
    snackText: this.get('snackText'),
    textColor: '#346db2', // Optional, Android only
    hideDelay: 3500,
    backgroundColor: '#eaeaea', // Optional, Android only
    maxLines: 3, // Optional, Android Only
    isRTL: false // Optional, Android Only
  };

  snackbar.action(options).then((args) => {
    if (args.command === "Action") {
      this.set('jsonResult', JSON.stringify(args));
    } else {
      this.set('jsonResult', JSON.stringify(args));
    }
  });
}
```

### API

Show a simple SnackBar (color args will only work on Android)

- **simple(snackText: string, textColor?: string, backgroundColor?: string, maxLines?: number, isRTL?: boolean): Promise<any>**

Show a SnackBar with Action.

- **action(options: SnackBarOptions): Promise<any>**

Manually dismiss an active SnackBar

- **dismiss(): Promise<any>**

### SnackBarOptions Interface

- **actionText: string**
- **actionTextColor: string**
- **snackText: string**
- **hideDelay: number**
- **textColor: string**
- **backgroundColor: string**
- **maxLines: number**
- **isRTL: boolean**

## Changelog

#### 4.0.0 (November 14, 2018)

- Use support design lib version 28.0.0 if not set on the project. **Possible breaking change**
- Add enum for DismissReasons
- Use [`android.support.design.widget.BaseTransientBottomBar.BaseCallback`](https://developer.android.com/reference/android/support/design/widget/BaseTransientBottomBar.BaseCallback) class for Android callback handling. **Possible breaking change**
- Use `addCallback` to replace [deprecated `setCallback`](<https://developer.android.com/reference/android/support/design/widget/Snackbar#setCallback(android.support.design.widget.Snackbar.Callback)>)

**Reason for the "possible" breaking change - it will depend if your app relies on an older versio of the support design library than the updated `28.0.0` used as the default in this plugin. If you're using an older version of the support library, this could cause issues.**

## [3.2.0](https://github.com/bradmartin/nativescript-snackbar/tree/3.2.0) (2018-08-28)

[Full Changelog](https://github.com/bradmartin/nativescript-snackbar/compare/2.0.0...3.2.0)

**Closed issues:**

- Wrap Text in snackbar [\#33](https://github.com/bradmartin/nativescript-snackbar/issues/33)
- TypeError: Cannot read property 'currentPage' of undefined [\#32](https://github.com/bradmartin/nativescript-snackbar/issues/32)
- /Volumes/workspace/projects/solarRed/mobile/platforms/ios/Pods/SSSnackbar/Pod/Classes/SSSnackbar.m:260:13: error: unexpected '@' in program if \(@available\(iOS 11.0, \*\)\) { ^ /Volumes/workspace/projects/solarRed/mobile/platforms/ios/Pods/SSSnackbar/Pod/Classes/SSSnackbar.m:262:35: error: property 'safeAreaInsets' not found on object of type 'UIWindow \*' bottomOffset = window.safeAreaInsets.bottom; ^ [\#31](https://github.com/bradmartin/nativescript-snackbar/issues/31)
- Can we show snackbar at the top of screen not at the bottom? [\#29](https://github.com/bradmartin/nativescript-snackbar/issues/29)
- ActionTextColor is ignored [\#28](https://github.com/bradmartin/nativescript-snackbar/issues/28)
- snackbar rtl support [\#26](https://github.com/bradmartin/nativescript-snackbar/issues/26)
- Snackbar does not default to .SIMPLE when the actionText is null [\#7](https://github.com/bradmartin/nativescript-snackbar/issues/7)

**Merged pull requests:**

- iPhone X compatibility [\#30](https://github.com/bradmartin/nativescript-snackbar/pull/30) ([EddyVerbruggen](https://github.com/EddyVerbruggen))

## [2.0.0](https://github.com/bradmartin/nativescript-snackbar/tree/2.0.0) (2017-10-01)

[Full Changelog](https://github.com/bradmartin/nativescript-snackbar/compare/1.3.0...2.0.0)

**Merged pull requests:**

- Allow buttonless snackbar on iOS as well [\#27](https://github.com/bradmartin/nativescript-snackbar/pull/27) ([EddyVerbruggen](https://github.com/EddyVerbruggen))

## [1.3.0](https://github.com/bradmartin/nativescript-snackbar/tree/1.3.0) (2017-08-27)

[Full Changelog](https://github.com/bradmartin/nativescript-snackbar/compare/1.2.0...1.3.0)

**Closed issues:**

- Set the background and text color for a simple notification [\#25](https://github.com/bradmartin/nativescript-snackbar/issues/25)
- Change background color? [\#18](https://github.com/bradmartin/nativescript-snackbar/issues/18)

**Merged pull requests:**

- actionTextColor should be optional as well \(Android only\) [\#24](https://github.com/bradmartin/nativescript-snackbar/pull/24) ([EddyVerbruggen](https://github.com/EddyVerbruggen))

## [1.2.0](https://github.com/bradmartin/nativescript-snackbar/tree/1.2.0) (2017-08-19)

[Full Changelog](https://github.com/bradmartin/nativescript-snackbar/compare/1.1.5...1.2.0)

**Closed issues:**

- Does not work on a case sensitive file sytem [\#22](https://github.com/bradmartin/nativescript-snackbar/issues/22)
- Failed resolving method make on class android.support.design.widget.Snackbar [\#21](https://github.com/bradmartin/nativescript-snackbar/issues/21)
- d: framework not found SSSnackbar [\#20](https://github.com/bradmartin/nativescript-snackbar/issues/20)
- iOS - displays just a single line [\#19](https://github.com/bradmartin/nativescript-snackbar/issues/19)
- {N} v-2.4.2 pod v-1.1.1 iOS - Unable to find a specification for `SSSnackbar` [\#17](https://github.com/bradmartin/nativescript-snackbar/issues/17)
- nativescript v2.4 + android support v25.1.0 ClassNotFoundError [\#16](https://github.com/bradmartin/nativescript-snackbar/issues/16)
- Bug IOS Simultator: NSBundle.mainBundle is not a function [\#14](https://github.com/bradmartin/nativescript-snackbar/issues/14)
- Make snackbar work in a nativescript-angular application [\#13](https://github.com/bradmartin/nativescript-snackbar/issues/13)

**Merged pull requests:**

- Added textColor and backgroundColor on Android [\#23](https://github.com/bradmartin/nativescript-snackbar/pull/23) ([davorpeic](https://github.com/davorpeic))
- NSBundle.mainBundle is not a function - \#14 [\#15](https://github.com/bradmartin/nativescript-snackbar/pull/15) ([marcbuils](https://github.com/marcbuils))

## [1.1.5](https://github.com/bradmartin/nativescript-snackbar/tree/1.1.5) (2016-12-05)

[Full Changelog](https://github.com/bradmartin/nativescript-snackbar/compare/1.1.4...1.1.5)

**Closed issues:**

- Unable to build for iOS via AppBuilder [\#11](https://github.com/bradmartin/nativescript-snackbar/issues/11)

## [1.1.4](https://github.com/bradmartin/nativescript-snackbar/tree/1.1.4) (2016-09-21)

[Full Changelog](https://github.com/bradmartin/nativescript-snackbar/compare/1.1.3...1.1.4)

**Closed issues:**

- index.d.ts and snackbar.d.ts files missing \(v1.1.2\) [\#10](https://github.com/bradmartin/nativescript-snackbar/issues/10)

**Merged pull requests:**

- Add support for ios10/xcode8 class properties [\#12](https://github.com/bradmartin/nativescript-snackbar/pull/12) ([roblav96](https://github.com/roblav96))

## [1.1.3](https://github.com/bradmartin/nativescript-snackbar/tree/1.1.3) (2016-08-08)

[Full Changelog](https://github.com/bradmartin/nativescript-snackbar/compare/1.1.2...1.1.3)

## [1.1.2](https://github.com/bradmartin/nativescript-snackbar/tree/1.1.2) (2016-08-08)

[Full Changelog](https://github.com/bradmartin/nativescript-snackbar/compare/1.1.0...1.1.2)

**Merged pull requests:**

- Replace es5 functions by es6 to bind this and fix ios bugs [\#9](https://github.com/bradmartin/nativescript-snackbar/pull/9) ([marcbuils](https://github.com/marcbuils))

## [1.1.0](https://github.com/bradmartin/nativescript-snackbar/tree/1.1.0) (2016-08-02)

**Closed issues:**

- Not working for android NS 1.6.1 [\#6](https://github.com/bradmartin/nativescript-snackbar/issues/6)
- iOS support [\#1](https://github.com/bradmartin/nativescript-snackbar/issues/1)

**Merged pull requests:**

- Typo, wtf is a snackbardebuggar [\#4](https://github.com/bradmartin/nativescript-snackbar/pull/4) ([sitefinitysteve](https://github.com/sitefinitysteve))
- iOS And Promises Support...we promise [\#3](https://github.com/bradmartin/nativescript-snackbar/pull/3) ([sitefinitysteve](https://github.com/sitefinitysteve))
- iOS support [\#2](https://github.com/bradmartin/nativescript-snackbar/pull/2) ([sitefinitysteve](https://github.com/sitefinitysteve))
