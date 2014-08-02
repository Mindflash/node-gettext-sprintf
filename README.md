#node-gettext-sprintf

A combination of node-gettext and sprintf

[![Build Status](https://travis-ci.org/Mindflash/node-gettext-sprintf.png?branch=master)](https://travis-ci.org/Mindflash/node-gettext-sprintf)

### Installation:
```
npm install node-gettext-sprintf
```

### Usage:
```javascript
"use strict";
var fs = require('fs');
var getText = require('node-gettext-sprintf');

var getText = getText({
	'test': fs.readFileSync('./test.po')
});

languageFns = getText('test'); // loads the 'test' language

languageFns.getText("Simple string");
// returns "Simple string translated"

languageFns.getText("1 string, 1 int place-holder: %s, %d", "test-string", 30);
// returns "1 string, 1 int place-holder: test-string, 30 translated"

languageFns.getTextPlural("Simple string singular", 2);
// returns "Simple string translated plural"

languageFns.getTextPlural("Simple string singular int place-holder: %d", 2, 20);
// returns "Simple string translated plural int place-holder: 20"
```
