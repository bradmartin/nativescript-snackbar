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
var snackbar = require("nativescript-snackbar");

// 0.0.1 will use the page variable from the pageLoaded event
// Future enhancement is to remove this argument from the API
var page;

// Page loaded event
exports.loaded = function(args) {
   page = args.object;
};

exports.buttonTap = function(args){
   
   // The snackText here is the main text to display with the snackbar, per the Material Design spec this should be a short message.
   var snackText = "I Love NativeScript!";
   // The android snackbar has a default of 3000ms before it hides (animates out of view)
   var hideDelay = 3000;
   // The actionText will appear on the right side and is interactive if the user taps it before the snackbar hides
   var actionText = "OKAY";
   // Call the .make() function on the snackbar module
   var snack = snackbar.make(page, snackText, hideDelay, actionText, actionClickFunction);
   
};
