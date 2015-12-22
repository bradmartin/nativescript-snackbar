# NativeScript Snackbar

Use the Material Design Snackbar in your {N} app.
*iOS uses a 'SSSnackbar' cocoapod - https://github.com/stonesam92/SSSnackbar

## Installation
`npm install nativescript-snackbar`

## Usage

###
```XML
<Page>
   <StackLayout>
     <Button text="Show Simple Snack" tap="simpleSnack" />
     <Button text="Show Action Snack" tap="actionSnack" />
   </StackLayout>
</Page>
```

```JavaScript
var snackbar = require("nativescript-snackbar");

exports.simpleSnack = function(args) {
   //Call the simple() method on the nativescript-snackbar module
   snackbar.simple("I Love NativeScript!");   
};

exports.actionSnack = function(args) {
    var options = {
        snackText: "Emails Deleted.", // The snackText here is the main text to display with the snackbar.
        actionText: "UNDO", // The actionText will appear on the right side and is interactive if the user taps it before the snackbar hides
        hideDelay: 3000, // The android snackbar has a default of 3000ms before it hides.
        
        // Action text click function
        actionClickFunction: function () {
            viewModel.message = "ACTION!";
        }
    };

   // Call the .action() method on the nativescript-snackbar module
   snackbar.action(options);   
};

exports.dismissSnack = function(args) {
   snackbar.dismiss();
}

```
Simple Snackbar | Action Snackbar
------------ | -------------
![Simple](/simple.png) | ![Action](/action.png)
