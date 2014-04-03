var fs = require('fs');
var path = require('path');
var util = require('util');
var test = require('tap').test;
var mfLanguage = require('..');
var languageFns;

test('Setup', function(t) {
	mfLanguage({
		'test': fs.readFileSync(path.join(__dirname, 'messages.po'))
	}, function(err, res) {
		t.notOk(err, "Did not error on initialize, received: " + util.inspect(err, {depth: null}));
		t.ok(res, "A result was returned from initialize, received: " + util.inspect(res, {depth: null}));
		languageFns = res;
		t.end();
	});
});

test('Simple strings work', function(t) {
	var fns = languageFns('test'); // use languages/test/messages.po
	t.equal(fns.getText("Simple string"), "Simple string translated");
	t.end();
});

test('sprintf place-holder strings work', function(t) {
	var fns = languageFns('test'); // use languages/test/messages.po
	t.equal(fns.getText("1 string place-holder: %s", "test-string"), "1 string place-holder: test-string translated");
	t.equal(fns.getText("1 string, 1 int place-holder: %s, %d", "test-string", 30), "1 string, 1 int place-holder: test-string, 30 translated");
	t.end();
});

test('plural place-holder strings work', function(t) {
	var fns = languageFns('test'); // use languages/test/messages.po
	t.equal(fns.getPluralText("Simple string singular", 2), "Simple string translated plural");
	t.end();
});

test('sprintf plural place-holder strings work', function(t) {
	var fns = languageFns('test'); // use languages/test/messages.po
	t.equal(fns.getPluralText("Simple string singular int place-holder: %d", 2, 20), "Simple string translated plural int place-holder: 20");
	t.end();
});
