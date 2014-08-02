var vsprintf = require("sprintf-js").vsprintf;
var Gettext = require("node-gettext");
var gt = new Gettext();

// domains: {es: contents-of-es.po, fr: contents-of-fr.po} etc
module.exports = function (domains, cb) {
	if(!domains || Object.keys(domains).length === 0)
		return setImmediate(function() { cb(new Error('domains argument required')); });

	Object.keys(domains).forEach(function(language) {
		gt.addTextdomain(language, domains[language]);
	});

	cb(null, function (language) {
		return {
			// get text
			dgettext: function () {
				var args = Array.prototype.slice.call(arguments);
				var msgId = args[0];
				var sprintfArgs = args.slice(1);

				return vsprintf(gt.dgettext(language, msgId), sprintfArgs);
			},

			// get text from context
			dpgettext: function () {
				var args = Array.prototype.slice.call(arguments);
				var msgContext = args[0];
				var msgId = args[1];
				var sprintfArgs = args.slice(2);

				return vsprintf(gt.dpgettext(language, msgContext, msgId), sprintfArgs);
			},

			// get plural text
			dngettext: function () {
				var args = Array.prototype.slice.call(arguments);
				var msgId = args[0];
				var amt = args[1];
				var sprintfArgs = args.slice(2);

				return vsprintf(gt.dngettext(language, msgId, null, amt), sprintfArgs);
			},

			// get plural text from context
			dnpgettext: function () {
				var args = Array.prototype.slice.call(arguments);
				var msgContext = args[0];
				var msgId = args[1];
				var amt = args[2];
				var sprintfArgs = args.slice(3);

				return vsprintf(gt.dnpgettext(language, msgContext, msgId, null, amt), sprintfArgs);
			}
		};
	});
};
