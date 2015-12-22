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
     <Button text="Hide Snack" tap="dismissSnack" />
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
    //Set the options
    var options = {
        // The snackText here is the main text to display with the snackbar. (REQUIRED)
        snackText: "Emails Deleted.", 
        // Time in ms before it hides/animates out of view (OPTIONAL).
        hideDelay: 3000,
        // The actionText will appear on the right side and is interactive if the user taps it before the snackbar hides (REQUIRED, if null defaults to .SIMPLE snackbar)
        actionText: "UNDO",
        actionTextColor: "#FF4081", // ANDROID ONLY (OPTIONAL)
    };

   // Open the snackbar
   snackbar.action(options)
        .then(function(args){
               //Returns a promise
                if(args.command == "Action"){
                    //Action
                }else {
                    //Dismissal or timeout
                }  
            });
    });   
};

exports.dismissSnack = function(args) {
   snackbar.dismiss();
}

```
Simple Snackbar | Action Snackbar
------------ | -------------
![Simple](/simple.png) | ![Action](/action.png)
