# NativeScript Snackbar

A NativeScript plugin providing the Material Design SnackBar.

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

// Future enhancement is to remove this argument from the API
var page;

// Page loaded event
exports.loaded = function(args) {
   page = args.object;
};

exports.simpleSnack = function(args) {

   var snackText = "I Love NativeScript!";
      
   //Call the simple() method on the nativescript-snackbar module
   snackbar.simple(page, snackText);
   
};

exports.actionSnack = function(args) {

   var options = {};
   options.page = page;

   // The snackText here is the main text to display with the snackbar, per the Material Design spec this should be a short message.
   var snackText = "Emails Deleted.";
   options.snackText = snackText;
   
   // The android snackbar has a default of 3000ms before it hides (animates out of view)
   var hideDelay = 3000;
   options.hideDelay = 3000;
   
   // The actionText will appear on the right side and is interactive if the user taps it before the snackbar hides
   var actionText = "UNDO";
   options.actionText = actionText;
   
   // Action text click function
   var actionTextClickFunction = function () {
      alert('Action clicked.');
   };
   options.actionTextClickFunction = actionTextClickFunction;   
   
   // Call the .action() method on the nativescript-snackbar module
   snackbar.action(options).then(function(r) {
        console.log("Result: " r);
   }, function(err) {
        console.log("Error: " err);
   });
   
};
