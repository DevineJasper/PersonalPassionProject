/*1494946880,,JIT Construction: v3023720,en_US*/
/**
 * Copyright (c) 2017-present, Facebook, Inc. All rights reserved.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to use,
 * copy, modify, and distribute this software in source code or binary form for use
 * in connection with the web services and APIs provided by Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use of
 * this software is subject to the Facebook Platform Policy
 * [http://developers.facebook.com/policy/]. This copyright notice shall be
 * included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

try {
	window.MessengerExtensions ||
		(function(window, fb_fif_window) {
			var apply = Function.prototype.apply;

			function bindContext(fn, thisArg) {
				return function _sdkBound() {
					return apply.call(fn, thisArg, arguments);
				};
			}
			var global = {
				__type: 'JS_SDK_SANDBOX',
				window: window,
				document: window.document
			};
			var sandboxWhitelist = [
				'setTimeout',
				'setInterval',
				'clearTimeout',
				'clearInterval'
			];
			for (var i = 0; i < sandboxWhitelist.length; i++) {
				global[sandboxWhitelist[i]] = bindContext(
					window[sandboxWhitelist[i]],
					window
				);
			}
			(function() {
				var self = window;
				var __DEV__ = 0;

				function emptyFunction() {}
				var __transform_includes = {};
				var __annotator, __bodyWrapper;
				var __w, __t;
				var undefined;
				with (this) {
					(function() {
						var a = {},
							b = function i(j, k) {
								if (!j && !k) return null;
								var l = {};
								if (typeof j !== 'undefined') l.type = j;
								if (typeof k !== 'undefined') l.signature = k;
								return l;
							},
							c = function i(j, k) {
								return b(
									j && /^[A-Z]/.test(j) ? j : undefined,
									k && ((k.params && k.params.length) || k.returns)
										? 'function(' +
												(k.params
													? k.params
															.map(function(l) {
																return /\?/.test(l)
																	? '?' + l.replace('?', '')
																	: l;
															})
															.join(',')
													: '') +
												')' +
												(k.returns ? ':' + k.returns : '')
										: undefined
								);
							},
							d = function i(j, k, l) {
								return j;
							},
							e = function i(j, k, l) {
								if ('sourcemeta' in __transform_includes) j.__SMmeta = k;
								if ('typechecks' in __transform_includes) {
									var m = c(k ? k.name : undefined, l);
									if (m) __w(j, m);
								}
								return j;
							},
							f = function i(j, k, l) {
								return l.apply(j, k);
							},
							g = function i(j, k, l, m) {
								if (m && m.params) __t.apply(j, m.params);
								var n = l.apply(j, k);
								if (m && m.returns) __t([n, m.returns]);
								return n;
							},
							h = function i(j, k, l, m, n) {
								if (n) {
									if (!n.callId)
										n.callId =
											n.module + ':' + (n.line || 0) + ':' + (n.column || 0);
									var o = n.callId;
									a[o] = (a[o] || 0) + 1;
								}
								return l.apply(j, k);
							};
						if (typeof __transform_includes === 'undefined') {
							__annotator = d;
							__bodyWrapper = f;
						} else {
							__annotator = e;
							if ('codeusage' in __transform_includes) {
								__annotator = d;
								__bodyWrapper = h;
								__bodyWrapper.getCodeUsage = function() {
									return a;
								};
								__bodyWrapper.clearCodeUsage = function() {
									a = {};
								};
							} else if ('typechecks' in __transform_includes) {
								__bodyWrapper = g;
							} else __bodyWrapper = f;
						}
					})();
					__t = function(a) {
						return a[0];
					};
					__w = function(a) {
						return a;
					};
					var require, __d;
					(function(a) {
						var b = {},
							c = {},
							d = [
								'global',
								'require',
								'requireDynamic',
								'requireLazy',
								'module',
								'exports'
							];
						require = function(e, f) {
							if (Object.prototype.hasOwnProperty.call(c, e)) return c[e];
							if (!Object.prototype.hasOwnProperty.call(b, e)) {
								if (f) return null;
								throw new Error('Module ' + e + ' has not been defined');
							}
							var g = b[e],
								h = g.deps,
								i = g.factory.length,
								j,
								k = [];
							for (var l = 0; l < i; l++) {
								switch (h[l]) {
									case 'module':
										j = g;
										break;
									case 'exports':
										j = g.exports;
										break;
									case 'global':
										j = a;
										break;
									case 'require':
										j = require;
										break;
									case 'requireDynamic':
										j = null;
										break;
									case 'requireLazy':
										j = null;
										break;
									default:
										j = require.call(null, h[l]);
								}
								k.push(j);
							}
							g.factory.apply(a, k);
							c[e] = g.exports;
							return g.exports;
						};
						__d = function(e, f, g, h) {
							if (typeof g == 'function') {
								b[e] = {
									factory: g,
									deps: d.concat(f),
									exports: {}
								};
								if (h === 3) require.call(null, e);
							} else c[e] = g;
						};
					})(this);
					__d(
						'ES5Array',
						[],
						function a(b, c, d, e, f, g) {
							var h = {};
							h.isArray = function(i) {
								return Object.prototype.toString.call(i) == '[object Array]';
							};
							f.exports = h;
						},
						null
					);
					__d(
						'ES5ArrayPrototype',
						[],
						function a(b, c, d, e, f, g) {
							var h = {};
							h.map = function(i, j) {
								if (typeof i != 'function') throw new TypeError();
								var k = void 0,
									l = this.length,
									m = new Array(l);
								for (k = 0; k < l; ++k)
									if (k in this) m[k] = i.call(j, this[k], k, this);
								return m;
							};
							h.forEach = function(i, j) {
								h.map.call(this, i, j);
							};
							h.filter = function(i, j) {
								if (typeof i != 'function') throw new TypeError();
								var k = void 0,
									l = void 0,
									m = this.length,
									n = [];
								for (k = 0; k < m; ++k)
									if (k in this) {
										l = this[k];
										if (i.call(j, l, k, this)) n.push(l);
									}
								return n;
							};
							h.every = function(i, j) {
								if (typeof i != 'function') throw new TypeError();
								var k = new Object(this),
									l = k.length;
								for (var m = 0; m < l; m++)
									if (m in k) if (!i.call(j, k[m], m, k)) return false;
								return true;
							};
							h.some = function(i, j) {
								if (typeof i != 'function') throw new TypeError();
								var k = new Object(this),
									l = k.length;
								for (var m = 0; m < l; m++)
									if (m in k) if (i.call(j, k[m], m, k)) return true;
								return false;
							};
							h.indexOf = function(i, j) {
								var k = this.length;
								j |= 0;
								if (j < 0) j += k;
								for (; j < k; j++) if (j in this && this[j] === i) return j;
								return -1;
							};
							f.exports = h;
						},
						null
					);
					__d(
						'ES5Date',
						[],
						function a(b, c, d, e, f, g) {
							var h = {};
							h.now = function() {
								return new Date().getTime();
							};
							f.exports = h;
						},
						null
					);
					__d(
						'ES5FunctionPrototype',
						[],
						function a(b, c, d, e, f, g) {
							var h = {};
							h.bind = function(i) {
								if (typeof this != 'function')
									throw new TypeError('Bind must be called on a function');
								var j = this,
									k = Array.prototype.slice.call(arguments, 1);

								function l() {
									return j.apply(
										i,
										k.concat(Array.prototype.slice.call(arguments))
									);
								}
								l.displayName = 'bound:' + (j.displayName || j.name || '(?)');
								l.toString = function m() {
									return 'bound: ' + j;
								};
								return l;
							};
							f.exports = h;
						},
						null
					);
					__d(
						'ie8DontEnum',
						[],
						function a(b, c, d, e, f, g) {
							var h = [
									'toString',
									'toLocaleString',
									'valueOf',
									'hasOwnProperty',
									'isPrototypeOf',
									'prototypeIsEnumerable',
									'constructor'
								],
								i = {}.hasOwnProperty,
								j = function k() {};
							if (
								{
									toString: true
								}.propertyIsEnumerable('toString')
							)
								j = function k(l, m) {
									for (var n = 0; n < h.length; n++) {
										var o = h[n];
										if (i.call(l, o)) m(o);
									}
								};
							f.exports = j;
						},
						null
					);
					__d(
						'ES5Object',
						['ie8DontEnum'],
						function a(b, c, d, e, f, g, h) {
							var i = {}.hasOwnProperty,
								j = {};

							function k() {}
							j.create = function(l) {
								var m = typeof l;
								if (m != 'object' && m != 'function')
									throw new TypeError(
										'Object prototype may only be a Object or null'
									);
								k.prototype = l;
								return new k();
							};
							j.keys = function(l) {
								var m = typeof l;
								if ((m != 'object' && m != 'function') || l === null)
									throw new TypeError('Object.keys called on non-object');
								var n = [];
								for (var o in l) if (i.call(l, o)) n.push(o);
								h(l, function(p) {
									return n.push(p);
								});
								return n;
							};
							f.exports = j;
						},
						null
					);
					__d(
						'ES5StringPrototype',
						[],
						function a(b, c, d, e, f, g) {
							var h = {};
							h.trim = function() {
								if (this == null)
									throw new TypeError(
										'String.prototype.trim called on null or undefined'
									);
								return String.prototype.replace.call(this, /^\s+|\s+$/g, '');
							};
							h.startsWith = function(i) {
								var j = String(this);
								if (this == null)
									throw new TypeError(
										'String.prototype.startsWith called on null or undefined'
									);
								var k = arguments.length > 1 ? Number(arguments[1]) : 0;
								if (isNaN(k)) k = 0;
								var l = Math.min(Math.max(k, 0), j.length);
								return j.indexOf(String(i), k) == l;
							};
							h.endsWith = function(i) {
								var j = String(this);
								if (this == null)
									throw new TypeError(
										'String.prototype.endsWith called on null or undefined'
									);
								var k = j.length,
									l = String(i),
									m = arguments.length > 1 ? Number(arguments[1]) : k;
								if (isNaN(m)) m = 0;
								var n = Math.min(Math.max(m, 0), k),
									o = n - l.length;
								if (o < 0) return false;
								return j.lastIndexOf(l, o) == o;
							};
							h.includes = function(i) {
								if (this == null)
									throw new TypeError(
										'String.prototype.contains called on null or undefined'
									);
								var j = String(this),
									k = arguments.length > 1 ? Number(arguments[1]) : 0;
								if (isNaN(k)) k = 0;
								return j.indexOf(String(i), k) != -1;
							};
							h.contains = h.includes;
							h.repeat = function(i) {
								if (this == null)
									throw new TypeError(
										'String.prototype.repeat called on null or undefined'
									);
								var j = String(this),
									k = i ? Number(i) : 0;
								if (isNaN(k)) k = 0;
								if (k < 0 || k === Infinity) throw RangeError();
								if (k === 1) return j;
								if (k === 0) return '';
								var l = '';
								while (k) {
									if (k & 1) l += j;
									if ((k >>= 1)) j += j;
								}
								return l;
							};
							f.exports = h;
						},
						null
					);
					__d(
						'ES6Array',
						[],
						function a(b, c, d, e, f, g) {
							'use strict';
							var h = {
								from: function i(j) {
									if (j == null)
										throw new TypeError('Object is null or undefined');
									var k = arguments[1],
										l = arguments[2],
										m = this,
										n = Object(j),
										o =
											typeof Symbol === 'function'
												? typeof Symbol === 'function'
													? Symbol.iterator
													: '@@iterator'
												: '@@iterator',
										p = typeof k === 'function',
										q = typeof n[o] === 'function',
										r = 0,
										s = void 0,
										t = void 0;
									if (q) {
										s = typeof m === 'function' ? new m() : [];
										var u = n[o](),
											v = void 0;
										while (!(v = u.next()).done) {
											t = v.value;
											if (p) t = k.call(l, t, r);
											s[r] = t;
											r += 1;
										}
										s.length = r;
										return s;
									}
									var w = n.length;
									if (isNaN(w) || w < 0) w = 0;
									s = typeof m === 'function' ? new m(w) : new Array(w);
									while (r < w) {
										t = n[r];
										if (p) t = k.call(l, t, r);
										s[r] = t;
										r += 1;
									}
									s.length = r;
									return s;
								}
							};
							f.exports = h;
						},
						null
					);
					__d(
						'ES6ArrayPrototype',
						[],
						function a(b, c, d, e, f, g) {
							var h = {
								find: function i(j, k) {
									if (this == null)
										throw new TypeError(
											'Array.prototype.find called on null or undefined'
										);
									if (typeof j !== 'function')
										throw new TypeError('predicate must be a function');
									var l = h.findIndex.call(this, j, k);
									return l === -1 ? void 0 : this[l];
								},
								findIndex: function i(j, k) {
									if (this == null)
										throw new TypeError(
											'Array.prototype.findIndex called on null or undefined'
										);
									if (typeof j !== 'function')
										throw new TypeError('predicate must be a function');
									var l = Object(this),
										m = l.length >>> 0;
									for (var n = 0; n < m; n++)
										if (j.call(k, l[n], n, l)) return n;
									return -1;
								},
								fill: function i(j) {
									if (this == null)
										throw new TypeError(
											'Array.prototype.fill called on null or undefined'
										);
									var k = Object(this),
										l = k.length >>> 0,
										m = arguments[1],
										n = m >> 0,
										o = n < 0 ? Math.max(l + n, 0) : Math.min(n, l),
										p = arguments[2],
										q = p === undefined ? l : p >> 0,
										r = q < 0 ? Math.max(l + q, 0) : Math.min(q, l);
									while (o < r) {
										k[o] = j;
										o++;
									}
									return k;
								}
							};
							f.exports = h;
						},
						null
					);
					__d(
						'ES6DatePrototype',
						[],
						function a(b, c, d, e, f, g) {
							function h(j) {
								return (j < 10 ? '0' : '') + j;
							}
							var i = {
								toISOString: function j() {
									if (!isFinite(this)) throw new Error('Invalid time value');
									var k = this.getUTCFullYear();
									k =
										(k < 0 ? '-' : k > 9999 ? '+' : '') +
										('00000' + Math.abs(k)).slice(
											0 <= k && k <= 9999 ? -4 : -6
										);
									return (
										k +
										'-' +
										h(this.getUTCMonth() + 1) +
										'-' +
										h(this.getUTCDate()) +
										'T' +
										h(this.getUTCHours()) +
										':' +
										h(this.getUTCMinutes()) +
										':' +
										h(this.getUTCSeconds()) +
										'.' +
										(this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
										'Z'
									);
								}
							};
							f.exports = i;
						},
						null
					);
					__d(
						'ES6Number',
						[],
						function a(b, c, d, e, f, g) {
							var h = Math.pow(2, -52),
								i = Math.pow(2, 53) - 1,
								j = -1 * i,
								k = {
									isFinite: (function(l) {
										function m(n) {
											return l.apply(this, arguments);
										}
										m.toString = function() {
											return l.toString();
										};
										return m;
									})(function(l) {
										return typeof l == 'number' && isFinite(l);
									}),
									isNaN: (function(l) {
										function m(n) {
											return l.apply(this, arguments);
										}
										m.toString = function() {
											return l.toString();
										};
										return m;
									})(function(l) {
										return typeof l == 'number' && isNaN(l);
									}),
									isInteger: function l(m) {
										return this.isFinite(m) && Math.floor(m) === m;
									},
									isSafeInteger: function l(m) {
										return (
											this.isFinite(m) &&
											m >= this.MIN_SAFE_INTEGER &&
											m <= this.MAX_SAFE_INTEGER &&
											Math.floor(m) === m
										);
									},
									EPSILON: h,
									MAX_SAFE_INTEGER: i,
									MIN_SAFE_INTEGER: j
								};
							f.exports = k;
						},
						null
					);
					__d(
						'ES6Object',
						['ie8DontEnum'],
						function a(b, c, d, e, f, g, h) {
							var i = {}.hasOwnProperty,
								j = {
									assign: function k(l) {
										if (l == null)
											throw new TypeError(
												'Object.assign target cannot be null or undefined'
											);
										l = Object(l);
										for (
											var m = arguments.length,
												n = Array(m > 1 ? m - 1 : 0),
												o = 1;
											o < m;
											o++
										)
											n[o - 1] = arguments[o];
										for (var p = 0; p < n.length; p++) {
											var q = n[p];
											if (q == null) continue;
											q = Object(q);
											for (var r in q) if (i.call(q, r)) l[r] = q[r];
											h(q, function(s) {
												return (l[s] = q[s]);
											});
										}
										return l;
									},
									is: function k(l, m) {
										if (l === m) {
											return l !== 0 || 1 / l === 1 / m;
										} else return l !== l && m !== m;
									}
								};
							f.exports = j;
						},
						null
					);
					__d(
						'ES7ArrayPrototype',
						['ES5ArrayPrototype', 'ES5Array'],
						function a(b, c, d, e, f, g, h, i) {
							var j = h.indexOf,
								k = i.isArray;

							function l(p) {
								return Math.min(Math.max(m(p), 0), Number.MAX_SAFE_INTEGER);
							}

							function m(p) {
								var q = Number(p);
								return isFinite(q) && q !== 0
									? n(q) * Math.floor(Math.abs(q))
									: q;
							}

							function n(p) {
								return p >= 0 ? 1 : -1;
							}
							var o = {
								includes: function p(q) {
									'use strict';
									if (
										q !== undefined &&
										k(this) &&
										!(typeof q === 'number' && isNaN(q))
									)
										return j.apply(this, arguments) !== -1;
									var r = Object(this),
										s = r.length ? l(r.length) : 0;
									if (s === 0) return false;
									var t = arguments.length > 1 ? m(arguments[1]) : 0,
										u = t < 0 ? Math.max(s + t, 0) : t,
										v = isNaN(q) && typeof q === 'number';
									while (u < s) {
										var w = r[u];
										if (w === q || (typeof w === 'number' && v && isNaN(w)))
											return true;
										u++;
									}
									return false;
								}
							};
							f.exports = o;
						},
						null
					);
					__d(
						'ES7Object',
						['ie8DontEnum'],
						function a(b, c, d, e, f, g, h) {
							var i = {}.hasOwnProperty,
								j = {};
							j.entries = function(k) {
								if (k == null)
									throw new TypeError('Object.entries called on non-object');
								var l = [];
								for (var m in k) if (i.call(k, m)) l.push([m, k[m]]);
								h(k, function(n) {
									return l.push([n, k[n]]);
								});
								return l;
							};
							j.values = function(k) {
								if (k == null)
									throw new TypeError('Object.values called on non-object');
								var l = [];
								for (var m in k) if (i.call(k, m)) l.push(k[m]);
								h(k, function(n) {
									return l.push(k[n]);
								});
								return l;
							};
							f.exports = j;
						},
						null
					);
					__d(
						'ES7StringPrototype',
						[],
						function a(b, c, d, e, f, g) {
							var h = {};
							h.trimLeft = function() {
								return this.replace(/^\s+/, '');
							};
							h.trimRight = function() {
								return this.replace(/\s+$/, '');
							};
							f.exports = h;
						},
						null
					);
					/**
					 * @providesModule JSON3
					 * @preserve-header
					 *
					 *! JSON v3.2.3 | http://bestiejs.github.com/json3 | Copyright 2012, Kit Cambridge | http://kit.mit-license.org
					 */
					__d(
						'JSON3',
						[],
						function a(b, c, d, e, f, g) {
							(function() {
								var h = {}.toString,
									i,
									j,
									k,
									l = (f.exports = {}),
									m = '{"A":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}',
									n,
									o,
									p,
									q,
									r,
									s,
									t,
									u,
									v,
									w,
									x,
									y,
									z,
									aa,
									ba,
									ca = new Date(-3509827334573292),
									da,
									ea,
									fa;
								try {
									ca =
										ca.getUTCFullYear() == -109252 &&
										ca.getUTCMonth() === 0 &&
										ca.getUTCDate() == 1 &&
										ca.getUTCHours() == 10 &&
										ca.getUTCMinutes() == 37 &&
										ca.getUTCSeconds() == 6 &&
										ca.getUTCMilliseconds() == 708;
								} catch (ga) {}
								if (!ca) {
									da = Math.floor;
									ea = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
									fa = function(ga, ha) {
										return (
											ea[ha] +
											365 * (ga - 1970) +
											da((ga - 1969 + (ha = +(ha > 1))) / 4) -
											da((ga - 1901 + ha) / 100) +
											da((ga - 1601 + ha) / 400)
										);
									};
								}
								if (typeof JSON == 'object' && JSON) {
									l.stringify = JSON.stringify;
									l.parse = JSON.parse;
								}
								if ((n = typeof l.stringify == 'function' && !fa)) {
									(ca = function() {
										return 1;
									}).toJSON = ca;
									try {
										n =
											l.stringify(0) === '0' &&
											l.stringify(new Number()) === '0' &&
											l.stringify(new String()) == '""' &&
											l.stringify(h) === k &&
											l.stringify(k) === k &&
											l.stringify() === k &&
											l.stringify(ca) === '1' &&
											l.stringify([ca]) == '[1]' &&
											l.stringify([k]) == '[null]' &&
											l.stringify(null) == 'null' &&
											l.stringify([k, h, null]) == '[null,null,null]' &&
											l.stringify({
												result: [ca, true, false, null, '\0\b\n\f\r\t']
											}) == m &&
											l.stringify(null, ca) === '1' &&
											l.stringify([1, 2], null, 1) == '[\n 1,\n 2\n]' &&
											l.stringify(new Date(-8.64e15)) ==
												'"-271821-04-20T00:00:00.000Z"' &&
											l.stringify(new Date(8.64e15)) ==
												'"+275760-09-13T00:00:00.000Z"' &&
											l.stringify(new Date(-62198755200000)) ==
												'"-000001-01-01T00:00:00.000Z"' &&
											l.stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
									} catch (ga) {
										n = false;
									}
								}
								if (typeof l.parse == 'function')
									try {
										if (l.parse('0') === 0 && !l.parse(false)) {
											ca = l.parse(m);
											if ((s = ca.A.length == 5 && ca.A[0] == 1)) {
												try {
													s = !l.parse('"\t"');
												} catch (ga) {}
												if (s)
													try {
														s = l.parse('01') != 1;
													} catch (ga) {}
											}
										}
									} catch (ga) {
										s = false;
									}
								ca = m = null;
								if (!n || !s) {
									if (!(i = {}.hasOwnProperty))
										i = function(ga) {
											var ha = {},
												ia;
											if (
												((ha.__proto__ = null),
												(ha.__proto__ = {
													toString: 1
												}),
												ha).toString != h
											) {
												i = function(ja) {
													var ka = this.__proto__,
														la = ja in ((this.__proto__ = null), this);
													this.__proto__ = ka;
													return la;
												};
											} else {
												ia = ha.constructor;
												i = function(ja) {
													var ka = (this.constructor || ia).prototype;
													return (
														ja in this && !(ja in ka && this[ja] === ka[ja])
													);
												};
											}
											ha = null;
											return i.call(this, ga);
										};
									j = function(ga, ha) {
										var ia = 0,
											ja,
											ka,
											la,
											ma;
										(ja = function() {
											this.valueOf = 0;
										}).prototype.valueOf = 0;
										ka = new ja();
										for (la in ka) if (i.call(ka, la)) ia++;
										ja = ka = null;
										if (!ia) {
											ka = [
												'valueOf',
												'toString',
												'toLocaleString',
												'propertyIsEnumerable',
												'isPrototypeOf',
												'hasOwnProperty',
												'constructor'
											];
											ma = function(na, oa) {
												var pa = h.call(na) == '[object Function]',
													qa,
													ra;
												for (qa in na)
													if (!(pa && qa == 'prototype') && i.call(na, qa))
														oa(qa);
												for (
													ra = ka.length;
													(qa = ka[--ra]);
													i.call(na, qa) && oa(qa)
												);
											};
										} else if (ia == 2) {
											ma = function(na, oa) {
												var pa = {},
													qa = h.call(na) == '[object Function]',
													ra;
												for (ra in na)
													if (
														!(qa && ra == 'prototype') &&
														!i.call(pa, ra) &&
														(pa[ra] = 1) &&
														i.call(na, ra)
													)
														oa(ra);
											};
										} else
											ma = function(na, oa) {
												var pa = h.call(na) == '[object Function]',
													qa,
													ra;
												for (qa in na)
													if (
														!(pa && qa == 'prototype') &&
														i.call(na, qa) &&
														!(ra = qa === 'constructor')
													)
														oa(qa);
												if (ra || i.call(na, (qa = 'constructor'))) oa(qa);
											};
										return ma(ga, ha);
									};
									if (!n) {
										o = {
											'\\': '\\\\',
											'"': '\\"',
											'\b': '\\b',
											'\f': '\\f',
											'\n': '\\n',
											'\r': '\\r',
											'\t': '\\t'
										};
										p = function(ga, ha) {
											return ('000000' + (ha || 0)).slice(-ga);
										};
										q = function(ga) {
											var ha = '"',
												ia = 0,
												ja;
											for (; (ja = ga.charAt(ia)); ia++)
												ha +=
													'\\"\b\f\n\r\t'.indexOf(ja) > -1
														? o[ja]
														: ja < ' '
														? '\\u00' + p(2, ja.charCodeAt(0).toString(16))
														: ja;
											return ha + '"';
										};
										r = function(ga, ha, ia, ja, ka, la, ma) {
											var na = ha[ga],
												oa,
												pa,
												qa,
												ra,
												sa,
												ta,
												ua,
												va,
												wa,
												xa,
												ya,
												za,
												ab,
												bb,
												cb;
											if (typeof na == 'object' && na) {
												oa = h.call(na);
												if (oa == '[object Date]' && !i.call(na, 'toJSON')) {
													if (na > -1 / 0 && na < 1 / 0) {
														if (fa) {
															ra = da(na / 86400000);
															for (
																pa = da(ra / 365.2425) + 1970 - 1;
																fa(pa + 1, 0) <= ra;
																pa++
															);
															for (
																qa = da((ra - fa(pa, 0)) / 30.42);
																fa(pa, qa + 1) <= ra;
																qa++
															);
															ra = 1 + ra - fa(pa, qa);
															sa = ((na % 86400000) + 86400000) % 86400000;
															ta = da(sa / 3600000) % 24;
															ua = da(sa / 60000) % 60;
															va = da(sa / 1000) % 60;
															wa = sa % 1000;
														} else {
															pa = na.getUTCFullYear();
															qa = na.getUTCMonth();
															ra = na.getUTCDate();
															ta = na.getUTCHours();
															ua = na.getUTCMinutes();
															va = na.getUTCSeconds();
															wa = na.getUTCMilliseconds();
														}
														na =
															(pa <= 0 || pa >= 10000
																? (pa < 0 ? '-' : '+') + p(6, pa < 0 ? -pa : pa)
																: p(4, pa)) +
															'-' +
															p(2, qa + 1) +
															'-' +
															p(2, ra) +
															'T' +
															p(2, ta) +
															':' +
															p(2, ua) +
															':' +
															p(2, va) +
															'.' +
															p(3, wa) +
															'Z';
													} else na = null;
												} else if (
													typeof na.toJSON == 'function' &&
													((oa != '[object Number]' &&
														oa != '[object String]' &&
														oa != '[object Array]') ||
														i.call(na, 'toJSON'))
												)
													na = na.toJSON(ga);
											}
											if (ia) na = ia.call(ha, ga, na);
											if (na === null) return 'null';
											oa = h.call(na);
											if (oa == '[object Boolean]') {
												return '' + na;
											} else if (oa == '[object Number]') {
												return na > -1 / 0 && na < 1 / 0 ? '' + na : 'null';
											} else if (oa == '[object String]') return q(na);
											if (typeof na == 'object') {
												for (ab = ma.length; ab--; )
													if (ma[ab] === na) throw TypeError();
												ma.push(na);
												xa = [];
												bb = la;
												la += ka;
												if (oa == '[object Array]') {
													for (
														za = 0, ab = na.length;
														za < ab;
														cb || (cb = true), za++
													) {
														ya = r(za, na, ia, ja, ka, la, ma);
														xa.push(ya === k ? 'null' : ya);
													}
													return cb
														? ka
															? '[\n' +
															  la +
															  xa.join(',\n' + la) +
															  '\n' +
															  bb +
															  ']'
															: '[' + xa.join(',') + ']'
														: '[]';
												} else {
													j(ja || na, function(db) {
														var eb = r(db, na, ia, ja, ka, la, ma);
														if (eb !== k)
															xa.push(q(db) + ':' + (ka ? ' ' : '') + eb);
														cb || (cb = true);
													});
													return cb
														? ka
															? '{\n' +
															  la +
															  xa.join(',\n' + la) +
															  '\n' +
															  bb +
															  '}'
															: '{' + xa.join(',') + '}'
														: '{}';
												}
												ma.pop();
											}
										};
										l.stringify = function(ga, ha, ia) {
											var ja, ka, la, ma, na, oa;
											if (
												typeof ha == 'function' ||
												(typeof ha == 'object' && ha)
											)
												if (h.call(ha) == '[object Function]') {
													ka = ha;
												} else if (h.call(ha) == '[object Array]') {
													la = {};
													for (
														ma = 0, na = ha.length;
														ma < na;
														oa = ha[ma++],
															(h.call(oa) == '[object String]' ||
																h.call(oa) == '[object Number]') &&
																(la[oa] = 1)
													);
												}
											if (ia)
												if (h.call(ia) == '[object Number]') {
													if ((ia -= ia % 1) > 0)
														for (
															ja = '', ia > 10 && (ia = 10);
															ja.length < ia;
															ja += ' '
														);
												} else if (h.call(ia) == '[object String]')
													ja = ia.length <= 10 ? ia : ia.slice(0, 10);
											return r(
												'',
												((oa = {}), (oa[''] = ga), oa),
												ka,
												la,
												ja,
												'',
												[]
											);
										};
									}
									if (!s) {
										t = String.fromCharCode;
										u = {
											'\\': '\\',
											'"': '"',
											'/': '/',
											b: '\b',
											t: '\t',
											n: '\n',
											f: '\f',
											r: '\r'
										};
										v = function() {
											aa = ba = null;
											throw SyntaxError();
										};
										w = function() {
											var ga = ba,
												ha = ga.length,
												ia,
												ja,
												ka,
												la,
												ma;
											while (aa < ha) {
												ia = ga.charAt(aa);
												if ('\t\r\n '.indexOf(ia) > -1) {
													aa++;
												} else if ('{}[]:,'.indexOf(ia) > -1) {
													aa++;
													return ia;
												} else if (ia == '"') {
													for (ja = '@', aa++; aa < ha; ) {
														ia = ga.charAt(aa);
														if (ia < ' ') {
															v();
														} else if (ia == '\\') {
															ia = ga.charAt(++aa);
															if ('\\"/btnfr'.indexOf(ia) > -1) {
																ja += u[ia];
																aa++;
															} else if (ia == 'u') {
																ka = ++aa;
																for (la = aa + 4; aa < la; aa++) {
																	ia = ga.charAt(aa);
																	if (
																		!(
																			(ia >= '0' && ia <= '9') ||
																			(ia >= 'a' && ia <= 'f') ||
																			(ia >= 'A' && ia <= 'F')
																		)
																	)
																		v();
																}
																ja += t('0x' + ga.slice(ka, aa));
															} else v();
														} else {
															if (ia == '"') break;
															ja += ia;
															aa++;
														}
													}
													if (ga.charAt(aa) == '"') {
														aa++;
														return ja;
													}
													v();
												} else {
													ka = aa;
													if (ia == '-') {
														ma = true;
														ia = ga.charAt(++aa);
													}
													if (ia >= '0' && ia <= '9') {
														if (
															ia == '0' &&
															((ia = ga.charAt(aa + 1)), ia >= '0' && ia <= '9')
														)
															v();
														ma = false;
														for (
															;
															aa < ha &&
															((ia = ga.charAt(aa)), ia >= '0' && ia <= '9');
															aa++
														);
														if (ga.charAt(aa) == '.') {
															la = ++aa;
															for (
																;
																la < ha &&
																((ia = ga.charAt(la)), ia >= '0' && ia <= '9');
																la++
															);
															if (la == aa) v();
															aa = la;
														}
														ia = ga.charAt(aa);
														if (ia == 'e' || ia == 'E') {
															ia = ga.charAt(++aa);
															if (ia == '+' || ia == '-') aa++;
															for (
																la = aa;
																la < ha &&
																((ia = ga.charAt(la)), ia >= '0' && ia <= '9');
																la++
															);
															if (la == aa) v();
															aa = la;
														}
														return +ga.slice(ka, aa);
													}
													if (ma) v();
													if (ga.slice(aa, aa + 4) == 'true') {
														aa += 4;
														return true;
													} else if (ga.slice(aa, aa + 5) == 'false') {
														aa += 5;
														return false;
													} else if (ga.slice(aa, aa + 4) == 'null') {
														aa += 4;
														return null;
													}
													v();
												}
											}
											return '$';
										};
										x = function(ga) {
											var ha, ia, ja;
											if (ga == '$') v();
											if (typeof ga == 'string') {
												if (ga.charAt(0) == '@') return ga.slice(1);
												if (ga == '[') {
													ha = [];
													for (; ; ia || (ia = true)) {
														ga = w();
														if (ga == ']') break;
														if (ia)
															if (ga == ',') {
																ga = w();
																if (ga == ']') v();
															} else v();
														if (ga == ',') v();
														ha.push(x(ga));
													}
													return ha;
												} else if (ga == '{') {
													ha = {};
													for (; ; ia || (ia = true)) {
														ga = w();
														if (ga == '}') break;
														if (ia)
															if (ga == ',') {
																ga = w();
																if (ga == '}') v();
															} else v();
														if (
															ga == ',' ||
															typeof ga != 'string' ||
															ga.charAt(0) != '@' ||
															w() != ':'
														)
															v();
														ha[ga.slice(1)] = x(w());
													}
													return ha;
												}
												v();
											}
											return ga;
										};
										z = function(ga, ha, ia) {
											var ja = y(ga, ha, ia);
											if (ja === k) {
												delete ga[ha];
											} else ga[ha] = ja;
										};
										y = function(ga, ha, ia) {
											var ja = ga[ha],
												ka;
											if (typeof ja == 'object' && ja)
												if (h.call(ja) == '[object Array]') {
													for (ka = ja.length; ka--; ) z(ja, ka, ia);
												} else
													j(ja, function(la) {
														z(ja, la, ia);
													});
											return ia.call(ga, ha, ja);
										};
										l.parse = function(ga, ha) {
											aa = 0;
											ba = ga;
											var ia = x(w());
											if (w() != '$') v();
											aa = ba = null;
											return ha && h.call(ha) == '[object Function]'
												? y(((ca = {}), (ca[''] = ia), ca), '', ha)
												: ia;
										};
									}
								}
							}.call(this));
						},
						null
					);
					__d(
						'ES',
						[
							'ES5ArrayPrototype',
							'ES5FunctionPrototype',
							'ES5StringPrototype',
							'ES5Array',
							'ES5Object',
							'ES5Date',
							'JSON3',
							'ES6Array',
							'ES6Object',
							'ES6ArrayPrototype',
							'ES6DatePrototype',
							'ES6Number',
							'ES7StringPrototype',
							'ES7Object',
							'ES7ArrayPrototype'
						],
						function a(
							b,
							c,
							d,
							e,
							f,
							g,
							h,
							i,
							j,
							k,
							l,
							m,
							n,
							o,
							p,
							q,
							r,
							s,
							t,
							u,
							v
						) {
							var w = {}.toString,
								x = {
									'JSON.stringify': n.stringify,
									'JSON.parse': n.parse
								},
								y = {
									'Array.prototype': h,
									'Function.prototype': i,
									'String.prototype': j,
									Object: l,
									Array: k,
									Date: m
								},
								z = {
									Object: p,
									'Array.prototype': q,
									'Date.prototype': r,
									Number: s,
									Array: o
								},
								aa = {
									Object: u,
									'String.prototype': t,
									'Array.prototype': v
								};

							function ba(da) {
								for (var ea in da) {
									if (!Object.prototype.hasOwnProperty.call(da, ea)) continue;
									var fa = da[ea],
										ga = ea.split('.');
									if (ga.length === 2) {
										var ha = ga[0],
											ia = ga[1];
										if (!ha || !ia || !window[ha] || !window[ha][ia]) {
											var ja = ha ? window[ha] : '-',
												ka = ha && window[ha] && ia ? window[ha][ia] : '-';
											throw new Error(
												'Unexpected state (t11975770): ' +
													(ha + ', ' + ia + ', ' + ja + ', ' + ka + ', ' + ea)
											);
										}
									}
									var la = ga.length === 2 ? window[ga[0]][ga[1]] : window[ea];
									for (var ma in fa) {
										if (!Object.prototype.hasOwnProperty.call(fa, ma)) continue;
										if (typeof fa[ma] !== 'function') {
											x[ea + '.' + ma] = fa[ma];
											continue;
										}
										var na = la[ma];
										x[ea + '.' + ma] =
											na && /\{\s+\[native code\]\s\}/.test(na) ? na : fa[ma];
									}
								}
							}
							ba(y);
							ba(z);
							ba(aa);

							function ca(da, ea, fa) {
								var ga = fa ? w.call(da).slice(8, -1) + '.prototype' : da,
									ha = x[ga + '.' + ea] || da[ea];
								if (typeof ha === 'function') {
									for (
										var ia = arguments.length,
											ja = Array(ia > 3 ? ia - 3 : 0),
											ka = 3;
										ka < ia;
										ka++
									)
										ja[ka - 3] = arguments[ka];
									return ha.apply(da, ja);
								} else if (ha) return ha;
								throw new Error(
									'Polyfill ' + ga + ' does not have implementation of ' + ea
								);
							}
							f.exports = ca;
						},
						null
					);
					__d(
						'ES5FunctionPrototype',
						[],
						function a(b, c, d, e, f, g) {
							var h = {};
							h.bind = function(i) {
								if (typeof this != 'function')
									throw new TypeError('Bind must be called on a function');
								var j = this,
									k = Array.prototype.slice.call(arguments, 1);

								function l() {
									return j.apply(
										i,
										k.concat(Array.prototype.slice.call(arguments))
									);
								}
								l.displayName = 'bound:' + (j.displayName || j.name || '(?)');
								l.toString = function m() {
									return 'bound: ' + j;
								};
								return l;
							};
							f.exports = h;
						},
						null
					);
					__d(
						'ie8DontEnum',
						[],
						function a(b, c, d, e, f, g) {
							var h = [
									'toString',
									'toLocaleString',
									'valueOf',
									'hasOwnProperty',
									'isPrototypeOf',
									'prototypeIsEnumerable',
									'constructor'
								],
								i = {}.hasOwnProperty,
								j = function k() {};
							if (
								{
									toString: true
								}.propertyIsEnumerable('toString')
							)
								j = function k(l, m) {
									for (var n = 0; n < h.length; n++) {
										var o = h[n];
										if (i.call(l, o)) m(o);
									}
								};
							f.exports = j;
						},
						null
					);
					__d(
						'ES5Object',
						['ie8DontEnum'],
						function a(b, c, d, e, f, g, h) {
							var i = {}.hasOwnProperty,
								j = {};

							function k() {}
							j.create = function(l) {
								var m = typeof l;
								if (m != 'object' && m != 'function')
									throw new TypeError(
										'Object prototype may only be a Object or null'
									);
								k.prototype = l;
								return new k();
							};
							j.keys = function(l) {
								var m = typeof l;
								if ((m != 'object' && m != 'function') || l === null)
									throw new TypeError('Object.keys called on non-object');
								var n = [];
								for (var o in l) if (i.call(l, o)) n.push(o);
								h(l, function(p) {
									return n.push(p);
								});
								return n;
							};
							f.exports = j;
						},
						null
					);
					__d(
						'ES6Object',
						['ie8DontEnum'],
						function a(b, c, d, e, f, g, h) {
							var i = {}.hasOwnProperty,
								j = {
									assign: function k(l) {
										if (l == null)
											throw new TypeError(
												'Object.assign target cannot be null or undefined'
											);
										l = Object(l);
										for (
											var m = arguments.length,
												n = Array(m > 1 ? m - 1 : 0),
												o = 1;
											o < m;
											o++
										)
											n[o - 1] = arguments[o];
										for (var p = 0; p < n.length; p++) {
											var q = n[p];
											if (q == null) continue;
											q = Object(q);
											for (var r in q) if (i.call(q, r)) l[r] = q[r];
											h(q, function(s) {
												return (l[s] = q[s]);
											});
										}
										return l;
									},
									is: function k(l, m) {
										if (l === m) {
											return l !== 0 || 1 / l === 1 / m;
										} else return l !== l && m !== m;
									}
								};
							f.exports = j;
						},
						null
					);
					__d(
						'sdk.babelHelpers',
						['ES5FunctionPrototype', 'ES5Object', 'ES6Object'],
						function a(b, c, d, e, f, g, h, i, j) {
							var k = {},
								l = Object.prototype.hasOwnProperty;
							k.inherits = function(m, n) {
								j.assign(m, n);
								m.prototype = i.create(n && n.prototype);
								m.prototype.constructor = m;
								m.__superConstructor__ = n;
								return n;
							};
							k._extends = j.assign;
							k['extends'] = k._extends;
							k.objectWithoutProperties = function(m, n) {
								var o = {};
								for (var p in m) {
									if (!l.call(m, p) || n.indexOf(p) >= 0) continue;
									o[p] = m[p];
								}
								return o;
							};
							k.taggedTemplateLiteralLoose = function(m, n) {
								m.raw = n;
								return m;
							};
							k.bind = h.bind;
							f.exports = k;
						},
						null
					);
					var ES = require('ES');
					var babelHelpers = require('sdk.babelHelpers');
					(function(a, b) {
						var c = 'keys',
							d = 'values',
							e = 'entries',
							f = (function() {
								var l = h(Array),
									m = void 0;
								if (!l)
									m = (function() {
										function n(o, p) {
											'use strict';
											this.$ArrayIterator1 = o;
											this.$ArrayIterator2 = p;
											this.$ArrayIterator3 = 0;
										}
										n.prototype.next = function() {
											'use strict';
											if (this.$ArrayIterator1 == null)
												return {
													value: b,
													done: true
												};
											var o = this.$ArrayIterator1,
												p = this.$ArrayIterator1.length,
												q = this.$ArrayIterator3,
												r = this.$ArrayIterator2;
											if (q >= p) {
												this.$ArrayIterator1 = b;
												return {
													value: b,
													done: true
												};
											}
											this.$ArrayIterator3 = q + 1;
											if (r === c) {
												return {
													value: q,
													done: false
												};
											} else if (r === d) {
												return {
													value: o[q],
													done: false
												};
											} else if (r === e)
												return {
													value: [q, o[q]],
													done: false
												};
										};
										n.prototype[
											typeof Symbol === 'function'
												? Symbol.iterator
												: '@@iterator'
										] = function() {
											'use strict';
											return this;
										};
										return n;
									})();
								return {
									keys: l
										? function(n) {
												return n.keys();
										  }
										: function(n) {
												return new m(n, c);
										  },
									values: l
										? function(n) {
												return n.values();
										  }
										: function(n) {
												return new m(n, d);
										  },
									entries: l
										? function(n) {
												return n.entries();
										  }
										: function(n) {
												return new m(n, e);
										  }
								};
							})(),
							g = (function() {
								var l = h(String),
									m = void 0;
								if (!l)
									m = (function() {
										function n(o) {
											'use strict';
											this.$StringIterator1 = o;
											this.$StringIterator2 = 0;
										}
										n.prototype.next = function() {
											'use strict';
											if (this.$StringIterator1 == null)
												return {
													value: b,
													done: true
												};
											var o = this.$StringIterator2,
												p = this.$StringIterator1,
												q = p.length;
											if (o >= q) {
												this.$StringIterator1 = b;
												return {
													value: b,
													done: true
												};
											}
											var r = void 0,
												s = p.charCodeAt(o);
											if (s < 55296 || s > 56319 || o + 1 === q) {
												r = p[o];
											} else {
												var t = p.charCodeAt(o + 1);
												if (t < 56320 || t > 57343) {
													r = p[o];
												} else r = p[o] + p[o + 1];
											}
											this.$StringIterator2 = o + r.length;
											return {
												value: r,
												done: false
											};
										};
										n.prototype[
											typeof Symbol === 'function'
												? Symbol.iterator
												: '@@iterator'
										] = function() {
											'use strict';
											return this;
										};
										return n;
									})();
								return {
									keys: function n() {
										throw TypeError(
											"Strings default iterator doesn't implement keys."
										);
									},
									values: l
										? function(n) {
												return n[
													typeof Symbol === 'function'
														? Symbol.iterator
														: '@@iterator'
												]();
										  }
										: function(n) {
												return new m(n);
										  },
									entries: function n() {
										throw TypeError(
											"Strings default iterator doesn't implement entries."
										);
									}
								};
							})();

						function h(l) {
							return (
								typeof l.prototype[
									typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'
								] === 'function' &&
								typeof l.prototype.values === 'function' &&
								typeof l.prototype.keys === 'function' &&
								typeof l.prototype.entries === 'function'
							);
						}

						function i(l, m) {
							'use strict';
							this.$ObjectIterator1 = l;
							this.$ObjectIterator2 = m;
							this.$ObjectIterator3 = ES('Object', 'keys', false, l);
							this.$ObjectIterator4 = 0;
						}
						i.prototype.next = function() {
							'use strict';
							var l = this.$ObjectIterator3.length,
								m = this.$ObjectIterator4,
								n = this.$ObjectIterator2,
								o = this.$ObjectIterator3[m];
							if (m >= l) {
								this.$ObjectIterator1 = b;
								return {
									value: b,
									done: true
								};
							}
							this.$ObjectIterator4 = m + 1;
							if (n === c) {
								return {
									value: o,
									done: false
								};
							} else if (n === d) {
								return {
									value: this.$ObjectIterator1[o],
									done: false
								};
							} else if (n === e)
								return {
									value: [o, this.$ObjectIterator1[o]],
									done: false
								};
						};
						i.prototype[
							typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'
						] = function() {
							'use strict';
							return this;
						};
						var j = {
							keys: function l(m) {
								return new i(m, c);
							},
							values: function l(m) {
								return new i(m, d);
							},
							entries: function l(m) {
								return new i(m, e);
							}
						};

						function k(l, m) {
							if (typeof l === 'string') {
								return g[m || d](l);
							} else if (ES('Array', 'isArray', false, l)) {
								return f[m || d](l);
							} else if (
								l[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator']
							) {
								return l[
									typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'
								]();
							} else return j[m || e](l);
						}
						ES('Object', 'assign', false, k, {
							KIND_KEYS: c,
							KIND_VALUES: d,
							KIND_ENTRIES: e,
							keys: function l(m) {
								return k(m, c);
							},
							values: function l(m) {
								return k(m, d);
							},
							entries: function l(m) {
								return k(m, e);
							},
							generic: j.entries
						});
						a.FB_enumerate = k;
					})(typeof global === 'undefined' ? this : global);
					(function(a, b) {
						var c = a.window || a;

						function d() {
							return (
								'f' + (Math.random() * (1 << 30)).toString(16).replace('.', '')
							);
						}

						function e(j) {
							var k = j ? j.ownerDocument || j : document,
								l = k.defaultView || c;
							return !!(
								j &&
								(typeof l.Node === 'function'
									? j instanceof l.Node
									: typeof j === 'object' &&
									  typeof j.nodeType === 'number' &&
									  typeof j.nodeName === 'string')
							);
						}

						function f(j) {
							var k = c[j];
							if (k == null) return true;
							if (typeof c.Symbol !== 'function') return true;
							var l = k.prototype;
							return (
								k == null ||
								typeof k !== 'function' ||
								typeof l.clear !== 'function' ||
								new k().size !== 0 ||
								typeof l.keys !== 'function' ||
								typeof l['for' + 'Each'] !== 'function'
							);
						}
						var g = a.FB_enumerate,
							h = (function() {
								if (!f('Map')) return c.Map;
								var j = 'key',
									k = 'value',
									l = 'key+value',
									m = '$map_',
									n = void 0,
									o = 'IE_HASH_';

								function p(ba) {
									'use strict';
									if (!u(this)) throw new TypeError('Wrong map object type.');
									t(this);
									if (ba != null) {
										var ca = g(ba),
											da = void 0;
										while (!(da = ca.next()).done) {
											if (!u(da.value))
												throw new TypeError(
													'Expected iterable items to be pair objects.'
												);
											this.set(da.value[0], da.value[1]);
										}
									}
								}
								p.prototype.clear = function() {
									'use strict';
									t(this);
								};
								p.prototype.has = function(ba) {
									'use strict';
									var ca = r(this, ba);
									return !!(ca != null && this._mapData[ca]);
								};
								p.prototype.set = function(ba, ca) {
									'use strict';
									var da = r(this, ba);
									if (da != null && this._mapData[da]) {
										this._mapData[da][1] = ca;
									} else {
										da = this._mapData.push([ba, ca]) - 1;
										s(this, ba, da);
										this.size += 1;
									}
									return this;
								};
								p.prototype.get = function(ba) {
									'use strict';
									var ca = r(this, ba);
									if (ca == null) {
										return b;
									} else return this._mapData[ca][1];
								};
								p.prototype['delete'] = function(ba) {
									'use strict';
									var ca = r(this, ba);
									if (ca != null && this._mapData[ca]) {
										s(this, ba, b);
										this._mapData[ca] = b;
										this.size -= 1;
										return true;
									} else return false;
								};
								p.prototype.entries = function() {
									'use strict';
									return new q(this, l);
								};
								p.prototype.keys = function() {
									'use strict';
									return new q(this, j);
								};
								p.prototype.values = function() {
									'use strict';
									return new q(this, k);
								};
								p.prototype.forEach = function(ba, ca) {
									'use strict';
									if (typeof ba !== 'function')
										throw new TypeError('Callback must be callable.');
									var da = ES(ba, 'bind', true, ca || b),
										ea = this._mapData;
									for (var fa = 0; fa < ea.length; fa++) {
										var ga = ea[fa];
										if (ga != null) da(ga[1], ga[0], this);
									}
								};
								p.prototype[
									typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'
								] = function() {
									'use strict';
									return this.entries();
								};

								function q(ba, ca) {
									'use strict';
									if (!(u(ba) && ba._mapData))
										throw new TypeError('Object is not a map.');
									if (ES([j, l, k], 'indexOf', true, ca) === -1)
										throw new Error('Invalid iteration kind.');
									this._map = ba;
									this._nextIndex = 0;
									this._kind = ca;
								}
								q.prototype.next = function() {
									'use strict';
									if (!this instanceof p)
										throw new TypeError(
											'Expected to be called on a MapIterator.'
										);
									var ba = this._map,
										ca = this._nextIndex,
										da = this._kind;
									if (ba == null) return v(b, true);
									var ea = ba._mapData;
									while (ca < ea.length) {
										var fa = ea[ca];
										ca += 1;
										this._nextIndex = ca;
										if (fa)
											if (da === j) {
												return v(fa[0], false);
											} else if (da === k) {
												return v(fa[1], false);
											} else if (da) return v(fa, false);
									}
									this._map = b;
									return v(b, true);
								};
								q.prototype[
									typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'
								] = function() {
									'use strict';
									return this;
								};

								function r(ba, ca) {
									if (u(ca)) {
										var da = z(ca);
										return da ? ba._objectIndex[da] : b;
									} else {
										var ea = m + ca;
										if (typeof ca === 'string') {
											return ba._stringIndex[ea];
										} else return ba._otherIndex[ea];
									}
								}

								function s(ba, ca, da) {
									var ea = da == null;
									if (u(ca)) {
										var fa = z(ca);
										if (!fa) fa = aa(ca);
										if (ea) {
											delete ba._objectIndex[fa];
										} else ba._objectIndex[fa] = da;
									} else {
										var ga = m + ca;
										if (typeof ca === 'string') {
											if (ea) {
												delete ba._stringIndex[ga];
											} else ba._stringIndex[ga] = da;
										} else if (ea) {
											delete ba._otherIndex[ga];
										} else ba._otherIndex[ga] = da;
									}
								}

								function t(ba) {
									ba._mapData = [];
									ba._objectIndex = {};
									ba._stringIndex = {};
									ba._otherIndex = {};
									ba.size = 0;
								}

								function u(ba) {
									return (
										ba != null &&
										(typeof ba === 'object' || typeof ba === 'function')
									);
								}

								function v(ba, ca) {
									return {
										value: ba,
										done: ca
									};
								}
								p.__isES5 = (function() {
									try {
										Object.defineProperty({}, '__.$#x', {});
										return true;
									} catch (ba) {
										return false;
									}
								})();

								function w(ba) {
									if (!p.__isES5 || !Object.isExtensible) {
										return true;
									} else return Object.isExtensible(ba);
								}

								function x(ba) {
									var ca = void 0;
									switch (ba.nodeType) {
										case 1:
											ca = ba.uniqueID;
											break;
										case 9:
											ca = ba.documentElement.uniqueID;
											break;
										default:
											return null;
									}
									if (ca) {
										return o + ca;
									} else return null;
								}
								var y = d();

								function z(ba) {
									if (ba[y]) {
										return ba[y];
									} else if (
										!p.__isES5 &&
										ba.propertyIsEnumerable &&
										ba.propertyIsEnumerable[y]
									) {
										return ba.propertyIsEnumerable[y];
									} else if (!p.__isES5 && e(ba) && x(ba)) {
										return x(ba);
									} else if (!p.__isES5 && ba[y]) return ba[y];
								}
								var aa = (function() {
									var ba = Object.prototype.propertyIsEnumerable,
										ca = 0;
									return function da(ea) {
										if (w(ea)) {
											ca += 1;
											if (p.__isES5) {
												Object.defineProperty(ea, y, {
													enumerable: false,
													writable: false,
													configurable: false,
													value: ca
												});
											} else if (ea.propertyIsEnumerable) {
												ea.propertyIsEnumerable = function() {
													return ba.apply(this, arguments);
												};
												ea.propertyIsEnumerable[y] = ca;
											} else if (e(ea)) {
												ea[y] = ca;
											} else
												throw new Error(
													'Unable to set a non-enumerable property on object.'
												);
											return ca;
										} else
											throw new Error(
												'Non-extensible objects are not allowed as keys.'
											);
									};
								})();
								return __annotator(p, {
									name: 'Map'
								});
							})(),
							i = (function() {
								if (!f('Set')) return c.Set;

								function j(l) {
									'use strict';
									if (
										this == null ||
										(typeof this !== 'object' && typeof this !== 'function')
									)
										throw new TypeError('Wrong set object type.');
									k(this);
									if (l != null) {
										var m = g(l),
											n = void 0;
										while (!(n = m.next()).done) this.add(n.value);
									}
								}
								j.prototype.add = function(l) {
									'use strict';
									this._map.set(l, l);
									this.size = this._map.size;
									return this;
								};
								j.prototype.clear = function() {
									'use strict';
									k(this);
								};
								j.prototype['delete'] = function(l) {
									'use strict';
									var m = this._map['delete'](l);
									this.size = this._map.size;
									return m;
								};
								j.prototype.entries = function() {
									'use strict';
									return this._map.entries();
								};
								j.prototype.forEach = function(l) {
									'use strict';
									var m = arguments[1],
										n = this._map.keys(),
										o = void 0;
									while (!(o = n.next()).done)
										l.call(m, o.value, o.value, this);
								};
								j.prototype.has = function(l) {
									'use strict';
									return this._map.has(l);
								};
								j.prototype.values = function() {
									'use strict';
									return this._map.values();
								};
								j.prototype.keys = function() {
									'use strict';
									return this.values();
								};
								j.prototype[
									typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'
								] = function() {
									'use strict';
									return this.values();
								};

								function k(l) {
									l._map = new h();
									l.size = l._map.size;
								}
								return __annotator(j, {
									name: 'Set'
								});
							})();
						a.Map = h;
						a.Set = i;
					})(typeof global === 'undefined' ? this : global);
					__d('UrlMapConfig', [], {
						www: 'www.facebook.com',
						m: 'm.facebook.com',
						connect: 'connect.facebook.net',
						business: 'business.facebook.com',
						api_https: 'api.facebook.com',
						api_read_https: 'api-read.facebook.com',
						graph_https: 'graph.facebook.com',
						an_https: 'an.facebook.com',
						fbcdn_http: 'static.xx.fbcdn.net',
						fbcdn_https: 'static.xx.fbcdn.net',
						cdn_http: 'staticxx.facebook.com',
						cdn_https: 'staticxx.facebook.com'
					});
					__d('JSSDKRuntimeConfig', [], {
						locale: 'en_US',
						rtl: false,
						revision: '3023720'
					});
					__d(
						'ManagedError',
						[],
						function a(b, c, d, e, f, g) {
							function h(i, j) {
								Error.prototype.constructor.call(this, i);
								this.message = i;
								this.innerError = j;
							}
							h.prototype = new Error();
							h.prototype.constructor = h;
							f.exports = h;
						},
						null
					);
					__d(
						'errorCode',
						[],
						function a(b, c, d, e, f, g) {
							'use strict';

							function h(i) {
								throw new Error(
									'errorCode' +
										'("' +
										i +
										'"): This should not happen. Oh noes!'
								);
							}
							f.exports = h;
						},
						null
					);
					__d(
						'guid',
						[],
						function a(b, c, d, e, f, g) {
							function h() {
								return (
									'f' +
									(Math.random() * (1 << 30)).toString(16).replace('.', '')
								);
							}
							f.exports = h;
						},
						18
					);
					__d(
						'sdk.UA',
						[],
						function a(b, c, d, e, f, g) {
							var h = navigator.userAgent,
								i = {
									iphone: /\b(iPhone|iP[ao]d)/.test(h),
									ipad: /\b(iP[ao]d)/.test(h),
									android: /Android/i.test(h),
									nativeApp: /FBAN\/\w+;/i.test(h)
								},
								j = /Mobile/i.test(h),
								k = {
									ie: '',
									firefox: '',
									chrome: '',
									webkit: '',
									osx: '',
									edge: '',
									operaMini: '',
									ucWeb: ''
								},
								l = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(
									h
								);
							if (l) {
								k.ie = l[1] ? parseFloat(l[1]) : l[4] ? parseFloat(l[4]) : '';
								k.firefox = l[2] || '';
								k.webkit = l[3] || '';
								if (l[3]) {
									var m = /(?:Chrome\/(\d+\.\d+))/.exec(h);
									k.chrome = m ? m[1] : '';
									var n = /(?:Edge\/(\d+\.\d+))/.exec(h);
									k.edge = n ? n[1] : '';
								}
							}
							var o = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(h);
							if (o) k.osx = o[1];
							var p = /(?:Opera Mini\/(\d+(?:\.\d+)?))/.exec(h);
							if (p) k.operaMini = p[1];
							var q = /(?:UCWEB\/(\d+(?:\.\d+))?)/.exec(h);
							if (q) k.ucWeb = q[1] || '2.0';

							function r(t) {
								return ES(t.split('.'), 'map', true, function(u) {
									return parseFloat(u);
								});
							}
							var s = {};
							ES(ES('Object', 'keys', false, k), 'map', true, function(t) {
								s[t] = function() {
									return parseFloat(k[t]);
								};
								s[t].getVersionParts = function() {
									return r(k[t]);
								};
							});
							ES(ES('Object', 'keys', false, i), 'map', true, function(t) {
								s[t] = function() {
									return i[t];
								};
							});
							s.mobile = function() {
								return i.iphone || i.ipad || i.android || j;
							};
							s.mTouch = function() {
								return i.android || i.iphone || i.ipad;
							};
							s.mBasic = function() {
								return !!(k.ucWeb || k.operaMini);
							};
							f.exports = s;
						},
						null
					);
					__d(
						'normalizeError',
						['sdk.UA'],
						function a(b, c, d, e, f, g, h) {
							function i(j) {
								var k = {
									line: j.lineNumber || j.line,
									message: j.message,
									name: j.name,
									script: j.fileName || j.sourceURL || j.script,
									stack: j.stackTrace || j.stack
								};
								k._originalError = j;
								var l = /([\w:\.\/]+\.js):(\d+)/.exec(j.stack);
								if (h.chrome() && l) {
									k.script = l[1];
									k.line = parseInt(l[2], 10);
								}
								for (var m in k) k[m] == null && delete k[m];
								return k;
							}
							f.exports = i;
						},
						null
					);
					__d(
						'QueryString',
						[],
						function a(b, c, d, e, f, g) {
							function h(l) {
								var m = [];
								ES(
									ES('Object', 'keys', false, l).sort(),
									'forEach',
									true,
									function(n) {
										var o = l[n];
										if (typeof o === 'undefined') return;
										if (o === null) {
											m.push(n);
											return;
										}
										m.push(encodeURIComponent(n) + '=' + encodeURIComponent(o));
									}
								);
								return m.join('&');
							}

							function i(l, m) {
								var n = {};
								if (l === '') return n;
								var o = l.split('&');
								for (var p = 0; p < o.length; p++) {
									var q = o[p].split('=', 2),
										r = decodeURIComponent(q[0]);
									if (m && Object.prototype.hasOwnProperty.call(n, r))
										throw new URIError('Duplicate key: ' + r);
									n[r] = q.length === 2 ? decodeURIComponent(q[1]) : null;
								}
								return n;
							}

							function j(l, m) {
								return (
									l +
									(ES(l, 'indexOf', true, '?') !== -1 ? '&' : '?') +
									(typeof m === 'string' ? m : k.encode(m))
								);
							}
							var k = {
								encode: h,
								decode: i,
								appendToUrl: j
							};
							f.exports = k;
						},
						null
					);
					__d(
						'UrlMap',
						['UrlMapConfig'],
						function a(b, c, d, e, f, g, h) {
							var i = {
								resolve: function j(k, l) {
									var m =
										typeof l == 'undefined'
											? location.protocol.replace(':', '')
											: l
											? 'https'
											: 'http';
									if (k in h) return m + '://' + h[k];
									if (typeof l == 'undefined' && k + '_' + m in h)
										return m + '://' + h[k + '_' + m];
									if (l !== true && k + '_http' in h)
										return 'http://' + h[k + '_http'];
									if (l !== false && k + '_https' in h)
										return 'https://' + h[k + '_https'];
								}
							};
							f.exports = i;
						},
						null
					);
					__d(
						'ObservableMixin',
						[],
						function a(b, c, d, e, f, g) {
							function h() {
								this.__observableEvents = {};
							}
							h.prototype = {
								inform: function i(j) {
									var k = Array.prototype.slice.call(arguments, 1),
										l = Array.prototype.slice.call(this.getSubscribers(j));
									for (var m = 0; m < l.length; m++) {
										if (l[m] === null) continue;
										try {
											l[m].apply(this, k);
										} catch (n) {
											setTimeout(function() {
												throw n;
											}, 0);
										}
									}
									return this;
								},
								getSubscribers: function i(j) {
									return (
										this.__observableEvents[j] ||
										(this.__observableEvents[j] = [])
									);
								},
								clearSubscribers: function i(j) {
									if (j) this.__observableEvents[j] = [];
									return this;
								},
								clearAllSubscribers: function i() {
									this.__observableEvents = {};
									return this;
								},
								subscribe: function i(j, k) {
									var l = this.getSubscribers(j);
									l.push(k);
									return this;
								},
								unsubscribe: function i(j, k) {
									var l = this.getSubscribers(j);
									for (var m = 0; m < l.length; m++)
										if (l[m] === k) {
											l.splice(m, 1);
											break;
										}
									return this;
								},
								monitor: function i(j, k) {
									if (!k()) {
										var l = ES(
											function(m) {
												if (k.apply(k, arguments)) this.unsubscribe(j, l);
											},
											'bind',
											true,
											this
										);
										this.subscribe(j, l);
									}
									return this;
								}
							};
							f.exports = h;
						},
						null
					);
					__d(
						'AssertionError',
						['ManagedError'],
						function a(b, c, d, e, f, g, h) {
							function i(j) {
								h.prototype.constructor.apply(this, arguments);
							}
							i.prototype = new h();
							i.prototype.constructor = i;
							f.exports = i;
						},
						null
					);
					__d(
						'sprintf',
						[],
						function a(b, c, d, e, f, g) {
							function h(i) {
								for (
									var j = arguments.length, k = Array(j > 1 ? j - 1 : 0), l = 1;
									l < j;
									l++
								)
									k[l - 1] = arguments[l];
								var m = 0;
								return i.replace(/%s/g, function() {
									return String(k[m++]);
								});
							}
							f.exports = h;
						},
						null
					);
					__d(
						'Assert',
						['AssertionError', 'sprintf'],
						function a(b, c, d, e, f, g, h, i) {
							function j(o, p) {
								if (typeof o !== 'boolean' || !o) throw new h(p);
								return o;
							}

							function k(o, p, q) {
								var r;
								if (p === undefined) {
									r = 'undefined';
								} else if (p === null) {
									r = 'null';
								} else {
									var s = Object.prototype.toString.call(p);
									r = /\s(\w*)/.exec(s)[1].toLowerCase();
								}
								j(
									ES(o, 'indexOf', true, r) !== -1,
									q || i('Expression is of type %s, not %s', r, o)
								);
								return p;
							}

							function l(o, p, q) {
								j(p instanceof o, q || 'Expression not instance of type');
								return p;
							}

							function m(o, p) {
								n['is' + o] = p;
								n['maybe' + o] = function(q, r) {
									if (q != null) p(q, r);
								};
							}
							var n = {
								isInstanceOf: l,
								isTrue: j,
								isTruthy: function o(p, q) {
									return j(!!p, q);
								},
								type: k,
								define: function o(p, q) {
									p =
										p.substring(0, 1).toUpperCase() +
										p.substring(1).toLowerCase();
									m(p, function(r, s) {
										j(q(r), s);
									});
								}
							};
							ES(
								[
									'Array',
									'Boolean',
									'Date',
									'Function',
									'Null',
									'Number',
									'Object',
									'Regexp',
									'String',
									'Undefined'
								],
								'forEach',
								true,
								function(o) {
									m(o, ES(k, 'bind', true, null, o.toLowerCase()));
								}
							);
							f.exports = n;
						},
						null
					);
					__d(
						'Type',
						['Assert'],
						function a(b, c, d, e, f, g, h) {
							function i() {
								var m = this.__mixins;
								if (m)
									for (var n = 0; n < m.length; n++)
										m[n].apply(this, arguments);
							}

							function j(m, n) {
								if (n instanceof m) return true;
								if (n instanceof i)
									for (var o = 0; o < n.__mixins.length; o++)
										if (n.__mixins[o] == m) return true;
								return false;
							}

							function k(m, n) {
								var o = m.prototype;
								if (!ES('Array', 'isArray', false, n)) n = [n];
								for (var p = 0; p < n.length; p++) {
									var q = n[p];
									if (typeof q == 'function') {
										o.__mixins.push(q);
										q = q.prototype;
									}
									ES(ES('Object', 'keys', false, q), 'forEach', true, function(
										r
									) {
										o[r] = q[r];
									});
								}
							}

							function l(m, n, o) {
								var p =
									n && Object.prototype.hasOwnProperty.call(n, 'constructor')
										? n.constructor
										: function() {
												this.parent.apply(this, arguments);
										  };
								h.isFunction(p);
								if (m && m.prototype instanceof i === false)
									throw new Error('parent type does not inherit from Type');
								m = m || i;

								function q() {}
								q.prototype = m.prototype;
								p.prototype = new q();
								if (n) ES('Object', 'assign', false, p.prototype, n);
								p.prototype.constructor = p;
								p.parent = m;
								p.prototype.__mixins = m.prototype.__mixins
									? Array.prototype.slice.call(m.prototype.__mixins)
									: [];
								if (o) k(p, o);
								p.prototype.parent = function() {
									this.parent = m.prototype.parent;
									m.apply(this, arguments);
								};
								p.prototype.parentCall = function(r) {
									return m.prototype[r].apply(
										this,
										Array.prototype.slice.call(arguments, 1)
									);
								};
								p.extend = function(r, s) {
									return l(this, r, s);
								};
								return p;
							}
							ES('Object', 'assign', false, i.prototype, {
								instanceOf: function m(n) {
									return j(n, this);
								}
							});
							ES('Object', 'assign', false, i, {
								extend: function m(n, o) {
									return typeof n === 'function'
										? l.apply(null, arguments)
										: l(null, n, o);
								},
								instanceOf: j
							});
							f.exports = i;
						},
						null
					);
					__d(
						'sdk.Model',
						['Type', 'ObservableMixin'],
						function a(b, c, d, e, f, g, h, i) {
							var j = h.extend(
								{
									constructor: function k(l) {
										this.parent();
										var m = {},
											n = this;
										ES(
											ES('Object', 'keys', false, l),
											'forEach',
											true,
											function(o) {
												m[o] = l[o];
												n['set' + o] = function(p) {
													if (p === m[o]) return this;
													m[o] = p;
													n.inform(o + '.change', p);
													return n;
												};
												n['get' + o] = function() {
													return m[o];
												};
											}
										);
									}
								},
								i
							);
							f.exports = j;
						},
						null
					);
					__d(
						'sdk.Runtime',
						['sdk.Model', 'JSSDKRuntimeConfig'],
						function a(b, c, d, e, f, g, h, i) {
							var j = {
									UNKNOWN: 0,
									PAGETAB: 1,
									CANVAS: 2,
									PLATFORM: 4
								},
								k = new h({
									AccessToken: '',
									AutoLogAppEvents: false,
									ClientID: '',
									CookieUserID: '',
									Environment: j.UNKNOWN,
									Initialized: false,
									IsVersioned: false,
									KidDirectedSite: undefined,
									Locale: i.locale,
									LoggedIntoFacebook: undefined,
									LoginStatus: undefined,
									Revision: i.revision,
									Rtl: i.rtl,
									Scope: undefined,
									Secure: undefined,
									UseCookie: false,
									UserID: '',
									Version: undefined
								});
							ES('Object', 'assign', false, k, {
								ENVIRONMENTS: j,
								isEnvironment: function l(m) {
									var n = this.getEnvironment();
									return (m | n) === n;
								},
								isCanvasEnvironment: function l() {
									return (
										this.isEnvironment(j.CANVAS) ||
										this.isEnvironment(j.PAGETAB)
									);
								}
							});
							(function() {
								var l = /app_runner/.test(window.name)
									? j.PAGETAB
									: /iframe_canvas/.test(window.name)
									? j.CANVAS
									: j.UNKNOWN;
								if ((l | j.PAGETAB) === l) l |= j.CANVAS;
								k.setEnvironment(l);
							})();
							f.exports = k;
						},
						null
					);
					__d(
						'sdk.Scribe',
						['QueryString', 'sdk.Runtime', 'UrlMap'],
						function a(b, c, d, e, f, g, h, i, j) {
							function k(m, n) {
								if (typeof n.extra == 'object')
									n.extra.revision = i.getRevision();
								new Image().src = h.appendToUrl(
									j.resolve('www', true) + '/common/scribe_endpoint.php',
									{
										c: m,
										m: ES('JSON', 'stringify', false, n)
									}
								);
							}
							var l = {
								log: k
							};
							f.exports = l;
						},
						null
					);
					__d(
						'URIRFC3986',
						[],
						function a(b, c, d, e, f, g) {
							var h = new RegExp(
									'^' +
										'([^:/?#]+:)?' +
										'(//' +
										'([^\\\\/?#@]*@)?' +
										'(' +
										'\\[[A-Fa-f0-9:.]+\\]|' +
										'[^\\/?#:]*' +
										')' +
										'(:[0-9]*)?' +
										')?' +
										'([^?#]*)' +
										'(\\?[^#]*)?' +
										'(#.*)?'
								),
								i = {
									parse: function j(k) {
										if (ES(k, 'trim', true) === '') return null;
										var l = k.match(h);
										if (l == null) return null;
										var m = {};
										m.uri = l[0] ? l[0] : null;
										m.scheme = l[1] ? l[1].substr(0, l[1].length - 1) : null;
										m.authority = l[2] ? l[2].substr(2) : null;
										m.userinfo = l[3] ? l[3].substr(0, l[3].length - 1) : null;
										m.host = l[2] ? l[4] : null;
										m.port = l[5]
											? l[5].substr(1)
												? parseInt(l[5].substr(1), 10)
												: null
											: null;
										m.path = l[6] ? l[6] : null;
										m.query = l[7] ? l[7].substr(1) : null;
										m.fragment = l[8] ? l[8].substr(1) : null;
										m.isGenericURI = m.authority === null && !!m.scheme;
										return m;
									}
								};
							f.exports = i;
						},
						18
					);
					__d(
						'createObjectFrom',
						[],
						function a(b, c, d, e, f, g) {
							function h(i, j) {
								var k = {},
									l = ES('Array', 'isArray', false, j);
								if (j === undefined) j = true;
								for (var m = i.length - 1; m >= 0; m--) k[i[m]] = l ? j[m] : j;
								return k;
							}
							f.exports = h;
						},
						18
					);
					__d(
						'URISchemes',
						['createObjectFrom'],
						function a(b, c, d, e, f, g, h) {
							var i = h([
									'blob',
									'cmms',
									'fb',
									'fbatwork',
									'fb-ama',
									'fb-messenger',
									'fb-page-messages',
									'fb-pma',
									'fbcf',
									'fbconnect',
									'fbmobilehome',
									'fbrpc',
									'file',
									'ftp',
									'http',
									'https',
									'mailto',
									'ms-app',
									'intent',
									'itms',
									'itms-apps',
									'itms-services',
									'market',
									'svn+ssh',
									'fbstaging',
									'tel',
									'sms',
									'pebblejs',
									'sftp',
									'whatsapp',
									'moments',
									'fblite',
									'chrome-extension',
									'webcal',
									'fb124024574287414',
									'fb124024574287414rc',
									'fb124024574287414master',
									'fb1576585912599779',
									'fb929757330408142',
									'designpack',
									'fbapi20130214',
									'fb1196383223757595',
									'tbauth',
									'oculus',
									'oculus.store'
								]),
								j = {
									isAllowed: function k(l) {
										if (!l) return true;
										return Object.prototype.hasOwnProperty.call(
											i,
											l.toLowerCase()
										);
									}
								};
							f.exports = j;
						},
						18
					);
					__d(
						'eprintf',
						[],
						function a(b, c, d, e, f, g) {
							function h(i) {
								for (
									var j = arguments.length, k = Array(j > 1 ? j - 1 : 0), l = 1;
									l < j;
									l++
								)
									k[l - 1] = arguments[l];
								var m = ES(k, 'map', true, function(p) {
										return String(p);
									}),
									n = i.split('%s').length - 1;
								if (n !== m.length)
									return h(
										'eprintf args number mismatch: %s',
										ES('JSON', 'stringify', false, [i].concat(m))
									);
								var o = 0;
								return i.replace(/%s/g, function() {
									return String(m[o++]);
								});
							}
							f.exports = h;
						},
						null
					);
					__d(
						'ex',
						['eprintf'],
						function a(b, c, d, e, f, g, h) {
							function i(j) {
								for (
									var k = arguments.length, l = Array(k > 1 ? k - 1 : 0), m = 1;
									m < k;
									m++
								)
									l[m - 1] = arguments[m];
								var n = ES(l, 'map', true, function(p) {
										return String(p);
									}),
									o = j.split('%s').length - 1;
								if (o !== n.length)
									return i(
										'ex args number mismatch: %s',
										ES('JSON', 'stringify', false, [j].concat(n))
									);
								return (
									i._prefix +
									ES('JSON', 'stringify', false, [j].concat(n)) +
									i._suffix
								);
							}
							i._prefix = '<![EX[';
							i._suffix = ']]>';
							f.exports = i;
						},
						18
					);
					__d(
						'invariant',
						['ex', 'sprintf'],
						function a(b, c, d, e, f, g, h, i) {
							'use strict';
							var j = h;

							function k(l, m) {
								if (!l) {
									var n = void 0;
									if (m === undefined) {
										n = new Error(
											'Minified exception occurred; use the non-minified dev environment ' +
												'for the full error message and additional helpful warnings.'
										);
									} else {
										for (
											var o = arguments.length,
												p = Array(o > 2 ? o - 2 : 0),
												q = 2;
											q < o;
											q++
										)
											p[q - 2] = arguments[q];
										n = new Error(j.apply(undefined, [m].concat(p)));
										n.name = 'Invariant Violation';
										n.messageWithParams = [m].concat(p);
									}
									n.framesToPop = 1;
									throw n;
								}
							}
							f.exports = k;
						},
						18
					);
					__d(
						'setHostSubdomain',
						[],
						function a(b, c, d, e, f, g) {
							function h(i, j) {
								var k = i.split('.');
								if (k.length < 3) {
									k.unshift(j);
								} else k[0] = j;
								return k.join('.');
							}
							f.exports = h;
						},
						null
					);
					__d(
						'URIBase',
						['URIRFC3986', 'URISchemes', 'ex', 'invariant', 'setHostSubdomain'],
						function a(b, c, d, e, f, g, h, i, j, k, l) {
							var m = new RegExp(
									'[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f' +
										'\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF' +
										'\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]'
								),
								n = new RegExp(
									'^(?:[^/]*:|' + '[\\x00-\\x1f]*/[\\x00-\\x1f]*/)'
								);

							function o(r, s, t, u) {
								if (!s) return true;
								if (s instanceof q) {
									r.setProtocol(s.getProtocol());
									r.setDomain(s.getDomain());
									r.setPort(s.getPort());
									r.setPath(s.getPath());
									r.setQueryData(u.deserialize(u.serialize(s.getQueryData())));
									r.setFragment(s.getFragment());
									r.setIsGeneric(s.getIsGeneric());
									r.setForceFragmentSeparator(s.getForceFragmentSeparator());
									return true;
								}
								s = ES(s.toString(), 'trim', true);
								var v = h.parse(s) || {
									fragment: null,
									scheme: null
								};
								if (!t && !i.isAllowed(v.scheme)) return false;
								r.setProtocol(v.scheme || '');
								if (!t && m.test(v.host || '')) return false;
								r.setDomain(v.host || '');
								r.setPort(v.port || '');
								r.setPath(v.path || '');
								if (t) {
									r.setQueryData(u.deserialize(v.query || '') || {});
								} else
									try {
										r.setQueryData(u.deserialize(v.query || '') || {});
									} catch (w) {
										return false;
									}
								r.setFragment(v.fragment || '');
								if (v.fragment === '') r.setForceFragmentSeparator(true);
								r.setIsGeneric(v.isGenericURI || false);
								if (v.userinfo !== null)
									if (t) {
										throw new Error(
											j(
												'URI.parse: invalid URI (userinfo is not allowed in a URI): %s',
												r.toString()
											)
										);
									} else return false;
								if (
									!r.getDomain() &&
									ES(r.getPath(), 'indexOf', true, '\\') !== -1
								)
									if (t) {
										throw new Error(
											j(
												'URI.parse: invalid URI (no domain but multiple back-slashes): %s',
												r.toString()
											)
										);
									} else return false;
								if (!r.getProtocol() && n.test(s))
									if (t) {
										throw new Error(
											j(
												'URI.parse: invalid URI (unsafe protocol-relative URLs): %s',
												r.toString()
											)
										);
									} else return false;
								if (
									r.getDomain() &&
									r.getPath() &&
									!ES(r.getPath(), 'startsWith', true, '/')
								)
									if (t) {
										throw new Error(
											j(
												'URI.parse: invalid URI (domain and path where path lacks leading slash): %s',
												r.toString()
											)
										);
									} else return false;
								return true;
							}
							var p = [];
							q.isValidURI = function(r, s) {
								'use strict';
								return o(new q(null, s), r, false, s);
							};

							function q(r, s) {
								'use strict';
								s || k(0);
								this.$URIBase9 = s;
								this.$URIBase7 = '';
								this.$URIBase1 = '';
								this.$URIBase6 = '';
								this.$URIBase5 = '';
								this.$URIBase3 = '';
								this.$URIBase4 = false;
								this.$URIBase8 = {};
								this.$URIBase2 = false;
								o(this, r, true, s);
							}
							q.prototype.setProtocol = function(r) {
								'use strict';
								i.isAllowed(r) || k(0);
								this.$URIBase7 = r;
								return this;
							};
							q.prototype.getProtocol = function() {
								'use strict';
								return (this.$URIBase7 || '').toLowerCase();
							};
							q.prototype.setSecure = function(r) {
								'use strict';
								return this.setProtocol(r ? 'https' : 'http');
							};
							q.prototype.isSecure = function() {
								'use strict';
								return this.getProtocol() === 'https';
							};
							q.prototype.setDomain = function(r) {
								'use strict';
								if (m.test(r))
									throw new Error(
										j(
											'URI.setDomain: unsafe domain specified: %s for url %s',
											r,
											this.toString()
										)
									);
								this.$URIBase1 = r;
								return this;
							};
							q.prototype.getDomain = function() {
								'use strict';
								return this.$URIBase1;
							};
							q.prototype.setPort = function(r) {
								'use strict';
								this.$URIBase6 = r;
								return this;
							};
							q.prototype.getPort = function() {
								'use strict';
								return this.$URIBase6;
							};
							q.prototype.setPath = function(r) {
								'use strict';
								this.$URIBase5 = r;
								return this;
							};
							q.prototype.getPath = function() {
								'use strict';
								return this.$URIBase5;
							};
							q.prototype.addQueryData = function(r, s) {
								'use strict';
								if (Object.prototype.toString.call(r) === '[object Object]') {
									ES('Object', 'assign', false, this.$URIBase8, r);
								} else this.$URIBase8[r] = s;
								return this;
							};
							q.prototype.setQueryData = function(r) {
								'use strict';
								this.$URIBase8 = r;
								return this;
							};
							q.prototype.getQueryData = function() {
								'use strict';
								return this.$URIBase8;
							};
							q.prototype.removeQueryData = function(r) {
								'use strict';
								if (!ES('Array', 'isArray', false, r)) r = [r];
								for (var s = 0, t = r.length; s < t; ++s)
									delete this.$URIBase8[r[s]];
								return this;
							};
							q.prototype.setFragment = function(r) {
								'use strict';
								this.$URIBase3 = r;
								this.setForceFragmentSeparator(false);
								return this;
							};
							q.prototype.getFragment = function() {
								'use strict';
								return this.$URIBase3;
							};
							q.prototype.setForceFragmentSeparator = function(r) {
								'use strict';
								this.$URIBase2 = r;
								return this;
							};
							q.prototype.getForceFragmentSeparator = function() {
								'use strict';
								return this.$URIBase2;
							};
							q.prototype.setIsGeneric = function(r) {
								'use strict';
								this.$URIBase4 = r;
								return this;
							};
							q.prototype.getIsGeneric = function() {
								'use strict';
								return this.$URIBase4;
							};
							q.prototype.isEmpty = function() {
								'use strict';
								return !(
									this.getPath() ||
									this.getProtocol() ||
									this.getDomain() ||
									this.getPort() ||
									ES('Object', 'keys', false, this.getQueryData()).length > 0 ||
									this.getFragment()
								);
							};
							q.prototype.toString = function() {
								'use strict';
								var r = this;
								for (var s = 0; s < p.length; s++) r = p[s](r);
								return r.$URIBase10();
							};
							q.prototype.$URIBase10 = function() {
								'use strict';
								var r = '',
									s = this.getProtocol();
								if (s) r += s + ':' + (this.getIsGeneric() ? '' : '//');
								var t = this.getDomain();
								if (t) r += t;
								var u = this.getPort();
								if (u) r += ':' + u;
								var v = this.getPath();
								if (v) {
									r += v;
								} else if (r) r += '/';
								var w = this.$URIBase9.serialize(this.getQueryData());
								if (w) r += '?' + w;
								var x = this.getFragment();
								if (x) {
									r += '#' + x;
								} else if (this.getForceFragmentSeparator()) r += '#';
								return r;
							};
							q.registerFilter = function(r) {
								'use strict';
								p.push(r);
							};
							q.prototype.getOrigin = function() {
								'use strict';
								var r = this.getPort();
								return (
									this.getProtocol() +
									'://' +
									this.getDomain() +
									(r ? ':' + r : '')
								);
							};
							q.prototype.getQualifiedURIBase = function() {
								'use strict';
								return new q(this, this.$URIBase9).qualify();
							};
							q.prototype.qualify = function() {
								'use strict';
								if (!this.getDomain()) {
									var r = new q(window.location.href, this.$URIBase9);
									this.setProtocol(r.getProtocol())
										.setDomain(r.getDomain())
										.setPort(r.getPort());
								}
								return this;
							};
							q.prototype.setSubdomain = function(r) {
								'use strict';
								var s = this.qualify().getDomain();
								return this.setDomain(l(s, r));
							};
							q.prototype.getSubdomain = function() {
								'use strict';
								if (!this.getDomain()) return '';
								var r = this.getDomain().split('.');
								if (r.length <= 2) {
									return '';
								} else return r[0];
							};
							f.exports = q;
						},
						18
					);
					__d(
						'sdk.URI',
						['Assert', 'QueryString', 'URIBase'],
						function a(b, c, d, e, f, g, h, i, j) {
							var k,
								l,
								m = /\.facebook\.com$/,
								n = {
									serialize: function p(q) {
										return q ? i.encode(q) : '';
									},
									deserialize: function p(q) {
										return q ? i.decode(q) : {};
									}
								};
							k = babelHelpers.inherits(o, j);
							l = k && k.prototype;

							function o(p) {
								'use strict';
								h.isString(p, 'The passed argument was of invalid type.');
								l.constructor.call(this, p, n);
							}
							o.prototype.isFacebookURI = function() {
								'use strict';
								return m.test(this.getDomain());
							};
							o.prototype.valueOf = function() {
								'use strict';
								return this.toString();
							};
							f.exports = o;
						},
						null
					);
					__d(
						'wrapFunction',
						[],
						function a(b, c, d, e, f, g) {
							var h = {},
								i = function j(k, l, m) {
									return function() {
										var n = l in h ? h[l](k, m) : k;
										for (
											var o = arguments.length, p = Array(o), q = 0;
											q < o;
											q++
										)
											p[q] = arguments[q];
										return n.apply(this, p);
									};
								};
							i.setWrapper = function(j, k) {
								h[k] = j;
							};
							f.exports = i;
						},
						18
					);
					__d(
						'BrowserExtensions.ErrorHandling',
						[
							'ManagedError',
							'sdk.Scribe',
							'sdk.URI',
							'errorCode',
							'guid',
							'normalizeError',
							'wrapFunction'
						],
						function a(b, c, d, e, f, g, h, i, j, k, l, m, n) {
							'use strict';
							var o = true,
								p = '',
								q = l();

							function r(y) {
								var z = y._originalError;
								delete y._originalError;
								var aa =
									window.location.origin ||
									new j(window.location.href).getOrigin();
								i.log('browser_extensions_sdk_errors', {
									loggingRef: q,
									version: '0.1',
									error: y.name || y.message,
									extra: y,
									uri: window.location.href,
									origin: aa
								});
								throw z;
							}

							function s(y, z) {
								return function() {
									if (!o) return y.apply(this, arguments);
									try {
										p = z;
										return y.apply(this, arguments);
									} catch (ca) {
										if (ca instanceof h) throw ca;
										var aa = m(ca);
										aa.entry = z;
										var ba = ES(
											Array.prototype.slice.call(arguments),
											'map',
											true,
											function(da) {
												var ea = Object.prototype.toString.call(da);
												return /^\[object (String|Number|Boolean|Object|Date)\]$/.test(
													ea
												)
													? da
													: da.toString();
											}
										);
										aa.args = ES('JSON', 'stringify', false, ba).substring(
											0,
											200
										);
										r(aa);
									} finally {
										p = '';
									}
								};
							}

							function t(y) {
								if (!y.__wrapper)
									y.__wrapper = function() {
										try {
											return y.apply(this, arguments);
										} catch (z) {
											window.setTimeout(function() {
												throw z;
											}, 0);
											return false;
										}
									};
								return y.__wrapper;
							}

							function u(y) {
								try {
									return y && y.callee && y.callee.caller
										? y.callee.caller.name
										: '';
								} catch (z) {
									return '';
								}
							}

							function v(y, z) {
								return function(aa, ba) {
									var ca =
										z +
										':' +
										(p || '[global]') +
										':' +
										(aa.name ||
											'[anonymous]' +
												(u(arguments) ? '(' + u(arguments) + ')' : ''));
									return y(n(aa, 'entry', ca), ba);
								};
							}

							function w(y) {
								if (y === 2018162)
									return 'This feature is currently not available.';
								return 'Messenger Extensions unexpected error.';
							}
							if (o) {
								setTimeout = v(setTimeout, 'setTimeout');
								setInterval = v(setInterval, 'setInterval');
								n.setWrapper(s, 'entry');
							}
							var x = {
								getErrorMessage: w,
								guard: s,
								unguard: t
							};
							f.exports = x;
						},
						null
					);
					__d(
						'DOMEventListener',
						['invariant', 'wrapFunction'],
						function a(b, c, d, e, f, g, h, i) {
							var j = false;
							try {
								var k = Object.defineProperty({}, 'passive', {
									get: function o() {
										j = true;
									}
								});
								window.addEventListener('test', null, k);
							} catch (o) {}
							var l = void 0,
								m = void 0;
							if (window.addEventListener) {
								l = function o(p, q, r) {
									var s =
										arguments.length <= 3 || arguments[3] === undefined
											? false
											: arguments[3];
									r.wrapper = i(r, 'entry', 'DOMEventListener.add ' + q);
									p.addEventListener(q, r.wrapper, j ? s : false);
								};
								m = function o(p, q, r) {
									var s =
										arguments.length <= 3 || arguments[3] === undefined
											? false
											: arguments[3];
									p.removeEventListener(q, r.wrapper, j ? s : false);
								};
							} else if (window.attachEvent) {
								l = function o(p, q, r) {
									r.wrapper = i(r, 'entry', 'DOMEventListener.add ' + q);
									p.attachEvent || h(0);
									p.attachEvent('on' + q, r.wrapper);
								};
								m = function o(p, q, r) {
									p.detachEvent || h(0);
									p.detachEvent('on' + q, r.wrapper);
								};
							} else m = l = function o() {};
							var n = {
								add: function o(p, q, r) {
									var s =
										arguments.length <= 3 || arguments[3] === undefined
											? false
											: arguments[3];
									l(p, q, r, s);
									return {
										remove: function t() {
											m(p, q, r, s);
										}
									};
								},
								remove: m
							};
							f.exports = n;
						},
						18
					);
					__d(
						'Log',
						['sprintf'],
						function a(b, c, d, e, f, g, h) {
							var i = {
								DEBUG: 3,
								INFO: 2,
								WARNING: 1,
								ERROR: 0
							};

							function j(l, m) {
								var n = Array.prototype.slice.call(arguments, 2),
									o = h.apply(null, n),
									p = window.console;
								if (p && k.level >= m) p[l in p ? l : 'log'](o);
							}
							var k = {
								level: -1,
								Level: i,
								debug: ES(j, 'bind', true, null, 'debug', i.DEBUG),
								info: ES(j, 'bind', true, null, 'info', i.INFO),
								warn: ES(j, 'bind', true, null, 'warn', i.WARNING),
								error: ES(j, 'bind', true, null, 'error', i.ERROR)
							};
							f.exports = k;
						},
						null
					);
					__d(
						'JSONRPC',
						['Log'],
						function a(b, c, d, e, f, g, h) {
							function i(j) {
								'use strict';
								this.$JSONRPC1 = 0;
								this.$JSONRPC2 = {};
								this.remote = ES(
									function(k) {
										this.$JSONRPC3 = k;
										return this.remote;
									},
									'bind',
									true,
									this
								);
								this.local = {};
								this.$JSONRPC4 = j;
							}
							i.prototype.stub = function(j) {
								'use strict';
								this.remote[j] = ES(
									function() {
										var k = {
											jsonrpc: '2.0',
											method: j
										};
										for (
											var l = arguments.length, m = Array(l), n = 0;
											n < l;
											n++
										)
											m[n] = arguments[n];
										if (typeof m[m.length - 1] == 'function') {
											k.id = ++this.$JSONRPC1;
											this.$JSONRPC2[k.id] = m.pop();
										}
										k.params = m;
										this.$JSONRPC4(
											ES('JSON', 'stringify', false, k),
											this.$JSONRPC3 || {
												method: j
											}
										);
									},
									'bind',
									true,
									this
								);
							};
							i.prototype.read = function(j, k) {
								'use strict';
								var l = ES('JSON', 'parse', false, j),
									m = l.id;
								if (!l.method) {
									if (!this.$JSONRPC2[m]) {
										h.warn('Could not find callback %s', m);
										return;
									}
									var n = this.$JSONRPC2[m];
									delete this.$JSONRPC2[m];
									delete l.id;
									delete l.jsonrpc;
									n(l);
									return;
								}
								var o = this,
									p = this.local[l.method],
									q;
								if (m) {
									q = function s(t, u) {
										var v = {
											jsonrpc: '2.0',
											id: m
										};
										v[t] = u;
										setTimeout(function() {
											o.$JSONRPC4(ES('JSON', 'stringify', false, v), k);
										}, 0);
									};
								} else q = function s() {};
								if (!p) {
									h.error('Method "%s" has not been defined', l.method);
									q('error', {
										code: -32601,
										message: 'Method not found',
										data: l.method
									});
									return;
								}
								l.params.push(ES(q, 'bind', true, null, 'result'));
								l.params.push(ES(q, 'bind', true, null, 'error'));
								try {
									var r = p.apply(k || null, l.params);
									if (typeof r !== 'undefined') q('result', r);
								} catch (s) {
									h.error(
										'Invokation of RPC method %s resulted in the error: %s',
										l.method,
										s.message
									);
									q('error', {
										code: -32603,
										message: 'Internal error',
										data: s.message
									});
								}
							};
							f.exports = i;
						},
						null
					);
					__d(
						'isFacebookURI',
						[],
						function a(b, c, d, e, f, g) {
							var h = null,
								i = ['http', 'https'];

							function j(k) {
								if (!h) h = new RegExp('(^|\\.)facebook\\.com$', 'i');
								if (k.isEmpty() && k.toString() !== '#') return false;
								if (!k.getDomain() && !k.getProtocol()) return true;
								return (
									ES(i, 'indexOf', true, k.getProtocol()) !== -1 &&
									h.test(k.getDomain())
								);
							}
							j.setRegex = function(k) {
								h = k;
							};
							f.exports = j;
						},
						null
					);
					__d(
						'isInIframe',
						[],
						function a(b, c, d, e, f, g) {
							var h = window != window.top;

							function i() {
								return h;
							}
							f.exports = i;
						},
						18
					);
					__d(
						'isMessengerDotComURI',
						[],
						function a(b, c, d, e, f, g) {
							var h = new RegExp('(^|\\.)messenger\\.com$', 'i'),
								i = ['https'];

							function j(k) {
								if (k.isEmpty() && k.toString() !== '#') return false;
								if (!k.getDomain() && !k.getProtocol()) return false;
								return (
									ES(i, 'indexOf', true, k.getProtocol()) !== -1 &&
									h.test(k.getDomain())
								);
							}
							f.exports = j;
						},
						null
					);
					__d(
						'BrowserExtensions.DesktopBridge',
						[
							'DOMEventListener',
							'JSONRPC',
							'sdk.URI',
							'invariant',
							'isInIframe',
							'isFacebookURI',
							'isMessengerDotComURI'
						],
						function a(b, c, d, e, f, g, h, i, j, k, l, m, n) {
							'use strict';
							var o = 'MESSENGER_EXTENSIONS_RPC:',
								p = void 0,
								q = {
									supported_features: [
										'context',
										'sharing_broadcast',
										'sharing_direct'
									]
								};

							function r() {
								if (!l()) return;
								h.add(window, 'message', y, false);
								var ba = z();
								p = new i(function(ca) {
									parent.postMessage(o + ca, ba);
								});
								p.stub('askPermission');
								p.stub('getContext');
								p.stub('getGrantedPermissions');
								p.stub('requestCloseBrowser');
								p.stub('beginShareFlow');
							}

							function s(ba, ca, da) {
								(p !== null && p !== undefined) || k(0);
								p.remote.askPermission(ba.permission, function(ea) {
									if (ea.result) {
										ca(ea.result);
									} else if (ea.error) da(ea.error.code, ea.error.message);
								});
							}

							function t(ba, ca, da) {
								(p !== null && p !== undefined) || k(0);
								p.remote.beginShareFlow(
									ba.sharing_type,
									ba.content_for_share,
									ba.content_for_preview,
									function(ea) {
										if (ea.result) {
											ca(ea.result);
										} else if (ea.error) da(ea.error.code, ea.error.message);
									}
								);
							}

							function u(ba, ca, da) {
								ca(q);
							}

							function v(ba, ca, da) {
								(p !== null && p !== undefined) || k(0);
								p.remote.getContext(ba.appID, function(ea) {
									if (ea.result) {
										ca(ea.result);
									} else if (ea.error) da(ea.error.code, ea.error.message);
								});
							}

							function w(ba, ca, da) {
								(p !== null && p !== undefined) || k(0);
								p.remote.getGrantedPermissions(function(ea) {
									if (ea.result) {
										ca(ea.result);
									} else if (ea.error) da(ea.error.code, ea.error.message);
								});
							}

							function x(ba, ca, da) {
								(p !== null && p !== undefined) || k(0);
								p.remote.requestCloseBrowser(function(ea) {
									ca();
								});
							}

							function y(event) {
								(p !== null && p !== undefined) || k(0);
								if (
									typeof event.data !== 'string' ||
									!ES(event.data, 'startsWith', true, o)
								)
									return;
								var ba = event.origin || event.originalEvent.origin,
									ca = new j(ba);
								m(ca) || n(ca) || k(0);
								p.read(event.data.substring(o.length));
							}

							function z() {
								var ba = window.location.ancestorOrigins;
								if (ba && ba.length > 0) {
									var ca = new j(ba[ba.length - 1]);
									if (m(ca) || n(ca)) return ca.getOrigin();
								}
								return /messenger/.test(window.name)
									? 'https://www.messenger.com:443'
									: 'https://www.facebook.com:443';
							}
							var aa = {
								init: r,
								askPermission: s,
								beginShareFlow: t,
								getContext: v,
								getSupportedFeatures: u,
								getGrantedPermissions: w,
								requestCloseBrowser: x
							};
							f.exports = aa;
						},
						null
					);
					__d(
						'keyMirror',
						['invariant'],
						function a(b, c, d, e, f, g, h) {
							'use strict';
							var i = function j(k) {
								var l = {},
									m;
								(k instanceof Object && !ES('Array', 'isArray', false, k)) ||
									h(0);
								for (m in k) {
									if (!Object.prototype.hasOwnProperty.call(k, m)) continue;
									l[m] = m;
								}
								return l;
							};
							f.exports = i;
						},
						18
					);
					__d(
						'BrowserExtensions.DeviceTypes',
						['keyMirror'],
						function a(b, c, d, e, f, g, h) {
							'use strict';
							var i = h({
								ANDROID: null,
								IOS: null,
								WEB: null,
								TEST_MODE: null,
								UNKNOWN: null
							});
							i.getDeviceType = function() {
								if (!navigator.userAgent) return i.UNKNOWN;
								if (navigator.userAgent.match(/android/i)) return i.ANDROID;
								if (
									navigator.userAgent.match(/iPhone/) ||
									navigator.userAgent.match(/iPod/) ||
									navigator.userAgent.match(/iPad/)
								)
									return i.IOS;
								if (
									navigator.userAgent.match(/Chrome/) ||
									navigator.userAgent.match(/Firefox/) ||
									navigator.userAgent.match(/Safari/) ||
									navigator.userAgent.match(/MSIE/)
								)
									return i.WEB;
								return i.UNKNOWN;
							};
							f.exports = i;
						},
						null
					);
					__d(
						'sdk.Event',
						[],
						function a(b, c, d, e, f, g) {
							var h = {
								SUBSCRIBE: 'event.subscribe',
								UNSUBSCRIBE: 'event.unsubscribe',
								subscribers: function i() {
									if (!this._subscribersMap) this._subscribersMap = {};
									return this._subscribersMap;
								},
								subscribe: function i(j, k) {
									var l = this.subscribers();
									if (!l[j]) {
										l[j] = [k];
									} else if (ES(l[j], 'indexOf', true, k) == -1) l[j].push(k);
									if (j != this.SUBSCRIBE && j != this.UNSUBSCRIBE)
										this.fire(this.SUBSCRIBE, j, l[j]);
								},
								unsubscribe: function i(j, k) {
									var l = this.subscribers()[j];
									if (l)
										ES(l, 'forEach', true, function(m, n) {
											if (m == k) l.splice(n, 1);
										});
									if (j != this.SUBSCRIBE && j != this.UNSUBSCRIBE)
										this.fire(this.UNSUBSCRIBE, j, l);
								},
								monitor: function i(j, k) {
									if (!k()) {
										var l = this,
											m = function n() {
												if (k.apply(k, arguments)) l.unsubscribe(j, n);
											};
										this.subscribe(j, m);
									}
								},
								clear: function i(j) {
									delete this.subscribers()[j];
								},
								fire: function i(j) {
									var k = Array.prototype.slice.call(arguments, 1),
										l = this.subscribers()[j];
									if (l)
										ES(l, 'forEach', true, function(m) {
											if (m) m.apply(this, k);
										});
								}
							};
							f.exports = h;
						},
						null
					);
					__d(
						'BrowserExtensions',
						[
							'BrowserExtensions.DesktopBridge',
							'BrowserExtensions.DeviceTypes',
							'BrowserExtensions.ErrorHandling',
							'sdk.Event',
							'errorCode',
							'guid'
						],
						function a(b, c, d, e, f, g, h, i, j, k, l, m) {
							'use strict';
							var n = {},
								o = {},
								p = i.getDeviceType(),
								q = null;
							setTimeout(function() {
								q = r();
								if (!q) return;
								window._FBCallbackHandler = s;
								var w = ES('JSON', 'stringify', false, {
									name: '_FBCallbackHandler'
								});
								switch (p) {
									case i.IOS:
										q.initializeCallbackHandler.postMessage(w);
										break;
									case i.ANDROID:
										q.initializeCallbackHandler(w);
										break;
									case i.WEB:
										q.init();
										break;
									default:
										break;
								}
								if (window.extAsyncInit && !window.extAsyncInit.hasRun) {
									window.extAsyncInit.hasRun = true;
									j.unguard(window.extAsyncInit)();
								}
								k.fire('browserExtensions.bridgeReady');
							}, 0);

							function r() {
								switch (p) {
									case i.ANDROID:
										return window._FBExtensions;
									case i.IOS:
										return window.webkit && window.webkit.messageHandlers;
									case i.WEB:
										return window.name === 'facebook_ref' ||
											window.name === 'messenger_ref'
											? h
											: null;
								}
								return null;
							}

							function s(w, x, y) {
								if (o[x] === undefined) return;
								var z = null;
								try {
									if (y) z = ES('JSON', 'parse', false, y);
								} catch (ba) {}
								if (!z) z = {};
								if (w) {
									o[x].success(z);
								} else {
									var aa = z.errorMessage;
									if (!aa) aa = j.getErrorMessage(z.errorCode);
									o[x].error(z.errorCode, aa);
								}
								delete o[x];
							}

							function t(w) {
								ES('Object', 'assign', false, n, w);
							}

							function u(w, x, y, z) {
								if (!q) {
									if (window.MessengerExtensions) {
										y(
											2071011,
											'Messenger Extensions are not enabled - could be ' +
												'"messenger_extensions" was not set on a url, the domain was not ' +
												'whitelisted or this is an outdated version of Messenger client.'
										);
									} else
										y(
											2071011,
											'JavaScript bridge does not exist - Please make sure you are in ' +
												'latest version of Facebook or Messenger App.'
										);
									return;
								}
								if (!(w in q)) {
									if (window.MessengerExtensions) {
										y(
											2071010,
											'This SDK method is not supported on this Messenger client. ' +
												'Please upgrade.'
										);
									} else
										y(
											2071010,
											'The API provided by the SDK is not available on this device.'
										);
									return;
								}
								z.callbackID = m();
								o[z.callbackID] = {
									success: x,
									error: y
								};
								var aa = ES('JSON', 'stringify', false, z);
								switch (p) {
									case i.IOS:
										q[w].postMessage(aa);
										break;
									case i.ANDROID:
										q[w](aa);
										break;
									case i.WEB:
										q[w](z, x, y);
										break;
									default:
										break;
								}
							}

							function v() {
								return n;
							}
							f.exports = {
								provide: t,
								callNativeBridge: u,
								getAPIBridge: r,
								getExternalInterface: v
							};
						},
						null
					);
					__d(
						'legacy:BrowserExtensions.MessengerInterface',
						['BrowserExtensions'],
						function a(b, c, d, e, f, g, h) {
							'use strict';
							window.MessengerExtensions = h.getExternalInterface();
						},
						3
					);
					__d(
						'legacy:BrowserExtensions.getUserID',
						['BrowserExtensions'],
						function a(b, c, d, e, f, g, h) {
							'use strict';
							h.provide({
								getUserID: function i(j, k) {
									h.callNativeBridge(
										'getUserID',
										function(l) {
											return j({
												asid: l.asid !== '0' ? l.asid : null,
												psid: l.psid !== '0' ? l.psid : null
											});
										},
										k,
										{}
									);
								}
							});
						},
						3
					);
					__d(
						'legacy:BrowserExtensions.hasCapability',
						['BrowserExtensions'],
						function a(b, c, d, e, f, g, h) {
							'use strict';
							h.provide({
								hasCapability: function i(j, k, l) {
									h.callNativeBridge(
										'hasCapability',
										function(m) {
											var n = {};
											for (
												var o = ES(l, 'filter', true, function(t) {
														return (t in m);
													}),
													p = ES('Array', 'isArray', false, o),
													q = 0,
													o = p
														? o
														: o[
																typeof Symbol === 'function'
																	? Symbol.iterator
																	: '@@iterator'
														  ]();
												;

											) {
												var r;
												if (p) {
													if (q >= o.length) break;
													r = o[q++];
												} else {
													q = o.next();
													if (q.done) break;
													r = q.value;
												}
												var s = r;
												n[s] = m[s];
											}
											j(n);
										},
										k,
										{
											capabilities: l
										}
									);
								}
							});
						},
						3
					);
					__d(
						'legacy:BrowserExtensions.requestCloseBrowser',
						['BrowserExtensions'],
						function a(b, c, d, e, f, g, h) {
							'use strict';
							h.provide({
								requestCloseBrowser: function i(j, k) {
									h.callNativeBridge('requestCloseBrowser', j, k, {});
								}
							});
						},
						3
					);
					__d(
						'BrowserExtensions.processPayment',
						['BrowserExtensions', 'errorCode'],
						function a(b, c, d, e, f, g, h, i) {
							'use strict';

							function j(k, l, m) {
								h.callNativeBridge(
									'processPayment',
									function(n) {
										return k({
											payment_result: n.payment_result.split('\\n').join('\n')
										});
									},
									function(n, o) {
										if (!n) {
											n = 2071002;
											o =
												'The payment method was declined by the ' +
												'Issuer. Please try another payment method.';
										}
										l(n, o);
									},
									{
										amount: m
									}
								);
							}
							f.exports = j;
						},
						null
					);
					__d(
						'BrowserExtensions.requestAuthorizedPaymentCredentials',
						['BrowserExtensions', 'errorCode'],
						function a(b, c, d, e, f, g, h, i) {
							'use strict';

							function j(k, l, m) {
								h.callNativeBridge(
									'requestAuthorizedCredentials',
									function(n) {
										return k({
											token_card_number: n.token.split('\\n').join('\n'),
											token_cvv: n.cardVerifier.split('\\n').join('\n'),
											token_expiry: n.token_expiry,
											zip_code: n.zip_code
										});
									},
									function(n, o) {
										if (!n) {
											n = 2071002;
											o =
												'The payment method was declined by the ' +
												'Issuer. Please try another payment method.';
										}
										l(n, o);
									},
									{
										amount: '' + m
									}
								);
							}
							f.exports = j;
						},
						null
					);
					__d(
						'BrowserExtensions.requestPaymentCredentials',
						['BrowserExtensions', 'errorCode', 'keyMirror'],
						function a(b, c, d, e, f, g, h, i, j) {
							'use strict';
							var k = j({
								CONTACT_NAME: null,
								CONTACT_EMAIL: null,
								CONTACT_PHONE: null,
								SHIPPING_ADDRESS: null
							});

							function l(n, o, p) {
								if (!(p instanceof Array)) {
									p = null;
								} else if (p)
									for (var q = 0; q < p.length; ++q)
										if (!k[p[q]]) {
											var r = 2071013,
												s = 'Unsupported user info passed in';
											o(r, s);
											return;
										}
								m(n, o, false, p);
							}

							function m(n, o, p, q) {
								h.callNativeBridge(
									'requestCredentials',
									function(r) {
										return n(
											r.name,
											r.email,
											r.cardType,
											r.cardLastFourDigits,
											r.shippingAddress
										);
									},
									function(r, s) {
										if (r === 24002 && !p) {
											m(n, o, true, q);
											return;
										}
										if (!r) {
											r = 2071001;
											s = 'The request declined by the user';
										}
										o(r, s);
									},
									{
										title: 'BrowserExtensionsPayment',
										imageURL: 'https://www.facebook.com/',
										amount: '1',
										requestedUserInfo: q
									}
								);
							}
							f.exports = l;
						},
						null
					);
					__d(
						'legacy:MessengerBrowserExtensions.Payments',
						[
							'BrowserExtensions',
							'BrowserExtensions.processPayment',
							'BrowserExtensions.requestAuthorizedPaymentCredentials',
							'BrowserExtensions.requestPaymentCredentials'
						],
						function a(b, c, d, e, f, g, h, i, j, k) {
							'use strict';
							h.provide({
								requestPaymentCredentials: k,
								requestAuthorizedPaymentCredentials: j,
								processPayment: i
							});
						},
						3
					);
					__d(
						'legacy:MessengerBrowserExtensions.askPermission',
						['BrowserExtensions'],
						function a(b, c, d, e, f, g, h) {
							'use strict';
							h.provide({
								askPermission: function i(j, k, l) {
									h.callNativeBridge(
										'askPermission',
										function(m) {
											return j({
												isGranted:
													m &&
													m.permissions &&
													ES(m.permissions, 'indexOf', true, l) !== -1,
												permissions: m && m.permissions
											});
										},
										k,
										{
											permission: l
										}
									);
								}
							});
						},
						3
					);
					__d(
						'MNPlatformAttachmentType',
						[],
						function a(b, c, d, e, f, g) {
							f.exports = {
								IMAGE: 'image',
								VIDEO: 'video',
								AUDIO: 'audio',
								FILE: 'file',
								LOCATION: 'location',
								TEMPLATE: 'template',
								FALLBACK: 'fallback'
							};
						},
						null
					);
					__d(
						'ads-lib-urllib',
						[],
						function a(b, c, d, e, f, g) {
							function h(o) {
								return l(n.normalize(ES(o, 'trim', true)));
							}
							var i = /^(?:(\w+):)?(?:\/\/([^\/:?#]*)(?::(\d+))?)?([^#?]*)(?:\?([^#]*))?(?:#(.*))?/,
								j = 'invalid.invalid';

							function k(o) {
								var p = new RegExp(
									'[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f' +
										'\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF' +
										'\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]'
								);
								if (p.test(o)) {
									return j;
								} else return o;
							}

							function l(o) {
								var p = ES(o.toString(), 'trim', true).match(i) || [],
									q = {
										protocol: p[1] || '',
										domain: k(p[2] || ''),
										port: p[3] || '',
										path: p[4] || '',
										query_s: p[5] || '',
										fragment: p[6] || ''
									};
								if (!q.domain && ES(q.path, 'indexOf', true, '\\') !== -1)
									return {};
								var r = new RegExp(
									'^(?:[^/]*:|' + '[\\x00-\\x1f]*/[\\x00-\\x1f]*/)'
								);
								if (!q.protocol && r.test(o.toString())) return {};
								return q;
							}

							function m(o) {
								var p = '';
								o.protocol && (p += o.protocol + '://');
								o.domain && (p += o.domain);
								o.port && (p += ':' + o.port);
								if (o.domain && !o.path) p += '/';
								o.path && (p += o.path);
								o.query_s && (p += '?' + o.query_s);
								o.fragment && (p += '#' + o.fragment);
								return p;
							}
							var n = {
								normalize: function o(p) {
									if (!p) return p;
									var q = l(p);
									if (!q.protocol) q.protocol = 'http';
									return m(q);
								},
								isUrlSimple: function o(p) {
									var q = ES(p, 'trim', true).split('.');
									return (
										q.length > 1 &&
										ES(q, 'filter', true, function(r) {
											return !r;
										}).length === 0
									);
								},
								isUrl: function o(p) {
									if (!p) return false;
									var q = h(p);
									return !!(
										q.domain &&
										q.domain !== j &&
										n.isUrlSimple(q.domain)
									);
								},
								isPotentialUrl: function o(p) {
									if (!p) return true;
									var q = h(p);
									return !!(q.domain && q.domain !== j);
								},
								getDomain: function o(p) {
									if (!p) return null;
									var q = h(p);
									return q.domain && q.domain !== j ? q.domain : null;
								}
							};
							f.exports = n;
						},
						null
					);
					__d(
						'legacy:MessengerBrowserExtensions.beginShareFlow',
						[
							'BrowserExtensions',
							'errorCode',
							'keyMirror',
							'MNPlatformAttachmentType',
							'ads-lib-urllib'
						],
						function a(b, c, d, e, f, g, h, i, j, k, l) {
							'use strict';
							var m = 'broadcast',
								n = 'current_thread',
								o = 'm.me',
								p = 'open_graph',
								q = j({
									content_for_preview: null,
									content_for_share: null,
									sharing_type: null
								}),
								r = j({
									attachment: null
								}),
								s = j({
									title: null,
									subtitle: null,
									image_url: null,
									item_url: null,
									button_title: null,
									button_url: null
								}),
								t = j({
									type: null,
									payload: null
								}),
								u = j({
									preview_type: null,
									title: null,
									subtitle: null,
									image_url: null,
									item_url: null,
									open_graph_url: null,
									button_url: null,
									button_title: null,
									target_display: null
								});

							function v(z, aa) {
								if (!z) {
									aa(
										2071014,
										'Invalid MessageContent provided to SDK API call'
									);
									return false;
								}
								var ba = z[s.title],
									ca = z[s.subtitle],
									da = z[s.image_url],
									ea = z[s.item_url],
									fa = z[s.button_url],
									ga = z[s.button_title];
								if (!ba || typeof ba !== 'string') {
									aa(
										2071015,
										'Invalid title string provided in message content'
									);
									return false;
								}
								if (ca && typeof ca !== 'string') {
									aa(
										2071016,
										'Invalid subtitle string provided in message content'
									);
									return false;
								}
								if ((da && typeof da !== 'string') || (da && !l.isUrl(da))) {
									aa(2071017, 'Invalid image URL provided in message content');
									return false;
								}
								if ((ea && typeof ea !== 'string') || (ea && !l.isUrl(ea))) {
									aa(2071018, 'Invalid item URL provided in message content');
									return false;
								}
								if (
									(fa && typeof fa !== 'string') ||
									(ga && typeof ga !== 'string') ||
									(fa && !l.isUrl(fa)) ||
									(!fa && ga) ||
									(fa && !ga)
								) {
									aa(
										2071019,
										'Invalid button data provided in message content'
									);
									return false;
								}
								if (!fa && !ea) {
									aa(
										2071020,
										'URL data is missing in message content. ' +
											'Please provide item_url, button_url or both'
									);
									return false;
								}
								return true;
							}

							function w(z, aa, ba) {
								var ca = {};
								if (!z) {
									//ba(2071014, 'Invalid MessageContent provided to SDK API call');
									return null;
								}
								if (aa !== m && aa !== n) {
									//ba(2071021, 'Invalid Sharing Type provided to SDK API call ');
									return null;
								}
								var da = z[r.attachment];
								if (!da) {
									//ba(2071022, 'Invalid attachment in MessageContent provided to SDK API call');
									return null;
								}
								var ea = da[t.type],
									fa = da[t.payload];
								if (ea !== k.TEMPLATE && ea !== k.IMAGE) {
									//ba(2071023, 'Invalid attachment type in MessageContent provided to SDK API call');
									return null;
								}
								if (!fa) {
									//ba(2071024, 'Invalid payload in MessageContent provided to SDK API call');
									return null;
								}
								if (ea === k.IMAGE) {
									var ga = fa.url;
									if (!ga || typeof ga !== 'string' || !l.isUrl(ga)) {
										//ba(2071017, 'Invalid image URL provided in message content');
										return null;
									}
									ca[u.image_url] = ga;
									return ca;
								}
								var ha = fa.template_type;
								if (ha !== 'generic' && ha !== p) {
									//ba(2071024, 'Invalid template type in MessageContent provided to SDK API call');
									return null;
								}
								var ia = fa.elements;
								if (!ia || !ia instanceof Array || ia.length > 1) {
									//ba(2071024, 'Invalid payload elements in MessageContent provided to SDK API call');
									return null;
								}
								var ja = ia[0],
									ka = ja.title;
								if (!ka && ha !== p) {
									//ba(2071024, 'Invalid element title in MessageContent provided to SDK API call');
									return null;
								}
								var la = null;
								if (ha === p) {
									var ma = ja.url;
									if (typeof ma !== 'string' || !l.isUrl(ma)) {
										//ba(2071025, 'Invalid open graph url provided in message content');
										return null;
									}
									ca[u.open_graph_url] = ma;
									la = ma;
									ca[u.preview_type] = 'OPEN_GRAPH';
								} else ca[u.preview_type] = 'DEFAULT';
								var na = ja.image_url;
								if ((na && typeof na !== 'string') || (na && !l.isUrl(na))) {
									//ba(2071017, 'Invalid image URL provided in message content');
									return null;
								}
								ca[u.title] = ja.title;
								ca[u.subtitle] = ja.subtitle;
								ca[u.image_url] = ja.image_url;
								var oa = ja.default_action;
								if (oa) {
									if (oa.type !== 'web_url' || !oa.url) {
										//ba(2071024, 'Invalid default action in MessageContent provided to SDK API call');
										return null;
									}
									la = oa.url;
									if ((la && typeof la !== 'string') || (la && !l.isUrl(la))) {
										//ba(2071024, 'Invalid default_action URL provided in message content');
										return null;
									}
								}
								ca[u.item_url] = la;
								var pa = ja.buttons,
									qa = null,
									ra = null;
								if (pa) {
									if (!(pa instanceof Array) || pa.length > 1) {
										//ba(2071024, 'Invalid payload buttons in MessageContent provided to SDK API call');
										return null;
									}
									var sa = pa[0],
										ta = sa.type;
									if (!ta || ta !== 'web_url') {
										//ba(2071024, 'Invalid button type in MessageContent provided to SDK API call');
										return null;
									}
									qa = sa.title;
									if (!qa) {
										//ba(2071024, 'Invalid payload button title in MessageContent provided to SDK API call');
										return null;
									}
									ra = sa.url;
									if ((ra && typeof ra !== 'string') || (ra && !l.isUrl(ra))) {
										//ba(2071024, 'Invalid button URL provided in message content');
										return null;
									}
								}
								ca[u.button_title] = qa;
								ca[u.button_url] = ra;
								ca[u.target_display] = x(qa, ra, la);
								return ca;
							}

							function x(z, aa, ba) {
								var ca = y(ba),
									da = y(aa);
								if (!z || !da) return ca;
								var ea = da || ca;
								if (ea) return z + ' - ' + ea;
								return null;
							}

							function y(z) {
								if (!z) return null;
								var aa = l.getDomain(z);
								if (!aa) return null;
								if (aa && aa.toLowerCase() === o) {
									var ba = z.substring(ES(z, 'indexOf', true, o));
									ba = ba.split('?')[0];
									var ca = ba.split('/');
									if (ca.length > 1) {
										var da = ca[1];
										if (da !== '') return '@' + da.toLowerCase();
									}
								}
								return aa;
							}
							h.provide({
								beginShareFlow: function z(aa, ba, ca, da) {
									var ea = w(ca, da, ba);
									if (!ea) return;
									var fa = {};
									fa[q.content_for_share] = ES('JSON', 'stringify', false, ca);
									fa[q.content_for_preview] = ea;
									fa[q.sharing_type] = da;
									h.callNativeBridge(
										'beginShareFlow',
										function(ga) {
											ga.is_sent = ga.is_sent === 'true' || ga.is_sent === true;
											aa(ga);
										},
										ba,
										fa
									);
								}
							});
						},
						3
					);
					__d(
						'legacy:MessengerBrowserExtensions.getContext',
						['BrowserExtensions'],
						function a(b, c, d, e, f, g, h) {
							'use strict';
							h.provide({
								getContext: function i(j, k, l) {
									h.callNativeBridge('getContext', k, l, {
										appID: j
									});
								}
							});
						},
						3
					);
					__d(
						'legacy:MessengerBrowserExtensions.getGrantedPermissions',
						['BrowserExtensions'],
						function a(b, c, d, e, f, g, h) {
							'use strict';
							h.provide({
								getGrantedPermissions: function i(j, k) {
									h.callNativeBridge('getGrantedPermissions', j, k, {});
								}
							});
						},
						3
					);
					__d(
						'legacy:MessengerBrowserExtensions.getSupportedFeatures',
						['BrowserExtensions'],
						function a(b, c, d, e, f, g, h) {
							'use strict';
							h.provide({
								getSupportedFeatures: function i(j, k) {
									h.callNativeBridge('getSupportedFeatures', j, k, {});
								}
							});
						},
						3
					);
					__d(
						'legacy:MessengerBrowserExtensions.getThreadContext',
						['BrowserExtensions'],
						function a(b, c, d, e, f, g, h) {
							'use strict';
							h.provide({
								getThreadContext: function i(j, k) {
									h.callNativeBridge('getThreadContext', j, k, {});
								}
							});
						},
						3
					);
					__d(
						'legacy:MessengerBrowserExtensions.isInExtension',
						['BrowserExtensions'],
						function a(b, c, d, e, f, g, h) {
							'use strict';
							h.provide({
								isInExtension: function i() {
									return h.getAPIBridge() !== null;
								}
							});
						},
						3
					);
					__d(
						'legacy:MessengerBrowserExtensions.purchaseComplete',
						['BrowserExtensions'],
						function a(b, c, d, e, f, g, h) {
							'use strict';
							h.provide({
								purchaseComplete: function i(j, k, l) {
									h.callNativeBridge(
										'purchaseComplete',
										function() {
											return j();
										},
										k,
										{
											amount: l
										}
									);
								}
							});
						},
						3
					);
					__d(
						'legacy:MessengerBrowserExtensions.resetCart',
						['BrowserExtensions'],
						function a(b, c, d, e, f, g, h) {
							'use strict';
							h.provide({
								resetCart: function i(j, k) {
									h.callNativeBridge(
										'resetCart',
										function() {
											return j();
										},
										k,
										{}
									);
								}
							});
						},
						3
					);
					__d(
						'legacy:MessengerBrowserExtensions.updateCart',
						['BrowserExtensions'],
						function a(b, c, d, e, f, g, h) {
							'use strict';
							h.provide({
								updateCart: function i(j, k, l, m, n) {
									h.callNativeBridge(
										'updateCart',
										function(o) {
											return j();
										},
										k,
										{
											itemCount: l,
											cartURL: m,
											expiry: n
										}
									);
								}
							});
						},
						3
					);
				}
			}.call(global));
		})(window.inDapIF ? parent.window : window, window);
} catch (e) {
	new Image().src =
		'https://www.facebook.com/' +
		'common/scribe_endpoint.php?c=jssdk_error&m=' +
		encodeURIComponent(
			'{"error":"LOAD", "extra": {"name":"' +
				e.name +
				'","line":"' +
				(e.lineNumber || e.line) +
				'","script":"' +
				(e.fileName || e.sourceURL || e.script) +
				'","stack":"' +
				(e.stackTrace || e.stack) +
				'","revision":"3023720","namespace":"MessengerExtensions","message":"' +
				e.message +
				'"}}'
		);
}
