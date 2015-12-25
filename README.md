# SiteGate

[![Dependency Status](https://david-dm.org/sitegate/sitegate.svg)](https://david-dm.org/sitegate/sitegate)
[![Build Status](https://travis-ci.org/sitegate/sitegate.svg?branch=master)](https://travis-ci.org/sitegate/sitegate)

SiteGate is a **Node.js Express** website that handles the user sign in/up processes. SiteGate allows to create a user account either through registration with an email or using an OAuth provider like Facebook, Twitter, etc.

Usage example: https://github.com/sitegate/client-example


## Why is it better than the alternatives?

* It consists of several independent microservices.
* It supports internationalization. Currently it's only in English but will have Ukrainian, Hungarian, German and Russian translations of the interface soon.
* It is designed as a standalone application with its own data storage, so updates will be easier.
* It is also an OAuth2 server.


## What are the microservices it consists of?

* [SiteGate Session](https://github.com/sitegate/session)
* [SiteGate User](https://github.com/sitegate/user)
* [SiteGate Client](https://github.com/sitegate/client)
* [SiteGate OAuth](https://github.com/sitegate/oauth)
* [SiteGate Mailer](https://github.com/sitegate/mailer)


## What does it consist of?

SiteGate uses:

* [Gulp](http://gulpjs.com/) for task running.
* [Passport](http://passportjs.org/) for authentication.
* [MongoDB](http://www.mongodb.org/downloads) as our database.
* [Express](http://expressjs.com/) is our web framework for Node.js.
* [Semantic UI](http://semantic-ui.com/) for the fancy design.


## Installation

Add this line to your hosts file:
```
127.0.0.1 account.sitegatedev.com
```
Run these commands in a console:
````
$ git clone git@github.com:sitegate/sitegate.git && cd ./sitegate
$ npm install
$ gulp
````


## License

The MIT License (MIT)
