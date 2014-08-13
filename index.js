var extsprintf = require('extsprintf');
var Gettext = require("node-gettext");
var gt = new Gettext();
var __slice = Array.prototype.slice;

function GetTextFunctions(language) {

	// get text
	function dgettext() {
		var args = __slice.call(arguments);
		var msgId = args[0];

		var text = gt.dgettext(language, msgId);
		if (args.length === 1) return text;

		var sprintfArgs = [ text ].concat(__slice.call(args, 1));
		return extsprintf.sprintf.apply(this, sprintfArgs);
	}

	// get text from context
	function dpgettext() {
		var args = __slice.call(arguments);
		var msgContext = args[0];
		var msgId = args[1];

		var text = gt.dpgettext(language, msgContext, msgId);
		if (args.length === 2) return text;

		var sprintfArgs = [ text ].concat(__slice.call(args, 2));
		return extsprintf.sprintf.apply(this, sprintfArgs);
	}

	// get plural text
	function dngettext() {
		var args = __slice.call(arguments);
		var msgId = args[0];
		var amt = args[1];

		var text = gt.dngettext(language, msgId, null, amt);
		if (args.length === 2) return text;

		var sprintfArgs = [ text ].concat(__slice.call(args, 2));
		return extsprintf.sprintf.apply(this, sprintfArgs);
	}

	// get plural text from context
	function dnpgettext() {
		var args = __slice.call(arguments);
		var msgContext = args[0];
		var msgId = args[1];
		var amt = args[2];

		var text = gt.dnpgettext(language, msgContext, msgId, null, amt);
		if (args.length === 3) return text;

		var sprintfArgs = [ text ].concat(__slice.call(args, 3));
		return extsprintf.sprintf.apply(this, sprintfArgs);
	}

	return {
		dgettext: dgettext,
		dpgettext: dpgettext,
		dngettext: dngettext,
		dnpgettext: dnpgettext,
		// Sugar, since not everyone has read the gettext manual :)
		getSingularText: dgettext,
		getSingularTextInContext: dpgettext,
		getSingularOrPluralText: dngettext,
		getSingularOrPluralTextInContext: dnpgettext
	};
}

// domains: {es: contents-of-es.po, fr: contents-of-fr.po} etc
module.exports = function (domains) {
	if (!domains || Object.keys(domains).length === 0)
		throw new Error('domains argument required.');

	var cache = {};
	Object.keys(domains).forEach(function (language) {
		gt.addTextdomain(language, domains[language]);
		cache[language] = new GetTextFunctions(language);
	});

	return function (language) {
		if (!cache[language])
			throw new Error('specified language: "' + language + '" not found.');

		return cache[language];
	};
};
