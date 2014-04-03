#mf-language

Gets you text, you know, in a language you specified.

[![Build Status](https://travis-ci.org/Mindflash/node-gettext-sprintf.png?branch=master)](https://travis-ci.org/Mindflash/node-gettext-sprintf)

### Installation:
```
npm install cloudfront-private-url-creator
```

### Usage:
```javascript
"use strict";
var fs = require('fs');
var mfLanguage = require('mf-language');
var languageFns;

mfLanguage({
	'test': fs.readFileSync('./test.po')
}, function(err, res) {
	languageFns = res('test'); // loads the 'test' language

	languageFns.getText("Simple string");
	// returns "Simple string translated"

	languageFns.getText("1 string, 1 int place-holder: %s, %d", "test-string", 30);
	// returns "1 string, 1 int place-holder: test-string, 30 translated"

	languageFns.getTextPlural("Simple string singular", 2);
	// returns "Simple string translated plural"

	languageFns.getTextPlural("Simple string singular int place-holder: %d", 2, 20);
	// returns "Simple string translated plural int place-holder: 20"
});

```
