// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');

var keystoneInit = require('./config');
// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

//Logging starts here. 
var fs = require('fs');
var path = require('path');
var FileStreamRotator = require('file-stream-rotator');

// ensure log directory exists
var logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: logDirectory + '/access-%DATE%.log',
    frequency: 'daily',
    verbose: false //if set will log the name of log file when it rotates them on STDOUT. default is TRUE. 
});


//read the source file before updating, documentation is wrong.    
keystoneInit["logger"] = "combined";
keystoneInit["logger options"] = {"stream": accessLogStream };

keystone.init(keystoneInit);

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
    _: require('lodash'),
    env: keystone.get('env'),
    utils: keystone.utils,
    editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
    pages: ['static-pages'],
    content: ['categories', 'topics', 'explanations', 'questions', 'terms', 'checklists'],
    users: 'users',
});

// Start Keystone to connect to your database and initialise the web server
keystone.start();