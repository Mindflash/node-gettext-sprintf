var fs = require('fs');
var path = require('path');
var util = require('util');
var test = require('tap').test;
var mfLanguage = require('..');
var languageFns;

test('Setup', function(t) {
	mfLanguage({
		'test0': fs.readFileSync(path.join(__dirname, 'test0Messages.po')),
		'test1': fs.readFileSync(path.join(__dirname, 'test1Messages.po'))
	}, function(err, res) {
		t.notOk(err, "Did not error on initialize, received: " + util.inspect(err, {depth: null}));
		t.ok(res, "A result was returned from initialize, received: " + util.inspect(res, {depth: null}));
		languageFns = res;
		t.end();
	});
});

test('Simple strings work', function(t) {
	var fns = languageFns('test0');
	t.equal(fns.getText("test0 - Simple string"), "test0 - Simple string translated");
	t.end();
});

test('sprintf place-holder strings work', function(t) {
	var fns = languageFns('test0');
	t.equal(fns.getText("test0 - 1 string place-holder: %s", "test-string"), "test0 - 1 string place-holder: test-string translated");
	t.equal(fns.getText("test0 - 1 string, 1 int place-holder: %s, %d", "test-string", 30), "test0 - 1 string, 1 int place-holder: test-string, 30 translated");
	t.end();
});

test('plural place-holder strings work', function(t) {
	var fns = languageFns('test0');
	t.equal(fns.getPluralText("test0 - Simple string singular", 2), "test0 - Simple string translated plural");
	t.end();
});

test('sprintf plural place-holder strings work', function(t) {
	var fns = languageFns('test0');
	t.equal(fns.getPluralText("test0 - Simple string singular int place-holder: %d", 2, 20), "test0 - Simple string translated plural int place-holder: 20");
	t.end();
});

test('switching language works', function(t) {
	var fns0 = languageFns('test0');
	t.equal(fns0.getText("test0 - Simple string"), "test0 - Simple string translated");
	var fns1 = languageFns('test1');
	t.equal(fns1.getText("test1 - Simple string"), "test1 - Simple string translated");
	t.end();
});
