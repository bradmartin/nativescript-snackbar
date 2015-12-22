# NativeScript Snackbar

Use the Material Design Snackbar in your {N} app.
*iOS uses the 'SSSnackbar' cocoapod - https://github.com/stonesam92/SSSnackbar

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
   snackbar.simple("I Love NativeScript!").then(function(result) {
        console.log(result);
    });   
};

exports.actionSnack = function(args) {
    var options = {
        // The snackText here is the main text to display with the snackbar. (REQUIRED)
        snackText: "Emails Deleted.", 
        // Time in ms before it hides/animates out of view (OPTIONAL).
        hideDelay: 3000,
        // The actionText will appear on the right side and is interactive if the user taps it before the snackbar hides (REQUIRED, if null defaults to .SIMPLE snackbar)
        actionText: "UNDO",
        actionTextColor: "#FF4081", // ANDROID ONLY (OPTIONAL)
        // Action text click function (REQUIRED)
        actionClickFunction: function () {
            viewModel.message = "DO NOT DELETE";
        },
        // Dismissal Callback (OPTIONAL) - use this to follow through with the intent that showed the snackbar.
        // Think in terms of deleting something, the snackbar gives the user a few seconds to think about
        // the action and time to prevent it if needed. So if they do not interact with the snackbar
        // this function will be triggered
        dismissalCallback: function() {
            viewModel.message = "DELETE ITEMS";
        }
    };

   // Call the .action() method on the nativescript-snackbar module
   snackbar.action(options).then(function(result) {
        console.log(result);
    });   
};

exports.dismissSnack = function(args) {
   snackbar.dismiss();
}

```
Simple Snackbar | Action Snackbar
------------ | -------------
![Simple](/simple.png) | ![Action](/action.png)
