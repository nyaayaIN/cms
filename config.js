/*
  
This file will be in the codebase and hence public. Add any passwords, 
session keys and API keys to the .env file.  

*/


exports.keystoneInit = {
  'name': 'nyaaya_cms',
  'less': 'public',
  'static': 'public',
  'favicon': 'public/favicon.ico',
  'views': 'templates/views',
  'view engine': 'pug',

  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'User'};
