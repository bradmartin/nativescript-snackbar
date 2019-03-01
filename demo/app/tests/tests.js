describe('snackbar class', function() {
  it('can be instantiated', function() {
    var testSnackBar;
    var snackbar = require('nativescript-snackbar');
    if (snackbar) {
      testSnackBar = new snackbar.SnackBar();
      testSnackBar.simple('Simple Snackbar', 'red', '#fff', 3, false);
    }

    expect(function() {
      return new snackbar.SnackBar();
    }).not.toThrow();

    expect(new snackbar.SnackBar()).toBeDefined();
  });
});
