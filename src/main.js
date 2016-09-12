var app = require('app'); // Module to control application life.
var BrowserWindow = require('browser-window'); // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start();

var wifi = require('./wifi');
var DEV = process.env.DEV === 'true';

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  var screen = require('screen');
  console.log(screen.getAllDisplays());
  var size = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    resizable: DEV ? true : false,
    fullscreen: DEV ? false : true,
    frame: DEV ? true :false,
    width: size.width,
    height: size.height,
    kiosk: DEV ? false :true,
  });

  mainWindow.loadURL('file://' + __dirname + '/app/index.html');
  if(DEV) mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

});
