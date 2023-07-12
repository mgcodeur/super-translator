function O(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
function N(n) {
  if (n.__esModule)
    return n;
  var e = n.default;
  if (typeof e == "function") {
    var t = function r() {
      if (this instanceof r) {
        var i = [null];
        i.push.apply(i, arguments);
        var c = Function.bind.apply(e, i);
        return new c();
      }
      return e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else
    t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(n).forEach(function(r) {
    var i = Object.getOwnPropertyDescriptor(n, r);
    Object.defineProperty(t, r, i.get ? i : {
      enumerable: !0,
      get: function() {
        return n[r];
      }
    });
  }), t;
}
var M = { exports: {} }, _, A;
function q() {
  if (A)
    return _;
  A = 1;
  var n = 1e3, e = n * 60, t = e * 60, r = t * 24, i = r * 7, c = r * 365.25;
  _ = function(s, a) {
    a = a || {};
    var o = typeof s;
    if (o === "string" && s.length > 0)
      return p(s);
    if (o === "number" && isFinite(s))
      return a.long ? u(s) : h(s);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(s)
    );
  };
  function p(s) {
    if (s = String(s), !(s.length > 100)) {
      var a = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        s
      );
      if (a) {
        var o = parseFloat(a[1]), f = (a[2] || "ms").toLowerCase();
        switch (f) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return o * c;
          case "weeks":
          case "week":
          case "w":
            return o * i;
          case "days":
          case "day":
          case "d":
            return o * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return o * t;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return o * e;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return o * n;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return o;
          default:
            return;
        }
      }
    }
  }
  function h(s) {
    var a = Math.abs(s);
    return a >= r ? Math.round(s / r) + "d" : a >= t ? Math.round(s / t) + "h" : a >= e ? Math.round(s / e) + "m" : a >= n ? Math.round(s / n) + "s" : s + "ms";
  }
  function u(s) {
    var a = Math.abs(s);
    return a >= r ? l(s, a, r, "day") : a >= t ? l(s, a, t, "hour") : a >= e ? l(s, a, e, "minute") : a >= n ? l(s, a, n, "second") : s + " ms";
  }
  function l(s, a, o, f) {
    var w = a >= o * 1.5;
    return Math.round(s / o) + " " + f + (w ? "s" : "");
  }
  return _;
}
function L(n) {
  t.debug = t, t.default = t, t.coerce = u, t.disable = c, t.enable = i, t.enabled = p, t.humanize = q(), t.destroy = l, Object.keys(n).forEach((s) => {
    t[s] = n[s];
  }), t.names = [], t.skips = [], t.formatters = {};
  function e(s) {
    let a = 0;
    for (let o = 0; o < s.length; o++)
      a = (a << 5) - a + s.charCodeAt(o), a |= 0;
    return t.colors[Math.abs(a) % t.colors.length];
  }
  t.selectColor = e;
  function t(s) {
    let a, o = null, f, w;
    function g(...d) {
      if (!g.enabled)
        return;
      const C = g, P = Number(/* @__PURE__ */ new Date()), T = P - (a || P);
      C.diff = T, C.prev = a, C.curr = P, a = P, d[0] = t.coerce(d[0]), typeof d[0] != "string" && d.unshift("%O");
      let F = 0;
      d[0] = d[0].replace(/%([a-zA-Z%])/g, (v, $) => {
        if (v === "%%")
          return "%";
        F++;
        const S = t.formatters[$];
        if (typeof S == "function") {
          const D = d[F];
          v = S.call(C, D), d.splice(F, 1), F--;
        }
        return v;
      }), t.formatArgs.call(C, d), (C.log || t.log).apply(C, d);
    }
    return g.namespace = s, g.useColors = t.useColors(), g.color = t.selectColor(s), g.extend = r, g.destroy = t.destroy, Object.defineProperty(g, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => o !== null ? o : (f !== t.namespaces && (f = t.namespaces, w = t.enabled(s)), w),
      set: (d) => {
        o = d;
      }
    }), typeof t.init == "function" && t.init(g), g;
  }
  function r(s, a) {
    const o = t(this.namespace + (typeof a > "u" ? ":" : a) + s);
    return o.log = this.log, o;
  }
  function i(s) {
    t.save(s), t.namespaces = s, t.names = [], t.skips = [];
    let a;
    const o = (typeof s == "string" ? s : "").split(/[\s,]+/), f = o.length;
    for (a = 0; a < f; a++)
      o[a] && (s = o[a].replace(/\*/g, ".*?"), s[0] === "-" ? t.skips.push(new RegExp("^" + s.slice(1) + "$")) : t.names.push(new RegExp("^" + s + "$")));
  }
  function c() {
    const s = [
      ...t.names.map(h),
      ...t.skips.map(h).map((a) => "-" + a)
    ].join(",");
    return t.enable(""), s;
  }
  function p(s) {
    if (s[s.length - 1] === "*")
      return !0;
    let a, o;
    for (a = 0, o = t.skips.length; a < o; a++)
      if (t.skips[a].test(s))
        return !1;
    for (a = 0, o = t.names.length; a < o; a++)
      if (t.names[a].test(s))
        return !0;
    return !1;
  }
  function h(s) {
    return s.toString().substring(2, s.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function u(s) {
    return s instanceof Error ? s.stack || s.message : s;
  }
  function l() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return t.enable(t.load()), t;
}
var R = L;
(function(n, e) {
  e.formatArgs = r, e.save = i, e.load = c, e.useColors = t, e.storage = p(), e.destroy = (() => {
    let u = !1;
    return () => {
      u || (u = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), e.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function t() {
    return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? !0 : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function r(u) {
    if (u[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + u[0] + (this.useColors ? "%c " : " ") + "+" + n.exports.humanize(this.diff), !this.useColors)
      return;
    const l = "color: " + this.color;
    u.splice(1, 0, l, "color: inherit");
    let s = 0, a = 0;
    u[0].replace(/%[a-zA-Z%]/g, (o) => {
      o !== "%%" && (s++, o === "%c" && (a = s));
    }), u.splice(a, 0, l);
  }
  e.log = console.debug || console.log || (() => {
  });
  function i(u) {
    try {
      u ? e.storage.setItem("debug", u) : e.storage.removeItem("debug");
    } catch {
    }
  }
  function c() {
    let u;
    try {
      u = e.storage.getItem("debug");
    } catch {
    }
    return !u && typeof process < "u" && "env" in process && (u = process.env.DEBUG), u;
  }
  function p() {
    try {
      return localStorage;
    } catch {
    }
  }
  n.exports = R(e);
  const { formatters: h } = n.exports;
  h.j = function(u) {
    try {
      return JSON.stringify(u);
    } catch (l) {
      return "[UnexpectedJSONParseError]: " + l.message;
    }
  };
})(M, M.exports);
var B = M.exports;
const x = /* @__PURE__ */ O(B);
var W = function(e) {
  return z(e) && !U(e);
};
function z(n) {
  return !!n && typeof n == "object";
}
function U(n) {
  var e = Object.prototype.toString.call(n);
  return e === "[object RegExp]" || e === "[object Date]" || V(n);
}
var G = typeof Symbol == "function" && Symbol.for, k = G ? Symbol.for("react.element") : 60103;
function V(n) {
  return n.$$typeof === k;
}
function J(n) {
  return Array.isArray(n) ? [] : {};
}
function y(n, e) {
  return e.clone !== !1 && e.isMergeableObject(n) ? b(J(n), n, e) : n;
}
function H(n, e, t) {
  return n.concat(e).map(function(r) {
    return y(r, t);
  });
}
function Y(n, e) {
  if (!e.customMerge)
    return b;
  var t = e.customMerge(n);
  return typeof t == "function" ? t : b;
}
function Z(n) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(n).filter(function(e) {
    return Object.propertyIsEnumerable.call(n, e);
  }) : [];
}
function j(n) {
  return Object.keys(n).concat(Z(n));
}
function I(n, e) {
  try {
    return e in n;
  } catch {
    return !1;
  }
}
function K(n, e) {
  return I(n, e) && !(Object.hasOwnProperty.call(n, e) && Object.propertyIsEnumerable.call(n, e));
}
function Q(n, e, t) {
  var r = {};
  return t.isMergeableObject(n) && j(n).forEach(function(i) {
    r[i] = y(n[i], t);
  }), j(e).forEach(function(i) {
    K(n, i) || (I(n, i) && t.isMergeableObject(e[i]) ? r[i] = Y(i, t)(n[i], e[i], t) : r[i] = y(e[i], t));
  }), r;
}
function b(n, e, t) {
  t = t || {}, t.arrayMerge = t.arrayMerge || H, t.isMergeableObject = t.isMergeableObject || W, t.cloneUnlessOtherwiseSpecified = y;
  var r = Array.isArray(e), i = Array.isArray(n), c = r === i;
  return c ? r ? t.arrayMerge(n, e, t) : Q(n, e, t) : y(e, t);
}
b.all = function(e, t) {
  if (!Array.isArray(e))
    throw new Error("first argument should be an array");
  return e.reduce(function(r, i) {
    return b(r, i, t);
  }, {});
};
var X = b, ee = X;
const te = /* @__PURE__ */ O(ee);
/*!
 * puppeteer-extra v3.3.5 by berstend
 * https://github.com/berstend/puppeteer-extra
 * @license MIT
 */
const m = x("puppeteer-extra");
class ne {
  constructor(e, t) {
    this._pptr = e, this._requireError = t, this._plugins = [];
  }
  /**
   * The **main interface** to register `puppeteer-extra` plugins.
   *
   * @example
   * puppeteer.use(plugin1).use(plugin2)
   *
   * @see [PuppeteerExtraPlugin]
   *
   * @return The same `PuppeteerExtra` instance (for optional chaining)
   */
  use(e) {
    return typeof e != "object" || !e._isPuppeteerExtraPlugin ? (console.error("Warning: Plugin is not derived from PuppeteerExtraPlugin, ignoring.", e), this) : e.name ? (e.requirements.has("dataFromPlugins") && (e.getDataFromPlugins = this.getPluginData.bind(this)), e._register(Object.getPrototypeOf(e)), this._plugins.push(e), m("plugin registered", e.name), this) : (console.error("Warning: Plugin with no name registering, ignoring.", e), this);
  }
  /**
   * To stay backwards compatible with puppeteer's (and our) default export after adding `addExtra`
   * we need to defer the check if we have a puppeteer instance to work with.
   * Otherwise we would throw even if the user intends to use their non-standard puppeteer implementation.
   *
   * @private
   */
  get pptr() {
    if (this._pptr)
      return this._pptr;
    throw console.warn(`
    Puppeteer is missing. :-)

    Note: puppeteer is a peer dependency of puppeteer-extra,
    which means you can install your own preferred version.

    - To get the latest stable version run: 'yarn add puppeteer' or 'npm i puppeteer'

    Alternatively:
    - To get puppeteer without the bundled Chromium browser install 'puppeteer-core'
    `), this._requireError || new Error("No puppeteer instance provided.");
  }
  /**
   * The method launches a browser instance with given arguments. The browser will be closed when the parent node.js process is closed.
   *
   * Augments the original `puppeteer.launch` method with plugin lifecycle methods.
   *
   * All registered plugins that have a `beforeLaunch` method will be called
   * in sequence to potentially update the `options` Object before launching the browser.
   *
   * @example
   * const browser = await puppeteer.launch({
   *   headless: false,
   *   defaultViewport: null
   * })
   *
   * @param options - See [puppeteer docs](https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions).
   */
  async launch(e) {
    e = te({ args: [] }, e || {}), this.resolvePluginDependencies(), this.orderPlugins(), e = await this.callPluginsWithValue("beforeLaunch", e);
    const r = {
      context: "launch",
      options: e,
      defaultArgs: this.defaultArgs
    };
    this.checkPluginRequirements(r);
    const i = await this.pptr.launch(e);
    return this._patchPageCreationMethods(i), await this.callPlugins("_bindBrowserEvents", i, r), i;
  }
  /**
   * Attach Puppeteer to an existing Chromium instance.
   *
   * Augments the original `puppeteer.connect` method with plugin lifecycle methods.
   *
   * All registered plugins that have a `beforeConnect` method will be called
   * in sequence to potentially update the `options` Object before launching the browser.
   *
   * @param options - See [puppeteer docs](https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#puppeteerconnectoptions).
   */
  async connect(e) {
    this.resolvePluginDependencies(), this.orderPlugins(), e = await this.callPluginsWithValue("beforeConnect", e);
    const t = { context: "connect", options: e };
    this.checkPluginRequirements(t);
    const r = await this.pptr.connect(e);
    return this._patchPageCreationMethods(r), await this.callPlugins("_bindBrowserEvents", r, t), r;
  }
  /**
   * The default flags that Chromium will be launched with.
   *
   * @param options - See [puppeteer docs](https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#puppeteerdefaultargsoptions).
   */
  defaultArgs(e) {
    return this.pptr.defaultArgs(e);
  }
  /** Path where Puppeteer expects to find bundled Chromium. */
  executablePath() {
    return this.pptr.executablePath();
  }
  /**
   * This methods attaches Puppeteer to an existing Chromium instance.
   *
   * @param options - See [puppeteer docs](https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#puppeteercreatebrowserfetcheroptions).
   */
  createBrowserFetcher(e) {
    return this.pptr.createBrowserFetcher(e);
  }
  /**
   * Patch page creation methods (both regular and incognito contexts).
   *
   * Unfortunately it's possible that the `targetcreated` events are not triggered
   * early enough for listeners (e.g. plugins using `onPageCreated`) to be able to
   * modify the page instance (e.g. user-agent) before the browser request occurs.
   *
   * This only affects the first request of a newly created page target.
   *
   * As a workaround I've noticed that navigating to `about:blank` (again),
   * right after a page has been created reliably fixes this issue and adds
   * no noticable delay or side-effects.
   *
   * This problem is not specific to `puppeteer-extra` but default Puppeteer behaviour.
   *
   * Note: This patch only fixes explicitly created pages, implicitly created ones
   * (e.g. through `window.open`) are still subject to this issue. I didn't find a
   * reliable mitigation for implicitly created pages yet.
   *
   * Puppeteer issues:
   * https://github.com/GoogleChrome/puppeteer/issues/2669
   * https://github.com/puppeteer/puppeteer/issues/3667
   * https://github.com/GoogleChrome/puppeteer/issues/386#issuecomment-343059315
   * https://github.com/GoogleChrome/puppeteer/issues/1378#issue-273733905
   *
   * @private
   */
  _patchPageCreationMethods(e) {
    if (!e._createPageInContext) {
      m("warning: _patchPageCreationMethods failed (no browser._createPageInContext)");
      return;
    }
    e._createPageInContext = function(t, r) {
      return async function() {
        const i = await t.apply(r, arguments);
        return await i.goto("about:blank"), i;
      };
    }(e._createPageInContext, e);
  }
  /**
   * Get a list of all registered plugins.
   *
   * @member {Array<PuppeteerExtraPlugin>}
   */
  get plugins() {
    return this._plugins;
  }
  /**
   * Get the names of all registered plugins.
   *
   * @member {Array<string>}
   * @private
   */
  get pluginNames() {
    return this._plugins.map((e) => e.name);
  }
  /**
   * Collects the exposed `data` property of all registered plugins.
   * Will be reduced/flattened to a single array.
   *
   * Can be accessed by plugins that listed the `dataFromPlugins` requirement.
   *
   * Implemented mainly for plugins that need data from other plugins (e.g. `user-preferences`).
   *
   * @see [PuppeteerExtraPlugin]/data
   * @param name - Filter data by optional plugin name
   *
   * @private
   */
  getPluginData(e) {
    const t = this._plugins.map((r) => Array.isArray(r.data) ? r.data : [r.data]).reduce((r, i) => [...r, ...i], []);
    return e ? t.filter((r) => r.name === e) : t;
  }
  /**
   * Get all plugins that feature a given property/class method.
   *
   * @private
   */
  getPluginsByProp(e) {
    return this._plugins.filter((t) => e in t);
  }
  /**
   * Lightweight plugin dependency management to require plugins and code mods on demand.
   *
   * This uses the `dependencies` stanza (a `Set`) exposed by `puppeteer-extra` plugins.
   *
   * @todo Allow objects as depdencies that contains opts for the requested plugin.
   *
   * @private
   */
  resolvePluginDependencies() {
    const e = this._plugins.map((t) => t._getMissingDependencies(this._plugins)).reduce((t, r) => /* @__PURE__ */ new Set([...t, ...r]), /* @__PURE__ */ new Set());
    if (!e.size) {
      m("no dependencies are missing");
      return;
    }
    m("dependencies missing", e);
    for (let t of [...e]) {
      if (this.pluginNames.includes(t)) {
        m(`ignoring dependency '${t}', which has been required already.`);
        continue;
      }
      t = t.startsWith("puppeteer-extra-plugin") ? t : `puppeteer-extra-plugin-${t}`;
      const r = t.split("/")[0];
      let i = null;
      try {
        i = require(t)(), this.use(i);
      } catch (c) {
        throw console.warn(`
          A plugin listed '${t}' as dependency,
          which is currently missing. Please install it:

          yarn add ${r}

          Note: You don't need to require the plugin yourself,
          unless you want to modify it's default settings.
          `), c;
      }
      i.dependencies.size && this.resolvePluginDependencies();
    }
  }
  /**
   * Order plugins that have expressed a special placement requirement.
   *
   * This is useful/necessary for e.g. plugins that depend on the data from other plugins.
   *
   * @todo Support more than 'runLast'.
   * @todo If there are multiple plugins defining 'runLast', sort them depending on who depends on whom. :D
   *
   * @private
   */
  orderPlugins() {
    m("orderPlugins:before", this.pluginNames);
    const e = this._plugins.filter((t) => t.requirements.has("runLast")).map((t) => t.name);
    for (const t of e) {
      const r = this._plugins.findIndex((i) => i.name === t);
      this._plugins.push(this._plugins.splice(r, 1)[0]);
    }
    m("orderPlugins:after", this.pluginNames);
  }
  /**
   * Lightweight plugin requirement checking.
   *
   * The main intent is to notify the user when a plugin won't work as expected.
   *
   * @todo This could be improved, e.g. be evaluated by the plugin base class.
   *
   * @private
   */
  checkPluginRequirements(e = {}) {
    for (const t of this._plugins)
      for (const r of t.requirements)
        e.context === "launch" && r === "headful" && e.options.headless && console.warn(`Warning: Plugin '${t.name}' is not supported in headless mode.`), e.context === "connect" && r === "launch" && console.warn(`Warning: Plugin '${t.name}' doesn't support puppeteer.connect().`);
  }
  /**
   * Call plugins sequentially with the same values.
   * Plugins that expose the supplied property will be called.
   *
   * @param prop - The plugin property to call
   * @param values - Any number of values
   * @private
   */
  async callPlugins(e, ...t) {
    for (const r of this.getPluginsByProp(e))
      await r[e].apply(r, t);
  }
  /**
   * Call plugins sequentially and pass on a value (waterfall style).
   * Plugins that expose the supplied property will be called.
   *
   * The plugins can either modify the value or return an updated one.
   * Will return the latest, updated value which ran through all plugins.
   *
   * @param prop - The plugin property to call
   * @param value - Any value
   * @return The new updated value
   * @private
   */
  async callPluginsWithValue(e, t) {
    for (const r of this.getPluginsByProp(e)) {
      const i = await r[e](t);
      i && (t = i);
    }
    return t;
  }
}
const re = (() => new ne(...se()))();
function se() {
  try {
    return [require("puppeteer"), void 0];
  } catch {
  }
  try {
    return [require("puppeteer-core"), void 0];
  } catch (n) {
    return [void 0, n];
  }
}
/*!
 * puppeteer-extra-plugin v3.2.2 by berstend
 * https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin
 * @license MIT
 */
const ae = require("merge-deep");
let ie = class {
  constructor(e) {
    this._debugBase = x(`puppeteer-extra-plugin:base:${this.name}`), this._childClassMembers = [], this._opts = ae(this.defaults, e || {}), this._debugBase("Initialized.");
  }
  /**
   * Plugin name (required).
   *
   * Convention:
   * - Package: `puppeteer-extra-plugin-anonymize-ua`
   * - Name: `anonymize-ua`
   *
   * @example
   * get name () { return 'anonymize-ua' }
   */
  get name() {
    throw new Error('Plugin must override "name"');
  }
  /**
   * Plugin defaults (optional).
   *
   * If defined will be ([deep-](https://github.com/jonschlinkert/merge-deep))merged with the (optional) user supplied options (supplied during plugin instantiation).
   *
   * The result of merging defaults with user supplied options can be accessed through `this.opts`.
   *
   * @see [[opts]]
   *
   * @example
   * get defaults () {
   *   return {
   *     stripHeadless: true,
   *     makeWindows: true,
   *     customFn: null
   *   }
   * }
   *
   * // Users can overwrite plugin defaults during instantiation:
   * puppeteer.use(require('puppeteer-extra-plugin-foobar')({ makeWindows: false }))
   */
  get defaults() {
    return {};
  }
  /**
   * Plugin requirements (optional).
   *
   * Signal certain plugin requirements to the base class and the user.
   *
   * Currently supported:
   * - `launch`
   *   - If the plugin only supports locally created browser instances (no `puppeteer.connect()`),
   *     will output a warning to the user.
   * - `headful`
   *   - If the plugin doesn't work in `headless: true` mode,
   *     will output a warning to the user.
   * - `dataFromPlugins`
   *   - In case the plugin requires data from other plugins.
   *     will enable usage of `this.getDataFromPlugins()`.
   * - `runLast`
   *   - In case the plugin prefers to run after the others.
   *     Useful when the plugin needs data from others.
   *
   * @example
   * get requirements () {
   *   return new Set(['runLast', 'dataFromPlugins'])
   * }
   */
  get requirements() {
    return /* @__PURE__ */ new Set([]);
  }
  /**
   * Plugin dependencies (optional).
   *
   * Missing plugins will be required() by puppeteer-extra.
   *
   * @example
   * get dependencies () {
   *   return new Set(['user-preferences'])
   * }
   * // Will ensure the 'puppeteer-extra-plugin-user-preferences' plugin is loaded.
   */
  get dependencies() {
    return /* @__PURE__ */ new Set([]);
  }
  /**
   * Plugin data (optional).
   *
   * Plugins can expose data (an array of objects), which in turn can be consumed by other plugins,
   * that list the `dataFromPlugins` requirement (by using `this.getDataFromPlugins()`).
   *
   * Convention: `[ {name: 'Any name', value: 'Any value'} ]`
   *
   * @see [[getDataFromPlugins]]
   *
   * @example
   * // plugin1.js
   * get data () {
   *   return [
   *     {
   *       name: 'userPreferences',
   *       value: { foo: 'bar' }
   *     },
   *     {
   *       name: 'userPreferences',
   *       value: { hello: 'world' }
   *     }
   *   ]
   *
   * // plugin2.js
   * get requirements () { return new Set(['dataFromPlugins']) }
   *
   * async beforeLaunch () {
   *   const prefs = this.getDataFromPlugins('userPreferences').map(d => d.value)
   *   this.debug(prefs) // => [ { foo: 'bar' }, { hello: 'world' } ]
   * }
   */
  get data() {
    return [];
  }
  /**
   * Access the plugin options (usually the `defaults` merged with user defined options)
   *
   * To skip the auto-merging of defaults with user supplied opts don't define a `defaults`
   * property and set the `this._opts` Object in your plugin constructor directly.
   *
   * @see [[defaults]]
   *
   * @example
   * get defaults () { return { foo: "bar" } }
   *
   * async onPageCreated (page) {
   *   this.debug(this.opts.foo) // => bar
   * }
   */
  get opts() {
    return this._opts;
  }
  /**
   *  Convenience debug logger based on the [debug] module.
   *  Will automatically namespace the logging output to the plugin package name.
   *  [debug]: https://www.npmjs.com/package/debug
   *
   *  ```bash
   *  # toggle output using environment variables
   *  DEBUG=puppeteer-extra-plugin:<plugin_name> node foo.js
   *  # to debug all the things:
   *  DEBUG=puppeteer-extra,puppeteer-extra-plugin:* node foo.js
   *  ```
   *
   * @example
   * this.debug('hello world')
   * // will output e.g. 'puppeteer-extra-plugin:anonymize-ua hello world'
   */
  get debug() {
    return x(`puppeteer-extra-plugin:${this.name}`);
  }
  /**
   * Before a new browser instance is created/launched.
   *
   * Can be used to modify the puppeteer launch options by modifying or returning them.
   *
   * Plugins using this method will be called in sequence to each
   * be able to update the launch options.
   *
   * @example
   * async beforeLaunch (options) {
   *   if (this.opts.flashPluginPath) {
   *     options.args.push(`--ppapi-flash-path=${this.opts.flashPluginPath}`)
   *   }
   * }
   *
   * @param options - Puppeteer launch options
   */
  async beforeLaunch(e) {
  }
  /**
   * After the browser has launched.
   *
   * Note: Don't assume that there will only be a single browser instance during the lifecycle of a plugin.
   * It's possible that `pupeeteer.launch` will be  called multiple times and more than one browser created.
   * In order to make the plugins as stateless as possible don't store a reference to the browser instance
   * in the plugin but rather consider alternatives.
   *
   * E.g. when using `onPageCreated` you can get a browser reference by using `page.browser()`.
   *
   * Alternatively you could expose a class method that takes a browser instance as a parameter to work with:
   *
   * ```es6
   * const fancyPlugin = require('puppeteer-extra-plugin-fancy')()
   * puppeteer.use(fancyPlugin)
   * const browser = await puppeteer.launch()
   * await fancyPlugin.killBrowser(browser)
   * ```
   *
   * @param  browser - The `puppeteer` browser instance.
   * @param  opts.options - Puppeteer launch options used.
   *
   * @example
   * async afterLaunch (browser, opts) {
   *   this.debug('browser has been launched', opts.options)
   * }
   */
  async afterLaunch(e, t = { options: {} }) {
  }
  /**
   * Before connecting to an existing browser instance.
   *
   * Can be used to modify the puppeteer connect options by modifying or returning them.
   *
   * Plugins using this method will be called in sequence to each
   * be able to update the launch options.
   *
   * @param  {Object} options - Puppeteer connect options
   * @return {Object=}
   */
  async beforeConnect(e) {
  }
  /**
   * After connecting to an existing browser instance.
   *
   * > Note: Don't assume that there will only be a single browser instance during the lifecycle of a plugin.
   *
   * @param browser - The `puppeteer` browser instance.
   * @param  {Object} opts
   * @param  {Object} opts.options - Puppeteer connect options used.
   *
   */
  async afterConnect(e, t = {}) {
  }
  /**
   * Called when a browser instance is available.
   *
   * This applies to both `puppeteer.launch()` and `puppeteer.connect()`.
   *
   * Convenience method created for plugins that need access to a browser instance
   * and don't mind if it has been created through `launch` or `connect`.
   *
   * > Note: Don't assume that there will only be a single browser instance during the lifecycle of a plugin.
   *
   * @param browser - The `puppeteer` browser instance.
   */
  async onBrowser(e, t) {
  }
  /**
   * Called when a target is created, for example when a new page is opened by window.open or browser.newPage.
   *
   * > Note: This includes target creations in incognito browser contexts.
   *
   * > Note: This includes browser instances created through `.launch()` as well as `.connect()`.
   *
   * @param  {Puppeteer.Target} target
   */
  async onTargetCreated(e) {
  }
  /**
   * Same as `onTargetCreated` but prefiltered to only contain Pages, for convenience.
   *
   * > Note: This includes page creations in incognito browser contexts.
   *
   * > Note: This includes browser instances created through `.launch()` as well as `.connect()`.
   *
   * @param  {Puppeteer.Target} target
   *
   * @example
   * async onPageCreated (page) {
   *   let ua = await page.browser().userAgent()
   *   if (this.opts.stripHeadless) {
   *     ua = ua.replace('HeadlessChrome/', 'Chrome/')
   *   }
   *   this.debug('new ua', ua)
   *   await page.setUserAgent(ua)
   * }
   */
  async onPageCreated(e) {
  }
  /**
   * Called when the url of a target changes.
   *
   * > Note: This includes target changes in incognito browser contexts.
   *
   * > Note: This includes browser instances created through `.launch()` as well as `.connect()`.
   *
   * @param  {Puppeteer.Target} target
   */
  async onTargetChanged(e) {
  }
  /**
   * Called when a target is destroyed, for example when a page is closed.
   *
   * > Note: This includes target destructions in incognito browser contexts.
   *
   * > Note: This includes browser instances created through `.launch()` as well as `.connect()`.
   *
   * @param  {Puppeteer.Target} target
   */
  async onTargetDestroyed(e) {
  }
  /**
   * Called when Puppeteer gets disconnected from the Chromium instance.
   *
   * This might happen because of one of the following:
   * - Chromium is closed or crashed
   * - The `browser.disconnect` method was called
   */
  async onDisconnected() {
  }
  /**
   * **Deprecated:** Since puppeteer v1.6.0 `onDisconnected` has been improved
   * and should be used instead of `onClose`.
   *
   * In puppeteer < v1.6.0 `onDisconnected` was not catching all exit scenarios.
   * In order for plugins to clean up properly (e.g. deleting temporary files)
   * the `onClose` method had been introduced.
   *
   * > Note: Might be called multiple times on exit.
   *
   * > Note: This only includes browser instances created through `.launch()`.
   */
  async onClose() {
  }
  /**
   * After the plugin has been registered in `puppeteer-extra`.
   *
   * Normally right after `puppeteer.use(plugin)` is called
   */
  async onPluginRegistered() {
  }
  /**
   * Helper method to retrieve `data` objects from other plugins.
   *
   * A plugin needs to state the `dataFromPlugins` requirement
   * in order to use this method. Will be mapped to `puppeteer.getPluginData`.
   *
   * @param name - Filter data by `name` property
   *
   * @see [data]
   * @see [requirements]
   */
  getDataFromPlugins(e) {
    return [];
  }
  /**
   * Will match plugin dependencies against all currently registered plugins.
   * Is being called by `puppeteer-extra` and used to require missing dependencies.
   *
   * @param  {Array<Object>} plugins
   * @return {Set} - list of missing plugin names
   *
   * @private
   */
  _getMissingDependencies(e) {
    const t = new Set(e.map((i) => i.name));
    return new Set(Array.from(this.dependencies.values()).filter((i) => !t.has(i)));
  }
  /**
   * Conditionally bind browser/process events to class members.
   * The idea is to reduce event binding boilerplate in plugins.
   *
   * For efficiency we make sure the plugin is using the respective event
   * by checking the child class members before registering the listener.
   *
   * @param  {<Puppeteer.Browser>} browser
   * @param  {Object} opts - Options
   * @param  {string} opts.context - Puppeteer context (launch/connect)
   * @param  {Object} [opts.options] - Puppeteer launch or connect options
   * @param  {Array<string>} [opts.defaultArgs] - The default flags that Chromium will be launched with
   *
   * @private
   */
  async _bindBrowserEvents(e, t = {}) {
    (this._hasChildClassMember("onTargetCreated") || this._hasChildClassMember("onPageCreated")) && e.on("targetcreated", this._onTargetCreated.bind(this)), this._hasChildClassMember("onTargetChanged") && this.onTargetChanged && e.on("targetchanged", this.onTargetChanged.bind(this)), this._hasChildClassMember("onTargetDestroyed") && this.onTargetDestroyed && e.on("targetdestroyed", this.onTargetDestroyed.bind(this)), this._hasChildClassMember("onDisconnected") && this.onDisconnected && e.on("disconnected", this.onDisconnected.bind(this)), t.context === "launch" && this._hasChildClassMember("onClose") && this.onClose && (process.on("exit", this.onClose.bind(this)), e.on("disconnected", this.onClose.bind(this)), t.options.handleSIGINT !== !1 && process.on("SIGINT", this.onClose.bind(this)), t.options.handleSIGTERM !== !1 && process.on("SIGTERM", this.onClose.bind(this)), t.options.handleSIGHUP !== !1 && process.on("SIGHUP", this.onClose.bind(this))), t.context === "launch" && this.afterLaunch && await this.afterLaunch(e, t), t.context === "connect" && this.afterConnect && await this.afterConnect(e, t), this.onBrowser && await this.onBrowser(e, t);
  }
  /**
   * @private
   */
  async _onTargetCreated(e) {
    if (this.onTargetCreated && await this.onTargetCreated(e), e.type() === "page")
      try {
        const t = await e.page();
        if (!t)
          return;
        const r = "isClosed" in t && !t.isClosed();
        this.onPageCreated && r && await this.onPageCreated(t);
      } catch (t) {
        console.error(t);
      }
  }
  /**
   * @private
   */
  _register(e) {
    this._registerChildClassMembers(e), this.onPluginRegistered && this.onPluginRegistered();
  }
  /**
   * @private
   */
  _registerChildClassMembers(e) {
    this._childClassMembers = Object.getOwnPropertyNames(e);
  }
  /**
   * @private
   */
  _hasChildClassMember(e) {
    return !!this._childClassMembers.includes(e);
  }
  /**
   * @private
   */
  get _isPuppeteerExtraPlugin() {
    return !0;
  }
};
const oe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PuppeteerExtraPlugin: ie
}, Symbol.toStringTag, { value: "Module" })), ue = /* @__PURE__ */ N(oe), { PuppeteerExtraPlugin: ce } = ue;
class le extends ce {
  constructor(e = {}) {
    super(e);
  }
  get name() {
    return "stealth";
  }
  get defaults() {
    const e = /* @__PURE__ */ new Set([
      "chrome.app",
      "chrome.csi",
      "chrome.loadTimes",
      "chrome.runtime",
      "defaultArgs",
      "iframe.contentWindow",
      "media.codecs",
      "navigator.hardwareConcurrency",
      "navigator.languages",
      "navigator.permissions",
      "navigator.plugins",
      "navigator.webdriver",
      "sourceurl",
      "user-agent-override",
      "webgl.vendor",
      "window.outerdimensions"
    ]);
    return {
      availableEvasions: e,
      // Enable all available evasions by default
      enabledEvasions: /* @__PURE__ */ new Set([...e])
    };
  }
  /**
   * Requires evasion techniques dynamically based on configuration.
   *
   * @private
   */
  get dependencies() {
    return new Set(
      [...this.opts.enabledEvasions].map((e) => `${this.name}/evasions/${e}`)
    );
  }
  /**
   * Get all available evasions.
   *
   * Please look into the [evasions directory](./evasions/) for an up to date list.
   *
   * @type {Set<string>} - A Set of all available evasions.
   *
   * @example
   * const pluginStealth = require('puppeteer-extra-plugin-stealth')()
   * console.log(pluginStealth.availableEvasions) // => Set { 'user-agent', 'console.debug' }
   * puppeteer.use(pluginStealth)
   */
  get availableEvasions() {
    return this.defaults.availableEvasions;
  }
  /**
   * Get all enabled evasions.
   *
   * Enabled evasions can be configured either through `opts` or by modifying this property.
   *
   * @type {Set<string>} - A Set of all enabled evasions.
   *
   * @example
   * // Remove specific evasion from enabled ones dynamically
   * const pluginStealth = require('puppeteer-extra-plugin-stealth')()
   * pluginStealth.enabledEvasions.delete('console.debug')
   * puppeteer.use(pluginStealth)
   */
  get enabledEvasions() {
    return this.opts.enabledEvasions;
  }
  /**
   * @private
   */
  set enabledEvasions(e) {
    this.opts.enabledEvasions = e;
  }
  async onBrowser(e) {
    e && e.setMaxListeners && e.setMaxListeners(30);
  }
}
const de = (n) => new le(n);
var ge = de;
const he = /* @__PURE__ */ O(ge);
function fe(n) {
  return n.translateFrom || "auto";
}
function E(n) {
  return n.translateTo || "en";
}
const me = async (n, e = {}) => {
  console.warn = () => {
  };
  const t = await re.use(he()).launch({
    headless: !0,
    userDataDir: "./user_data"
  }), r = await t.newPage();
  await r.goto(`https://translate.google.com/?sl=${fe(e)}&tl=${E(e)}&op=translate`), await (await r.$('textarea[aria-label="Source text"]')).type(n), await r.waitForSelector(`textarea[lang="${E(e)}"]`);
  const c = await r.$(`textarea[lang="${E(e)}"]`), p = await r.evaluate((h) => h.value, c);
  return await t.close(), p;
};
export {
  me as default
};
