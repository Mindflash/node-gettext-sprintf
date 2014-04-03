var _ = require('lodash');
var vsprintf = require("sprintf-js").vsprintf;
var Gettext = require("node-gettext");
var gt = new Gettext();

function getText(language) {
	return function () {
		var msgId = arguments[0];
		var sprintfArgs = _.rest(arguments, 1);

		return vsprintf(gt.dgettext(language, msgId), sprintfArgs);
	};
}

function getTextFromContext(language) {
	return function () {
		var msgContext = arguments[0];
		var msgId = arguments[1];
		var sprintfArgs = _.rest(arguments, 2);

		return vsprintf(gt.dpgettext(language, msgContext, msgId), sprintfArgs);
	};
}

function getPluralText(language) {
	return function () {
		var msgId = arguments[0];
		var amt = arguments[1];
		var sprintfArgs = _.rest(arguments, 2);

		return vsprintf(gt.dngettext(language, msgId, null, amt), sprintfArgs);
	};
}

function getPluralTextFromContext(language) {
	return function () {
		var msgContext = arguments[0];
		var msgId = arguments[1];
		var amt = arguments[2];
		var sprintfArgs = _.rest(arguments, 3);

		return vsprintf(gt.dnpgettext(language, msgContext, msgId, null, amt), sprintfArgs);
	};
}

// domains: {es: contents-of-es.po, fr: contents-of-fr.po}
function mfLanguage(domains, cb) {
	if(_.isEmpty(domains) || !_.isObject(domains))
		return cb(new Error('domains argument required'));

	_.each(domains, function(poContent, language) {
		gt.addTextdomain(language, poContent);
	});

	cb(null, function (language) {
		return {
			getText: getText(language),
			getTextFromContext: getTextFromContext(language),
			getPluralText: getPluralText(language),
			getPluralTextFromContext: getPluralTextFromContext(language)
		};
	});
}
module.exports = mfLanguage;
