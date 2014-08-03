var vsprintf = require("sprintf-js").vsprintf;
var Gettext = require("node-gettext");
var gt = new Gettext();
var __slice = Array.prototype.slice;

function GetTextFunctions(language) {

	// get text
	function dgettext() {
		var args = __slice.call(arguments);
		var msgId = args[0];
		var sprintfArgs = __slice.call(args, 1);

		if(sprintfArgs.length === 0)
			return gt.dgettext(language, msgId);

		return vsprintf(gt.dgettext(language, msgId), sprintfArgs);
	}

	// get text from context
	function dpgettext() {
		var args = __slice.call(arguments);
		var msgContext = args[0];
		var msgId = args[1];
		var sprintfArgs = __slice.call(args, 2);

		if(sprintfArgs.length === 0)
			return gt.dpgettext(language, msgContext, msgId);

		return vsprintf(gt.dpgettext(language, msgContext, msgId), sprintfArgs);
	}

	// get plural text
	function dngettext() {
		var args = __slice.call(arguments);
		var msgId = args[0];
		var amt = args[1];
		var sprintfArgs = __slice.call(args, 2);

		if(sprintfArgs.length === 0)
			return gt.dngettext(language, msgId, null, amt);

		return vsprintf(gt.dngettext(language, msgId, null, amt), sprintfArgs);
	}

	// get plural text from context
	function dnpgettext() {
		var args = __slice.call(arguments);
		var msgContext = args[0];
		var msgId = args[1];
		var amt = args[2];
		var sprintfArgs = __slice.call(args, 3);

		if(sprintfArgs.length === 0)
			return gt.dnpgettext(language, msgContext, msgId, null, amt);

		return vsprintf(gt.dnpgettext(language, msgContext, msgId, null, amt), sprintfArgs);
	}

	return {
		dgettext: dgettext,
		dpgettext: dpgettext,
		dngettext: dngettext,
		dnpgettext: dnpgettext
	};
}

// domains: {es: contents-of-es.po, fr: contents-of-fr.po} etc
module.exports = function (domains) {
	if (!domains || Object.keys(domains).length === 0)
		throw new Error('domains argument required');

	Object.keys(domains).forEach(function (language) {
		gt.addTextdomain(language, domains[language]);
	});

	return function (language) {
		return new GetTextFunctions(language);
	};
};
