# Nyaaya CMS

[Keystone.js](http://keystonejs.com) Version : 4.0beta based CMS for handling the backend of nyaaya-web. 

## Running locally

	- node version : 8.9.1 LTS;  

    - add the MONGO_URI setting to the .env file with mongodb instance credentials; this can be your local db or hosted on server. 

    - add a random, peferably long, string to encrypt the session in the COOKIE_SECRET setting in the .env file

    - Customize the admin user to your own before applying the updates. Keystone applies updates only the first time the instance runs.   

    - npm install && npm start
