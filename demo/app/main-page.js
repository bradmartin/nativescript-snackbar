var observable = require("data/observable").Observable;
var app = require("application");
var platformModule = require("platform");
var color = require("color");
var frame = require("ui/frame");
var snackbar = require("nativescript-snackbar");


var data = new observable({});

function pageLoaded(args) {
    var page = args.object; 
    page.bindingContext = data; 
    // Change statusbar color on Lollipop
    if (platformModule.device.sdkVersion >= "21") {
        var window = app.android.startActivity.getWindow(); 
        window.setStatusBarColor(new color.Color("#336699").android);
    } 
} 
exports.pageLoaded = pageLoaded;


function simple(args) {
    snackbar.simple("I Love NativeScript!").then(function (result) {
        console.log(result);
        data.set("msg", JSON.stringify(result));
    });
}
exports.simple = simple;

function action(args) {
    // Set the options
    var options = {
        // The snackText here is the main text to display with the snackbar. (REQUIRED)
        snackText: "Emails Deleted.", 
        // Time in ms before it hides/animates out of view (OPTIONAL).
        hideDelay: 3000,
        // The actionText will appear on the right side and is interactive if the user taps it before the snackbar hides (REQUIRED, if null defaults to .SIMPLE snackbar)
        actionText: "UNDO",
        actionTextColor: "#FF4081", // ANDROID ONLY (OPTIONAL), internally checks for android
    };

    // Open the snackbar
    snackbar.action(options)
            .then(function(args){
                //Returns a promise
                if(args.command === "Action"){
                    //Action
                    data.set("msg", "You chose to UNDO the delete.");
                }else {
                    //Dismissal or timeout
                    data.set("msg", "Your emails were deleted.");
                }  
            });
}
exports.action = action;
