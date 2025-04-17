!(function (e, t) {
	"object" == typeof exports && "undefined" != typeof module
		? (module.exports = t())
		: "function" == typeof define && define.amd
		? define(t)
		: ((e = e || self).ScrollReveal = t());
})(this, function () {
	"use strict";
	var e = {
		delay: 0,
		distance: "0",
		duration: 600,
		easing: "cubic-bezier(0.5, 0, 0, 1)",
		interval: 0,
		opacity: 0,
		origin: "bottom",
		rotate: { x: 0, y: 0, z: 0 },
		scale: 1,
		cleanup: !1,
		container: document.documentElement,
		desktop: !0,
		mobile: !0,
		reset: !1,
		useDelay: "always",
		viewFactor: 0,
		viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
		afterReset: function () {},
		afterReveal: function () {},
		beforeReset: function () {},
		beforeReveal: function () {},
	};
	var t = {
		success: function () {
			document.documentElement.classList.add("sr"),
				document.body
					? (document.body.style.height = "100%")
					: document.addEventListener("DOMContentLoaded", function () {
							document.body.style.height = "100%";
					  });
		},
		failure: function () {
			return (
				document.documentElement.classList.remove("sr"),
				{ reveal: function () {} }
			);
		},
	};
	function n(e) {
		return "object" == typeof window.Node
			? e instanceof window.Node
			: null !== e &&
					"object" == typeof e &&
					"number" == typeof e.nodeType &&
					"string" == typeof e.nodeName;
	}
	function i(e, t) {
		if ((void 0 === t && (t = document), e instanceof Array))
			return e.filter(n);
		if (n(e)) return [e];
		if (
			((i = e),
			(r = Object.prototype.toString.call(i)),
			"object" == typeof window.NodeList
				? i instanceof window.NodeList
				: null !== i &&
				  "object" == typeof i &&
				  "number" == typeof i.length &&
				  /^\[object (HTMLCollection|NodeList|Object)\]$/.test(r) &&
				  (0 === i.length || n(i[0])))
		)
			return Array.prototype.slice.call(e);
		var i, r;
		if ("string" == typeof e)
			try {
				var o = t.querySelectorAll(e);
				return Array.prototype.slice.call(o);
			} catch (e) {
				return [];
			}
		return [];
	}
	function r(e) {
		return (
			null !== e &&
			e instanceof Object &&
			(e.constructor === Object ||
				"[object Object]" === Object.prototype.toString.call(e))
		);
	}
	function o(e, t) {
		if (r(e))
			return Object.keys(e).forEach(function (n) {
				return t(e[n], n, e);
			});
		if (e instanceof Array)
			return e.forEach(function (n, i) {
				return t(n, i, e);
			});
		throw new TypeError("Expected either an array or object literal.");
	}
	function a(e) {
		for (var t = [], n = arguments.length - 1; n-- > 0; )
			t[n] = arguments[n + 1];
		if (this.constructor.debug && console) {
			var i = "%cScrollReveal: " + e;
			t.forEach(function (e) {
				return (i += "\n — " + e);
			}),
				console.log(i, "color: #ea654b;");
		}
	}
	function s() {
		var e = this,
			t = { active: [], stale: [] },
			n = { active: [], stale: [] },
			r = { active: [], stale: [] };
		try {
			o(i("[data-sr-id]"), function (e) {
				var n = parseInt(e.getAttribute("data-sr-id"));
				t.active.push(n);
			});
		} catch (e) {
			throw e;
		}
		o(this.store.elements, function (e) {
			-1 === t.active.indexOf(e.id) && t.stale.push(e.id);
		}),
			o(t.stale, function (t) {
				return delete e.store.elements[t];
			}),
			o(this.store.elements, function (e) {
				-1 === r.active.indexOf(e.containerId) && r.active.push(e.containerId),
					e.hasOwnProperty("sequence") &&
						-1 === n.active.indexOf(e.sequence.id) &&
						n.active.push(e.sequence.id);
			}),
			o(this.store.containers, function (e) {
				-1 === r.active.indexOf(e.id) && r.stale.push(e.id);
			}),
			o(r.stale, function (t) {
				var n = e.store.containers[t].node;
				n.removeEventListener("scroll", e.delegate),
					n.removeEventListener("resize", e.delegate),
					delete e.store.containers[t];
			}),
			o(this.store.sequences, function (e) {
				-1 === n.active.indexOf(e.id) && n.stale.push(e.id);
			}),
			o(n.stale, function (t) {
				return delete e.store.sequences[t];
			});
	}
	function c(e) {
		if (e.constructor !== Array) throw new TypeError("Expected array.");
		if (16 === e.length) return e;
		if (6 === e.length) {
			var t = l();
			return (
				(t[0] = e[0]),
				(t[1] = e[1]),
				(t[4] = e[2]),
				(t[5] = e[3]),
				(t[12] = e[4]),
				(t[13] = e[5]),
				t
			);
		}
		throw new RangeError("Expected array with either 6 or 16 values.");
	}
	function l() {
		for (var e = [], t = 0; t < 16; t++) t % 5 == 0 ? e.push(1) : e.push(0);
		return e;
	}
	function u(e, t) {
		for (var n = c(e), i = c(t), r = [], o = 0; o < 4; o++)
			for (var a = [n[o], n[o + 4], n[o + 8], n[o + 12]], s = 0; s < 4; s++) {
				var l = 4 * s,
					u = [i[l], i[l + 1], i[l + 2], i[l + 3]],
					d = a[0] * u[0] + a[1] * u[1] + a[2] * u[2] + a[3] * u[3];
				r[o + l] = d;
			}
		return r;
	}
	function d(e) {
		if ("string" == typeof e) {
			var t = e.match(/matrix(3d)?\(([^)]+)\)/);
			if (t) return c(t[2].split(", ").map(parseFloat));
		}
		return l();
	}
	function f(e, t) {
		var n = l();
		return (n[0] = e), (n[5] = "number" == typeof t ? t : e), n;
	}
	var h = (function () {
		var e = {},
			t = document.documentElement.style;
		function n(n, i) {
			if ((void 0 === i && (i = t), n && "string" == typeof n)) {
				if (e[n]) return e[n];
				if ("string" == typeof i[n]) return (e[n] = n);
				if ("string" == typeof i["-webkit-" + n])
					return (e[n] = "-webkit-" + n);
				throw new RangeError('Unable to find "' + n + '" style property.');
			}
			throw new TypeError("Expected a string.");
		}
		return (
			(n.clearCache = function () {
				return (e = {});
			}),
			n
		);
	})();
	function p(e) {
		var t = window.getComputedStyle(e.node),
			n = t.position,
			i = e.config,
			r = {},
			o =
				(e.node.getAttribute("style") || "").match(/[\w-]+\s*:\s*[^;]+\s*/gi) ||
				[];
		(r.computed = o
			? o
					.map(function (e) {
						return e.trim();
					})
					.join("; ") + ";"
			: ""),
			(r.generated = o.some(function (e) {
				return e.match(/visibility\s?:\s?visible/i);
			})
				? r.computed
				: o
						.concat(["visibility: visible"])
						.map(function (e) {
							return e.trim();
						})
						.join("; ") + ";");
		var a,
			s,
			c,
			p = parseFloat(t.opacity),
			m = isNaN(parseFloat(i.opacity))
				? parseFloat(t.opacity)
				: parseFloat(i.opacity),
			v = {
				computed: p !== m ? "opacity: " + p + ";" : "",
				generated: p !== m ? "opacity: " + m + ";" : "",
			},
			y = [];
		if (parseFloat(i.distance)) {
			var g = "top" === i.origin || "bottom" === i.origin ? "Y" : "X",
				b = i.distance;
			("top" !== i.origin && "left" !== i.origin) ||
				(b = /^-/.test(b) ? b.substr(1) : "-" + b);
			var w = b.match(/(^-?\d+\.?\d?)|(em$|px$|%$)/g),
				E = w[0];
			switch (w[1]) {
				case "em":
					b = parseInt(t.fontSize) * E;
					break;
				case "px":
					b = E;
					break;
				case "%":
					b =
						"Y" === g
							? (e.node.getBoundingClientRect().height * E) / 100
							: (e.node.getBoundingClientRect().width * E) / 100;
					break;
				default:
					throw new RangeError("Unrecognized or missing distance unit.");
			}
			"Y" === g
				? y.push(
						(function (e) {
							var t = l();
							return (t[13] = e), t;
						})(b)
				  )
				: y.push(
						(function (e) {
							var t = l();
							return (t[12] = e), t;
						})(b)
				  );
		}
		i.rotate.x &&
			y.push(
				((a = i.rotate.x),
				(s = (Math.PI / 180) * a),
				((c = l())[5] = c[10] = Math.cos(s)),
				(c[6] = c[9] = Math.sin(s)),
				(c[9] *= -1),
				c)
			),
			i.rotate.y &&
				y.push(
					(function (e) {
						var t = (Math.PI / 180) * e,
							n = l();
						return (
							(n[0] = n[10] = Math.cos(t)),
							(n[2] = n[8] = Math.sin(t)),
							(n[2] *= -1),
							n
						);
					})(i.rotate.y)
				),
			i.rotate.z &&
				y.push(
					(function (e) {
						var t = (Math.PI / 180) * e,
							n = l();
						return (
							(n[0] = n[5] = Math.cos(t)),
							(n[1] = n[4] = Math.sin(t)),
							(n[4] *= -1),
							n
						);
					})(i.rotate.z)
				),
			1 !== i.scale && (0 === i.scale ? y.push(f(2e-4)) : y.push(f(i.scale)));
		var j = {};
		if (y.length) {
			(j.property = h("transform")),
				(j.computed = { raw: t[j.property], matrix: d(t[j.property]) }),
				y.unshift(j.computed.matrix);
			var T = y.reduce(u);
			j.generated = {
				initial: j.property + ": matrix3d(" + T.join(", ") + ");",
				final: j.property + ": matrix3d(" + j.computed.matrix.join(", ") + ");",
			};
		} else j.generated = { initial: "", final: "" };
		var x = {};
		if (v.generated || j.generated.initial) {
			(x.property = h("transition")),
				(x.computed = t[x.property]),
				(x.fragments = []);
			var k = i.delay,
				O = i.duration,
				R = i.easing;
			v.generated &&
				x.fragments.push({
					delayed: "opacity " + O / 1e3 + "s " + R + " " + k / 1e3 + "s",
					instant: "opacity " + O / 1e3 + "s " + R + " 0s",
				}),
				j.generated.initial &&
					x.fragments.push({
						delayed:
							j.property + " " + O / 1e3 + "s " + R + " " + k / 1e3 + "s",
						instant: j.property + " " + O / 1e3 + "s " + R + " 0s",
					}),
				x.computed &&
					!x.computed.match(/all 0s|none 0s/) &&
					x.fragments.unshift({ delayed: x.computed, instant: x.computed });
			var q = x.fragments.reduce(
				function (e, t, n) {
					return (
						(e.delayed += 0 === n ? t.delayed : ", " + t.delayed),
						(e.instant += 0 === n ? t.instant : ", " + t.instant),
						e
					);
				},
				{ delayed: "", instant: "" }
			);
			x.generated = {
				delayed: x.property + ": " + q.delayed + ";",
				instant: x.property + ": " + q.instant + ";",
			};
		} else x.generated = { delayed: "", instant: "" };
		return { inline: r, opacity: v, position: n, transform: j, transition: x };
	}
	function m(e, t) {
		t.split(";").forEach(function (t) {
			var n = t.split(":"),
				i = n[0],
				r = n.slice(1);
			i && r && (e.style[i.trim()] = r.join(":"));
		});
	}
	function v(e) {
		for (var t = [], n = arguments.length - 1; n-- > 0; )
			t[n] = arguments[n + 1];
		if (r(e))
			return (
				o(t, function (t) {
					o(t, function (t, n) {
						r(t) ? ((e[n] && r(e[n])) || (e[n] = {}), v(e[n], t)) : (e[n] = t);
					});
				}),
				e
			);
		throw new TypeError("Target must be an object literal.");
	}
	function y(e) {
		return (
			void 0 === e && (e = navigator.userAgent),
			/Android|iPhone|iPad|iPod/i.test(e)
		);
	}
	var g,
		b =
			((g = 0),
			function () {
				return g++;
			});
	function w() {
		var e = this;
		s.call(this),
			o(this.store.elements, function (e) {
				var t = [e.styles.inline.generated];
				e.visible
					? (t.push(e.styles.opacity.computed),
					  t.push(e.styles.transform.generated.final),
					  (e.revealed = !0))
					: (t.push(e.styles.opacity.generated),
					  t.push(e.styles.transform.generated.initial),
					  (e.revealed = !1)),
					m(
						e.node,
						t
							.filter(function (e) {
								return "" !== e;
							})
							.join(" ")
					);
			}),
			o(this.store.containers, function (t) {
				var n = t.node === document.documentElement ? window : t.node;
				n.addEventListener("scroll", e.delegate),
					n.addEventListener("resize", e.delegate);
			}),
			this.delegate(),
			(this.initTimeout = null);
	}
	function E(e, t) {
		void 0 === t && (t = {});
		var n = t.pristine || this.pristine,
			i =
				"always" === e.config.useDelay ||
				("onload" === e.config.useDelay && n) ||
				("once" === e.config.useDelay && !e.seen),
			r = e.visible && !e.revealed,
			o = !e.visible && e.revealed && e.config.reset;
		return t.reveal || r
			? j.call(this, e, i)
			: t.reset || o
			? T.call(this, e)
			: void 0;
	}
	function j(e, t) {
		var n = [
			e.styles.inline.generated,
			e.styles.opacity.computed,
			e.styles.transform.generated.final,
		];
		t
			? n.push(e.styles.transition.generated.delayed)
			: n.push(e.styles.transition.generated.instant),
			(e.revealed = e.seen = !0),
			m(
				e.node,
				n
					.filter(function (e) {
						return "" !== e;
					})
					.join(" ")
			),
			x.call(this, e, t);
	}
	function T(e) {
		var t = [
			e.styles.inline.generated,
			e.styles.opacity.generated,
			e.styles.transform.generated.initial,
			e.styles.transition.generated.instant,
		];
		(e.revealed = !1),
			m(
				e.node,
				t
					.filter(function (e) {
						return "" !== e;
					})
					.join(" ")
			),
			x.call(this, e);
	}
	function x(e, t) {
		var n = this,
			i = t ? e.config.duration + e.config.delay : e.config.duration,
			r = e.revealed ? e.config.beforeReveal : e.config.beforeReset,
			o = e.revealed ? e.config.afterReveal : e.config.afterReset,
			a = 0;
		e.callbackTimer &&
			((a = Date.now() - e.callbackTimer.start),
			window.clearTimeout(e.callbackTimer.clock)),
			r(e.node),
			(e.callbackTimer = {
				start: Date.now(),
				clock: window.setTimeout(function () {
					o(e.node),
						(e.callbackTimer = null),
						e.revealed &&
							!e.config.reset &&
							e.config.cleanup &&
							clean.call(n, e.node);
				}, i - a),
			});
	}
	function k(e, t) {
		if (
			(void 0 === t && (t = this.pristine),
			!e.visible && e.revealed && e.config.reset)
		)
			return E.call(this, e, { reset: !0 });
		var n = this.store.sequences[e.sequence.id],
			i = e.sequence.index;
		if (n) {
			var r = new R(n, "visible", this.store),
				o = new R(n, "revealed", this.store);
			if (((n.models = { visible: r, revealed: o }), !o.body.length)) {
				var a = n.members[r.body[0]],
					s = this.store.elements[a];
				if (s)
					return (
						q.call(this, n, r.body[0], -1, t),
						q.call(this, n, r.body[0], 1, t),
						E.call(this, s, { reveal: !0, pristine: t })
					);
			}
			if (
				!n.blocked.head &&
				i === [].concat(o.head).pop() &&
				i >= [].concat(r.body).shift()
			)
				return (
					q.call(this, n, i, -1, t),
					E.call(this, e, { reveal: !0, pristine: t })
				);
			if (
				!n.blocked.foot &&
				i === [].concat(o.foot).shift() &&
				i <= [].concat(r.body).pop()
			)
				return (
					q.call(this, n, i, 1, t), E.call(this, e, { reveal: !0, pristine: t })
				);
		}
	}
	function O(e) {
		var t = Math.abs(e);
		if (isNaN(t)) throw new RangeError("Invalid sequence interval.");
		(this.id = b()),
			(this.interval = Math.max(t, 16)),
			(this.members = []),
			(this.models = {}),
			(this.blocked = { head: !1, foot: !1 });
	}
	function R(e, t, n) {
		var i = this;
		(this.head = []),
			(this.body = []),
			(this.foot = []),
			o(e.members, function (e, r) {
				var o = n.elements[e];
				o && o[t] && i.body.push(r);
			}),
			this.body.length &&
				o(e.members, function (e, r) {
					var o = n.elements[e];
					o && !o[t] && (r < i.body[0] ? i.head.push(r) : i.foot.push(r));
				});
	}
	function q(e, t, n, i) {
		var r = this,
			o = ["head", null, "foot"][1 + n],
			a = e.members[t + n],
			s = this.store.elements[a];
		(e.blocked[o] = !0),
			setTimeout(function () {
				(e.blocked[o] = !1), s && k.call(r, s, i);
			}, e.interval);
	}
	function M(t, n, r) {
		var s = this;
		void 0 === n && (n = {}), void 0 === r && (r = !1);
		var c,
			l = [],
			u = n.interval || e.interval;
		try {
			u && (c = new O(u));
			var d = i(t);
			if (!d.length) throw new Error("Invalid reveal target.");
			var f = d.reduce(function (e, t) {
				var r = {},
					a = t.getAttribute("data-sr-id");
				a
					? (v(r, s.store.elements[a]), m(r.node, r.styles.inline.computed))
					: ((r.id = b()),
					  (r.node = t),
					  (r.seen = !1),
					  (r.revealed = !1),
					  (r.visible = !1));
				var u = v({}, r.config || s.defaults, n);
				if ((!u.mobile && y()) || (!u.desktop && !y()))
					return a && clean.call(s, r), e;
				var d,
					f = i(u.container)[0];
				if (!f) throw new Error("Invalid container.");
				return f.contains(t)
					? ((d = (function (e) {
							var t = [],
								n = arguments.length - 1;
							for (; n-- > 0; ) t[n] = arguments[n + 1];
							var i = null;
							return (
								o(t, function (t) {
									o(t, function (t) {
										null === i && t.node === e && (i = t.id);
									});
								}),
								i
							);
					  })(f, l, s.store.containers)),
					  null === d && ((d = b()), l.push({ id: d, node: f })),
					  (r.config = u),
					  (r.containerId = d),
					  (r.styles = p(r)),
					  c &&
							((r.sequence = { id: c.id, index: c.members.length }),
							c.members.push(r.id)),
					  e.push(r),
					  e)
					: e;
			}, []);
			o(f, function (e) {
				(s.store.elements[e.id] = e), e.node.setAttribute("data-sr-id", e.id);
			});
		} catch (e) {
			return a.call(this, "Reveal failed.", e.message);
		}
		o(l, function (e) {
			s.store.containers[e.id] = { id: e.id, node: e.node };
		}),
			c && (this.store.sequences[c.id] = c),
			!0 !== r &&
				(this.store.history.push({ target: t, options: n }),
				this.initTimeout && window.clearTimeout(this.initTimeout),
				(this.initTimeout = window.setTimeout(w.bind(this), 0)));
	}
	var A,
		I,
		L,
		N,
		P,
		F,
		z =
			Math.sign ||
			function (e) {
				return (e > 0) - (e < 0) || +e;
			},
		D =
			((A = Date.now()),
			function (e) {
				var t = Date.now();
				t - A > 16
					? ((A = t), e(t))
					: setTimeout(function () {
							return D(e);
					  }, 0);
			}),
		S =
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			D;
	function C(e, t) {
		var n = t ? e.node.clientHeight : e.node.offsetHeight,
			i = t ? e.node.clientWidth : e.node.offsetWidth,
			r = 0,
			o = 0,
			a = e.node;
		do {
			isNaN(a.offsetTop) || (r += a.offsetTop),
				isNaN(a.offsetLeft) || (o += a.offsetLeft),
				(a = a.offsetParent);
		} while (a);
		return {
			bounds: { top: r, right: o + i, bottom: r + n, left: o },
			height: n,
			width: i,
		};
	}
	function W(e) {
		var t, n;
		return (
			e.node === document.documentElement
				? ((t = window.pageYOffset), (n = window.pageXOffset))
				: ((t = e.node.scrollTop), (n = e.node.scrollLeft)),
			{ top: t, left: n }
		);
	}
	function Y(e) {
		void 0 === e && (e = {});
		var t = this.store.containers[e.containerId];
		if (t) {
			var n = Math.max(0, Math.min(1, e.config.viewFactor)),
				i = e.config.viewOffset,
				r = e.geometry.bounds.top + e.geometry.height * n,
				o = e.geometry.bounds.right - e.geometry.width * n,
				a = e.geometry.bounds.bottom - e.geometry.height * n,
				s = e.geometry.bounds.left + e.geometry.width * n,
				c = t.geometry.bounds.top + t.scroll.top + i.top,
				l = t.geometry.bounds.right + t.scroll.left - i.right,
				u = t.geometry.bounds.bottom + t.scroll.top - i.bottom,
				d = t.geometry.bounds.left + t.scroll.left + i.left;
			return (
				(r < u && o > d && a > c && s < l) || "fixed" === e.styles.position
			);
		}
	}
	function $(e, t) {
		var n = this;
		void 0 === e && (e = { type: "init" }),
			void 0 === t && (t = this.store.elements),
			S(function () {
				var i = "init" === e.type || "resize" === e.type;
				o(n.store.containers, function (e) {
					i && (e.geometry = C.call(n, e, !0));
					var t = W.call(n, e);
					e.scroll &&
						(e.direction = {
							x: z(t.left - e.scroll.left),
							y: z(t.top - e.scroll.top),
						}),
						(e.scroll = t);
				}),
					o(t, function (e) {
						(i || void 0 === e.geometry) && (e.geometry = C.call(n, e)),
							(e.visible = Y.call(n, e));
					}),
					o(t, function (e) {
						e.sequence ? k.call(n, e) : E.call(n, e);
					}),
					(n.pristine = !1);
			});
	}
	function H(n) {
		var r;
		if (
			(void 0 === n && (n = {}),
			void 0 === this || Object.getPrototypeOf(this) !== H.prototype)
		)
			return new H(n);
		if (!H.isSupported())
			return (
				a.call(this, "Instantiation failed.", "This browser is not supported."),
				t.failure()
			);
		try {
			r = v({}, N || e, n);
		} catch (e) {
			return a.call(this, "Invalid configuration.", e.message), t.failure();
		}
		try {
			if (!i(r.container)[0]) throw new Error("Invalid container.");
		} catch (e) {
			return a.call(this, e.message), t.failure();
		}
		return (!(N = r).mobile && y()) || (!N.desktop && !y())
			? (a.call(
					this,
					"This device is disabled.",
					"desktop: " + N.desktop,
					"mobile: " + N.mobile
			  ),
			  t.failure())
			: (t.success(),
			  (this.store = {
					containers: {},
					elements: {},
					history: [],
					sequences: {},
			  }),
			  (this.pristine = !0),
			  (I = I || $.bind(this)),
			  (L = L || M.bind(this)),
			  Object.defineProperty(this, "delegate", {
					get: function () {
						return I;
					},
			  }),
			  Object.defineProperty(this, "reveal", {
					get: function () {
						return L;
					},
			  }),
			  Object.defineProperty(this, "defaults", {
					get: function () {
						return N;
					},
			  }),
			  F || (F = this));
	}
	return (
		(H.isSupported = function () {
			return (
				(function () {
					var e = document.documentElement.style;
					return "transform" in e || "WebkitTransform" in e;
				})() &&
				(function () {
					var e = document.documentElement.style;
					return "transition" in e || "WebkitTransition" in e;
				})()
			);
		}),
		Object.defineProperty(H, "debug", {
			get: function () {
				return P || !1;
			},
			set: function (e) {
				return (P = "boolean" == typeof e ? e : P);
			},
		}),
		H(),
		H
	);
});
