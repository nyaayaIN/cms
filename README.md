# Nyaaya CMS

[Keystone.js](http://keystonejs.com) Version : 4.0 beta based CMS for handling the backend of nyaaya-web.

## Requirements

You wil need:
* [Node 8](https://nodejs.org/en/download/)
* [MongoDB](https://docs.mongodb.com/manual/installation/)

## Running locally

#### Clone this repo

```
git clone git@github.com:nyaayaIN/cms.git
```

#### Install Dependencies

```
npm install
```

or if you have [yarn installed](https://yarnpkg.com/en/docs/install) you could run

```
yarn
```
#### Start mongodb
In a new bash session

```
mongod
```

#### Set Environment varibles
Create an env file for environment variables in this repo
```
touch .env
```
and add the following
```
NODE_ENV=development
COOKIE_SECRET=YOURSECRET
MONGO_URI=mongodb://localhost/cms
PORT=3000
```

#### Start the Application
Keystone will create a DB called `cms` and set up the appropriate collections necessary as well as an admin user.

#### Use the CMS

Login at [http://localhost:3000/keystone/signin](http://localhost:3000/keystone/signin) with
```
Username: contact@nyaaya.in
Password: fake
```
---
