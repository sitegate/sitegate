SiteGate
========

SiteGate is a **Node.js Express** website that handles the user sign in/up processes. SiteGate allows to create a user account either through registration with an email or using an OAuth provider like Facebook, Twitter, etc.

Usage example: https://github.com/zkochan/sitegate-client-example

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
````
$ git clone git@github.com:zkochan/sitegate.git && cd ./sitegate
$ npm install && bower install
$ gulp
````