# NativeScript Snackbar

A NativeScript plugin providing the Material Design SnackBar.

## Installation
`npm install nativescript-snackbar`

## Usage

###
```XML
<Page>
   <StackLayout>
     <Button text="Show Simple Snack" tap="simple" />
     <Button text="Show Action Snack" tap="action" />
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

// .simpleSnackbar(View page, string snackText)
exports.simple = function(args) {
   var snackText = "I Love NativeScript!";
   //Call the simpleSnackbar() method on the nativescript-snackbar module
   snackbar.simpleSnackbar(page, snackText);
};

// .actionSnackbar(View page, string snackText, int hideDelay, string actionText, function actionTextClickFunction)
exports.action = function(args) {

   // The snackText here is the main text to display with the snackbar, per the Material Design spec this should be a short message.
   var snackText = "Emails Deleted.";
   
   // The android snackbar has a default of 3000ms before it hides (animates out of view)
   var hideDelay = 3000;
   
   // The actionText will appear on the right side and is interactive if the user taps it before the snackbar hides
   var actionText = "UNDO";
   
   // Action text click function
   var actionTextClickFunction = function () {
      alert('Action clicked.');
   };
   
   // Call the .actionSnackbar() method on the nativescript-snackbar module
   snackbar.actionSnackbar(page, snackText, hideDelay, actionText, actionTextClickFunction);
   
};
