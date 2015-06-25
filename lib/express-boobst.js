/**
 * @author Andrew D.Laptev <a.d.laptev@gmail.com>
 */


var Store = require('express-session').Store
	, boobst = require('boobst')
	;

/**
 * Initialize BoobstStore with the given `options`.
 *
 * @param {Object} options
 * @param {Function} callback
 * @api public
 */
var BoobstStore = module.exports = function BoobstStore(options, callback) {
	options = options || {};
	if (options.boobst) {
		this.getConnection = function() {
			return options.boobst;
		}
	} else if (options.getConnection) {
		this.getConnection = options.getConnection;
	}
	if (!this.getConnection) {
		return callback(new Error('You must provide a `boobst` or `getConnection`'));
	}

	this.global = options.global || '^%bsSessions';
	this.subscripts = options.subscripts || [];

	Store.call(this, options);
};

BoobstStore.prototype.__proto__ = Store.prototype;

/**
 * Attempt to fetch session by the given `sid`.
 *
 * @param {String} sid
 * @param {Function} callback
 * @api public
 */
BoobstStore.prototype.get = function (sid, callback) {
	var s = this.getConnection();
	s.get(this.global, this.subscripts.concat(sid), function(err, data) {
		if (err) {
			callback();
			return;
		}
		try {
			if (data) {
				callback(null, JSON.parse(data));
			} else {
				callback();
			}
		} catch (e) {
			callback(e);
		}
	});
};


/**
 * Commit the given `sess` object associated with the given `sid`.
 *
 * @param {String} sid
 * @param {Session} session
 * @param {Function} callback
 * @api public
 */
BoobstStore.prototype.set = function (sid, session, callback) {
	this.getConnection().set(this.global, this.subscripts.concat(sid), JSON.stringify(session), callback);
};

/**
 * Destroy the session associated with the given `sid`.
 *
 * @param {String} sid
 * @param {Function} callback
 * @api public
 */
BoobstStore.prototype.destroy = function (sid, callback) {
	this.getConnection().kill(this.global, this.subscripts.concat(sid), callback);
};


/**
 * Clear all sessions.
 *
 * @param {Function} callback
 * @api public
 */
BoobstStore.prototype.clear = function(callback) {
	this.getConnection().kill(this.global, this.subscripts.concat(sid), callback);
};
