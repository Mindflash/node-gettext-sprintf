var fs = require('fs');
var path = require('path');
var test = require('tap').test;
var gtSf = require('..');
var languageFns;

test('Setup', function(t) {
	languageFns = gtSf({
		'test0': fs.readFileSync(path.join(__dirname, 'test0Messages.po')),
		'test1': fs.readFileSync(path.join(__dirname, 'test1Messages.po'))
	});
	t.end();
});

test('Simple strings work', function(t) {
	var fns = languageFns('test0');
	t.equal(fns.dgettext("test0 - Simple string"), "test0 - Simple string translated");
	t.end();
});

test('sprintf place-holder strings work', function(t) {
	var fns = languageFns('test0');
	t.equal(fns.dgettext("test0 - 1 string place-holder: %s", "test-string"), "test0 - 1 string place-holder: test-string translated");
	t.equal(fns.dgettext("test0 - 1 string, 1 int place-holder: %s, %d", "test-string", 30), "test0 - 1 string, 1 int place-holder: test-string, 30 translated");
	t.end();
});

test('plural place-holder strings work', function(t) {
	var fns = languageFns('test0');
	t.equal(fns.dngettext("test0 - Simple string singular", 2), "test0 - Simple string translated plural");
	t.end();
});

test('sprintf plural place-holder strings work', function(t) {
	var fns = languageFns('test0');
	t.equal(fns.dngettext("test0 - Simple string singular int place-holder: %d", 2, 20), "test0 - Simple string translated plural int place-holder: 20");
	t.end();
});

test('switching language works', function(t) {
	var fns0 = languageFns('test0');
	t.equal(fns0.dgettext("test0 - Simple string"), "test0 - Simple string translated");
	var fns1 = languageFns('test1');
	t.equal(fns1.dgettext("test1 - Simple string"), "test1 - Simple string translated");
	t.end();
});
