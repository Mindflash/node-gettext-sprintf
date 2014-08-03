var vsprintf = require("sprintf-js").vsprintf;
var Gettext = require("node-gettext");
var gt = new Gettext();
var __slice = Array.prototype.slice;

function GetTextFunctions(language) {

	// get text
	function dgettext() {
		var args = __slice.call(arguments);
		var msgId = args[0];

		if(args.length === 1)
			return gt.dgettext(language, msgId);

		var sprintfArgs = __slice.call(args, 1);
		return vsprintf(gt.dgettext(language, msgId), sprintfArgs);
	}

	// get text from context
	function dpgettext() {
		var args = __slice.call(arguments);
		var msgContext = args[0];
		var msgId = args[1];

		if(args.length === 2)
			return gt.dpgettext(language, msgContext, msgId);

		var sprintfArgs = __slice.call(args, 2);
		return vsprintf(gt.dpgettext(language, msgContext, msgId), sprintfArgs);
	}

	// get plural text
	function dngettext() {
		var args = __slice.call(arguments);
		var msgId = args[0];
		var amt = args[1];

		if(args.length === 2)
			return gt.dngettext(language, msgId, null, amt);

		var sprintfArgs = __slice.call(args, 2);
		return vsprintf(gt.dngettext(language, msgId, null, amt), sprintfArgs);
	}

	// get plural text from context
	function dnpgettext() {
		var args = __slice.call(arguments);
		var msgContext = args[0];
		var msgId = args[1];
		var amt = args[2];

		if(args.length === 3)
			return gt.dnpgettext(language, msgContext, msgId, null, amt);

		var sprintfArgs = __slice.call(args, 3);
		return vsprintf(gt.dnpgettext(language, msgContext, msgId, null, amt), sprintfArgs);
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
		if(!cache[language])
			throw new Error('specified language: "'+language+'" not found.');

		return cache[language];
	};
};
