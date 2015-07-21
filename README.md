SiteGate

[![Dependency Status](https://david-dm.org/sitegate/sitegate.svg)](https://david-dm.org/sitegate/sitegate)
[![Build Status](https://travis-ci.org/sitegate/sitegate.svg?branch=master)](https://travis-ci.org/sitegate/sitegate)
========

SiteGate is a **Node.js Express** website that handles the user sign in/up processes. SiteGate allows to create a user account either through registration with an email or using an OAuth provider like Facebook, Twitter, etc.

Usage example: https://github.com/zkochan/sitegate-client-example

Why is it better than the alternatives?
========
* It consists of several independent microservices.
* It supports internationalization. Currently it's only in English but will have Ukrainian, Hungarian, German and Russian translations of the interface soon.
* It is designed as a standalone application with its own data storage, so updates will be easier.
* It is also an OAuth2 server.

What are the microservices it consists of?
=======
* [SiteGate User](https://github.com/zkochan/sitegate-user)
* [SiteGate Client](https://github.com/zkochan/sitegate-client)
* [SiteGate OAuth](https://github.com/zkochan/sitegate-oauth)
* [SiteGate Mailer](https://github.com/zkochan/sitegate-mailer)

What does it consist of?
========

SiteGate uses:

* [Gulp](http://gulpjs.com/) for task running.
* [Bower](http://bower.io/) for managing front-end packages.
* [Passport](http://passportjs.org/) for authentication.
* [MongoDB](http://www.mongodb.org/downloads) as our database.
* [Express](http://expressjs.com/) is our web framework for Node.js.
* [Semantic UI](http://semantic-ui.com/) for the fancy design.

Installation
========
Add this line to your hosts file:
```
127.0.0.1 account.sitegatedev.com
```
Run these commands in a console:
````
$ git clone git@github.com:zkochan/sitegate.git && cd ./sitegate
$ npm install && bower install
$ gulp
````
Generate your local SSL certificates in the ./certs folder. You can use these commands:
````
$ openssl genrsa -out privatekey.pem 1024
$ openssl req -new -key privatekey.pem -out certrequest.csr
$ openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem
````

License
========

The MIT License (MIT)
