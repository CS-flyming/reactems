function Logger() {
	let logger = {};
	if (process.env.NODE_ENV === 'production') {
		logger.show = false;
	} else {
		logger.show = true;
	}

	["log", "info", "warn", "error"].forEach(function(item) {
		var name = item;
		logger[name] = function() {
			try {
				if (!console) return; // prevents errors on IE
				if (logger.show) { // 如果要显示日志信息
					console[name].apply(console, arguments);
				}
			} catch (e) {}
		};
	});
	return logger;
}
const Log = Logger()

module.exports = Log