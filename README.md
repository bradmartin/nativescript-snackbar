# NativeScript Snackbar

A NativeScript plugin providing the Material Design SnackBar.

## Installation
`npm install nativescript-snackbar`

## Usage

###
```XML
<Page>
   <StackLayout>
     <Button text="Show snackbar" tap="buttonTap" />
   </StackLayout>
</Page>
```

```JavaScript
var platform = require("platform");
var snackbar = require("nativescript-snackbar");

exports.buttonTap = function(args){
   var snackBar = android.support.design.widget.Snackbar;

        var listener = new android.view.View.OnClickListener({
            onClick: function () {
                console.log('clicked');
            }
        })

        snackBar.make(page.android, text, delay)
            .setAction("Okay", listener)
            .show();
  };
            
```
iOS | Android
------------ | -------------
![iOS](/ios.png) | ![Android](/android.png)
