SiteGate [![Dependency Status](https://david-dm.org/zkochan/sitegate/status.svg?style=flat)](https://david-dm.org/zkochan/sitegate) [![Build Status](http://img.shields.io/travis/zkochan/sitegate.svg?style=flat)](https://travis-ci.org/zkochan/sitegate)
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

License
========

The MIT License (MIT)

Copyright (c) 2014-2015 Sahat Yalkabov

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/zkochan/sitegate/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
