var _ = require('lodash');
var vsprintf = require("sprintf-js").vsprintf;
var Gettext = require("node-gettext");
var gt = new Gettext();

// get text
function dgettext(language) {
	return function () {
		var msgId = arguments[0];
		var sprintfArgs = _.rest(arguments, 1);

		return vsprintf(gt.dgettext(language, msgId), sprintfArgs);
	};
}

// get text from context
function dpgettext(language) {
	return function () {
		var msgContext = arguments[0];
		var msgId = arguments[1];
		var sprintfArgs = _.rest(arguments, 2);

		return vsprintf(gt.dpgettext(language, msgContext, msgId), sprintfArgs);
	};
}

// get plural text
function dngettext(language) {
	return function () {
		var msgId = arguments[0];
		var amt = arguments[1];
		var sprintfArgs = _.rest(arguments, 2);

		return vsprintf(gt.dngettext(language, msgId, null, amt), sprintfArgs);
	};
}

// get plural text from context
function dnpgettext(language) {
	return function () {
		var msgContext = arguments[0];
		var msgId = arguments[1];
		var amt = arguments[2];
		var sprintfArgs = _.rest(arguments, 3);

		return vsprintf(gt.dnpgettext(language, msgContext, msgId, null, amt), sprintfArgs);
	};
}

// domains: {es: contents-of-es.po, fr: contents-of-fr.po} etc
function mfLanguage(domains, cb) {
	if(_.isEmpty(domains) || !_.isObject(domains))
		return setImmediate(function() { cb(new Error('domains argument required')); });

	_.each(domains, function(poContent, language) {
		gt.addTextdomain(language, poContent);
	});

	var ret =
	cb(null, function (language) {
		return {
			dgettext: dgettext(language),
			dpgettext: dpgettext(language),
			dngettext: dngettext(language),
			dnpgettext: dnpgettext(language)
		};
	});
}
module.exports = mfLanguage;
