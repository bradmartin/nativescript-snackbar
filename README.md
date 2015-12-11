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

exports.simpleSnack = function(args) {
   var snackText = "I Love NativeScript!";      
   //Call the simple() method on the nativescript-snackbar module
   snackbar.simple(snackText);   
};

exports.actionSnack = function(args) {
   var options = {};
   // The snackText here is the main text to display with the snackbar.
   options.snackText = "Emails Deleted.";   
   // The android snackbar has a default of 3000ms before it hides.
   options.hideDelay = 3000;   
   // The actionText will appear on the right side and is interactive if the user taps it before the snackbar hides
   options.actionText = "UNDO";   
   // Action text click function
   options.actionClickFunction = function () {
      alert('Action clicked.');
   };    
   // Call the .action() method on the nativescript-snackbar module
   snackbar.action(options);   
};

```
Simple Snackbar | Action Snackbar
------------ | -------------
![iOS](/simple.png) | ![Android](/action.png)
