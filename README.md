#express-boobst
[![NPM version](https://badge.fury.io/js/express-boobst.png)](http://badge.fury.io/js/express-boobst)

express-boobst is a Intersystems Caché session store for Express 4 plugin `express-session` backed by [boobst](https://github.com/agsh/boobst).

##Installation

via npm:

```
npm install express-boobst
```

##Options
To start ```express-boobst```, you have to pass function, returning an instance of boobst class, thus permitting the
usage of existing connections or server configurations.

Using an existing connection:
+ boobst Existing connection reference (instance of Boobst)

Or with a function:
+ getConnection

Other options:
+ global Name of a global where session will be stored
+ ns Namespace

##Example

``` Javascript
var express = require('express'),
	expressSession = require('express-session'),
    ExpressBoobst = require('express-boobst'),
    BoobstSocket = require('boobst').BoobstSocket,
    sessionStore = new ExpressBoobst({
    	boobst: new BoobstSocket(
            host: 'localhost',
            port: 6666
    	)
    }),
    session = expressSession({
        key: KEY,
        store: sessionStore,
        secret: SECRET,
        resave: false,
        saveUninitialized: true
    })
    ;

var app = express();
app.use(session);
```
