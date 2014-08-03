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

// setup the 'test' language
var getText = getText({
	'test': fs.readFileSync('./test.po')
});

/*
Given a PO in this form:

msgid ""
msgstr ""
"Language: test0"
"MIME-Version: 1.0"
"Content-Type: text/plain; charset=UTF-8"
"Content-Transfer-Encoding: 8bit"
"Plural-Forms: nplurals=2; plural=(n != 1);"

msgid "Simple string"
msgstr "Simple string translated"

msgid "1 string, 1 int place-holder: %s, %d"
msgstr "1 string, 1 int place-holder: %s, %d translated"

msgid "Simple string singular"
msgstr[0] "Simple string translated"
msgstr[1] "Simple string translated plural"

msgid "Simple string singular int place-holder: %d"
msgstr[0] "Simple string translated int place-holder: %d"
msgstr[1] "Simple string translated plural int place-holder: %d"

msgctxt "Test Context"
msgid "Simple string in context"
msgstr "Simple string in context translated"

msgctxt "Test Context"
msgid "Simple string singular in context int place-holder: %d"
msgstr[0] "Simple string in context  translated int place-holder: %d"
msgstr[1] "Simple string in context translated plural int place-holder: %d"
*/

// load the 'test' language
languageFns = getText('test');

languageFns.getSingularText("Simple string");
// returns "Simple string translated"

languageFns.getSingularText("1 string, 1 int place-holder: %s, %d", "test-string", 30);
// returns "1 string, 1 int place-holder: test-string, 30 translated"

languageFns.getSingularOrPluralText("Simple string singular", 2);
// returns "Simple string translated plural"

languageFns.getSingularOrPluralText("Simple string singular int place-holder: %d", 2, 20);
// returns "Simple string translated plural int place-holder: 20"

languageFns.getSingularTextInContext("Test Context", "Simple string in context")
// returns "Simple string in context translated"

fns.getSingularOrPluralTextInContext("Test Context", "Simple string singular in context int place-holder: %d", 2, 20),
// returns "Simple string in context translated plural int place-holder: 20"
```

The following standard gettext methods are also supported:
```
dgettext (getSingularText)
dpgettext (getSingularTextInContext)
dngettext (getSingularOrPluralText)
dnpgettext (getSingularOrPluralTextInContext)
```
