var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _map;
import { faHammer } from "@fortawesome/free-solid-svg-icons";
function get_single_valued_header(headers, key) {
  const value = headers[key];
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return void 0;
    }
    if (value.length > 1) {
      throw new Error(`Multiple headers provided for ${key}. Multiple may be provided only for set-cookie`);
    }
    return value[0];
  }
  return value;
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
function lowercase_keys(obj) {
  const clone = {};
  for (const key in obj) {
    clone[key.toLowerCase()] = obj[key];
  }
  return clone;
}
function error(body2) {
  return {
    status: 500,
    body: body2,
    headers: {}
  };
}
function is_string(s2) {
  return typeof s2 === "string" || s2 instanceof String;
}
function is_content_type_textual(content_type) {
  if (!content_type)
    return true;
  const [type] = content_type.split(";");
  return type === "text/plain" || type === "application/json" || type === "application/x-www-form-urlencoded" || type === "multipart/form-data";
}
async function render_endpoint(request, route, match) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (!handler) {
    return;
  }
  const params = route.params(match);
  const response = await handler({ ...request, params });
  const preface = `Invalid response from route ${request.path}`;
  if (!response) {
    return;
  }
  if (typeof response !== "object") {
    return error(`${preface}: expected an object, got ${typeof response}`);
  }
  let { status = 200, body: body2, headers = {} } = response;
  headers = lowercase_keys(headers);
  const type = get_single_valued_header(headers, "content-type");
  const is_type_textual = is_content_type_textual(type);
  if (!is_type_textual && !(body2 instanceof Uint8Array || is_string(body2))) {
    return error(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if ((typeof body2 === "object" || typeof body2 === "undefined") && !(body2 instanceof Uint8Array) && (!type || type.startsWith("application/json"))) {
    headers = { ...headers, "content-type": "application/json; charset=utf-8" };
    normalized_body = JSON.stringify(typeof body2 === "undefined" ? {} : body2);
  } else {
    normalized_body = body2;
  }
  return { status, body: normalized_body, headers };
}
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
const subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe };
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
const escape_json_string_in_html_dict = {
  '"': '\\"',
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape_json_string_in_html(str) {
  return escape$1(str, escape_json_string_in_html_dict, (code) => `\\u${code.toString(16).toUpperCase()}`);
}
const escape_html_attr_dict = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function escape_html_attr(str) {
  return '"' + escape$1(str, escape_html_attr_dict, (code) => `&#${code};`) + '"';
}
function escape$1(str, dict, unicode_encoder) {
  let result = "";
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char in dict) {
      result += dict[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += unicode_encoder(code);
      }
    } else {
      result += char;
    }
  }
  return result;
}
const s$1 = JSON.stringify;
async function render_response({
  branch,
  options: options2,
  $session,
  page_config,
  status,
  error: error2,
  page
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options2.get_stack(error2);
  }
  if (page_config.ssr) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page,
      components: branch.map(({ node }) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error3) => {
      throw new Error(`Failed to serialize session data: ${error3.message}`);
    })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: [
						${(branch || []).map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page && page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${page && page.path ? try_serialize(page.path, (error3) => {
      throw new Error(`Failed to serialize page.path: ${error3.message}`);
    }) : null},
						query: new URLSearchParams(${page && page.query ? s$1(page.query.toString()) : ""}),
						params: ${page && page.params ? try_serialize(page.params, (error3) => {
      throw new Error(`Failed to serialize page.params: ${error3.message}`);
    }) : null}
					}
				}` : "null"}
			});
		<\/script>`;
  }
  if (options2.service_worker) {
    init2 += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options2.service_worker}');
			}
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body2 = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body3, json }) => {
    let attributes = `type="application/json" data-type="svelte-data" data-url=${escape_html_attr(url)}`;
    if (body3)
      attributes += ` data-body="${hash(body3)}"`;
    return `<script ${attributes}>${json}<\/script>`;
  }).join("\n\n	")}
		`;
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({ head, body: body2 })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize({ ...error2, name, message, stack });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
const s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  stuff,
  prerender_enabled,
  is_leaf,
  is_error,
  status,
  error: error2
}) {
  const { module } = node;
  let uses_credentials = false;
  const fetched = [];
  let set_cookie_headers = [];
  let loaded;
  const page_proxy = new Proxy(page, {
    get: (target, prop, receiver) => {
      if (prop === "query" && prerender_enabled) {
        throw new Error("Cannot access query on a page with prerendering enabled");
      }
      return Reflect.get(target, prop, receiver);
    }
  });
  if (module.load) {
    const load_input = {
      page: page_proxy,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        const resolved = resolve(request.path, url.split("?")[0]);
        let response;
        const prefix = options2.paths.assets || options2.paths.base;
        const filename = (resolved.startsWith(prefix) ? resolved.slice(prefix.length) : resolved).slice(1);
        const filename_html = `${filename}/index.html`;
        const asset = options2.manifest.assets.find((d) => d.file === filename || d.file === filename_html);
        if (asset) {
          response = options2.read ? new Response(options2.read(asset.file), {
            headers: asset.type ? { "content-type": asset.type } : {}
          }) : await fetch(`http://${page.host}/${asset.file}`, opts);
        } else if (resolved.startsWith("/") && !resolved.startsWith("//")) {
          const relative = resolved;
          const headers = {
            ...opts.headers
          };
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            headers.cookie = request.headers.cookie;
            if (!headers.authorization) {
              headers.authorization = request.headers.authorization;
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          const search = url.includes("?") ? url.slice(url.indexOf("?") + 1) : "";
          const rendered = await respond({
            host: request.host,
            method: opts.method || "GET",
            headers,
            path: relative,
            rawBody: opts.body == null ? null : new TextEncoder().encode(opts.body),
            query: new URLSearchParams(search)
          }, options2, {
            fetched: url,
            initiator: route
          });
          if (rendered) {
            if (state.prerender) {
              state.prerender.dependencies.set(relative, rendered);
            }
            response = new Response(rendered.body, {
              status: rendered.status,
              headers: rendered.headers
            });
          }
        } else {
          if (resolved.startsWith("//")) {
            throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
          }
          if (typeof request.host !== "undefined") {
            const { hostname: fetch_hostname } = new URL(url);
            const [server_hostname] = request.host.split(":");
            if (`.${fetch_hostname}`.endsWith(`.${server_hostname}`) && opts.credentials !== "omit") {
              uses_credentials = true;
              opts.headers = {
                ...opts.headers,
                cookie: request.headers.cookie
              };
            }
          }
          const external_request = new Request(url, opts);
          response = await options2.hooks.externalFetch.call(null, external_request);
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, _receiver) {
              async function text() {
                const body2 = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 === "set-cookie") {
                    set_cookie_headers = set_cookie_headers.concat(value);
                  } else if (key2 !== "etag") {
                    headers[key2] = value;
                  }
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":"${escape_json_string_in_html(body2)}"}`
                  });
                }
                return body2;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      stuff: { ...stuff }
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  if (!loaded) {
    throw new Error(`${node.entry} - load must return a value except for page fall through`);
  }
  return {
    node,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers,
    uses_credentials
  };
}
const absolute = /^([a-z]+:)?\/?\//;
function resolve(base2, path) {
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
async function respond_with_error({ request, options: options2, state, $session, status, error: error2 }) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    stuff: {},
    prerender_enabled: is_prerender_enabled(options2, default_error, state),
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      stuff: loaded ? loaded.stuff : {},
      prerender_enabled: is_prerender_enabled(options2, default_error, state),
      is_leaf: false,
      is_error: true,
      status,
      error: error2
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error2,
      branch,
      page
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return {
      status: 500,
      headers: {},
      body: error3.stack
    };
  }
}
function is_prerender_enabled(options2, node, state) {
  return options2.prerender && (!!node.module.prerender || !!state.prerender && state.prerender.all);
}
async function respond$1(opts) {
  const { request, options: options2, state, $session, route } = opts;
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id ? options2.load_component(id) : void 0));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options2);
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {}
    };
  }
  let branch = [];
  let status = 200;
  let error2;
  let set_cookie_headers = [];
  ssr:
    if (page_config.ssr) {
      let stuff = {};
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              ...opts,
              node,
              stuff,
              prerender_enabled: is_prerender_enabled(options2, node, state),
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
            if (loaded.loaded.redirect) {
              return with_cookies({
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              }, set_cookie_headers);
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            }
          } catch (err) {
            const e = coalesce_to_error(err);
            options2.handle_error(e, request);
            status = 500;
            error2 = e;
          }
          if (loaded && !error2) {
            branch.push(loaded);
          }
          if (error2) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  const error_loaded = await load_node({
                    ...opts,
                    node: error_node,
                    stuff: node_loaded.stuff,
                    prerender_enabled: is_prerender_enabled(options2, error_node, state),
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error2
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options2);
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (err) {
                  const e = coalesce_to_error(err);
                  options2.handle_error(e, request);
                  continue;
                }
              }
            }
            return with_cookies(await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error2
            }), set_cookie_headers);
          }
        }
        if (loaded && loaded.loaded.stuff) {
          stuff = {
            ...stuff,
            ...loaded.loaded.stuff
          };
        }
      }
    }
  try {
    return with_cookies(await render_response({
      ...opts,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    }), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return with_cookies(await respond_with_error({
      ...opts,
      status: 500,
      error: error3
    }), set_cookie_headers);
  }
}
function get_page_config(leaf, options2) {
  return {
    ssr: "ssr" in leaf ? !!leaf.ssr : options2.ssr,
    router: "router" in leaf ? !!leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options2.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    response.headers["set-cookie"] = set_cookie_headers;
  }
  return response;
}
async function render_page(request, route, match, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  const $session = await options2.hooks.getSession(request);
  const response = await respond$1({
    request,
    options: options2,
    state,
    $session,
    route,
    page
  });
  if (response) {
    return response;
  }
  if (state.fetched) {
    return {
      status: 500,
      headers: {},
      body: `Bad request in load function: failed to fetch ${state.fetched}`
    };
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        (map.get(key) || []).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
class ReadOnlyFormData {
  constructor(map) {
    __privateAdd(this, _map, void 0);
    __privateSet(this, _map, map);
  }
  get(key) {
    const value = __privateGet(this, _map).get(key);
    return value && value[0];
  }
  getAll(key) {
    return __privateGet(this, _map).get(key);
  }
  has(key) {
    return __privateGet(this, _map).has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key] of __privateGet(this, _map))
      yield key;
  }
  *values() {
    for (const [, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield value[i];
      }
    }
  }
}
_map = new WeakMap();
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  const content_type = headers["content-type"];
  const [type, ...directives] = content_type ? content_type.split(/;\s*/) : [];
  const text = () => new TextDecoder(headers["content-encoding"] || "utf-8").decode(raw);
  switch (type) {
    case "text/plain":
      return text();
    case "application/json":
      return JSON.parse(text());
    case "application/x-www-form-urlencoded":
      return get_urlencoded(text());
    case "multipart/form-data": {
      const boundary = directives.find((directive) => directive.startsWith("boundary="));
      if (!boundary)
        throw new Error("Missing boundary");
      return get_multipart(text(), boundary.slice("boundary=".length));
    }
    default:
      return raw;
  }
}
function get_urlencoded(text) {
  const { data, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    throw new Error("Malformed form data");
  }
  const { data, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    if (!match) {
      throw new Error("Malformed form data");
    }
    const raw_headers = match[1];
    const body2 = match[2].trim();
    let key;
    const headers = {};
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      headers[name] = value;
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          throw new Error("Malformed form data");
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      throw new Error("Malformed form data");
    append(key, body2);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !(incoming.path.split("/").pop() || "").includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: options2.paths.base + path + (q ? `?${q}` : "")
        }
      };
    }
  }
  const headers = lowercase_keys(incoming.headers);
  const request = {
    ...incoming,
    headers,
    body: parse_body(incoming.rawBody, headers),
    params: {},
    locals: {}
  };
  try {
    return await options2.hooks.handle({
      request,
      resolve: async (request2) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request2),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            branch: []
          });
        }
        const decoded = decodeURI(request2.path);
        for (const route of options2.manifest.routes) {
          const match = route.pattern.exec(decoded);
          if (!match)
            continue;
          const response = route.type === "endpoint" ? await render_endpoint(request2, route, match) : await render_page(request2, route, match, options2, state);
          if (response) {
            if (response.status === 200) {
              const cache_control = get_single_valued_header(response.headers, "cache-control");
              if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
                const etag = `"${hash(response.body || "")}"`;
                if (request2.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {}
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        const $session = await options2.hooks.getSession(request2);
        return await respond_with_error({
          request: request2,
          options: options2,
          state,
          $session,
          status: 404,
          error: new Error(`Not found: ${request2.path}`)
        });
      }
    });
  } catch (err) {
    const e = coalesce_to_error(err);
    options2.handle_error(e, request);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
Promise.resolve();
const escaped = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
const missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
let on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
function afterUpdate() {
}
var root_svelte_svelte_type_style_lang = "";
const css$9 = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: null
};
const Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  let { props_3 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  if ($$props.props_3 === void 0 && $$bindings.props_3 && props_3 !== void 0)
    $$bindings.props_3(props_3);
  $$result.css.add(css$9);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {
        default: () => `${components[3] ? `${validate_component(components[3] || missing_component, "svelte:component").$$render($$result, Object.assign(props_3 || {}), {}, {})}` : ``}`
      })}` : ``}`
    })}` : ``}`
  })}

${``}`;
});
let base = "";
let assets = "";
function set_paths(paths2) {
  base = paths2.base;
  assets = paths2.assets || base;
}
function set_prerendering(value) {
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
const template = ({ head, body: body2 }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n\n		' + head + '\n	</head>\n	<body>\n		<div id="svelte">' + body2 + "</div>\n	</body>\n</html>\n";
let options = null;
const default_settings = { paths: { "base": "/twine-trail-guide", "assets": "" } };
function init(settings = default_settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  const hooks = get_hooks(user_hooks);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: assets + "/_app/start-b64affc7.js",
      css: [assets + "/_app/assets/start-61d1577b.css", assets + "/_app/assets/vendor-ec9510ad.css"],
      js: [assets + "/_app/start-b64affc7.js", assets + "/_app/chunks/vendor-7f52b8a8.js", assets + "/_app/chunks/preload-helper-b1093eef.js", assets + "/_app/chunks/singletons-12a22614.js", assets + "/_app/chunks/paths-28a87002.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => assets + "/_app/" + entry_lookup[id],
    get_stack: (error2) => String(error2),
    handle_error: (error2, request) => {
      hooks.handleError({ error: error2, request });
      error2.stack = options.get_stack(error2);
    },
    hooks,
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    prerender: true,
    read: settings.read,
    root: Root,
    service_worker: null,
    router: true,
    ssr: true,
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
const empty = () => ({});
const manifest = {
  assets: [{ "file": "favicon.png", "size": 1571, "type": "image/png" }, { "file": "images/branching-path.png", "size": 19028, "type": "image/png" }, { "file": "images/default-story.png", "size": 25332, "type": "image/png" }, { "file": "images/delete-passage.png", "size": 20096, "type": "image/png" }, { "file": "images/intro-passage.png", "size": 21415, "type": "image/png" }, { "file": "images/linked-passages.png", "size": 12128, "type": "image/png" }, { "file": "images/new-branch.png", "size": 21587, "type": "image/png" }, { "file": "images/new-passage.png", "size": 20826, "type": "image/png" }, { "file": "images/passage-editor.png", "size": 13355, "type": "image/png" }, { "file": "images/passage-hover.png", "size": 10390, "type": "image/png" }, { "file": "images/planning.png", "size": 1271038, "type": "image/png" }, { "file": "images/play-button.png", "size": 25809, "type": "image/png" }, { "file": "images/publish-to-file.png", "size": 25768, "type": "image/png" }, { "file": "images/second-passage.png", "size": 20561, "type": "image/png" }, { "file": "images/twine-add-story.png", "size": 18123, "type": "image/png" }, { "file": "images/twine-chapbook.png", "size": 92036, "type": "image/png" }, { "file": "images/twine-format.png", "size": 48103, "type": "image/png" }, { "file": "images/twine-go-home.png", "size": 31293, "type": "image/png" }, { "file": "images/twine-home.png", "size": 1215028, "type": "image/png" }, { "file": "images/twine-new-story.png", "size": 51453, "type": "image/png" }, { "file": "images/twine-select-story.png", "size": 10907, "type": "image/png" }, { "file": "images/two-passages.png", "size": 10248, "type": "image/png" }, { "file": "robots.txt", "size": 67, "type": "text/plain" }, { "file": "twine-map/LICENSE", "size": 7048, "type": null }, { "file": "twine-map/README.adoc", "size": 0, "type": null }, { "file": "twine-map/locations.rec", "size": 0, "type": null }, { "file": "twine-map/trails.rec", "size": 892, "type": null }],
  layout: "src/routes/__layout.svelte",
  error: "src/routes/__error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/locations\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/locations/__layout.svelte", "src/routes/locations/index.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/locations\/story-with-multiple-endings\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/locations/__layout.svelte", "src/routes/locations/story-with-multiple-endings.md"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/locations\/branching-paths\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/locations/__layout.svelte", "src/routes/locations/branching-paths.md"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/locations\/create-passage\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/locations/__layout.svelte", "src/routes/locations/create-passage.md"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/locations\/link-passages\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/locations/__layout.svelte", "src/routes/locations/link-passages.md"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/locations\/start-a-story\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/locations/__layout.svelte", "src/routes/locations/start-a-story.md"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/trails\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/trails/__layout.svelte", "src/routes/trails/index.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/trails\/your-first-story\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/trails/__layout.svelte", "src/routes/trails/your-first-story.md"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/about\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/about.md"],
      b: ["src/routes/__error.svelte"]
    }
  ]
};
const get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
  handleError: hooks.handleError || (({ error: error2 }) => console.error(error2.stack)),
  externalFetch: hooks.externalFetch || fetch
});
const module_lookup = {
  "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout$2;
  }),
  "src/routes/__error.svelte": () => Promise.resolve().then(function() {
    return __error;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index$2;
  }),
  "src/routes/locations/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout$1;
  }),
  "src/routes/locations/index.svelte": () => Promise.resolve().then(function() {
    return index$1;
  }),
  "src/routes/locations/story-with-multiple-endings.md": () => Promise.resolve().then(function() {
    return storyWithMultipleEndings;
  }),
  "src/routes/locations/branching-paths.md": () => Promise.resolve().then(function() {
    return branchingPaths;
  }),
  "src/routes/locations/create-passage.md": () => Promise.resolve().then(function() {
    return createPassage;
  }),
  "src/routes/locations/link-passages.md": () => Promise.resolve().then(function() {
    return linkPassages;
  }),
  "src/routes/locations/start-a-story.md": () => Promise.resolve().then(function() {
    return startAStory;
  }),
  "src/routes/trails/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  "src/routes/trails/index.svelte": () => Promise.resolve().then(function() {
    return index;
  }),
  "src/routes/trails/your-first-story.md": () => Promise.resolve().then(function() {
    return yourFirstStory;
  }),
  "src/routes/about.md": () => Promise.resolve().then(function() {
    return about;
  })
};
const metadata_lookup = { "src/routes/__layout.svelte": { "entry": "pages/__layout.svelte-8c31879f.js", "css": ["assets/pages/__layout.svelte-3ae29d7b.css", "assets/vendor-ec9510ad.css"], "js": ["pages/__layout.svelte-8c31879f.js", "chunks/vendor-7f52b8a8.js"], "styles": [] }, "src/routes/__error.svelte": { "entry": "pages/__error.svelte-bfc5fcb1.js", "css": ["assets/vendor-ec9510ad.css"], "js": ["pages/__error.svelte-bfc5fcb1.js", "chunks/vendor-7f52b8a8.js", "chunks/paths-28a87002.js"], "styles": [] }, "src/routes/index.svelte": { "entry": "pages/index.svelte-9db3bc97.js", "css": ["assets/pages/index.svelte-133c1041.css", "assets/vendor-ec9510ad.css"], "js": ["pages/index.svelte-9db3bc97.js", "chunks/vendor-7f52b8a8.js", "chunks/Nav-fbf9f809.js", "chunks/paths-28a87002.js"], "styles": [] }, "src/routes/locations/__layout.svelte": { "entry": "pages/locations/__layout.svelte-6144a5b1.js", "css": ["assets/vendor-ec9510ad.css"], "js": ["pages/locations/__layout.svelte-6144a5b1.js", "chunks/vendor-7f52b8a8.js", "chunks/Nav-fbf9f809.js", "chunks/paths-28a87002.js"], "styles": [] }, "src/routes/locations/index.svelte": { "entry": "pages/locations/index.svelte-f6d3ab12.js", "css": ["assets/pages/locations/index.svelte-9d04a8a6.css", "assets/vendor-ec9510ad.css"], "js": ["pages/locations/index.svelte-f6d3ab12.js", "chunks/preload-helper-b1093eef.js", "chunks/vendor-7f52b8a8.js", "chunks/paths-28a87002.js", "chunks/navigation-51f4a605.js", "chunks/singletons-12a22614.js"], "styles": [] }, "src/routes/locations/story-with-multiple-endings.md": { "entry": "pages/locations/story-with-multiple-endings.md-57cb084e.js", "css": ["assets/vendor-ec9510ad.css", "assets/Standalone-f63679d0.css"], "js": ["pages/locations/story-with-multiple-endings.md-57cb084e.js", "chunks/vendor-7f52b8a8.js", "chunks/Standalone-9fd73395.js", "chunks/paths-28a87002.js"], "styles": [] }, "src/routes/locations/branching-paths.md": { "entry": "pages/locations/branching-paths.md-212a2057.js", "css": ["assets/vendor-ec9510ad.css", "assets/Standalone-f63679d0.css"], "js": ["pages/locations/branching-paths.md-212a2057.js", "chunks/vendor-7f52b8a8.js", "chunks/Standalone-9fd73395.js", "chunks/paths-28a87002.js"], "styles": [] }, "src/routes/locations/create-passage.md": { "entry": "pages/locations/create-passage.md-da18b7b5.js", "css": ["assets/vendor-ec9510ad.css", "assets/Standalone-f63679d0.css"], "js": ["pages/locations/create-passage.md-da18b7b5.js", "chunks/vendor-7f52b8a8.js", "chunks/Standalone-9fd73395.js", "chunks/paths-28a87002.js"], "styles": [] }, "src/routes/locations/link-passages.md": { "entry": "pages/locations/link-passages.md-0570e611.js", "css": ["assets/vendor-ec9510ad.css", "assets/Standalone-f63679d0.css"], "js": ["pages/locations/link-passages.md-0570e611.js", "chunks/vendor-7f52b8a8.js", "chunks/Standalone-9fd73395.js", "chunks/paths-28a87002.js"], "styles": [] }, "src/routes/locations/start-a-story.md": { "entry": "pages/locations/start-a-story.md-61e0f53d.js", "css": ["assets/vendor-ec9510ad.css", "assets/Standalone-f63679d0.css"], "js": ["pages/locations/start-a-story.md-61e0f53d.js", "chunks/vendor-7f52b8a8.js", "chunks/Standalone-9fd73395.js", "chunks/paths-28a87002.js"], "styles": [] }, "src/routes/trails/__layout.svelte": { "entry": "pages/trails/__layout.svelte-f771d0b7.js", "css": ["assets/vendor-ec9510ad.css"], "js": ["pages/trails/__layout.svelte-f771d0b7.js", "chunks/vendor-7f52b8a8.js", "chunks/Nav-fbf9f809.js", "chunks/paths-28a87002.js"], "styles": [] }, "src/routes/trails/index.svelte": { "entry": "pages/trails/index.svelte-7080c608.js", "css": ["assets/pages/trails/index.svelte-ecbc8621.css", "assets/vendor-ec9510ad.css"], "js": ["pages/trails/index.svelte-7080c608.js", "chunks/preload-helper-b1093eef.js", "chunks/vendor-7f52b8a8.js", "chunks/paths-28a87002.js", "chunks/navigation-51f4a605.js", "chunks/singletons-12a22614.js"], "styles": [] }, "src/routes/trails/your-first-story.md": { "entry": "pages/trails/your-first-story.md-c0e84246.js", "css": ["assets/pages/trails/your-first-story.md-3fadfa43.css", "assets/vendor-ec9510ad.css"], "js": ["pages/trails/your-first-story.md-c0e84246.js", "chunks/vendor-7f52b8a8.js", "chunks/preload-helper-b1093eef.js"], "styles": [] }, "src/routes/about.md": { "entry": "pages/about.md-c8491366.js", "css": ["assets/vendor-ec9510ad.css"], "js": ["pages/about.md-c8491366.js", "chunks/vendor-7f52b8a8.js", "chunks/Nav-fbf9f809.js", "chunks/paths-28a87002.js"], "styles": [] } };
async function load_component(file) {
  const { entry, css: css2, js, styles } = metadata_lookup[file];
  return {
    module: await module_lookup[file](),
    entry: assets + "/_app/" + entry,
    css: css2.map((dep) => assets + "/_app/" + dep),
    js: js.map((dep) => assets + "/_app/" + dep),
    styles
  };
}
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond({ ...request, host }, options, { prerender });
}
var __layout_svelte_svelte_type_style_lang = "";
const css$8 = {
  code: '@charset "UTF-8";.pagination-previous,.pagination-next,.pagination-link,.pagination-ellipsis,.file-cta,.file-name,.select select,.textarea,.input,.button{-moz-appearance:none;-webkit-appearance:none;align-items:center;border:1px solid transparent;border-radius:4px;box-shadow:none;display:inline-flex;font-size:1rem;height:2.5em;justify-content:flex-start;line-height:1.5;padding-bottom:calc(0.5em - 1px);padding-left:calc(0.75em - 1px);padding-right:calc(0.75em - 1px);padding-top:calc(0.5em - 1px);position:relative;vertical-align:top}.pagination-previous:focus,.pagination-next:focus,.pagination-link:focus,.pagination-ellipsis:focus,.file-cta:focus,.file-name:focus,.select select:focus,.textarea:focus,.input:focus,.button:focus,.is-focused.pagination-previous,.is-focused.pagination-next,.is-focused.pagination-link,.is-focused.pagination-ellipsis,.is-focused.file-cta,.is-focused.file-name,.select select.is-focused,.is-focused.textarea,.is-focused.input,.is-focused.button,.pagination-previous:active,.pagination-next:active,.pagination-link:active,.pagination-ellipsis:active,.file-cta:active,.file-name:active,.select select:active,.textarea:active,.input:active,.button:active,.is-active.pagination-previous,.is-active.pagination-next,.is-active.pagination-link,.is-active.pagination-ellipsis,.is-active.file-cta,.is-active.file-name,.select select.is-active,.is-active.textarea,.is-active.input,.is-active.button{outline:none}[disabled].pagination-previous,[disabled].pagination-next,[disabled].pagination-link,[disabled].pagination-ellipsis,[disabled].file-cta,[disabled].file-name,.select select[disabled],[disabled].textarea,[disabled].input,[disabled].button,fieldset[disabled] .pagination-previous,fieldset[disabled] .pagination-next,fieldset[disabled] .pagination-link,fieldset[disabled] .pagination-ellipsis,fieldset[disabled] .file-cta,fieldset[disabled] .file-name,fieldset[disabled] .select select,.select fieldset[disabled] select,fieldset[disabled] .textarea,fieldset[disabled] .input,fieldset[disabled] .button{cursor:not-allowed}.is-unselectable,.tabs,.pagination-previous,.pagination-next,.pagination-link,.pagination-ellipsis,.breadcrumb,.file,.button{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.navbar-link:not(.is-arrowless)::after,.select:not(.is-multiple):not(.is-loading)::after{border:3px solid transparent;border-radius:2px;border-right:0;border-top:0;content:" ";display:block;height:0.625em;margin-top:-0.4375em;pointer-events:none;position:absolute;top:50%;transform:rotate(-45deg);transform-origin:center;width:0.625em}.tabs:not(:last-child),.pagination:not(:last-child),.message:not(:last-child),.level:not(:last-child),.breadcrumb:not(:last-child),.block:not(:last-child),.title:not(:last-child),.subtitle:not(:last-child),.table-container:not(:last-child),.table:not(:last-child),.progress:not(:last-child),.notification:not(:last-child),.content:not(:last-child),.box:not(:last-child){margin-bottom:1.5rem}.modal-close,.delete{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-moz-appearance:none;-webkit-appearance:none;background-color:rgba(10, 10, 10, 0.2);border:none;border-radius:9999px;cursor:pointer;pointer-events:auto;display:inline-block;flex-grow:0;flex-shrink:0;font-size:0;height:20px;max-height:20px;max-width:20px;min-height:20px;min-width:20px;outline:none;position:relative;vertical-align:top;width:20px}.modal-close::before,.delete::before,.modal-close::after,.delete::after{background-color:white;content:"";display:block;left:50%;position:absolute;top:50%;transform:translateX(-50%) translateY(-50%) rotate(45deg);transform-origin:center center}.modal-close::before,.delete::before{height:2px;width:50%}.modal-close::after,.delete::after{height:50%;width:2px}.modal-close:hover,.delete:hover,.modal-close:focus,.delete:focus{background-color:rgba(10, 10, 10, 0.3)}.modal-close:active,.delete:active{background-color:rgba(10, 10, 10, 0.4)}.is-small.modal-close,.is-small.delete{height:16px;max-height:16px;max-width:16px;min-height:16px;min-width:16px;width:16px}.is-medium.modal-close,.is-medium.delete{height:24px;max-height:24px;max-width:24px;min-height:24px;min-width:24px;width:24px}.is-large.modal-close,.is-large.delete{height:32px;max-height:32px;max-width:32px;min-height:32px;min-width:32px;width:32px}.control.is-loading::after,.select.is-loading::after,.loader,.button.is-loading::after{animation:spinAround 500ms infinite linear;border:2px solid #dbdbdb;border-radius:9999px;border-right-color:transparent;border-top-color:transparent;content:"";display:block;height:1em;position:relative;width:1em}.hero-video,.is-overlay,.modal-background,.modal,.image.is-square img,.post>p>img.is-square img,.image.is-square .has-ratio,.post>p>img.is-square .has-ratio,.image.is-1by1 img,.post>p>img.is-1by1 img,.image.is-1by1 .has-ratio,.post>p>img.is-1by1 .has-ratio,.image.is-5by4 img,.post>p>img.is-5by4 img,.image.is-5by4 .has-ratio,.post>p>img.is-5by4 .has-ratio,.image.is-4by3 img,.post>p>img.is-4by3 img,.image.is-4by3 .has-ratio,.post>p>img.is-4by3 .has-ratio,.image.is-3by2 img,.post>p>img.is-3by2 img,.image.is-3by2 .has-ratio,.post>p>img.is-3by2 .has-ratio,.image.is-5by3 img,.post>p>img.is-5by3 img,.image.is-5by3 .has-ratio,.post>p>img.is-5by3 .has-ratio,.image.is-16by9 img,.post>p>img.is-16by9 img,.image.is-16by9 .has-ratio,.post>p>img.is-16by9 .has-ratio,.image.is-2by1 img,.post>p>img.is-2by1 img,.image.is-2by1 .has-ratio,.post>p>img.is-2by1 .has-ratio,.image.is-3by1 img,.post>p>img.is-3by1 img,.image.is-3by1 .has-ratio,.post>p>img.is-3by1 .has-ratio,.image.is-4by5 img,.post>p>img.is-4by5 img,.image.is-4by5 .has-ratio,.post>p>img.is-4by5 .has-ratio,.image.is-3by4 img,.post>p>img.is-3by4 img,.image.is-3by4 .has-ratio,.post>p>img.is-3by4 .has-ratio,.image.is-2by3 img,.post>p>img.is-2by3 img,.image.is-2by3 .has-ratio,.post>p>img.is-2by3 .has-ratio,.image.is-3by5 img,.post>p>img.is-3by5 img,.image.is-3by5 .has-ratio,.post>p>img.is-3by5 .has-ratio,.image.is-9by16 img,.post>p>img.is-9by16 img,.image.is-9by16 .has-ratio,.post>p>img.is-9by16 .has-ratio,.image.is-1by2 img,.post>p>img.is-1by2 img,.image.is-1by2 .has-ratio,.post>p>img.is-1by2 .has-ratio,.image.is-1by3 img,.post>p>img.is-1by3 img,.image.is-1by3 .has-ratio,.post>p>img.is-1by3 .has-ratio{bottom:0;left:0;position:absolute;right:0;top:0}.navbar-burger{-moz-appearance:none;-webkit-appearance:none;appearance:none;background:none;border:none;color:currentColor;font-family:inherit;font-size:1em;margin:0;padding:0}html,body,p,ol,ul,li,dl,dt,dd,blockquote,figure,fieldset,legend,textarea,pre,iframe,hr,h1,h2,h3,h4,h5,h6{margin:0;padding:0}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}ul{list-style:none}button,input,select,textarea{margin:0}html{box-sizing:border-box}*,*::before,*::after{box-sizing:inherit}img,video{height:auto;max-width:100%}iframe{border:0}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}td:not([align]),th:not([align]){text-align:inherit}html{background-color:white;font-size:16px;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;min-width:300px;overflow-x:hidden;overflow-y:auto;text-rendering:optimizeLegibility;text-size-adjust:100%}article,aside,figure,footer,header,hgroup,section{display:block}body,button,input,optgroup,select,textarea{font-family:BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif}code,pre{-moz-osx-font-smoothing:auto;-webkit-font-smoothing:auto;font-family:monospace}body{color:#4a4a4a;font-size:1em;font-weight:400;line-height:1.5}a{color:#485fc7;cursor:pointer;text-decoration:none}a strong{color:currentColor}a:hover{color:#363636}code{background-color:whitesmoke;color:#da1039;font-size:0.875em;font-weight:normal;padding:0.25em 0.5em 0.25em}hr{background-color:whitesmoke;border:none;display:block;height:2px;margin:1.5rem 0}img{height:auto;max-width:100%}input[type=checkbox],input[type=radio]{vertical-align:baseline}small{font-size:0.875em}span{font-style:inherit;font-weight:inherit}strong{color:#363636;font-weight:700}fieldset{border:none}pre{-webkit-overflow-scrolling:touch;background-color:whitesmoke;color:#4a4a4a;font-size:0.875em;overflow-x:auto;padding:1.25rem 1.5rem;white-space:pre;word-wrap:normal}pre code{background-color:transparent;color:currentColor;font-size:1em;padding:0}table td,table th{vertical-align:top}table td:not([align]),table th:not([align]){text-align:inherit}table th{color:#363636}@keyframes spinAround{from{transform:rotate(0deg)}to{transform:rotate(359deg)}}.box{background-color:white;border-radius:6px;box-shadow:0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);color:#4a4a4a;display:block;padding:1.25rem}a.box:hover,a.box:focus{box-shadow:0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0 0 1px #485fc7}a.box:active{box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2), 0 0 0 1px #485fc7}.button{background-color:white;border-color:#dbdbdb;border-width:1px;color:#363636;cursor:pointer;justify-content:center;padding-bottom:calc(0.5em - 1px);padding-left:1em;padding-right:1em;padding-top:calc(0.5em - 1px);text-align:center;white-space:nowrap}.button strong{color:inherit}.button .icon,.button .icon.is-small,.button .icon.is-medium,.button .icon.is-large{height:1.5em;width:1.5em}.button .icon:first-child:not(:last-child){margin-left:calc(-0.5em - 1px);margin-right:0.25em}.button .icon:last-child:not(:first-child){margin-left:0.25em;margin-right:calc(-0.5em - 1px)}.button .icon:first-child:last-child{margin-left:calc(-0.5em - 1px);margin-right:calc(-0.5em - 1px)}.button:hover,.button.is-hovered{border-color:#b5b5b5;color:#363636}.button:focus,.button.is-focused{border-color:#485fc7;color:#363636}.button:focus:not(:active),.button.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(72, 95, 199, 0.25)}.button:active,.button.is-active{border-color:#4a4a4a;color:#363636}.button.is-text{background-color:transparent;border-color:transparent;color:#4a4a4a;text-decoration:underline}.button.is-text:hover,.button.is-text.is-hovered,.button.is-text:focus,.button.is-text.is-focused{background-color:whitesmoke;color:#363636}.button.is-text:active,.button.is-text.is-active{background-color:#e8e8e8;color:#363636}.button.is-text[disabled],fieldset[disabled] .button.is-text{background-color:transparent;border-color:transparent;box-shadow:none}.button.is-ghost{background:none;border-color:transparent;color:#485fc7;text-decoration:none}.button.is-ghost:hover,.button.is-ghost.is-hovered{color:#485fc7;text-decoration:underline}.button.is-white{background-color:white;border-color:transparent;color:#0a0a0a}.button.is-white:hover,.button.is-white.is-hovered{background-color:#f9f9f9;border-color:transparent;color:#0a0a0a}.button.is-white:focus,.button.is-white.is-focused{border-color:transparent;color:#0a0a0a}.button.is-white:focus:not(:active),.button.is-white.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(255, 255, 255, 0.25)}.button.is-white:active,.button.is-white.is-active{background-color:#f2f2f2;border-color:transparent;color:#0a0a0a}.button.is-white[disabled],fieldset[disabled] .button.is-white{background-color:white;border-color:transparent;box-shadow:none}.button.is-white.is-inverted{background-color:#0a0a0a;color:white}.button.is-white.is-inverted:hover,.button.is-white.is-inverted.is-hovered{background-color:black}.button.is-white.is-inverted[disabled],fieldset[disabled] .button.is-white.is-inverted{background-color:#0a0a0a;border-color:transparent;box-shadow:none;color:white}.button.is-white.is-loading::after{border-color:transparent transparent #0a0a0a #0a0a0a !important}.button.is-white.is-outlined{background-color:transparent;border-color:white;color:white}.button.is-white.is-outlined:hover,.button.is-white.is-outlined.is-hovered,.button.is-white.is-outlined:focus,.button.is-white.is-outlined.is-focused{background-color:white;border-color:white;color:#0a0a0a}.button.is-white.is-outlined.is-loading::after{border-color:transparent transparent white white !important}.button.is-white.is-outlined.is-loading:hover::after,.button.is-white.is-outlined.is-loading.is-hovered::after,.button.is-white.is-outlined.is-loading:focus::after,.button.is-white.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #0a0a0a #0a0a0a !important}.button.is-white.is-outlined[disabled],fieldset[disabled] .button.is-white.is-outlined{background-color:transparent;border-color:white;box-shadow:none;color:white}.button.is-white.is-inverted.is-outlined{background-color:transparent;border-color:#0a0a0a;color:#0a0a0a}.button.is-white.is-inverted.is-outlined:hover,.button.is-white.is-inverted.is-outlined.is-hovered,.button.is-white.is-inverted.is-outlined:focus,.button.is-white.is-inverted.is-outlined.is-focused{background-color:#0a0a0a;color:white}.button.is-white.is-inverted.is-outlined.is-loading:hover::after,.button.is-white.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-white.is-inverted.is-outlined.is-loading:focus::after,.button.is-white.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent white white !important}.button.is-white.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-white.is-inverted.is-outlined{background-color:transparent;border-color:#0a0a0a;box-shadow:none;color:#0a0a0a}.button.is-black{background-color:#0a0a0a;border-color:transparent;color:white}.button.is-black:hover,.button.is-black.is-hovered{background-color:#040404;border-color:transparent;color:white}.button.is-black:focus,.button.is-black.is-focused{border-color:transparent;color:white}.button.is-black:focus:not(:active),.button.is-black.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(10, 10, 10, 0.25)}.button.is-black:active,.button.is-black.is-active{background-color:black;border-color:transparent;color:white}.button.is-black[disabled],fieldset[disabled] .button.is-black{background-color:#0a0a0a;border-color:transparent;box-shadow:none}.button.is-black.is-inverted{background-color:white;color:#0a0a0a}.button.is-black.is-inverted:hover,.button.is-black.is-inverted.is-hovered{background-color:#f2f2f2}.button.is-black.is-inverted[disabled],fieldset[disabled] .button.is-black.is-inverted{background-color:white;border-color:transparent;box-shadow:none;color:#0a0a0a}.button.is-black.is-loading::after{border-color:transparent transparent white white !important}.button.is-black.is-outlined{background-color:transparent;border-color:#0a0a0a;color:#0a0a0a}.button.is-black.is-outlined:hover,.button.is-black.is-outlined.is-hovered,.button.is-black.is-outlined:focus,.button.is-black.is-outlined.is-focused{background-color:#0a0a0a;border-color:#0a0a0a;color:white}.button.is-black.is-outlined.is-loading::after{border-color:transparent transparent #0a0a0a #0a0a0a !important}.button.is-black.is-outlined.is-loading:hover::after,.button.is-black.is-outlined.is-loading.is-hovered::after,.button.is-black.is-outlined.is-loading:focus::after,.button.is-black.is-outlined.is-loading.is-focused::after{border-color:transparent transparent white white !important}.button.is-black.is-outlined[disabled],fieldset[disabled] .button.is-black.is-outlined{background-color:transparent;border-color:#0a0a0a;box-shadow:none;color:#0a0a0a}.button.is-black.is-inverted.is-outlined{background-color:transparent;border-color:white;color:white}.button.is-black.is-inverted.is-outlined:hover,.button.is-black.is-inverted.is-outlined.is-hovered,.button.is-black.is-inverted.is-outlined:focus,.button.is-black.is-inverted.is-outlined.is-focused{background-color:white;color:#0a0a0a}.button.is-black.is-inverted.is-outlined.is-loading:hover::after,.button.is-black.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-black.is-inverted.is-outlined.is-loading:focus::after,.button.is-black.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #0a0a0a #0a0a0a !important}.button.is-black.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-black.is-inverted.is-outlined{background-color:transparent;border-color:white;box-shadow:none;color:white}.button.is-light{background-color:whitesmoke;border-color:transparent;color:rgba(0, 0, 0, 0.7)}.button.is-light:hover,.button.is-light.is-hovered{background-color:#eeeeee;border-color:transparent;color:rgba(0, 0, 0, 0.7)}.button.is-light:focus,.button.is-light.is-focused{border-color:transparent;color:rgba(0, 0, 0, 0.7)}.button.is-light:focus:not(:active),.button.is-light.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(245, 245, 245, 0.25)}.button.is-light:active,.button.is-light.is-active{background-color:#e8e8e8;border-color:transparent;color:rgba(0, 0, 0, 0.7)}.button.is-light[disabled],fieldset[disabled] .button.is-light{background-color:whitesmoke;border-color:transparent;box-shadow:none}.button.is-light.is-inverted{background-color:rgba(0, 0, 0, 0.7);color:whitesmoke}.button.is-light.is-inverted:hover,.button.is-light.is-inverted.is-hovered{background-color:rgba(0, 0, 0, 0.7)}.button.is-light.is-inverted[disabled],fieldset[disabled] .button.is-light.is-inverted{background-color:rgba(0, 0, 0, 0.7);border-color:transparent;box-shadow:none;color:whitesmoke}.button.is-light.is-loading::after{border-color:transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important}.button.is-light.is-outlined{background-color:transparent;border-color:whitesmoke;color:whitesmoke}.button.is-light.is-outlined:hover,.button.is-light.is-outlined.is-hovered,.button.is-light.is-outlined:focus,.button.is-light.is-outlined.is-focused{background-color:whitesmoke;border-color:whitesmoke;color:rgba(0, 0, 0, 0.7)}.button.is-light.is-outlined.is-loading::after{border-color:transparent transparent whitesmoke whitesmoke !important}.button.is-light.is-outlined.is-loading:hover::after,.button.is-light.is-outlined.is-loading.is-hovered::after,.button.is-light.is-outlined.is-loading:focus::after,.button.is-light.is-outlined.is-loading.is-focused::after{border-color:transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important}.button.is-light.is-outlined[disabled],fieldset[disabled] .button.is-light.is-outlined{background-color:transparent;border-color:whitesmoke;box-shadow:none;color:whitesmoke}.button.is-light.is-inverted.is-outlined{background-color:transparent;border-color:rgba(0, 0, 0, 0.7);color:rgba(0, 0, 0, 0.7)}.button.is-light.is-inverted.is-outlined:hover,.button.is-light.is-inverted.is-outlined.is-hovered,.button.is-light.is-inverted.is-outlined:focus,.button.is-light.is-inverted.is-outlined.is-focused{background-color:rgba(0, 0, 0, 0.7);color:whitesmoke}.button.is-light.is-inverted.is-outlined.is-loading:hover::after,.button.is-light.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-light.is-inverted.is-outlined.is-loading:focus::after,.button.is-light.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent whitesmoke whitesmoke !important}.button.is-light.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-light.is-inverted.is-outlined{background-color:transparent;border-color:rgba(0, 0, 0, 0.7);box-shadow:none;color:rgba(0, 0, 0, 0.7)}.button.is-dark{background-color:#363636;border-color:transparent;color:#fff}.button.is-dark:hover,.button.is-dark.is-hovered{background-color:#2f2f2f;border-color:transparent;color:#fff}.button.is-dark:focus,.button.is-dark.is-focused{border-color:transparent;color:#fff}.button.is-dark:focus:not(:active),.button.is-dark.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(54, 54, 54, 0.25)}.button.is-dark:active,.button.is-dark.is-active{background-color:#292929;border-color:transparent;color:#fff}.button.is-dark[disabled],fieldset[disabled] .button.is-dark{background-color:#363636;border-color:transparent;box-shadow:none}.button.is-dark.is-inverted{background-color:#fff;color:#363636}.button.is-dark.is-inverted:hover,.button.is-dark.is-inverted.is-hovered{background-color:#f2f2f2}.button.is-dark.is-inverted[disabled],fieldset[disabled] .button.is-dark.is-inverted{background-color:#fff;border-color:transparent;box-shadow:none;color:#363636}.button.is-dark.is-loading::after{border-color:transparent transparent #fff #fff !important}.button.is-dark.is-outlined{background-color:transparent;border-color:#363636;color:#363636}.button.is-dark.is-outlined:hover,.button.is-dark.is-outlined.is-hovered,.button.is-dark.is-outlined:focus,.button.is-dark.is-outlined.is-focused{background-color:#363636;border-color:#363636;color:#fff}.button.is-dark.is-outlined.is-loading::after{border-color:transparent transparent #363636 #363636 !important}.button.is-dark.is-outlined.is-loading:hover::after,.button.is-dark.is-outlined.is-loading.is-hovered::after,.button.is-dark.is-outlined.is-loading:focus::after,.button.is-dark.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #fff #fff !important}.button.is-dark.is-outlined[disabled],fieldset[disabled] .button.is-dark.is-outlined{background-color:transparent;border-color:#363636;box-shadow:none;color:#363636}.button.is-dark.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-dark.is-inverted.is-outlined:hover,.button.is-dark.is-inverted.is-outlined.is-hovered,.button.is-dark.is-inverted.is-outlined:focus,.button.is-dark.is-inverted.is-outlined.is-focused{background-color:#fff;color:#363636}.button.is-dark.is-inverted.is-outlined.is-loading:hover::after,.button.is-dark.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-dark.is-inverted.is-outlined.is-loading:focus::after,.button.is-dark.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #363636 #363636 !important}.button.is-dark.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-dark.is-inverted.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-primary{background-color:#00d1b2;border-color:transparent;color:#fff}.button.is-primary:hover,.button.is-primary.is-hovered{background-color:#00c4a7;border-color:transparent;color:#fff}.button.is-primary:focus,.button.is-primary.is-focused{border-color:transparent;color:#fff}.button.is-primary:focus:not(:active),.button.is-primary.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(0, 209, 178, 0.25)}.button.is-primary:active,.button.is-primary.is-active{background-color:#00b89c;border-color:transparent;color:#fff}.button.is-primary[disabled],fieldset[disabled] .button.is-primary{background-color:#00d1b2;border-color:transparent;box-shadow:none}.button.is-primary.is-inverted{background-color:#fff;color:#00d1b2}.button.is-primary.is-inverted:hover,.button.is-primary.is-inverted.is-hovered{background-color:#f2f2f2}.button.is-primary.is-inverted[disabled],fieldset[disabled] .button.is-primary.is-inverted{background-color:#fff;border-color:transparent;box-shadow:none;color:#00d1b2}.button.is-primary.is-loading::after{border-color:transparent transparent #fff #fff !important}.button.is-primary.is-outlined{background-color:transparent;border-color:#00d1b2;color:#00d1b2}.button.is-primary.is-outlined:hover,.button.is-primary.is-outlined.is-hovered,.button.is-primary.is-outlined:focus,.button.is-primary.is-outlined.is-focused{background-color:#00d1b2;border-color:#00d1b2;color:#fff}.button.is-primary.is-outlined.is-loading::after{border-color:transparent transparent #00d1b2 #00d1b2 !important}.button.is-primary.is-outlined.is-loading:hover::after,.button.is-primary.is-outlined.is-loading.is-hovered::after,.button.is-primary.is-outlined.is-loading:focus::after,.button.is-primary.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #fff #fff !important}.button.is-primary.is-outlined[disabled],fieldset[disabled] .button.is-primary.is-outlined{background-color:transparent;border-color:#00d1b2;box-shadow:none;color:#00d1b2}.button.is-primary.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-primary.is-inverted.is-outlined:hover,.button.is-primary.is-inverted.is-outlined.is-hovered,.button.is-primary.is-inverted.is-outlined:focus,.button.is-primary.is-inverted.is-outlined.is-focused{background-color:#fff;color:#00d1b2}.button.is-primary.is-inverted.is-outlined.is-loading:hover::after,.button.is-primary.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-primary.is-inverted.is-outlined.is-loading:focus::after,.button.is-primary.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #00d1b2 #00d1b2 !important}.button.is-primary.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-primary.is-inverted.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-primary.is-light{background-color:#ebfffc;color:#00947e}.button.is-primary.is-light:hover,.button.is-primary.is-light.is-hovered{background-color:#defffa;border-color:transparent;color:#00947e}.button.is-primary.is-light:active,.button.is-primary.is-light.is-active{background-color:#d1fff8;border-color:transparent;color:#00947e}.button.is-link{background-color:#485fc7;border-color:transparent;color:#fff}.button.is-link:hover,.button.is-link.is-hovered{background-color:#3e56c4;border-color:transparent;color:#fff}.button.is-link:focus,.button.is-link.is-focused{border-color:transparent;color:#fff}.button.is-link:focus:not(:active),.button.is-link.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(72, 95, 199, 0.25)}.button.is-link:active,.button.is-link.is-active{background-color:#3a51bb;border-color:transparent;color:#fff}.button.is-link[disabled],fieldset[disabled] .button.is-link{background-color:#485fc7;border-color:transparent;box-shadow:none}.button.is-link.is-inverted{background-color:#fff;color:#485fc7}.button.is-link.is-inverted:hover,.button.is-link.is-inverted.is-hovered{background-color:#f2f2f2}.button.is-link.is-inverted[disabled],fieldset[disabled] .button.is-link.is-inverted{background-color:#fff;border-color:transparent;box-shadow:none;color:#485fc7}.button.is-link.is-loading::after{border-color:transparent transparent #fff #fff !important}.button.is-link.is-outlined{background-color:transparent;border-color:#485fc7;color:#485fc7}.button.is-link.is-outlined:hover,.button.is-link.is-outlined.is-hovered,.button.is-link.is-outlined:focus,.button.is-link.is-outlined.is-focused{background-color:#485fc7;border-color:#485fc7;color:#fff}.button.is-link.is-outlined.is-loading::after{border-color:transparent transparent #485fc7 #485fc7 !important}.button.is-link.is-outlined.is-loading:hover::after,.button.is-link.is-outlined.is-loading.is-hovered::after,.button.is-link.is-outlined.is-loading:focus::after,.button.is-link.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #fff #fff !important}.button.is-link.is-outlined[disabled],fieldset[disabled] .button.is-link.is-outlined{background-color:transparent;border-color:#485fc7;box-shadow:none;color:#485fc7}.button.is-link.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-link.is-inverted.is-outlined:hover,.button.is-link.is-inverted.is-outlined.is-hovered,.button.is-link.is-inverted.is-outlined:focus,.button.is-link.is-inverted.is-outlined.is-focused{background-color:#fff;color:#485fc7}.button.is-link.is-inverted.is-outlined.is-loading:hover::after,.button.is-link.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-link.is-inverted.is-outlined.is-loading:focus::after,.button.is-link.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #485fc7 #485fc7 !important}.button.is-link.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-link.is-inverted.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-link.is-light{background-color:#eff1fa;color:#3850b7}.button.is-link.is-light:hover,.button.is-link.is-light.is-hovered{background-color:#e6e9f7;border-color:transparent;color:#3850b7}.button.is-link.is-light:active,.button.is-link.is-light.is-active{background-color:#dce0f4;border-color:transparent;color:#3850b7}.button.is-info{background-color:#3e8ed0;border-color:transparent;color:#fff}.button.is-info:hover,.button.is-info.is-hovered{background-color:#3488ce;border-color:transparent;color:#fff}.button.is-info:focus,.button.is-info.is-focused{border-color:transparent;color:#fff}.button.is-info:focus:not(:active),.button.is-info.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(62, 142, 208, 0.25)}.button.is-info:active,.button.is-info.is-active{background-color:#3082c5;border-color:transparent;color:#fff}.button.is-info[disabled],fieldset[disabled] .button.is-info{background-color:#3e8ed0;border-color:transparent;box-shadow:none}.button.is-info.is-inverted{background-color:#fff;color:#3e8ed0}.button.is-info.is-inverted:hover,.button.is-info.is-inverted.is-hovered{background-color:#f2f2f2}.button.is-info.is-inverted[disabled],fieldset[disabled] .button.is-info.is-inverted{background-color:#fff;border-color:transparent;box-shadow:none;color:#3e8ed0}.button.is-info.is-loading::after{border-color:transparent transparent #fff #fff !important}.button.is-info.is-outlined{background-color:transparent;border-color:#3e8ed0;color:#3e8ed0}.button.is-info.is-outlined:hover,.button.is-info.is-outlined.is-hovered,.button.is-info.is-outlined:focus,.button.is-info.is-outlined.is-focused{background-color:#3e8ed0;border-color:#3e8ed0;color:#fff}.button.is-info.is-outlined.is-loading::after{border-color:transparent transparent #3e8ed0 #3e8ed0 !important}.button.is-info.is-outlined.is-loading:hover::after,.button.is-info.is-outlined.is-loading.is-hovered::after,.button.is-info.is-outlined.is-loading:focus::after,.button.is-info.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #fff #fff !important}.button.is-info.is-outlined[disabled],fieldset[disabled] .button.is-info.is-outlined{background-color:transparent;border-color:#3e8ed0;box-shadow:none;color:#3e8ed0}.button.is-info.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-info.is-inverted.is-outlined:hover,.button.is-info.is-inverted.is-outlined.is-hovered,.button.is-info.is-inverted.is-outlined:focus,.button.is-info.is-inverted.is-outlined.is-focused{background-color:#fff;color:#3e8ed0}.button.is-info.is-inverted.is-outlined.is-loading:hover::after,.button.is-info.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-info.is-inverted.is-outlined.is-loading:focus::after,.button.is-info.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #3e8ed0 #3e8ed0 !important}.button.is-info.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-info.is-inverted.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-info.is-light{background-color:#eff5fb;color:#296fa8}.button.is-info.is-light:hover,.button.is-info.is-light.is-hovered{background-color:#e4eff9;border-color:transparent;color:#296fa8}.button.is-info.is-light:active,.button.is-info.is-light.is-active{background-color:#dae9f6;border-color:transparent;color:#296fa8}.button.is-success{background-color:#48c78e;border-color:transparent;color:#fff}.button.is-success:hover,.button.is-success.is-hovered{background-color:#3ec487;border-color:transparent;color:#fff}.button.is-success:focus,.button.is-success.is-focused{border-color:transparent;color:#fff}.button.is-success:focus:not(:active),.button.is-success.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(72, 199, 142, 0.25)}.button.is-success:active,.button.is-success.is-active{background-color:#3abb81;border-color:transparent;color:#fff}.button.is-success[disabled],fieldset[disabled] .button.is-success{background-color:#48c78e;border-color:transparent;box-shadow:none}.button.is-success.is-inverted{background-color:#fff;color:#48c78e}.button.is-success.is-inverted:hover,.button.is-success.is-inverted.is-hovered{background-color:#f2f2f2}.button.is-success.is-inverted[disabled],fieldset[disabled] .button.is-success.is-inverted{background-color:#fff;border-color:transparent;box-shadow:none;color:#48c78e}.button.is-success.is-loading::after{border-color:transparent transparent #fff #fff !important}.button.is-success.is-outlined{background-color:transparent;border-color:#48c78e;color:#48c78e}.button.is-success.is-outlined:hover,.button.is-success.is-outlined.is-hovered,.button.is-success.is-outlined:focus,.button.is-success.is-outlined.is-focused{background-color:#48c78e;border-color:#48c78e;color:#fff}.button.is-success.is-outlined.is-loading::after{border-color:transparent transparent #48c78e #48c78e !important}.button.is-success.is-outlined.is-loading:hover::after,.button.is-success.is-outlined.is-loading.is-hovered::after,.button.is-success.is-outlined.is-loading:focus::after,.button.is-success.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #fff #fff !important}.button.is-success.is-outlined[disabled],fieldset[disabled] .button.is-success.is-outlined{background-color:transparent;border-color:#48c78e;box-shadow:none;color:#48c78e}.button.is-success.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-success.is-inverted.is-outlined:hover,.button.is-success.is-inverted.is-outlined.is-hovered,.button.is-success.is-inverted.is-outlined:focus,.button.is-success.is-inverted.is-outlined.is-focused{background-color:#fff;color:#48c78e}.button.is-success.is-inverted.is-outlined.is-loading:hover::after,.button.is-success.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-success.is-inverted.is-outlined.is-loading:focus::after,.button.is-success.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #48c78e #48c78e !important}.button.is-success.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-success.is-inverted.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-success.is-light{background-color:#effaf5;color:#257953}.button.is-success.is-light:hover,.button.is-success.is-light.is-hovered{background-color:#e6f7ef;border-color:transparent;color:#257953}.button.is-success.is-light:active,.button.is-success.is-light.is-active{background-color:#dcf4e9;border-color:transparent;color:#257953}.button.is-warning{background-color:#ffe08a;border-color:transparent;color:rgba(0, 0, 0, 0.7)}.button.is-warning:hover,.button.is-warning.is-hovered{background-color:#ffdc7d;border-color:transparent;color:rgba(0, 0, 0, 0.7)}.button.is-warning:focus,.button.is-warning.is-focused{border-color:transparent;color:rgba(0, 0, 0, 0.7)}.button.is-warning:focus:not(:active),.button.is-warning.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(255, 224, 138, 0.25)}.button.is-warning:active,.button.is-warning.is-active{background-color:#ffd970;border-color:transparent;color:rgba(0, 0, 0, 0.7)}.button.is-warning[disabled],fieldset[disabled] .button.is-warning{background-color:#ffe08a;border-color:transparent;box-shadow:none}.button.is-warning.is-inverted{background-color:rgba(0, 0, 0, 0.7);color:#ffe08a}.button.is-warning.is-inverted:hover,.button.is-warning.is-inverted.is-hovered{background-color:rgba(0, 0, 0, 0.7)}.button.is-warning.is-inverted[disabled],fieldset[disabled] .button.is-warning.is-inverted{background-color:rgba(0, 0, 0, 0.7);border-color:transparent;box-shadow:none;color:#ffe08a}.button.is-warning.is-loading::after{border-color:transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important}.button.is-warning.is-outlined{background-color:transparent;border-color:#ffe08a;color:#ffe08a}.button.is-warning.is-outlined:hover,.button.is-warning.is-outlined.is-hovered,.button.is-warning.is-outlined:focus,.button.is-warning.is-outlined.is-focused{background-color:#ffe08a;border-color:#ffe08a;color:rgba(0, 0, 0, 0.7)}.button.is-warning.is-outlined.is-loading::after{border-color:transparent transparent #ffe08a #ffe08a !important}.button.is-warning.is-outlined.is-loading:hover::after,.button.is-warning.is-outlined.is-loading.is-hovered::after,.button.is-warning.is-outlined.is-loading:focus::after,.button.is-warning.is-outlined.is-loading.is-focused::after{border-color:transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important}.button.is-warning.is-outlined[disabled],fieldset[disabled] .button.is-warning.is-outlined{background-color:transparent;border-color:#ffe08a;box-shadow:none;color:#ffe08a}.button.is-warning.is-inverted.is-outlined{background-color:transparent;border-color:rgba(0, 0, 0, 0.7);color:rgba(0, 0, 0, 0.7)}.button.is-warning.is-inverted.is-outlined:hover,.button.is-warning.is-inverted.is-outlined.is-hovered,.button.is-warning.is-inverted.is-outlined:focus,.button.is-warning.is-inverted.is-outlined.is-focused{background-color:rgba(0, 0, 0, 0.7);color:#ffe08a}.button.is-warning.is-inverted.is-outlined.is-loading:hover::after,.button.is-warning.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-warning.is-inverted.is-outlined.is-loading:focus::after,.button.is-warning.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #ffe08a #ffe08a !important}.button.is-warning.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-warning.is-inverted.is-outlined{background-color:transparent;border-color:rgba(0, 0, 0, 0.7);box-shadow:none;color:rgba(0, 0, 0, 0.7)}.button.is-warning.is-light{background-color:#fffaeb;color:#946c00}.button.is-warning.is-light:hover,.button.is-warning.is-light.is-hovered{background-color:#fff6de;border-color:transparent;color:#946c00}.button.is-warning.is-light:active,.button.is-warning.is-light.is-active{background-color:#fff3d1;border-color:transparent;color:#946c00}.button.is-danger{background-color:#f14668;border-color:transparent;color:#fff}.button.is-danger:hover,.button.is-danger.is-hovered{background-color:#f03a5f;border-color:transparent;color:#fff}.button.is-danger:focus,.button.is-danger.is-focused{border-color:transparent;color:#fff}.button.is-danger:focus:not(:active),.button.is-danger.is-focused:not(:active){box-shadow:0 0 0 0.125em rgba(241, 70, 104, 0.25)}.button.is-danger:active,.button.is-danger.is-active{background-color:#ef2e55;border-color:transparent;color:#fff}.button.is-danger[disabled],fieldset[disabled] .button.is-danger{background-color:#f14668;border-color:transparent;box-shadow:none}.button.is-danger.is-inverted{background-color:#fff;color:#f14668}.button.is-danger.is-inverted:hover,.button.is-danger.is-inverted.is-hovered{background-color:#f2f2f2}.button.is-danger.is-inverted[disabled],fieldset[disabled] .button.is-danger.is-inverted{background-color:#fff;border-color:transparent;box-shadow:none;color:#f14668}.button.is-danger.is-loading::after{border-color:transparent transparent #fff #fff !important}.button.is-danger.is-outlined{background-color:transparent;border-color:#f14668;color:#f14668}.button.is-danger.is-outlined:hover,.button.is-danger.is-outlined.is-hovered,.button.is-danger.is-outlined:focus,.button.is-danger.is-outlined.is-focused{background-color:#f14668;border-color:#f14668;color:#fff}.button.is-danger.is-outlined.is-loading::after{border-color:transparent transparent #f14668 #f14668 !important}.button.is-danger.is-outlined.is-loading:hover::after,.button.is-danger.is-outlined.is-loading.is-hovered::after,.button.is-danger.is-outlined.is-loading:focus::after,.button.is-danger.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #fff #fff !important}.button.is-danger.is-outlined[disabled],fieldset[disabled] .button.is-danger.is-outlined{background-color:transparent;border-color:#f14668;box-shadow:none;color:#f14668}.button.is-danger.is-inverted.is-outlined{background-color:transparent;border-color:#fff;color:#fff}.button.is-danger.is-inverted.is-outlined:hover,.button.is-danger.is-inverted.is-outlined.is-hovered,.button.is-danger.is-inverted.is-outlined:focus,.button.is-danger.is-inverted.is-outlined.is-focused{background-color:#fff;color:#f14668}.button.is-danger.is-inverted.is-outlined.is-loading:hover::after,.button.is-danger.is-inverted.is-outlined.is-loading.is-hovered::after,.button.is-danger.is-inverted.is-outlined.is-loading:focus::after,.button.is-danger.is-inverted.is-outlined.is-loading.is-focused::after{border-color:transparent transparent #f14668 #f14668 !important}.button.is-danger.is-inverted.is-outlined[disabled],fieldset[disabled] .button.is-danger.is-inverted.is-outlined{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-danger.is-light{background-color:#feecf0;color:#cc0f35}.button.is-danger.is-light:hover,.button.is-danger.is-light.is-hovered{background-color:#fde0e6;border-color:transparent;color:#cc0f35}.button.is-danger.is-light:active,.button.is-danger.is-light.is-active{background-color:#fcd4dc;border-color:transparent;color:#cc0f35}.button.is-small{font-size:0.75rem}.button.is-small:not(.is-rounded){border-radius:2px}.button.is-normal{font-size:1rem}.button.is-medium{font-size:1.25rem}.button.is-large{font-size:1.5rem}.button[disabled],fieldset[disabled] .button{background-color:white;border-color:#dbdbdb;box-shadow:none;opacity:0.5}.button.is-fullwidth{display:flex;width:100%}.button.is-loading{color:transparent !important;pointer-events:none}.button.is-loading::after{position:absolute;left:calc(50% - (1em * 0.5));top:calc(50% - (1em * 0.5));position:absolute !important}.button.is-static{background-color:whitesmoke;border-color:#dbdbdb;color:#7a7a7a;box-shadow:none;pointer-events:none}.button.is-rounded{border-radius:9999px;padding-left:calc(1em + 0.25em);padding-right:calc(1em + 0.25em)}.buttons{align-items:center;display:flex;flex-wrap:wrap;justify-content:flex-start}.buttons .button{margin-bottom:0.5rem}.buttons .button:not(:last-child):not(.is-fullwidth){margin-right:0.5rem}.buttons:last-child{margin-bottom:-0.5rem}.buttons:not(:last-child){margin-bottom:1rem}.buttons.are-small .button:not(.is-normal):not(.is-medium):not(.is-large){font-size:0.75rem}.buttons.are-small .button:not(.is-normal):not(.is-medium):not(.is-large):not(.is-rounded){border-radius:2px}.buttons.are-medium .button:not(.is-small):not(.is-normal):not(.is-large){font-size:1.25rem}.buttons.are-large .button:not(.is-small):not(.is-normal):not(.is-medium){font-size:1.5rem}.buttons.has-addons .button:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0}.buttons.has-addons .button:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0;margin-right:-1px}.buttons.has-addons .button:last-child{margin-right:0}.buttons.has-addons .button:hover,.buttons.has-addons .button.is-hovered{z-index:2}.buttons.has-addons .button:focus,.buttons.has-addons .button.is-focused,.buttons.has-addons .button:active,.buttons.has-addons .button.is-active,.buttons.has-addons .button.is-selected{z-index:3}.buttons.has-addons .button:focus:hover,.buttons.has-addons .button.is-focused:hover,.buttons.has-addons .button:active:hover,.buttons.has-addons .button.is-active:hover,.buttons.has-addons .button.is-selected:hover{z-index:4}.buttons.has-addons .button.is-expanded{flex-grow:1;flex-shrink:1}.buttons.is-centered{justify-content:center}.buttons.is-centered:not(.has-addons) .button:not(.is-fullwidth){margin-left:0.25rem;margin-right:0.25rem}.buttons.is-right{justify-content:flex-end}.buttons.is-right:not(.has-addons) .button:not(.is-fullwidth){margin-left:0.25rem;margin-right:0.25rem}.container{flex-grow:1;margin:0 auto;position:relative;width:auto}.container.is-fluid{max-width:none !important;padding-left:32px;padding-right:32px;width:100%}@media screen and (min-width: 1024px){.container{max-width:960px}}@media screen and (max-width: 1215px){.container.is-widescreen:not(.is-max-desktop){max-width:960px}}@media screen and (max-width: 1407px){.container.is-fullhd:not(.is-max-desktop):not(.is-max-widescreen){max-width:960px}}@media screen and (min-width: 1216px){.container:not(.is-max-desktop){max-width:960px}}@media screen and (min-width: 1408px){.container:not(.is-max-desktop):not(.is-max-widescreen){max-width:960px}}.content li+li{margin-top:0.25em}.content p:not(:last-child),.content dl:not(:last-child),.content ol:not(:last-child),.content ul:not(:last-child),.content blockquote:not(:last-child),.content pre:not(:last-child),.content table:not(:last-child){margin-bottom:1em}.content h1,.content h2,.content h3,.content h4,.content h5,.content h6{color:#363636;font-weight:600;line-height:1.125}.content h1{font-size:2em;margin-bottom:0.5em}.content h1:not(:first-child){margin-top:1em}.content h2{font-size:1.75em;margin-bottom:0.5714em}.content h2:not(:first-child){margin-top:1.1428em}.content h3{font-size:1.5em;margin-bottom:0.6666em}.content h3:not(:first-child){margin-top:1.3333em}.content h4{font-size:1.25em;margin-bottom:0.8em}.content h5{font-size:1.125em;margin-bottom:0.8888em}.content h6{font-size:1em;margin-bottom:1em}.content blockquote{background-color:whitesmoke;border-left:5px solid #dbdbdb;padding:1.25em 1.5em}.content ol{list-style-position:outside;margin-left:2em;margin-top:1em}.content ol:not([type]){list-style-type:decimal}.content ol:not([type]).is-lower-alpha{list-style-type:lower-alpha}.content ol:not([type]).is-lower-roman{list-style-type:lower-roman}.content ol:not([type]).is-upper-alpha{list-style-type:upper-alpha}.content ol:not([type]).is-upper-roman{list-style-type:upper-roman}.content ul{list-style:disc outside;margin-left:2em;margin-top:1em}.content ul ul{list-style-type:circle;margin-top:0.5em}.content ul ul ul{list-style-type:square}.content dd{margin-left:2em}.content figure{margin-left:2em;margin-right:2em;text-align:center}.content figure:not(:first-child){margin-top:2em}.content figure:not(:last-child){margin-bottom:2em}.content figure img{display:inline-block}.content figure figcaption{font-style:italic}.content pre{-webkit-overflow-scrolling:touch;overflow-x:auto;padding:1.25em 1.5em;white-space:pre;word-wrap:normal}.content sup,.content sub{font-size:75%}.content table{width:100%}.content table td,.content table th{border:1px solid #dbdbdb;border-width:0 0 1px;padding:0.5em 0.75em;vertical-align:top}.content table th{color:#363636}.content table th:not([align]){text-align:inherit}.content table thead td,.content table thead th{border-width:0 0 2px;color:#363636}.content table tfoot td,.content table tfoot th{border-width:2px 0 0;color:#363636}.content table tbody tr:last-child td,.content table tbody tr:last-child th{border-bottom-width:0}.content .tabs li+li{margin-top:0}.content.is-small{font-size:0.75rem}.content.is-normal{font-size:1rem}.content.is-medium{font-size:1.25rem}.content.is-large{font-size:1.5rem}.icon{align-items:center;display:inline-flex;justify-content:center;height:1.5rem;width:1.5rem}.icon.is-small{height:1rem;width:1rem}.icon.is-medium{height:2rem;width:2rem}.icon.is-large{height:3rem;width:3rem}.icon-text{align-items:flex-start;color:inherit;display:inline-flex;flex-wrap:wrap;line-height:1.5rem;vertical-align:top}.icon-text .icon{flex-grow:0;flex-shrink:0}.icon-text .icon:not(:last-child){margin-right:0.25em}.icon-text .icon:not(:first-child){margin-left:0.25em}div.icon-text{display:flex}.image,.post>p>img{display:block;position:relative}.image img,.post>p>img img{display:block;height:auto;width:100%}.image img.is-rounded,.post>p>img img.is-rounded{border-radius:9999px}.image.is-fullwidth,.post>p>img.is-fullwidth{width:100%}.image.is-square img,.post>p>img.is-square img,.image.is-square .has-ratio,.post>p>img.is-square .has-ratio,.image.is-1by1 img,.post>p>img.is-1by1 img,.image.is-1by1 .has-ratio,.post>p>img.is-1by1 .has-ratio,.image.is-5by4 img,.post>p>img.is-5by4 img,.image.is-5by4 .has-ratio,.post>p>img.is-5by4 .has-ratio,.image.is-4by3 img,.post>p>img.is-4by3 img,.image.is-4by3 .has-ratio,.post>p>img.is-4by3 .has-ratio,.image.is-3by2 img,.post>p>img.is-3by2 img,.image.is-3by2 .has-ratio,.post>p>img.is-3by2 .has-ratio,.image.is-5by3 img,.post>p>img.is-5by3 img,.image.is-5by3 .has-ratio,.post>p>img.is-5by3 .has-ratio,.image.is-16by9 img,.post>p>img.is-16by9 img,.image.is-16by9 .has-ratio,.post>p>img.is-16by9 .has-ratio,.image.is-2by1 img,.post>p>img.is-2by1 img,.image.is-2by1 .has-ratio,.post>p>img.is-2by1 .has-ratio,.image.is-3by1 img,.post>p>img.is-3by1 img,.image.is-3by1 .has-ratio,.post>p>img.is-3by1 .has-ratio,.image.is-4by5 img,.post>p>img.is-4by5 img,.image.is-4by5 .has-ratio,.post>p>img.is-4by5 .has-ratio,.image.is-3by4 img,.post>p>img.is-3by4 img,.image.is-3by4 .has-ratio,.post>p>img.is-3by4 .has-ratio,.image.is-2by3 img,.post>p>img.is-2by3 img,.image.is-2by3 .has-ratio,.post>p>img.is-2by3 .has-ratio,.image.is-3by5 img,.post>p>img.is-3by5 img,.image.is-3by5 .has-ratio,.post>p>img.is-3by5 .has-ratio,.image.is-9by16 img,.post>p>img.is-9by16 img,.image.is-9by16 .has-ratio,.post>p>img.is-9by16 .has-ratio,.image.is-1by2 img,.post>p>img.is-1by2 img,.image.is-1by2 .has-ratio,.post>p>img.is-1by2 .has-ratio,.image.is-1by3 img,.post>p>img.is-1by3 img,.image.is-1by3 .has-ratio,.post>p>img.is-1by3 .has-ratio{height:100%;width:100%}.image.is-square,.post>p>img.is-square,.image.is-1by1,.post>p>img.is-1by1{padding-top:100%}.image.is-5by4,.post>p>img.is-5by4{padding-top:80%}.image.is-4by3,.post>p>img.is-4by3{padding-top:75%}.image.is-3by2,.post>p>img.is-3by2{padding-top:66.6666%}.image.is-5by3,.post>p>img.is-5by3{padding-top:60%}.image.is-16by9,.post>p>img.is-16by9{padding-top:56.25%}.image.is-2by1,.post>p>img.is-2by1{padding-top:50%}.image.is-3by1,.post>p>img.is-3by1{padding-top:33.3333%}.image.is-4by5,.post>p>img.is-4by5{padding-top:125%}.image.is-3by4,.post>p>img.is-3by4{padding-top:133.3333%}.image.is-2by3,.post>p>img.is-2by3{padding-top:150%}.image.is-3by5,.post>p>img.is-3by5{padding-top:166.6666%}.image.is-9by16,.post>p>img.is-9by16{padding-top:177.7777%}.image.is-1by2,.post>p>img.is-1by2{padding-top:200%}.image.is-1by3,.post>p>img.is-1by3{padding-top:300%}.image.is-16x16,.post>p>img.is-16x16{height:16px;width:16px}.image.is-24x24,.post>p>img.is-24x24{height:24px;width:24px}.image.is-32x32,.post>p>img.is-32x32{height:32px;width:32px}.image.is-48x48,.post>p>img.is-48x48{height:48px;width:48px}.image.is-64x64,.post>p>img.is-64x64{height:64px;width:64px}.image.is-96x96,.post>p>img.is-96x96{height:96px;width:96px}.image.is-128x128,.post>p>img.is-128x128{height:128px;width:128px}.notification{background-color:whitesmoke;border-radius:4px;position:relative;padding:1.25rem 2.5rem 1.25rem 1.5rem}.notification a:not(.button):not(.dropdown-item){color:currentColor;text-decoration:underline}.notification strong{color:currentColor}.notification code,.notification pre{background:white}.notification pre code{background:transparent}.notification>.delete{right:0.5rem;position:absolute;top:0.5rem}.notification .title,.notification .subtitle,.notification .content{color:currentColor}.notification.is-white{background-color:white;color:#0a0a0a}.notification.is-black{background-color:#0a0a0a;color:white}.notification.is-light{background-color:whitesmoke;color:rgba(0, 0, 0, 0.7)}.notification.is-dark{background-color:#363636;color:#fff}.notification.is-primary{background-color:#00d1b2;color:#fff}.notification.is-primary.is-light{background-color:#ebfffc;color:#00947e}.notification.is-link{background-color:#485fc7;color:#fff}.notification.is-link.is-light{background-color:#eff1fa;color:#3850b7}.notification.is-info{background-color:#3e8ed0;color:#fff}.notification.is-info.is-light{background-color:#eff5fb;color:#296fa8}.notification.is-success{background-color:#48c78e;color:#fff}.notification.is-success.is-light{background-color:#effaf5;color:#257953}.notification.is-warning{background-color:#ffe08a;color:rgba(0, 0, 0, 0.7)}.notification.is-warning.is-light{background-color:#fffaeb;color:#946c00}.notification.is-danger{background-color:#f14668;color:#fff}.notification.is-danger.is-light{background-color:#feecf0;color:#cc0f35}.progress{-moz-appearance:none;-webkit-appearance:none;border:none;border-radius:9999px;display:block;height:1rem;overflow:hidden;padding:0;width:100%}.progress::-webkit-progress-bar{background-color:#ededed}.progress::-webkit-progress-value{background-color:#4a4a4a}.progress::-moz-progress-bar{background-color:#4a4a4a}.progress::-ms-fill{background-color:#4a4a4a;border:none}.progress.is-white::-webkit-progress-value{background-color:white}.progress.is-white::-moz-progress-bar{background-color:white}.progress.is-white::-ms-fill{background-color:white}.progress.is-white:indeterminate{background-image:linear-gradient(to right, white 30%, #ededed 30%)}.progress.is-black::-webkit-progress-value{background-color:#0a0a0a}.progress.is-black::-moz-progress-bar{background-color:#0a0a0a}.progress.is-black::-ms-fill{background-color:#0a0a0a}.progress.is-black:indeterminate{background-image:linear-gradient(to right, #0a0a0a 30%, #ededed 30%)}.progress.is-light::-webkit-progress-value{background-color:whitesmoke}.progress.is-light::-moz-progress-bar{background-color:whitesmoke}.progress.is-light::-ms-fill{background-color:whitesmoke}.progress.is-light:indeterminate{background-image:linear-gradient(to right, whitesmoke 30%, #ededed 30%)}.progress.is-dark::-webkit-progress-value{background-color:#363636}.progress.is-dark::-moz-progress-bar{background-color:#363636}.progress.is-dark::-ms-fill{background-color:#363636}.progress.is-dark:indeterminate{background-image:linear-gradient(to right, #363636 30%, #ededed 30%)}.progress.is-primary::-webkit-progress-value{background-color:#00d1b2}.progress.is-primary::-moz-progress-bar{background-color:#00d1b2}.progress.is-primary::-ms-fill{background-color:#00d1b2}.progress.is-primary:indeterminate{background-image:linear-gradient(to right, #00d1b2 30%, #ededed 30%)}.progress.is-link::-webkit-progress-value{background-color:#485fc7}.progress.is-link::-moz-progress-bar{background-color:#485fc7}.progress.is-link::-ms-fill{background-color:#485fc7}.progress.is-link:indeterminate{background-image:linear-gradient(to right, #485fc7 30%, #ededed 30%)}.progress.is-info::-webkit-progress-value{background-color:#3e8ed0}.progress.is-info::-moz-progress-bar{background-color:#3e8ed0}.progress.is-info::-ms-fill{background-color:#3e8ed0}.progress.is-info:indeterminate{background-image:linear-gradient(to right, #3e8ed0 30%, #ededed 30%)}.progress.is-success::-webkit-progress-value{background-color:#48c78e}.progress.is-success::-moz-progress-bar{background-color:#48c78e}.progress.is-success::-ms-fill{background-color:#48c78e}.progress.is-success:indeterminate{background-image:linear-gradient(to right, #48c78e 30%, #ededed 30%)}.progress.is-warning::-webkit-progress-value{background-color:#ffe08a}.progress.is-warning::-moz-progress-bar{background-color:#ffe08a}.progress.is-warning::-ms-fill{background-color:#ffe08a}.progress.is-warning:indeterminate{background-image:linear-gradient(to right, #ffe08a 30%, #ededed 30%)}.progress.is-danger::-webkit-progress-value{background-color:#f14668}.progress.is-danger::-moz-progress-bar{background-color:#f14668}.progress.is-danger::-ms-fill{background-color:#f14668}.progress.is-danger:indeterminate{background-image:linear-gradient(to right, #f14668 30%, #ededed 30%)}.progress:indeterminate{animation-duration:1.5s;animation-iteration-count:infinite;animation-name:moveIndeterminate;animation-timing-function:linear;background-color:#ededed;background-image:linear-gradient(to right, #4a4a4a 30%, #ededed 30%);background-position:top left;background-repeat:no-repeat;background-size:150% 150%}.progress:indeterminate::-webkit-progress-bar{background-color:transparent}.progress:indeterminate::-moz-progress-bar{background-color:transparent}.progress:indeterminate::-ms-fill{animation-name:none}.progress.is-small{height:0.75rem}.progress.is-medium{height:1.25rem}.progress.is-large{height:1.5rem}@keyframes moveIndeterminate{from{background-position:200% 0}to{background-position:-200% 0}}.table{background-color:white;color:#363636}.table td,.table th{border:1px solid #dbdbdb;border-width:0 0 1px;padding:0.5em 0.75em;vertical-align:top}.table td.is-white,.table th.is-white{background-color:white;border-color:white;color:#0a0a0a}.table td.is-black,.table th.is-black{background-color:#0a0a0a;border-color:#0a0a0a;color:white}.table td.is-light,.table th.is-light{background-color:whitesmoke;border-color:whitesmoke;color:rgba(0, 0, 0, 0.7)}.table td.is-dark,.table th.is-dark{background-color:#363636;border-color:#363636;color:#fff}.table td.is-primary,.table th.is-primary{background-color:#00d1b2;border-color:#00d1b2;color:#fff}.table td.is-link,.table th.is-link{background-color:#485fc7;border-color:#485fc7;color:#fff}.table td.is-info,.table th.is-info{background-color:#3e8ed0;border-color:#3e8ed0;color:#fff}.table td.is-success,.table th.is-success{background-color:#48c78e;border-color:#48c78e;color:#fff}.table td.is-warning,.table th.is-warning{background-color:#ffe08a;border-color:#ffe08a;color:rgba(0, 0, 0, 0.7)}.table td.is-danger,.table th.is-danger{background-color:#f14668;border-color:#f14668;color:#fff}.table td.is-narrow,.table th.is-narrow{white-space:nowrap;width:1%}.table td.is-selected,.table th.is-selected{background-color:#00d1b2;color:#fff}.table td.is-selected a,.table td.is-selected strong,.table th.is-selected a,.table th.is-selected strong{color:currentColor}.table td.is-vcentered,.table th.is-vcentered{vertical-align:middle}.table th{color:#363636}.table th:not([align]){text-align:inherit}.table tr.is-selected{background-color:#00d1b2;color:#fff}.table tr.is-selected a,.table tr.is-selected strong{color:currentColor}.table tr.is-selected td,.table tr.is-selected th{border-color:#fff;color:currentColor}.table thead{background-color:transparent}.table thead td,.table thead th{border-width:0 0 2px;color:#363636}.table tfoot{background-color:transparent}.table tfoot td,.table tfoot th{border-width:2px 0 0;color:#363636}.table tbody{background-color:transparent}.table tbody tr:last-child td,.table tbody tr:last-child th{border-bottom-width:0}.table.is-bordered td,.table.is-bordered th{border-width:1px}.table.is-bordered tr:last-child td,.table.is-bordered tr:last-child th{border-bottom-width:1px}.table.is-fullwidth{width:100%}.table.is-hoverable tbody tr:not(.is-selected):hover{background-color:#fafafa}.table.is-hoverable.is-striped tbody tr:not(.is-selected):hover{background-color:#fafafa}.table.is-hoverable.is-striped tbody tr:not(.is-selected):hover:nth-child(even){background-color:whitesmoke}.table.is-narrow td,.table.is-narrow th{padding:0.25em 0.5em}.table.is-striped tbody tr:not(.is-selected):nth-child(even){background-color:#fafafa}.table-container{-webkit-overflow-scrolling:touch;overflow:auto;overflow-y:hidden;max-width:100%}.tags{align-items:center;display:flex;flex-wrap:wrap;justify-content:flex-start}.tags .tag{margin-bottom:0.5rem}.tags .tag:not(:last-child){margin-right:0.5rem}.tags:last-child{margin-bottom:-0.5rem}.tags:not(:last-child){margin-bottom:1rem}.tags.are-medium .tag:not(.is-normal):not(.is-large){font-size:1rem}.tags.are-large .tag:not(.is-normal):not(.is-medium){font-size:1.25rem}.tags.is-centered{justify-content:center}.tags.is-centered .tag{margin-right:0.25rem;margin-left:0.25rem}.tags.is-right{justify-content:flex-end}.tags.is-right .tag:not(:first-child){margin-left:0.5rem}.tags.is-right .tag:not(:last-child){margin-right:0}.tags.has-addons .tag{margin-right:0}.tags.has-addons .tag:not(:first-child){margin-left:0;border-top-left-radius:0;border-bottom-left-radius:0}.tags.has-addons .tag:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0}.tag:not(body){align-items:center;background-color:whitesmoke;border-radius:4px;color:#4a4a4a;display:inline-flex;font-size:0.75rem;height:2em;justify-content:center;line-height:1.5;padding-left:0.75em;padding-right:0.75em;white-space:nowrap}.tag:not(body) .delete{margin-left:0.25rem;margin-right:-0.375rem}.tag:not(body).is-white{background-color:white;color:#0a0a0a}.tag:not(body).is-black{background-color:#0a0a0a;color:white}.tag:not(body).is-light{background-color:whitesmoke;color:rgba(0, 0, 0, 0.7)}.tag:not(body).is-dark{background-color:#363636;color:#fff}.tag:not(body).is-primary{background-color:#00d1b2;color:#fff}.tag:not(body).is-primary.is-light{background-color:#ebfffc;color:#00947e}.tag:not(body).is-link{background-color:#485fc7;color:#fff}.tag:not(body).is-link.is-light{background-color:#eff1fa;color:#3850b7}.tag:not(body).is-info{background-color:#3e8ed0;color:#fff}.tag:not(body).is-info.is-light{background-color:#eff5fb;color:#296fa8}.tag:not(body).is-success{background-color:#48c78e;color:#fff}.tag:not(body).is-success.is-light{background-color:#effaf5;color:#257953}.tag:not(body).is-warning{background-color:#ffe08a;color:rgba(0, 0, 0, 0.7)}.tag:not(body).is-warning.is-light{background-color:#fffaeb;color:#946c00}.tag:not(body).is-danger{background-color:#f14668;color:#fff}.tag:not(body).is-danger.is-light{background-color:#feecf0;color:#cc0f35}.tag:not(body).is-normal{font-size:0.75rem}.tag:not(body).is-medium{font-size:1rem}.tag:not(body).is-large{font-size:1.25rem}.tag:not(body) .icon:first-child:not(:last-child){margin-left:-0.375em;margin-right:0.1875em}.tag:not(body) .icon:last-child:not(:first-child){margin-left:0.1875em;margin-right:-0.375em}.tag:not(body) .icon:first-child:last-child{margin-left:-0.375em;margin-right:-0.375em}.tag:not(body).is-delete{margin-left:1px;padding:0;position:relative;width:2em}.tag:not(body).is-delete::before,.tag:not(body).is-delete::after{background-color:currentColor;content:"";display:block;left:50%;position:absolute;top:50%;transform:translateX(-50%) translateY(-50%) rotate(45deg);transform-origin:center center}.tag:not(body).is-delete::before{height:1px;width:50%}.tag:not(body).is-delete::after{height:50%;width:1px}.tag:not(body).is-delete:hover,.tag:not(body).is-delete:focus{background-color:#e8e8e8}.tag:not(body).is-delete:active{background-color:#dbdbdb}.tag:not(body).is-rounded{border-radius:9999px}a.tag:hover{text-decoration:underline}.title,.subtitle{word-break:break-word}.title em,.title span,.subtitle em,.subtitle span{font-weight:inherit}.title sub,.subtitle sub{font-size:0.75em}.title sup,.subtitle sup{font-size:0.75em}.title .tag,.subtitle .tag{vertical-align:middle}.title{color:#363636;font-size:2rem;font-weight:600;line-height:1.125}.title strong{color:inherit;font-weight:inherit}.title:not(.is-spaced)+.subtitle{margin-top:-1.25rem}.title.is-1{font-size:3rem}.title.is-2{font-size:2.5rem}.title.is-3{font-size:2rem}.title.is-4{font-size:1.5rem}.title.is-5{font-size:1.25rem}.title.is-6{font-size:1rem}.title.is-7{font-size:0.75rem}.subtitle{color:#4a4a4a;font-size:1.25rem;font-weight:400;line-height:1.25}.subtitle strong{color:#363636;font-weight:600}.subtitle:not(.is-spaced)+.title{margin-top:-1.25rem}.subtitle.is-1{font-size:3rem}.subtitle.is-2{font-size:2.5rem}.subtitle.is-3{font-size:2rem}.subtitle.is-4{font-size:1.5rem}.subtitle.is-5{font-size:1.25rem}.subtitle.is-6{font-size:1rem}.subtitle.is-7{font-size:0.75rem}.heading{display:block;font-size:11px;letter-spacing:1px;margin-bottom:5px;text-transform:uppercase}.number{align-items:center;background-color:whitesmoke;border-radius:9999px;display:inline-flex;font-size:1.25rem;height:2em;justify-content:center;margin-right:1.5rem;min-width:2.5em;padding:0.25rem 0.5rem;text-align:center;vertical-align:top}.select select,.textarea,.input{background-color:white;border-color:#dbdbdb;border-radius:4px;color:#363636}.select select::-moz-placeholder,.textarea::-moz-placeholder,.input::-moz-placeholder{color:rgba(54, 54, 54, 0.3)}.select select::-webkit-input-placeholder,.textarea::-webkit-input-placeholder,.input::-webkit-input-placeholder{color:rgba(54, 54, 54, 0.3)}.select select:-moz-placeholder,.textarea:-moz-placeholder,.input:-moz-placeholder{color:rgba(54, 54, 54, 0.3)}.select select:-ms-input-placeholder,.textarea:-ms-input-placeholder,.input:-ms-input-placeholder{color:rgba(54, 54, 54, 0.3)}.select select:hover,.textarea:hover,.input:hover,.select select.is-hovered,.is-hovered.textarea,.is-hovered.input{border-color:#b5b5b5}.select select:focus,.textarea:focus,.input:focus,.select select.is-focused,.is-focused.textarea,.is-focused.input,.select select:active,.textarea:active,.input:active,.select select.is-active,.is-active.textarea,.is-active.input{border-color:#485fc7;box-shadow:0 0 0 0.125em rgba(72, 95, 199, 0.25)}.select select[disabled],[disabled].textarea,[disabled].input,fieldset[disabled] .select select,.select fieldset[disabled] select,fieldset[disabled] .textarea,fieldset[disabled] .input{background-color:whitesmoke;border-color:whitesmoke;box-shadow:none;color:#7a7a7a}.select select[disabled]::-moz-placeholder,[disabled].textarea::-moz-placeholder,[disabled].input::-moz-placeholder,fieldset[disabled] .select select::-moz-placeholder,.select fieldset[disabled] select::-moz-placeholder,fieldset[disabled] .textarea::-moz-placeholder,fieldset[disabled] .input::-moz-placeholder{color:rgba(122, 122, 122, 0.3)}.select select[disabled]::-webkit-input-placeholder,[disabled].textarea::-webkit-input-placeholder,[disabled].input::-webkit-input-placeholder,fieldset[disabled] .select select::-webkit-input-placeholder,.select fieldset[disabled] select::-webkit-input-placeholder,fieldset[disabled] .textarea::-webkit-input-placeholder,fieldset[disabled] .input::-webkit-input-placeholder{color:rgba(122, 122, 122, 0.3)}.select select[disabled]:-moz-placeholder,[disabled].textarea:-moz-placeholder,[disabled].input:-moz-placeholder,fieldset[disabled] .select select:-moz-placeholder,.select fieldset[disabled] select:-moz-placeholder,fieldset[disabled] .textarea:-moz-placeholder,fieldset[disabled] .input:-moz-placeholder{color:rgba(122, 122, 122, 0.3)}.select select[disabled]:-ms-input-placeholder,[disabled].textarea:-ms-input-placeholder,[disabled].input:-ms-input-placeholder,fieldset[disabled] .select select:-ms-input-placeholder,.select fieldset[disabled] select:-ms-input-placeholder,fieldset[disabled] .textarea:-ms-input-placeholder,fieldset[disabled] .input:-ms-input-placeholder{color:rgba(122, 122, 122, 0.3)}.textarea,.input{box-shadow:inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);max-width:100%;width:100%}[readonly].textarea,[readonly].input{box-shadow:none}.is-white.textarea,.is-white.input{border-color:white}.is-white.textarea:focus,.is-white.input:focus,.is-white.is-focused.textarea,.is-white.is-focused.input,.is-white.textarea:active,.is-white.input:active,.is-white.is-active.textarea,.is-white.is-active.input{box-shadow:0 0 0 0.125em rgba(255, 255, 255, 0.25)}.is-black.textarea,.is-black.input{border-color:#0a0a0a}.is-black.textarea:focus,.is-black.input:focus,.is-black.is-focused.textarea,.is-black.is-focused.input,.is-black.textarea:active,.is-black.input:active,.is-black.is-active.textarea,.is-black.is-active.input{box-shadow:0 0 0 0.125em rgba(10, 10, 10, 0.25)}.is-light.textarea,.is-light.input{border-color:whitesmoke}.is-light.textarea:focus,.is-light.input:focus,.is-light.is-focused.textarea,.is-light.is-focused.input,.is-light.textarea:active,.is-light.input:active,.is-light.is-active.textarea,.is-light.is-active.input{box-shadow:0 0 0 0.125em rgba(245, 245, 245, 0.25)}.is-dark.textarea,.is-dark.input{border-color:#363636}.is-dark.textarea:focus,.is-dark.input:focus,.is-dark.is-focused.textarea,.is-dark.is-focused.input,.is-dark.textarea:active,.is-dark.input:active,.is-dark.is-active.textarea,.is-dark.is-active.input{box-shadow:0 0 0 0.125em rgba(54, 54, 54, 0.25)}.is-primary.textarea,.is-primary.input{border-color:#00d1b2}.is-primary.textarea:focus,.is-primary.input:focus,.is-primary.is-focused.textarea,.is-primary.is-focused.input,.is-primary.textarea:active,.is-primary.input:active,.is-primary.is-active.textarea,.is-primary.is-active.input{box-shadow:0 0 0 0.125em rgba(0, 209, 178, 0.25)}.is-link.textarea,.is-link.input{border-color:#485fc7}.is-link.textarea:focus,.is-link.input:focus,.is-link.is-focused.textarea,.is-link.is-focused.input,.is-link.textarea:active,.is-link.input:active,.is-link.is-active.textarea,.is-link.is-active.input{box-shadow:0 0 0 0.125em rgba(72, 95, 199, 0.25)}.is-info.textarea,.is-info.input{border-color:#3e8ed0}.is-info.textarea:focus,.is-info.input:focus,.is-info.is-focused.textarea,.is-info.is-focused.input,.is-info.textarea:active,.is-info.input:active,.is-info.is-active.textarea,.is-info.is-active.input{box-shadow:0 0 0 0.125em rgba(62, 142, 208, 0.25)}.is-success.textarea,.is-success.input{border-color:#48c78e}.is-success.textarea:focus,.is-success.input:focus,.is-success.is-focused.textarea,.is-success.is-focused.input,.is-success.textarea:active,.is-success.input:active,.is-success.is-active.textarea,.is-success.is-active.input{box-shadow:0 0 0 0.125em rgba(72, 199, 142, 0.25)}.is-warning.textarea,.is-warning.input{border-color:#ffe08a}.is-warning.textarea:focus,.is-warning.input:focus,.is-warning.is-focused.textarea,.is-warning.is-focused.input,.is-warning.textarea:active,.is-warning.input:active,.is-warning.is-active.textarea,.is-warning.is-active.input{box-shadow:0 0 0 0.125em rgba(255, 224, 138, 0.25)}.is-danger.textarea,.is-danger.input{border-color:#f14668}.is-danger.textarea:focus,.is-danger.input:focus,.is-danger.is-focused.textarea,.is-danger.is-focused.input,.is-danger.textarea:active,.is-danger.input:active,.is-danger.is-active.textarea,.is-danger.is-active.input{box-shadow:0 0 0 0.125em rgba(241, 70, 104, 0.25)}.is-small.textarea,.is-small.input{border-radius:2px;font-size:0.75rem}.is-medium.textarea,.is-medium.input{font-size:1.25rem}.is-large.textarea,.is-large.input{font-size:1.5rem}.is-fullwidth.textarea,.is-fullwidth.input{display:block;width:100%}.is-inline.textarea,.is-inline.input{display:inline;width:auto}.input.is-rounded{border-radius:9999px;padding-left:calc(calc(0.75em - 1px) + 0.375em);padding-right:calc(calc(0.75em - 1px) + 0.375em)}.input.is-static{background-color:transparent;border-color:transparent;box-shadow:none;padding-left:0;padding-right:0}.textarea{display:block;max-width:100%;min-width:100%;padding:calc(0.75em - 1px);resize:vertical}.textarea:not([rows]){max-height:40em;min-height:8em}.textarea[rows]{height:initial}.textarea.has-fixed-size{resize:none}.radio,.checkbox{cursor:pointer;display:inline-block;line-height:1.25;position:relative}.radio input,.checkbox input{cursor:pointer}.radio:hover,.checkbox:hover{color:#363636}[disabled].radio,[disabled].checkbox,fieldset[disabled] .radio,fieldset[disabled] .checkbox,.radio input[disabled],.checkbox input[disabled]{color:#7a7a7a;cursor:not-allowed}.radio+.radio{margin-left:0.5em}.select{display:inline-block;max-width:100%;position:relative;vertical-align:top}.select:not(.is-multiple){height:2.5em}.select:not(.is-multiple):not(.is-loading)::after{border-color:#485fc7;right:1.125em;z-index:4}.select.is-rounded select{border-radius:9999px;padding-left:1em}.select select{cursor:pointer;display:block;font-size:1em;max-width:100%;outline:none}.select select::-ms-expand{display:none}.select select[disabled]:hover,fieldset[disabled] .select select:hover{border-color:whitesmoke}.select select:not([multiple]){padding-right:2.5em}.select select[multiple]{height:auto;padding:0}.select select[multiple] option{padding:0.5em 1em}.select:not(.is-multiple):not(.is-loading):hover::after{border-color:#363636}.select.is-white:not(:hover)::after{border-color:white}.select.is-white select{border-color:white}.select.is-white select:hover,.select.is-white select.is-hovered{border-color:#f2f2f2}.select.is-white select:focus,.select.is-white select.is-focused,.select.is-white select:active,.select.is-white select.is-active{box-shadow:0 0 0 0.125em rgba(255, 255, 255, 0.25)}.select.is-black:not(:hover)::after{border-color:#0a0a0a}.select.is-black select{border-color:#0a0a0a}.select.is-black select:hover,.select.is-black select.is-hovered{border-color:black}.select.is-black select:focus,.select.is-black select.is-focused,.select.is-black select:active,.select.is-black select.is-active{box-shadow:0 0 0 0.125em rgba(10, 10, 10, 0.25)}.select.is-light:not(:hover)::after{border-color:whitesmoke}.select.is-light select{border-color:whitesmoke}.select.is-light select:hover,.select.is-light select.is-hovered{border-color:#e8e8e8}.select.is-light select:focus,.select.is-light select.is-focused,.select.is-light select:active,.select.is-light select.is-active{box-shadow:0 0 0 0.125em rgba(245, 245, 245, 0.25)}.select.is-dark:not(:hover)::after{border-color:#363636}.select.is-dark select{border-color:#363636}.select.is-dark select:hover,.select.is-dark select.is-hovered{border-color:#292929}.select.is-dark select:focus,.select.is-dark select.is-focused,.select.is-dark select:active,.select.is-dark select.is-active{box-shadow:0 0 0 0.125em rgba(54, 54, 54, 0.25)}.select.is-primary:not(:hover)::after{border-color:#00d1b2}.select.is-primary select{border-color:#00d1b2}.select.is-primary select:hover,.select.is-primary select.is-hovered{border-color:#00b89c}.select.is-primary select:focus,.select.is-primary select.is-focused,.select.is-primary select:active,.select.is-primary select.is-active{box-shadow:0 0 0 0.125em rgba(0, 209, 178, 0.25)}.select.is-link:not(:hover)::after{border-color:#485fc7}.select.is-link select{border-color:#485fc7}.select.is-link select:hover,.select.is-link select.is-hovered{border-color:#3a51bb}.select.is-link select:focus,.select.is-link select.is-focused,.select.is-link select:active,.select.is-link select.is-active{box-shadow:0 0 0 0.125em rgba(72, 95, 199, 0.25)}.select.is-info:not(:hover)::after{border-color:#3e8ed0}.select.is-info select{border-color:#3e8ed0}.select.is-info select:hover,.select.is-info select.is-hovered{border-color:#3082c5}.select.is-info select:focus,.select.is-info select.is-focused,.select.is-info select:active,.select.is-info select.is-active{box-shadow:0 0 0 0.125em rgba(62, 142, 208, 0.25)}.select.is-success:not(:hover)::after{border-color:#48c78e}.select.is-success select{border-color:#48c78e}.select.is-success select:hover,.select.is-success select.is-hovered{border-color:#3abb81}.select.is-success select:focus,.select.is-success select.is-focused,.select.is-success select:active,.select.is-success select.is-active{box-shadow:0 0 0 0.125em rgba(72, 199, 142, 0.25)}.select.is-warning:not(:hover)::after{border-color:#ffe08a}.select.is-warning select{border-color:#ffe08a}.select.is-warning select:hover,.select.is-warning select.is-hovered{border-color:#ffd970}.select.is-warning select:focus,.select.is-warning select.is-focused,.select.is-warning select:active,.select.is-warning select.is-active{box-shadow:0 0 0 0.125em rgba(255, 224, 138, 0.25)}.select.is-danger:not(:hover)::after{border-color:#f14668}.select.is-danger select{border-color:#f14668}.select.is-danger select:hover,.select.is-danger select.is-hovered{border-color:#ef2e55}.select.is-danger select:focus,.select.is-danger select.is-focused,.select.is-danger select:active,.select.is-danger select.is-active{box-shadow:0 0 0 0.125em rgba(241, 70, 104, 0.25)}.select.is-small{border-radius:2px;font-size:0.75rem}.select.is-medium{font-size:1.25rem}.select.is-large{font-size:1.5rem}.select.is-disabled::after{border-color:#7a7a7a}.select.is-fullwidth{width:100%}.select.is-fullwidth select{width:100%}.select.is-loading::after{margin-top:0;position:absolute;right:0.625em;top:0.625em;transform:none}.select.is-loading.is-small:after{font-size:0.75rem}.select.is-loading.is-medium:after{font-size:1.25rem}.select.is-loading.is-large:after{font-size:1.5rem}.file{align-items:stretch;display:flex;justify-content:flex-start;position:relative}.file.is-white .file-cta{background-color:white;border-color:transparent;color:#0a0a0a}.file.is-white:hover .file-cta,.file.is-white.is-hovered .file-cta{background-color:#f9f9f9;border-color:transparent;color:#0a0a0a}.file.is-white:focus .file-cta,.file.is-white.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(255, 255, 255, 0.25);color:#0a0a0a}.file.is-white:active .file-cta,.file.is-white.is-active .file-cta{background-color:#f2f2f2;border-color:transparent;color:#0a0a0a}.file.is-black .file-cta{background-color:#0a0a0a;border-color:transparent;color:white}.file.is-black:hover .file-cta,.file.is-black.is-hovered .file-cta{background-color:#040404;border-color:transparent;color:white}.file.is-black:focus .file-cta,.file.is-black.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(10, 10, 10, 0.25);color:white}.file.is-black:active .file-cta,.file.is-black.is-active .file-cta{background-color:black;border-color:transparent;color:white}.file.is-light .file-cta{background-color:whitesmoke;border-color:transparent;color:rgba(0, 0, 0, 0.7)}.file.is-light:hover .file-cta,.file.is-light.is-hovered .file-cta{background-color:#eeeeee;border-color:transparent;color:rgba(0, 0, 0, 0.7)}.file.is-light:focus .file-cta,.file.is-light.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(245, 245, 245, 0.25);color:rgba(0, 0, 0, 0.7)}.file.is-light:active .file-cta,.file.is-light.is-active .file-cta{background-color:#e8e8e8;border-color:transparent;color:rgba(0, 0, 0, 0.7)}.file.is-dark .file-cta{background-color:#363636;border-color:transparent;color:#fff}.file.is-dark:hover .file-cta,.file.is-dark.is-hovered .file-cta{background-color:#2f2f2f;border-color:transparent;color:#fff}.file.is-dark:focus .file-cta,.file.is-dark.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(54, 54, 54, 0.25);color:#fff}.file.is-dark:active .file-cta,.file.is-dark.is-active .file-cta{background-color:#292929;border-color:transparent;color:#fff}.file.is-primary .file-cta{background-color:#00d1b2;border-color:transparent;color:#fff}.file.is-primary:hover .file-cta,.file.is-primary.is-hovered .file-cta{background-color:#00c4a7;border-color:transparent;color:#fff}.file.is-primary:focus .file-cta,.file.is-primary.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(0, 209, 178, 0.25);color:#fff}.file.is-primary:active .file-cta,.file.is-primary.is-active .file-cta{background-color:#00b89c;border-color:transparent;color:#fff}.file.is-link .file-cta{background-color:#485fc7;border-color:transparent;color:#fff}.file.is-link:hover .file-cta,.file.is-link.is-hovered .file-cta{background-color:#3e56c4;border-color:transparent;color:#fff}.file.is-link:focus .file-cta,.file.is-link.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(72, 95, 199, 0.25);color:#fff}.file.is-link:active .file-cta,.file.is-link.is-active .file-cta{background-color:#3a51bb;border-color:transparent;color:#fff}.file.is-info .file-cta{background-color:#3e8ed0;border-color:transparent;color:#fff}.file.is-info:hover .file-cta,.file.is-info.is-hovered .file-cta{background-color:#3488ce;border-color:transparent;color:#fff}.file.is-info:focus .file-cta,.file.is-info.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(62, 142, 208, 0.25);color:#fff}.file.is-info:active .file-cta,.file.is-info.is-active .file-cta{background-color:#3082c5;border-color:transparent;color:#fff}.file.is-success .file-cta{background-color:#48c78e;border-color:transparent;color:#fff}.file.is-success:hover .file-cta,.file.is-success.is-hovered .file-cta{background-color:#3ec487;border-color:transparent;color:#fff}.file.is-success:focus .file-cta,.file.is-success.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(72, 199, 142, 0.25);color:#fff}.file.is-success:active .file-cta,.file.is-success.is-active .file-cta{background-color:#3abb81;border-color:transparent;color:#fff}.file.is-warning .file-cta{background-color:#ffe08a;border-color:transparent;color:rgba(0, 0, 0, 0.7)}.file.is-warning:hover .file-cta,.file.is-warning.is-hovered .file-cta{background-color:#ffdc7d;border-color:transparent;color:rgba(0, 0, 0, 0.7)}.file.is-warning:focus .file-cta,.file.is-warning.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(255, 224, 138, 0.25);color:rgba(0, 0, 0, 0.7)}.file.is-warning:active .file-cta,.file.is-warning.is-active .file-cta{background-color:#ffd970;border-color:transparent;color:rgba(0, 0, 0, 0.7)}.file.is-danger .file-cta{background-color:#f14668;border-color:transparent;color:#fff}.file.is-danger:hover .file-cta,.file.is-danger.is-hovered .file-cta{background-color:#f03a5f;border-color:transparent;color:#fff}.file.is-danger:focus .file-cta,.file.is-danger.is-focused .file-cta{border-color:transparent;box-shadow:0 0 0.5em rgba(241, 70, 104, 0.25);color:#fff}.file.is-danger:active .file-cta,.file.is-danger.is-active .file-cta{background-color:#ef2e55;border-color:transparent;color:#fff}.file.is-small{font-size:0.75rem}.file.is-normal{font-size:1rem}.file.is-medium{font-size:1.25rem}.file.is-medium .file-icon .fa{font-size:21px}.file.is-large{font-size:1.5rem}.file.is-large .file-icon .fa{font-size:28px}.file.has-name .file-cta{border-bottom-right-radius:0;border-top-right-radius:0}.file.has-name .file-name{border-bottom-left-radius:0;border-top-left-radius:0}.file.has-name.is-empty .file-cta{border-radius:4px}.file.has-name.is-empty .file-name{display:none}.file.is-boxed .file-label{flex-direction:column}.file.is-boxed .file-cta{flex-direction:column;height:auto;padding:1em 3em}.file.is-boxed .file-name{border-width:0 1px 1px}.file.is-boxed .file-icon{height:1.5em;width:1.5em}.file.is-boxed .file-icon .fa{font-size:21px}.file.is-boxed.is-small .file-icon .fa{font-size:14px}.file.is-boxed.is-medium .file-icon .fa{font-size:28px}.file.is-boxed.is-large .file-icon .fa{font-size:35px}.file.is-boxed.has-name .file-cta{border-radius:4px 4px 0 0}.file.is-boxed.has-name .file-name{border-radius:0 0 4px 4px;border-width:0 1px 1px}.file.is-centered{justify-content:center}.file.is-fullwidth .file-label{width:100%}.file.is-fullwidth .file-name{flex-grow:1;max-width:none}.file.is-right{justify-content:flex-end}.file.is-right .file-cta{border-radius:0 4px 4px 0}.file.is-right .file-name{border-radius:4px 0 0 4px;border-width:1px 0 1px 1px;order:-1}.file-label{align-items:stretch;display:flex;cursor:pointer;justify-content:flex-start;overflow:hidden;position:relative}.file-label:hover .file-cta{background-color:#eeeeee;color:#363636}.file-label:hover .file-name{border-color:#d5d5d5}.file-label:active .file-cta{background-color:#e8e8e8;color:#363636}.file-label:active .file-name{border-color:#cfcfcf}.file-input{height:100%;left:0;opacity:0;outline:none;position:absolute;top:0;width:100%}.file-cta,.file-name{border-color:#dbdbdb;border-radius:4px;font-size:1em;padding-left:1em;padding-right:1em;white-space:nowrap}.file-cta{background-color:whitesmoke;color:#4a4a4a}.file-name{border-color:#dbdbdb;border-style:solid;border-width:1px 1px 1px 0;display:block;max-width:16em;overflow:hidden;text-align:inherit;text-overflow:ellipsis}.file-icon{align-items:center;display:flex;height:1em;justify-content:center;margin-right:0.5em;width:1em}.file-icon .fa{font-size:14px}.label{color:#363636;display:block;font-size:1rem;font-weight:700}.label:not(:last-child){margin-bottom:0.5em}.label.is-small{font-size:0.75rem}.label.is-medium{font-size:1.25rem}.label.is-large{font-size:1.5rem}.help{display:block;font-size:0.75rem;margin-top:0.25rem}.help.is-white{color:white}.help.is-black{color:#0a0a0a}.help.is-light{color:whitesmoke}.help.is-dark{color:#363636}.help.is-primary{color:#00d1b2}.help.is-link{color:#485fc7}.help.is-info{color:#3e8ed0}.help.is-success{color:#48c78e}.help.is-warning{color:#ffe08a}.help.is-danger{color:#f14668}.field:not(:last-child){margin-bottom:0.75rem}.field.has-addons{display:flex;justify-content:flex-start}.field.has-addons .control:not(:last-child){margin-right:-1px}.field.has-addons .control:not(:first-child):not(:last-child) .button,.field.has-addons .control:not(:first-child):not(:last-child) .input,.field.has-addons .control:not(:first-child):not(:last-child) .select select{border-radius:0}.field.has-addons .control:first-child:not(:only-child) .button,.field.has-addons .control:first-child:not(:only-child) .input,.field.has-addons .control:first-child:not(:only-child) .select select{border-bottom-right-radius:0;border-top-right-radius:0}.field.has-addons .control:last-child:not(:only-child) .button,.field.has-addons .control:last-child:not(:only-child) .input,.field.has-addons .control:last-child:not(:only-child) .select select{border-bottom-left-radius:0;border-top-left-radius:0}.field.has-addons .control .button:not([disabled]):hover,.field.has-addons .control .button:not([disabled]).is-hovered,.field.has-addons .control .input:not([disabled]):hover,.field.has-addons .control .input:not([disabled]).is-hovered,.field.has-addons .control .select select:not([disabled]):hover,.field.has-addons .control .select select:not([disabled]).is-hovered{z-index:2}.field.has-addons .control .button:not([disabled]):focus,.field.has-addons .control .button:not([disabled]).is-focused,.field.has-addons .control .button:not([disabled]):active,.field.has-addons .control .button:not([disabled]).is-active,.field.has-addons .control .input:not([disabled]):focus,.field.has-addons .control .input:not([disabled]).is-focused,.field.has-addons .control .input:not([disabled]):active,.field.has-addons .control .input:not([disabled]).is-active,.field.has-addons .control .select select:not([disabled]):focus,.field.has-addons .control .select select:not([disabled]).is-focused,.field.has-addons .control .select select:not([disabled]):active,.field.has-addons .control .select select:not([disabled]).is-active{z-index:3}.field.has-addons .control .button:not([disabled]):focus:hover,.field.has-addons .control .button:not([disabled]).is-focused:hover,.field.has-addons .control .button:not([disabled]):active:hover,.field.has-addons .control .button:not([disabled]).is-active:hover,.field.has-addons .control .input:not([disabled]):focus:hover,.field.has-addons .control .input:not([disabled]).is-focused:hover,.field.has-addons .control .input:not([disabled]):active:hover,.field.has-addons .control .input:not([disabled]).is-active:hover,.field.has-addons .control .select select:not([disabled]):focus:hover,.field.has-addons .control .select select:not([disabled]).is-focused:hover,.field.has-addons .control .select select:not([disabled]):active:hover,.field.has-addons .control .select select:not([disabled]).is-active:hover{z-index:4}.field.has-addons .control.is-expanded{flex-grow:1;flex-shrink:1}.field.has-addons.has-addons-centered{justify-content:center}.field.has-addons.has-addons-right{justify-content:flex-end}.field.has-addons.has-addons-fullwidth .control{flex-grow:1;flex-shrink:0}.field.is-grouped{display:flex;justify-content:flex-start}.field.is-grouped>.control{flex-shrink:0}.field.is-grouped>.control:not(:last-child){margin-bottom:0;margin-right:0.75rem}.field.is-grouped>.control.is-expanded{flex-grow:1;flex-shrink:1}.field.is-grouped.is-grouped-centered{justify-content:center}.field.is-grouped.is-grouped-right{justify-content:flex-end}.field.is-grouped.is-grouped-multiline{flex-wrap:wrap}.field.is-grouped.is-grouped-multiline>.control:last-child,.field.is-grouped.is-grouped-multiline>.control:not(:last-child){margin-bottom:0.75rem}.field.is-grouped.is-grouped-multiline:last-child{margin-bottom:-0.75rem}.field.is-grouped.is-grouped-multiline:not(:last-child){margin-bottom:0}@media screen and (min-width: 769px), print{.field.is-horizontal{display:flex}}.field-label .label{font-size:inherit}@media screen and (max-width: 768px){.field-label{margin-bottom:0.5rem}}@media screen and (min-width: 769px), print{.field-label{flex-basis:0;flex-grow:1;flex-shrink:0;margin-right:1.5rem;text-align:right}.field-label.is-small{font-size:0.75rem;padding-top:0.375em}.field-label.is-normal{padding-top:0.375em}.field-label.is-medium{font-size:1.25rem;padding-top:0.375em}.field-label.is-large{font-size:1.5rem;padding-top:0.375em}}.field-body .field .field{margin-bottom:0}@media screen and (min-width: 769px), print{.field-body{display:flex;flex-basis:0;flex-grow:5;flex-shrink:1}.field-body .field{margin-bottom:0}.field-body>.field{flex-shrink:1}.field-body>.field:not(.is-narrow){flex-grow:1}.field-body>.field:not(:last-child){margin-right:0.75rem}}.control{box-sizing:border-box;clear:both;font-size:1rem;position:relative;text-align:inherit}.control.has-icons-left .input:focus~.icon,.control.has-icons-left .select:focus~.icon,.control.has-icons-right .input:focus~.icon,.control.has-icons-right .select:focus~.icon{color:#4a4a4a}.control.has-icons-left .input.is-small~.icon,.control.has-icons-left .select.is-small~.icon,.control.has-icons-right .input.is-small~.icon,.control.has-icons-right .select.is-small~.icon{font-size:0.75rem}.control.has-icons-left .input.is-medium~.icon,.control.has-icons-left .select.is-medium~.icon,.control.has-icons-right .input.is-medium~.icon,.control.has-icons-right .select.is-medium~.icon{font-size:1.25rem}.control.has-icons-left .input.is-large~.icon,.control.has-icons-left .select.is-large~.icon,.control.has-icons-right .input.is-large~.icon,.control.has-icons-right .select.is-large~.icon{font-size:1.5rem}.control.has-icons-left .icon,.control.has-icons-right .icon{color:#dbdbdb;height:2.5em;pointer-events:none;position:absolute;top:0;width:2.5em;z-index:4}.control.has-icons-left .input,.control.has-icons-left .select select{padding-left:2.5em}.control.has-icons-left .icon.is-left{left:0}.control.has-icons-right .input,.control.has-icons-right .select select{padding-right:2.5em}.control.has-icons-right .icon.is-right{right:0}.control.is-loading::after{position:absolute !important;right:0.625em;top:0.625em;z-index:4}.control.is-loading.is-small:after{font-size:0.75rem}.control.is-loading.is-medium:after{font-size:1.25rem}.control.is-loading.is-large:after{font-size:1.5rem}.breadcrumb{font-size:1rem;white-space:nowrap}.breadcrumb a{align-items:center;color:#485fc7;display:flex;justify-content:center;padding:0 0.75em}.breadcrumb a:hover{color:#363636}.breadcrumb li{align-items:center;display:flex}.breadcrumb li:first-child a{padding-left:0}.breadcrumb li.is-active a{color:#363636;cursor:default;pointer-events:none}.breadcrumb li+li::before{color:#b5b5b5;content:"/"}.breadcrumb ul,.breadcrumb ol{align-items:flex-start;display:flex;flex-wrap:wrap;justify-content:flex-start}.breadcrumb .icon:first-child{margin-right:0.5em}.breadcrumb .icon:last-child{margin-left:0.5em}.breadcrumb.is-centered ol,.breadcrumb.is-centered ul{justify-content:center}.breadcrumb.is-right ol,.breadcrumb.is-right ul{justify-content:flex-end}.breadcrumb.is-small{font-size:0.75rem}.breadcrumb.is-medium{font-size:1.25rem}.breadcrumb.is-large{font-size:1.5rem}.breadcrumb.has-arrow-separator li+li::before{content:"\u2192"}.breadcrumb.has-bullet-separator li+li::before{content:"\u2022"}.breadcrumb.has-dot-separator li+li::before{content:"\xB7"}.breadcrumb.has-succeeds-separator li+li::before{content:"\u227B"}.card{background-color:white;border-radius:0.25rem;box-shadow:0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);color:#4a4a4a;max-width:100%;position:relative}.card-footer:first-child,.card-content:first-child,.card-header:first-child{border-top-left-radius:0.25rem;border-top-right-radius:0.25rem}.card-footer:last-child,.card-content:last-child,.card-header:last-child{border-bottom-left-radius:0.25rem;border-bottom-right-radius:0.25rem}.card-header{background-color:transparent;align-items:stretch;box-shadow:0 0.125em 0.25em rgba(10, 10, 10, 0.1);display:flex}.card-header-title{align-items:center;color:#363636;display:flex;flex-grow:1;font-weight:700;padding:0.75rem 1rem}.card-header-title.is-centered{justify-content:center}.card-header-icon{-moz-appearance:none;-webkit-appearance:none;appearance:none;background:none;border:none;color:currentColor;font-family:inherit;font-size:1em;margin:0;padding:0;align-items:center;cursor:pointer;display:flex;justify-content:center;padding:0.75rem 1rem}.card-image{display:block;position:relative}.card-image:first-child img{border-top-left-radius:0.25rem;border-top-right-radius:0.25rem}.card-image:last-child img{border-bottom-left-radius:0.25rem;border-bottom-right-radius:0.25rem}.card-content{background-color:transparent;padding:1.5rem}.card-footer{background-color:transparent;border-top:1px solid #ededed;align-items:stretch;display:flex}.card-footer-item{align-items:center;display:flex;flex-basis:0;flex-grow:1;flex-shrink:0;justify-content:center;padding:0.75rem}.card-footer-item:not(:last-child){border-right:1px solid #ededed}.card .media:not(:last-child){margin-bottom:1.5rem}.dropdown{display:inline-flex;position:relative;vertical-align:top}.dropdown.is-active .dropdown-menu,.dropdown.is-hoverable:hover .dropdown-menu{display:block}.dropdown.is-right .dropdown-menu{left:auto;right:0}.dropdown.is-up .dropdown-menu{bottom:100%;padding-bottom:4px;padding-top:initial;top:auto}.dropdown-menu{display:none;left:0;min-width:12rem;padding-top:4px;position:absolute;top:100%;z-index:20}.dropdown-content{background-color:white;border-radius:4px;box-shadow:0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);padding-bottom:0.5rem;padding-top:0.5rem}.dropdown-item{color:#4a4a4a;display:block;font-size:0.875rem;line-height:1.5;padding:0.375rem 1rem;position:relative}a.dropdown-item,button.dropdown-item{padding-right:3rem;text-align:inherit;white-space:nowrap;width:100%}a.dropdown-item:hover,button.dropdown-item:hover{background-color:whitesmoke;color:#0a0a0a}a.dropdown-item.is-active,button.dropdown-item.is-active{background-color:#485fc7;color:#fff}.dropdown-divider{background-color:#ededed;border:none;display:block;height:1px;margin:0.5rem 0}.level{align-items:center;justify-content:space-between}.level code{border-radius:4px}.level img{display:inline-block;vertical-align:top}.level.is-mobile{display:flex}.level.is-mobile .level-left,.level.is-mobile .level-right{display:flex}.level.is-mobile .level-left+.level-right{margin-top:0}.level.is-mobile .level-item:not(:last-child){margin-bottom:0;margin-right:0.75rem}.level.is-mobile .level-item:not(.is-narrow){flex-grow:1}@media screen and (min-width: 769px), print{.level{display:flex}.level>.level-item:not(.is-narrow){flex-grow:1}}.level-item{align-items:center;display:flex;flex-basis:auto;flex-grow:0;flex-shrink:0;justify-content:center}.level-item .title,.level-item .subtitle{margin-bottom:0}@media screen and (max-width: 768px){.level-item:not(:last-child){margin-bottom:0.75rem}}.level-left,.level-right{flex-basis:auto;flex-grow:0;flex-shrink:0}.level-left .level-item.is-flexible,.level-right .level-item.is-flexible{flex-grow:1}@media screen and (min-width: 769px), print{.level-left .level-item:not(:last-child),.level-right .level-item:not(:last-child){margin-right:0.75rem}}.level-left{align-items:center;justify-content:flex-start}@media screen and (max-width: 768px){.level-left+.level-right{margin-top:1.5rem}}@media screen and (min-width: 769px), print{.level-left{display:flex}}.level-right{align-items:center;justify-content:flex-end}@media screen and (min-width: 769px), print{.level-right{display:flex}}.media{align-items:flex-start;display:flex;text-align:inherit}.media .content:not(:last-child){margin-bottom:0.75rem}.media .media{border-top:1px solid rgba(219, 219, 219, 0.5);display:flex;padding-top:0.75rem}.media .media .content:not(:last-child),.media .media .control:not(:last-child){margin-bottom:0.5rem}.media .media .media{padding-top:0.5rem}.media .media .media+.media{margin-top:0.5rem}.media+.media{border-top:1px solid rgba(219, 219, 219, 0.5);margin-top:1rem;padding-top:1rem}.media.is-large+.media{margin-top:1.5rem;padding-top:1.5rem}.media-left,.media-right{flex-basis:auto;flex-grow:0;flex-shrink:0}.media-left{margin-right:1rem}.media-right{margin-left:1rem}.media-content{flex-basis:auto;flex-grow:1;flex-shrink:1;text-align:inherit}@media screen and (max-width: 768px){.media-content{overflow-x:auto}}.menu{font-size:1rem}.menu.is-small{font-size:0.75rem}.menu.is-medium{font-size:1.25rem}.menu.is-large{font-size:1.5rem}.menu-list{line-height:1.25}.menu-list a{border-radius:2px;color:#4a4a4a;display:block;padding:0.5em 0.75em}.menu-list a:hover{background-color:whitesmoke;color:#363636}.menu-list a.is-active{background-color:#485fc7;color:#fff}.menu-list li ul{border-left:1px solid #dbdbdb;margin:0.75em;padding-left:0.75em}.menu-label{color:#7a7a7a;font-size:0.75em;letter-spacing:0.1em;text-transform:uppercase}.menu-label:not(:first-child){margin-top:1em}.menu-label:not(:last-child){margin-bottom:1em}.message{background-color:whitesmoke;border-radius:4px;font-size:1rem}.message strong{color:currentColor}.message a:not(.button):not(.tag):not(.dropdown-item){color:currentColor;text-decoration:underline}.message.is-small{font-size:0.75rem}.message.is-medium{font-size:1.25rem}.message.is-large{font-size:1.5rem}.message.is-white{background-color:white}.message.is-white .message-header{background-color:white;color:#0a0a0a}.message.is-white .message-body{border-color:white}.message.is-black{background-color:#fafafa}.message.is-black .message-header{background-color:#0a0a0a;color:white}.message.is-black .message-body{border-color:#0a0a0a}.message.is-light{background-color:#fafafa}.message.is-light .message-header{background-color:whitesmoke;color:rgba(0, 0, 0, 0.7)}.message.is-light .message-body{border-color:whitesmoke}.message.is-dark{background-color:#fafafa}.message.is-dark .message-header{background-color:#363636;color:#fff}.message.is-dark .message-body{border-color:#363636}.message.is-primary{background-color:#ebfffc}.message.is-primary .message-header{background-color:#00d1b2;color:#fff}.message.is-primary .message-body{border-color:#00d1b2;color:#00947e}.message.is-link{background-color:#eff1fa}.message.is-link .message-header{background-color:#485fc7;color:#fff}.message.is-link .message-body{border-color:#485fc7;color:#3850b7}.message.is-info{background-color:#eff5fb}.message.is-info .message-header{background-color:#3e8ed0;color:#fff}.message.is-info .message-body{border-color:#3e8ed0;color:#296fa8}.message.is-success{background-color:#effaf5}.message.is-success .message-header{background-color:#48c78e;color:#fff}.message.is-success .message-body{border-color:#48c78e;color:#257953}.message.is-warning{background-color:#fffaeb}.message.is-warning .message-header{background-color:#ffe08a;color:rgba(0, 0, 0, 0.7)}.message.is-warning .message-body{border-color:#ffe08a;color:#946c00}.message.is-danger{background-color:#feecf0}.message.is-danger .message-header{background-color:#f14668;color:#fff}.message.is-danger .message-body{border-color:#f14668;color:#cc0f35}.message-header{align-items:center;background-color:#4a4a4a;border-radius:4px 4px 0 0;color:#fff;display:flex;font-weight:700;justify-content:space-between;line-height:1.25;padding:0.75em 1em;position:relative}.message-header .delete{flex-grow:0;flex-shrink:0;margin-left:0.75em}.message-header+.message-body{border-width:0;border-top-left-radius:0;border-top-right-radius:0}.message-body{border-color:#dbdbdb;border-radius:4px;border-style:solid;border-width:0 0 0 4px;color:#4a4a4a;padding:1.25em 1.5em}.message-body code,.message-body pre{background-color:white}.message-body pre code{background-color:transparent}.modal{align-items:center;display:none;flex-direction:column;justify-content:center;overflow:hidden;position:fixed;z-index:40}.modal.is-active{display:flex}.modal-background{background-color:rgba(10, 10, 10, 0.86)}.modal-content,.modal-card{margin:0 20px;max-height:calc(100vh - 160px);overflow:auto;position:relative;width:100%}@media screen and (min-width: 769px){.modal-content,.modal-card{margin:0 auto;max-height:calc(100vh - 40px);width:640px}}.modal-close{background:none;height:40px;position:fixed;right:20px;top:20px;width:40px}.modal-card{display:flex;flex-direction:column;max-height:calc(100vh - 40px);overflow:hidden;-ms-overflow-y:visible}.modal-card-head,.modal-card-foot{align-items:center;background-color:whitesmoke;display:flex;flex-shrink:0;justify-content:flex-start;padding:20px;position:relative}.modal-card-head{border-bottom:1px solid #dbdbdb;border-top-left-radius:6px;border-top-right-radius:6px}.modal-card-title{color:#363636;flex-grow:1;flex-shrink:0;font-size:1.5rem;line-height:1}.modal-card-foot{border-bottom-left-radius:6px;border-bottom-right-radius:6px;border-top:1px solid #dbdbdb}.modal-card-foot .button:not(:last-child){margin-right:0.5em}.modal-card-body{-webkit-overflow-scrolling:touch;background-color:white;flex-grow:1;flex-shrink:1;overflow:auto;padding:20px}.navbar{background-color:white;min-height:3.25rem;position:relative;z-index:30}.navbar.is-white{background-color:white;color:#0a0a0a}.navbar.is-white .navbar-brand>.navbar-item,.navbar.is-white .navbar-brand .navbar-link{color:#0a0a0a}.navbar.is-white .navbar-brand>a.navbar-item:focus,.navbar.is-white .navbar-brand>a.navbar-item:hover,.navbar.is-white .navbar-brand>a.navbar-item.is-active,.navbar.is-white .navbar-brand .navbar-link:focus,.navbar.is-white .navbar-brand .navbar-link:hover,.navbar.is-white .navbar-brand .navbar-link.is-active{background-color:#f2f2f2;color:#0a0a0a}.navbar.is-white .navbar-brand .navbar-link::after{border-color:#0a0a0a}.navbar.is-white .navbar-burger{color:#0a0a0a}@media screen and (min-width: 1024px){.navbar.is-white .navbar-start>.navbar-item,.navbar.is-white .navbar-start .navbar-link,.navbar.is-white .navbar-end>.navbar-item,.navbar.is-white .navbar-end .navbar-link{color:#0a0a0a}.navbar.is-white .navbar-start>a.navbar-item:focus,.navbar.is-white .navbar-start>a.navbar-item:hover,.navbar.is-white .navbar-start>a.navbar-item.is-active,.navbar.is-white .navbar-start .navbar-link:focus,.navbar.is-white .navbar-start .navbar-link:hover,.navbar.is-white .navbar-start .navbar-link.is-active,.navbar.is-white .navbar-end>a.navbar-item:focus,.navbar.is-white .navbar-end>a.navbar-item:hover,.navbar.is-white .navbar-end>a.navbar-item.is-active,.navbar.is-white .navbar-end .navbar-link:focus,.navbar.is-white .navbar-end .navbar-link:hover,.navbar.is-white .navbar-end .navbar-link.is-active{background-color:#f2f2f2;color:#0a0a0a}.navbar.is-white .navbar-start .navbar-link::after,.navbar.is-white .navbar-end .navbar-link::after{border-color:#0a0a0a}.navbar.is-white .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-white .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-white .navbar-item.has-dropdown.is-active .navbar-link{background-color:#f2f2f2;color:#0a0a0a}.navbar.is-white .navbar-dropdown a.navbar-item.is-active{background-color:white;color:#0a0a0a}}.navbar.is-black{background-color:#0a0a0a;color:white}.navbar.is-black .navbar-brand>.navbar-item,.navbar.is-black .navbar-brand .navbar-link{color:white}.navbar.is-black .navbar-brand>a.navbar-item:focus,.navbar.is-black .navbar-brand>a.navbar-item:hover,.navbar.is-black .navbar-brand>a.navbar-item.is-active,.navbar.is-black .navbar-brand .navbar-link:focus,.navbar.is-black .navbar-brand .navbar-link:hover,.navbar.is-black .navbar-brand .navbar-link.is-active{background-color:black;color:white}.navbar.is-black .navbar-brand .navbar-link::after{border-color:white}.navbar.is-black .navbar-burger{color:white}@media screen and (min-width: 1024px){.navbar.is-black .navbar-start>.navbar-item,.navbar.is-black .navbar-start .navbar-link,.navbar.is-black .navbar-end>.navbar-item,.navbar.is-black .navbar-end .navbar-link{color:white}.navbar.is-black .navbar-start>a.navbar-item:focus,.navbar.is-black .navbar-start>a.navbar-item:hover,.navbar.is-black .navbar-start>a.navbar-item.is-active,.navbar.is-black .navbar-start .navbar-link:focus,.navbar.is-black .navbar-start .navbar-link:hover,.navbar.is-black .navbar-start .navbar-link.is-active,.navbar.is-black .navbar-end>a.navbar-item:focus,.navbar.is-black .navbar-end>a.navbar-item:hover,.navbar.is-black .navbar-end>a.navbar-item.is-active,.navbar.is-black .navbar-end .navbar-link:focus,.navbar.is-black .navbar-end .navbar-link:hover,.navbar.is-black .navbar-end .navbar-link.is-active{background-color:black;color:white}.navbar.is-black .navbar-start .navbar-link::after,.navbar.is-black .navbar-end .navbar-link::after{border-color:white}.navbar.is-black .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-black .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-black .navbar-item.has-dropdown.is-active .navbar-link{background-color:black;color:white}.navbar.is-black .navbar-dropdown a.navbar-item.is-active{background-color:#0a0a0a;color:white}}.navbar.is-light{background-color:whitesmoke;color:rgba(0, 0, 0, 0.7)}.navbar.is-light .navbar-brand>.navbar-item,.navbar.is-light .navbar-brand .navbar-link{color:rgba(0, 0, 0, 0.7)}.navbar.is-light .navbar-brand>a.navbar-item:focus,.navbar.is-light .navbar-brand>a.navbar-item:hover,.navbar.is-light .navbar-brand>a.navbar-item.is-active,.navbar.is-light .navbar-brand .navbar-link:focus,.navbar.is-light .navbar-brand .navbar-link:hover,.navbar.is-light .navbar-brand .navbar-link.is-active{background-color:#e8e8e8;color:rgba(0, 0, 0, 0.7)}.navbar.is-light .navbar-brand .navbar-link::after{border-color:rgba(0, 0, 0, 0.7)}.navbar.is-light .navbar-burger{color:rgba(0, 0, 0, 0.7)}@media screen and (min-width: 1024px){.navbar.is-light .navbar-start>.navbar-item,.navbar.is-light .navbar-start .navbar-link,.navbar.is-light .navbar-end>.navbar-item,.navbar.is-light .navbar-end .navbar-link{color:rgba(0, 0, 0, 0.7)}.navbar.is-light .navbar-start>a.navbar-item:focus,.navbar.is-light .navbar-start>a.navbar-item:hover,.navbar.is-light .navbar-start>a.navbar-item.is-active,.navbar.is-light .navbar-start .navbar-link:focus,.navbar.is-light .navbar-start .navbar-link:hover,.navbar.is-light .navbar-start .navbar-link.is-active,.navbar.is-light .navbar-end>a.navbar-item:focus,.navbar.is-light .navbar-end>a.navbar-item:hover,.navbar.is-light .navbar-end>a.navbar-item.is-active,.navbar.is-light .navbar-end .navbar-link:focus,.navbar.is-light .navbar-end .navbar-link:hover,.navbar.is-light .navbar-end .navbar-link.is-active{background-color:#e8e8e8;color:rgba(0, 0, 0, 0.7)}.navbar.is-light .navbar-start .navbar-link::after,.navbar.is-light .navbar-end .navbar-link::after{border-color:rgba(0, 0, 0, 0.7)}.navbar.is-light .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-light .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-light .navbar-item.has-dropdown.is-active .navbar-link{background-color:#e8e8e8;color:rgba(0, 0, 0, 0.7)}.navbar.is-light .navbar-dropdown a.navbar-item.is-active{background-color:whitesmoke;color:rgba(0, 0, 0, 0.7)}}.navbar.is-dark{background-color:#363636;color:#fff}.navbar.is-dark .navbar-brand>.navbar-item,.navbar.is-dark .navbar-brand .navbar-link{color:#fff}.navbar.is-dark .navbar-brand>a.navbar-item:focus,.navbar.is-dark .navbar-brand>a.navbar-item:hover,.navbar.is-dark .navbar-brand>a.navbar-item.is-active,.navbar.is-dark .navbar-brand .navbar-link:focus,.navbar.is-dark .navbar-brand .navbar-link:hover,.navbar.is-dark .navbar-brand .navbar-link.is-active{background-color:#292929;color:#fff}.navbar.is-dark .navbar-brand .navbar-link::after{border-color:#fff}.navbar.is-dark .navbar-burger{color:#fff}@media screen and (min-width: 1024px){.navbar.is-dark .navbar-start>.navbar-item,.navbar.is-dark .navbar-start .navbar-link,.navbar.is-dark .navbar-end>.navbar-item,.navbar.is-dark .navbar-end .navbar-link{color:#fff}.navbar.is-dark .navbar-start>a.navbar-item:focus,.navbar.is-dark .navbar-start>a.navbar-item:hover,.navbar.is-dark .navbar-start>a.navbar-item.is-active,.navbar.is-dark .navbar-start .navbar-link:focus,.navbar.is-dark .navbar-start .navbar-link:hover,.navbar.is-dark .navbar-start .navbar-link.is-active,.navbar.is-dark .navbar-end>a.navbar-item:focus,.navbar.is-dark .navbar-end>a.navbar-item:hover,.navbar.is-dark .navbar-end>a.navbar-item.is-active,.navbar.is-dark .navbar-end .navbar-link:focus,.navbar.is-dark .navbar-end .navbar-link:hover,.navbar.is-dark .navbar-end .navbar-link.is-active{background-color:#292929;color:#fff}.navbar.is-dark .navbar-start .navbar-link::after,.navbar.is-dark .navbar-end .navbar-link::after{border-color:#fff}.navbar.is-dark .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-dark .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-dark .navbar-item.has-dropdown.is-active .navbar-link{background-color:#292929;color:#fff}.navbar.is-dark .navbar-dropdown a.navbar-item.is-active{background-color:#363636;color:#fff}}.navbar.is-primary{background-color:#00d1b2;color:#fff}.navbar.is-primary .navbar-brand>.navbar-item,.navbar.is-primary .navbar-brand .navbar-link{color:#fff}.navbar.is-primary .navbar-brand>a.navbar-item:focus,.navbar.is-primary .navbar-brand>a.navbar-item:hover,.navbar.is-primary .navbar-brand>a.navbar-item.is-active,.navbar.is-primary .navbar-brand .navbar-link:focus,.navbar.is-primary .navbar-brand .navbar-link:hover,.navbar.is-primary .navbar-brand .navbar-link.is-active{background-color:#00b89c;color:#fff}.navbar.is-primary .navbar-brand .navbar-link::after{border-color:#fff}.navbar.is-primary .navbar-burger{color:#fff}@media screen and (min-width: 1024px){.navbar.is-primary .navbar-start>.navbar-item,.navbar.is-primary .navbar-start .navbar-link,.navbar.is-primary .navbar-end>.navbar-item,.navbar.is-primary .navbar-end .navbar-link{color:#fff}.navbar.is-primary .navbar-start>a.navbar-item:focus,.navbar.is-primary .navbar-start>a.navbar-item:hover,.navbar.is-primary .navbar-start>a.navbar-item.is-active,.navbar.is-primary .navbar-start .navbar-link:focus,.navbar.is-primary .navbar-start .navbar-link:hover,.navbar.is-primary .navbar-start .navbar-link.is-active,.navbar.is-primary .navbar-end>a.navbar-item:focus,.navbar.is-primary .navbar-end>a.navbar-item:hover,.navbar.is-primary .navbar-end>a.navbar-item.is-active,.navbar.is-primary .navbar-end .navbar-link:focus,.navbar.is-primary .navbar-end .navbar-link:hover,.navbar.is-primary .navbar-end .navbar-link.is-active{background-color:#00b89c;color:#fff}.navbar.is-primary .navbar-start .navbar-link::after,.navbar.is-primary .navbar-end .navbar-link::after{border-color:#fff}.navbar.is-primary .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-primary .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-primary .navbar-item.has-dropdown.is-active .navbar-link{background-color:#00b89c;color:#fff}.navbar.is-primary .navbar-dropdown a.navbar-item.is-active{background-color:#00d1b2;color:#fff}}.navbar.is-link{background-color:#485fc7;color:#fff}.navbar.is-link .navbar-brand>.navbar-item,.navbar.is-link .navbar-brand .navbar-link{color:#fff}.navbar.is-link .navbar-brand>a.navbar-item:focus,.navbar.is-link .navbar-brand>a.navbar-item:hover,.navbar.is-link .navbar-brand>a.navbar-item.is-active,.navbar.is-link .navbar-brand .navbar-link:focus,.navbar.is-link .navbar-brand .navbar-link:hover,.navbar.is-link .navbar-brand .navbar-link.is-active{background-color:#3a51bb;color:#fff}.navbar.is-link .navbar-brand .navbar-link::after{border-color:#fff}.navbar.is-link .navbar-burger{color:#fff}@media screen and (min-width: 1024px){.navbar.is-link .navbar-start>.navbar-item,.navbar.is-link .navbar-start .navbar-link,.navbar.is-link .navbar-end>.navbar-item,.navbar.is-link .navbar-end .navbar-link{color:#fff}.navbar.is-link .navbar-start>a.navbar-item:focus,.navbar.is-link .navbar-start>a.navbar-item:hover,.navbar.is-link .navbar-start>a.navbar-item.is-active,.navbar.is-link .navbar-start .navbar-link:focus,.navbar.is-link .navbar-start .navbar-link:hover,.navbar.is-link .navbar-start .navbar-link.is-active,.navbar.is-link .navbar-end>a.navbar-item:focus,.navbar.is-link .navbar-end>a.navbar-item:hover,.navbar.is-link .navbar-end>a.navbar-item.is-active,.navbar.is-link .navbar-end .navbar-link:focus,.navbar.is-link .navbar-end .navbar-link:hover,.navbar.is-link .navbar-end .navbar-link.is-active{background-color:#3a51bb;color:#fff}.navbar.is-link .navbar-start .navbar-link::after,.navbar.is-link .navbar-end .navbar-link::after{border-color:#fff}.navbar.is-link .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-link .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-link .navbar-item.has-dropdown.is-active .navbar-link{background-color:#3a51bb;color:#fff}.navbar.is-link .navbar-dropdown a.navbar-item.is-active{background-color:#485fc7;color:#fff}}.navbar.is-info{background-color:#3e8ed0;color:#fff}.navbar.is-info .navbar-brand>.navbar-item,.navbar.is-info .navbar-brand .navbar-link{color:#fff}.navbar.is-info .navbar-brand>a.navbar-item:focus,.navbar.is-info .navbar-brand>a.navbar-item:hover,.navbar.is-info .navbar-brand>a.navbar-item.is-active,.navbar.is-info .navbar-brand .navbar-link:focus,.navbar.is-info .navbar-brand .navbar-link:hover,.navbar.is-info .navbar-brand .navbar-link.is-active{background-color:#3082c5;color:#fff}.navbar.is-info .navbar-brand .navbar-link::after{border-color:#fff}.navbar.is-info .navbar-burger{color:#fff}@media screen and (min-width: 1024px){.navbar.is-info .navbar-start>.navbar-item,.navbar.is-info .navbar-start .navbar-link,.navbar.is-info .navbar-end>.navbar-item,.navbar.is-info .navbar-end .navbar-link{color:#fff}.navbar.is-info .navbar-start>a.navbar-item:focus,.navbar.is-info .navbar-start>a.navbar-item:hover,.navbar.is-info .navbar-start>a.navbar-item.is-active,.navbar.is-info .navbar-start .navbar-link:focus,.navbar.is-info .navbar-start .navbar-link:hover,.navbar.is-info .navbar-start .navbar-link.is-active,.navbar.is-info .navbar-end>a.navbar-item:focus,.navbar.is-info .navbar-end>a.navbar-item:hover,.navbar.is-info .navbar-end>a.navbar-item.is-active,.navbar.is-info .navbar-end .navbar-link:focus,.navbar.is-info .navbar-end .navbar-link:hover,.navbar.is-info .navbar-end .navbar-link.is-active{background-color:#3082c5;color:#fff}.navbar.is-info .navbar-start .navbar-link::after,.navbar.is-info .navbar-end .navbar-link::after{border-color:#fff}.navbar.is-info .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-info .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-info .navbar-item.has-dropdown.is-active .navbar-link{background-color:#3082c5;color:#fff}.navbar.is-info .navbar-dropdown a.navbar-item.is-active{background-color:#3e8ed0;color:#fff}}.navbar.is-success{background-color:#48c78e;color:#fff}.navbar.is-success .navbar-brand>.navbar-item,.navbar.is-success .navbar-brand .navbar-link{color:#fff}.navbar.is-success .navbar-brand>a.navbar-item:focus,.navbar.is-success .navbar-brand>a.navbar-item:hover,.navbar.is-success .navbar-brand>a.navbar-item.is-active,.navbar.is-success .navbar-brand .navbar-link:focus,.navbar.is-success .navbar-brand .navbar-link:hover,.navbar.is-success .navbar-brand .navbar-link.is-active{background-color:#3abb81;color:#fff}.navbar.is-success .navbar-brand .navbar-link::after{border-color:#fff}.navbar.is-success .navbar-burger{color:#fff}@media screen and (min-width: 1024px){.navbar.is-success .navbar-start>.navbar-item,.navbar.is-success .navbar-start .navbar-link,.navbar.is-success .navbar-end>.navbar-item,.navbar.is-success .navbar-end .navbar-link{color:#fff}.navbar.is-success .navbar-start>a.navbar-item:focus,.navbar.is-success .navbar-start>a.navbar-item:hover,.navbar.is-success .navbar-start>a.navbar-item.is-active,.navbar.is-success .navbar-start .navbar-link:focus,.navbar.is-success .navbar-start .navbar-link:hover,.navbar.is-success .navbar-start .navbar-link.is-active,.navbar.is-success .navbar-end>a.navbar-item:focus,.navbar.is-success .navbar-end>a.navbar-item:hover,.navbar.is-success .navbar-end>a.navbar-item.is-active,.navbar.is-success .navbar-end .navbar-link:focus,.navbar.is-success .navbar-end .navbar-link:hover,.navbar.is-success .navbar-end .navbar-link.is-active{background-color:#3abb81;color:#fff}.navbar.is-success .navbar-start .navbar-link::after,.navbar.is-success .navbar-end .navbar-link::after{border-color:#fff}.navbar.is-success .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-success .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-success .navbar-item.has-dropdown.is-active .navbar-link{background-color:#3abb81;color:#fff}.navbar.is-success .navbar-dropdown a.navbar-item.is-active{background-color:#48c78e;color:#fff}}.navbar.is-warning{background-color:#ffe08a;color:rgba(0, 0, 0, 0.7)}.navbar.is-warning .navbar-brand>.navbar-item,.navbar.is-warning .navbar-brand .navbar-link{color:rgba(0, 0, 0, 0.7)}.navbar.is-warning .navbar-brand>a.navbar-item:focus,.navbar.is-warning .navbar-brand>a.navbar-item:hover,.navbar.is-warning .navbar-brand>a.navbar-item.is-active,.navbar.is-warning .navbar-brand .navbar-link:focus,.navbar.is-warning .navbar-brand .navbar-link:hover,.navbar.is-warning .navbar-brand .navbar-link.is-active{background-color:#ffd970;color:rgba(0, 0, 0, 0.7)}.navbar.is-warning .navbar-brand .navbar-link::after{border-color:rgba(0, 0, 0, 0.7)}.navbar.is-warning .navbar-burger{color:rgba(0, 0, 0, 0.7)}@media screen and (min-width: 1024px){.navbar.is-warning .navbar-start>.navbar-item,.navbar.is-warning .navbar-start .navbar-link,.navbar.is-warning .navbar-end>.navbar-item,.navbar.is-warning .navbar-end .navbar-link{color:rgba(0, 0, 0, 0.7)}.navbar.is-warning .navbar-start>a.navbar-item:focus,.navbar.is-warning .navbar-start>a.navbar-item:hover,.navbar.is-warning .navbar-start>a.navbar-item.is-active,.navbar.is-warning .navbar-start .navbar-link:focus,.navbar.is-warning .navbar-start .navbar-link:hover,.navbar.is-warning .navbar-start .navbar-link.is-active,.navbar.is-warning .navbar-end>a.navbar-item:focus,.navbar.is-warning .navbar-end>a.navbar-item:hover,.navbar.is-warning .navbar-end>a.navbar-item.is-active,.navbar.is-warning .navbar-end .navbar-link:focus,.navbar.is-warning .navbar-end .navbar-link:hover,.navbar.is-warning .navbar-end .navbar-link.is-active{background-color:#ffd970;color:rgba(0, 0, 0, 0.7)}.navbar.is-warning .navbar-start .navbar-link::after,.navbar.is-warning .navbar-end .navbar-link::after{border-color:rgba(0, 0, 0, 0.7)}.navbar.is-warning .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-warning .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-warning .navbar-item.has-dropdown.is-active .navbar-link{background-color:#ffd970;color:rgba(0, 0, 0, 0.7)}.navbar.is-warning .navbar-dropdown a.navbar-item.is-active{background-color:#ffe08a;color:rgba(0, 0, 0, 0.7)}}.navbar.is-danger{background-color:#f14668;color:#fff}.navbar.is-danger .navbar-brand>.navbar-item,.navbar.is-danger .navbar-brand .navbar-link{color:#fff}.navbar.is-danger .navbar-brand>a.navbar-item:focus,.navbar.is-danger .navbar-brand>a.navbar-item:hover,.navbar.is-danger .navbar-brand>a.navbar-item.is-active,.navbar.is-danger .navbar-brand .navbar-link:focus,.navbar.is-danger .navbar-brand .navbar-link:hover,.navbar.is-danger .navbar-brand .navbar-link.is-active{background-color:#ef2e55;color:#fff}.navbar.is-danger .navbar-brand .navbar-link::after{border-color:#fff}.navbar.is-danger .navbar-burger{color:#fff}@media screen and (min-width: 1024px){.navbar.is-danger .navbar-start>.navbar-item,.navbar.is-danger .navbar-start .navbar-link,.navbar.is-danger .navbar-end>.navbar-item,.navbar.is-danger .navbar-end .navbar-link{color:#fff}.navbar.is-danger .navbar-start>a.navbar-item:focus,.navbar.is-danger .navbar-start>a.navbar-item:hover,.navbar.is-danger .navbar-start>a.navbar-item.is-active,.navbar.is-danger .navbar-start .navbar-link:focus,.navbar.is-danger .navbar-start .navbar-link:hover,.navbar.is-danger .navbar-start .navbar-link.is-active,.navbar.is-danger .navbar-end>a.navbar-item:focus,.navbar.is-danger .navbar-end>a.navbar-item:hover,.navbar.is-danger .navbar-end>a.navbar-item.is-active,.navbar.is-danger .navbar-end .navbar-link:focus,.navbar.is-danger .navbar-end .navbar-link:hover,.navbar.is-danger .navbar-end .navbar-link.is-active{background-color:#ef2e55;color:#fff}.navbar.is-danger .navbar-start .navbar-link::after,.navbar.is-danger .navbar-end .navbar-link::after{border-color:#fff}.navbar.is-danger .navbar-item.has-dropdown:focus .navbar-link,.navbar.is-danger .navbar-item.has-dropdown:hover .navbar-link,.navbar.is-danger .navbar-item.has-dropdown.is-active .navbar-link{background-color:#ef2e55;color:#fff}.navbar.is-danger .navbar-dropdown a.navbar-item.is-active{background-color:#f14668;color:#fff}}.navbar>.container{align-items:stretch;display:flex;min-height:3.25rem;width:100%}.navbar.has-shadow{box-shadow:0 2px 0 0 whitesmoke}.navbar.is-fixed-bottom,.navbar.is-fixed-top{left:0;position:fixed;right:0;z-index:30}.navbar.is-fixed-bottom{bottom:0}.navbar.is-fixed-bottom.has-shadow{box-shadow:0 -2px 0 0 whitesmoke}.navbar.is-fixed-top{top:0}html.has-navbar-fixed-top,body.has-navbar-fixed-top{padding-top:3.25rem}html.has-navbar-fixed-bottom,body.has-navbar-fixed-bottom{padding-bottom:3.25rem}.navbar-brand,.navbar-tabs{align-items:stretch;display:flex;flex-shrink:0;min-height:3.25rem}.navbar-brand a.navbar-item:focus,.navbar-brand a.navbar-item:hover{background-color:transparent}.navbar-tabs{-webkit-overflow-scrolling:touch;max-width:100vw;overflow-x:auto;overflow-y:hidden}.navbar-burger{color:#4a4a4a;cursor:pointer;display:block;height:3.25rem;position:relative;width:3.25rem;margin-left:auto}.navbar-burger span{background-color:currentColor;display:block;height:1px;left:calc(50% - 8px);position:absolute;transform-origin:center;transition-duration:86ms;transition-property:background-color, opacity, transform;transition-timing-function:ease-out;width:16px}.navbar-burger span:nth-child(1){top:calc(50% - 6px)}.navbar-burger span:nth-child(2){top:calc(50% - 1px)}.navbar-burger span:nth-child(3){top:calc(50% + 4px)}.navbar-burger:hover{background-color:rgba(0, 0, 0, 0.05)}.navbar-burger.is-active span:nth-child(1){transform:translateY(5px) rotate(45deg)}.navbar-burger.is-active span:nth-child(2){opacity:0}.navbar-burger.is-active span:nth-child(3){transform:translateY(-5px) rotate(-45deg)}.navbar-menu{display:none}.navbar-item,.navbar-link{color:#4a4a4a;display:block;line-height:1.5;padding:0.5rem 0.75rem;position:relative}.navbar-item .icon:only-child,.navbar-link .icon:only-child{margin-left:-0.25rem;margin-right:-0.25rem}a.navbar-item,.navbar-link{cursor:pointer}a.navbar-item:focus,a.navbar-item:focus-within,a.navbar-item:hover,a.navbar-item.is-active,.navbar-link:focus,.navbar-link:focus-within,.navbar-link:hover,.navbar-link.is-active{background-color:#fafafa;color:#485fc7}.navbar-item{flex-grow:0;flex-shrink:0}.navbar-item img{max-height:1.75rem}.navbar-item.has-dropdown{padding:0}.navbar-item.is-expanded{flex-grow:1;flex-shrink:1}.navbar-item.is-tab{border-bottom:1px solid transparent;min-height:3.25rem;padding-bottom:calc(0.5rem - 1px)}.navbar-item.is-tab:focus,.navbar-item.is-tab:hover{background-color:transparent;border-bottom-color:#485fc7}.navbar-item.is-tab.is-active{background-color:transparent;border-bottom-color:#485fc7;border-bottom-style:solid;border-bottom-width:3px;color:#485fc7;padding-bottom:calc(0.5rem - 3px)}.navbar-content{flex-grow:1;flex-shrink:1}.navbar-link:not(.is-arrowless){padding-right:2.5em}.navbar-link:not(.is-arrowless)::after{border-color:#485fc7;margin-top:-0.375em;right:1.125em}.navbar-dropdown{font-size:0.875rem;padding-bottom:0.5rem;padding-top:0.5rem}.navbar-dropdown .navbar-item{padding-left:1.5rem;padding-right:1.5rem}.navbar-divider{background-color:whitesmoke;border:none;display:none;height:2px;margin:0.5rem 0}@media screen and (max-width: 1023px){.navbar>.container{display:block}.navbar-brand .navbar-item,.navbar-tabs .navbar-item{align-items:center;display:flex}.navbar-link::after{display:none}.navbar-menu{background-color:white;box-shadow:0 8px 16px rgba(10, 10, 10, 0.1);padding:0.5rem 0}.navbar-menu.is-active{display:block}.navbar.is-fixed-bottom-touch,.navbar.is-fixed-top-touch{left:0;position:fixed;right:0;z-index:30}.navbar.is-fixed-bottom-touch{bottom:0}.navbar.is-fixed-bottom-touch.has-shadow{box-shadow:0 -2px 3px rgba(10, 10, 10, 0.1)}.navbar.is-fixed-top-touch{top:0}.navbar.is-fixed-top .navbar-menu,.navbar.is-fixed-top-touch .navbar-menu{-webkit-overflow-scrolling:touch;max-height:calc(100vh - 3.25rem);overflow:auto}html.has-navbar-fixed-top-touch,body.has-navbar-fixed-top-touch{padding-top:3.25rem}html.has-navbar-fixed-bottom-touch,body.has-navbar-fixed-bottom-touch{padding-bottom:3.25rem}}@media screen and (min-width: 1024px){.navbar,.navbar-menu,.navbar-start,.navbar-end{align-items:stretch;display:flex}.navbar{min-height:3.25rem}.navbar.is-spaced{padding:1rem 2rem}.navbar.is-spaced .navbar-start,.navbar.is-spaced .navbar-end{align-items:center}.navbar.is-spaced a.navbar-item,.navbar.is-spaced .navbar-link{border-radius:4px}.navbar.is-transparent a.navbar-item:focus,.navbar.is-transparent a.navbar-item:hover,.navbar.is-transparent a.navbar-item.is-active,.navbar.is-transparent .navbar-link:focus,.navbar.is-transparent .navbar-link:hover,.navbar.is-transparent .navbar-link.is-active{background-color:transparent !important}.navbar.is-transparent .navbar-item.has-dropdown.is-active .navbar-link,.navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:focus .navbar-link,.navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:focus-within .navbar-link,.navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:hover .navbar-link{background-color:transparent !important}.navbar.is-transparent .navbar-dropdown a.navbar-item:focus,.navbar.is-transparent .navbar-dropdown a.navbar-item:hover{background-color:whitesmoke;color:#0a0a0a}.navbar.is-transparent .navbar-dropdown a.navbar-item.is-active{background-color:whitesmoke;color:#485fc7}.navbar-burger{display:none}.navbar-item,.navbar-link{align-items:center;display:flex}.navbar-item.has-dropdown{align-items:stretch}.navbar-item.has-dropdown-up .navbar-link::after{transform:rotate(135deg) translate(0.25em, -0.25em)}.navbar-item.has-dropdown-up .navbar-dropdown{border-bottom:2px solid #dbdbdb;border-radius:6px 6px 0 0;border-top:none;bottom:100%;box-shadow:0 -8px 8px rgba(10, 10, 10, 0.1);top:auto}.navbar-item.is-active .navbar-dropdown,.navbar-item.is-hoverable:focus .navbar-dropdown,.navbar-item.is-hoverable:focus-within .navbar-dropdown,.navbar-item.is-hoverable:hover .navbar-dropdown{display:block}.navbar.is-spaced .navbar-item.is-active .navbar-dropdown,.navbar-item.is-active .navbar-dropdown.is-boxed,.navbar.is-spaced .navbar-item.is-hoverable:focus .navbar-dropdown,.navbar-item.is-hoverable:focus .navbar-dropdown.is-boxed,.navbar.is-spaced .navbar-item.is-hoverable:focus-within .navbar-dropdown,.navbar-item.is-hoverable:focus-within .navbar-dropdown.is-boxed,.navbar.is-spaced .navbar-item.is-hoverable:hover .navbar-dropdown,.navbar-item.is-hoverable:hover .navbar-dropdown.is-boxed{opacity:1;pointer-events:auto;transform:translateY(0)}.navbar-menu{flex-grow:1;flex-shrink:0}.navbar-start{justify-content:flex-start;margin-right:auto}.navbar-end{justify-content:flex-end;margin-left:auto}.navbar-dropdown{background-color:white;border-bottom-left-radius:6px;border-bottom-right-radius:6px;border-top:2px solid #dbdbdb;box-shadow:0 8px 8px rgba(10, 10, 10, 0.1);display:none;font-size:0.875rem;left:0;min-width:100%;position:absolute;top:100%;z-index:20}.navbar-dropdown .navbar-item{padding:0.375rem 1rem;white-space:nowrap}.navbar-dropdown a.navbar-item{padding-right:3rem}.navbar-dropdown a.navbar-item:focus,.navbar-dropdown a.navbar-item:hover{background-color:whitesmoke;color:#0a0a0a}.navbar-dropdown a.navbar-item.is-active{background-color:whitesmoke;color:#485fc7}.navbar.is-spaced .navbar-dropdown,.navbar-dropdown.is-boxed{border-radius:6px;border-top:none;box-shadow:0 8px 8px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);display:block;opacity:0;pointer-events:none;top:calc(100% + (-4px));transform:translateY(-5px);transition-duration:86ms;transition-property:opacity, transform}.navbar-dropdown.is-right{left:auto;right:0}.navbar-divider{display:block}.navbar>.container .navbar-brand,.container>.navbar .navbar-brand{margin-left:-0.75rem}.navbar>.container .navbar-menu,.container>.navbar .navbar-menu{margin-right:-0.75rem}.navbar.is-fixed-bottom-desktop,.navbar.is-fixed-top-desktop{left:0;position:fixed;right:0;z-index:30}.navbar.is-fixed-bottom-desktop{bottom:0}.navbar.is-fixed-bottom-desktop.has-shadow{box-shadow:0 -2px 3px rgba(10, 10, 10, 0.1)}.navbar.is-fixed-top-desktop{top:0}html.has-navbar-fixed-top-desktop,body.has-navbar-fixed-top-desktop{padding-top:3.25rem}html.has-navbar-fixed-bottom-desktop,body.has-navbar-fixed-bottom-desktop{padding-bottom:3.25rem}html.has-spaced-navbar-fixed-top,body.has-spaced-navbar-fixed-top{padding-top:5.25rem}html.has-spaced-navbar-fixed-bottom,body.has-spaced-navbar-fixed-bottom{padding-bottom:5.25rem}a.navbar-item.is-active,.navbar-link.is-active{color:#0a0a0a}a.navbar-item.is-active:not(:focus):not(:hover),.navbar-link.is-active:not(:focus):not(:hover){background-color:transparent}.navbar-item.has-dropdown:focus .navbar-link,.navbar-item.has-dropdown:hover .navbar-link,.navbar-item.has-dropdown.is-active .navbar-link{background-color:#fafafa}}.hero.is-fullheight-with-navbar{min-height:calc(100vh - 3.25rem)}.pagination{font-size:1rem;margin:-0.25rem}.pagination.is-small{font-size:0.75rem}.pagination.is-medium{font-size:1.25rem}.pagination.is-large{font-size:1.5rem}.pagination.is-rounded .pagination-previous,.pagination.is-rounded .pagination-next{padding-left:1em;padding-right:1em;border-radius:9999px}.pagination.is-rounded .pagination-link{border-radius:9999px}.pagination,.pagination-list{align-items:center;display:flex;justify-content:center;text-align:center}.pagination-previous,.pagination-next,.pagination-link,.pagination-ellipsis{font-size:1em;justify-content:center;margin:0.25rem;padding-left:0.5em;padding-right:0.5em;text-align:center}.pagination-previous,.pagination-next,.pagination-link{border-color:#dbdbdb;color:#363636;min-width:2.5em}.pagination-previous:hover,.pagination-next:hover,.pagination-link:hover{border-color:#b5b5b5;color:#363636}.pagination-previous:focus,.pagination-next:focus,.pagination-link:focus{border-color:#485fc7}.pagination-previous:active,.pagination-next:active,.pagination-link:active{box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.2)}.pagination-previous[disabled],.pagination-next[disabled],.pagination-link[disabled]{background-color:#dbdbdb;border-color:#dbdbdb;box-shadow:none;color:#7a7a7a;opacity:0.5}.pagination-previous,.pagination-next{padding-left:0.75em;padding-right:0.75em;white-space:nowrap}.pagination-link.is-current{background-color:#485fc7;border-color:#485fc7;color:#fff}.pagination-ellipsis{color:#b5b5b5;pointer-events:none}.pagination-list{flex-wrap:wrap}.pagination-list li{list-style:none}@media screen and (max-width: 768px){.pagination{flex-wrap:wrap}.pagination-previous,.pagination-next{flex-grow:1;flex-shrink:1}.pagination-list li{flex-grow:1;flex-shrink:1}}@media screen and (min-width: 769px), print{.pagination-list{flex-grow:1;flex-shrink:1;justify-content:flex-start;order:1}.pagination-previous,.pagination-next,.pagination-link,.pagination-ellipsis{margin-bottom:0;margin-top:0}.pagination-previous{order:2}.pagination-next{order:3}.pagination{justify-content:space-between;margin-bottom:0;margin-top:0}.pagination.is-centered .pagination-previous{order:1}.pagination.is-centered .pagination-list{justify-content:center;order:2}.pagination.is-centered .pagination-next{order:3}.pagination.is-right .pagination-previous{order:1}.pagination.is-right .pagination-next{order:2}.pagination.is-right .pagination-list{justify-content:flex-end;order:3}}.panel{border-radius:6px;box-shadow:0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);font-size:1rem}.panel:not(:last-child){margin-bottom:1.5rem}.panel.is-white .panel-heading{background-color:white;color:#0a0a0a}.panel.is-white .panel-tabs a.is-active{border-bottom-color:white}.panel.is-white .panel-block.is-active .panel-icon{color:white}.panel.is-black .panel-heading{background-color:#0a0a0a;color:white}.panel.is-black .panel-tabs a.is-active{border-bottom-color:#0a0a0a}.panel.is-black .panel-block.is-active .panel-icon{color:#0a0a0a}.panel.is-light .panel-heading{background-color:whitesmoke;color:rgba(0, 0, 0, 0.7)}.panel.is-light .panel-tabs a.is-active{border-bottom-color:whitesmoke}.panel.is-light .panel-block.is-active .panel-icon{color:whitesmoke}.panel.is-dark .panel-heading{background-color:#363636;color:#fff}.panel.is-dark .panel-tabs a.is-active{border-bottom-color:#363636}.panel.is-dark .panel-block.is-active .panel-icon{color:#363636}.panel.is-primary .panel-heading{background-color:#00d1b2;color:#fff}.panel.is-primary .panel-tabs a.is-active{border-bottom-color:#00d1b2}.panel.is-primary .panel-block.is-active .panel-icon{color:#00d1b2}.panel.is-link .panel-heading{background-color:#485fc7;color:#fff}.panel.is-link .panel-tabs a.is-active{border-bottom-color:#485fc7}.panel.is-link .panel-block.is-active .panel-icon{color:#485fc7}.panel.is-info .panel-heading{background-color:#3e8ed0;color:#fff}.panel.is-info .panel-tabs a.is-active{border-bottom-color:#3e8ed0}.panel.is-info .panel-block.is-active .panel-icon{color:#3e8ed0}.panel.is-success .panel-heading{background-color:#48c78e;color:#fff}.panel.is-success .panel-tabs a.is-active{border-bottom-color:#48c78e}.panel.is-success .panel-block.is-active .panel-icon{color:#48c78e}.panel.is-warning .panel-heading{background-color:#ffe08a;color:rgba(0, 0, 0, 0.7)}.panel.is-warning .panel-tabs a.is-active{border-bottom-color:#ffe08a}.panel.is-warning .panel-block.is-active .panel-icon{color:#ffe08a}.panel.is-danger .panel-heading{background-color:#f14668;color:#fff}.panel.is-danger .panel-tabs a.is-active{border-bottom-color:#f14668}.panel.is-danger .panel-block.is-active .panel-icon{color:#f14668}.panel-tabs:not(:last-child),.panel-block:not(:last-child){border-bottom:1px solid #ededed}.panel-heading{background-color:#ededed;border-radius:6px 6px 0 0;color:#363636;font-size:1.25em;font-weight:700;line-height:1.25;padding:0.75em 1em}.panel-tabs{align-items:flex-end;display:flex;font-size:0.875em;justify-content:center}.panel-tabs a{border-bottom:1px solid #dbdbdb;margin-bottom:-1px;padding:0.5em}.panel-tabs a.is-active{border-bottom-color:#4a4a4a;color:#363636}.panel-list a{color:#4a4a4a}.panel-list a:hover{color:#485fc7}.panel-block{align-items:center;color:#363636;display:flex;justify-content:flex-start;padding:0.5em 0.75em}.panel-block input[type=checkbox]{margin-right:0.75em}.panel-block>.control{flex-grow:1;flex-shrink:1;width:100%}.panel-block.is-wrapped{flex-wrap:wrap}.panel-block.is-active{border-left-color:#485fc7;color:#363636}.panel-block.is-active .panel-icon{color:#485fc7}.panel-block:last-child{border-bottom-left-radius:6px;border-bottom-right-radius:6px}a.panel-block,label.panel-block{cursor:pointer}a.panel-block:hover,label.panel-block:hover{background-color:whitesmoke}.panel-icon{display:inline-block;font-size:14px;height:1em;line-height:1em;text-align:center;vertical-align:top;width:1em;color:#7a7a7a;margin-right:0.75em}.panel-icon .fa{font-size:inherit;line-height:inherit}.tabs{-webkit-overflow-scrolling:touch;align-items:stretch;display:flex;font-size:1rem;justify-content:space-between;overflow:hidden;overflow-x:auto;white-space:nowrap}.tabs a{align-items:center;border-bottom-color:#dbdbdb;border-bottom-style:solid;border-bottom-width:1px;color:#4a4a4a;display:flex;justify-content:center;margin-bottom:-1px;padding:0.5em 1em;vertical-align:top}.tabs a:hover{border-bottom-color:#363636;color:#363636}.tabs li{display:block}.tabs li.is-active a{border-bottom-color:#485fc7;color:#485fc7}.tabs ul{align-items:center;border-bottom-color:#dbdbdb;border-bottom-style:solid;border-bottom-width:1px;display:flex;flex-grow:1;flex-shrink:0;justify-content:flex-start}.tabs ul.is-left{padding-right:0.75em}.tabs ul.is-center{flex:none;justify-content:center;padding-left:0.75em;padding-right:0.75em}.tabs ul.is-right{justify-content:flex-end;padding-left:0.75em}.tabs .icon:first-child{margin-right:0.5em}.tabs .icon:last-child{margin-left:0.5em}.tabs.is-centered ul{justify-content:center}.tabs.is-right ul{justify-content:flex-end}.tabs.is-boxed a{border:1px solid transparent;border-radius:4px 4px 0 0}.tabs.is-boxed a:hover{background-color:whitesmoke;border-bottom-color:#dbdbdb}.tabs.is-boxed li.is-active a{background-color:white;border-color:#dbdbdb;border-bottom-color:transparent !important}.tabs.is-fullwidth li{flex-grow:1;flex-shrink:0}.tabs.is-toggle a{border-color:#dbdbdb;border-style:solid;border-width:1px;margin-bottom:0;position:relative}.tabs.is-toggle a:hover{background-color:whitesmoke;border-color:#b5b5b5;z-index:2}.tabs.is-toggle li+li{margin-left:-1px}.tabs.is-toggle li:first-child a{border-top-left-radius:4px;border-bottom-left-radius:4px}.tabs.is-toggle li:last-child a{border-top-right-radius:4px;border-bottom-right-radius:4px}.tabs.is-toggle li.is-active a{background-color:#485fc7;border-color:#485fc7;color:#fff;z-index:1}.tabs.is-toggle ul{border-bottom:none}.tabs.is-toggle.is-toggle-rounded li:first-child a{border-bottom-left-radius:9999px;border-top-left-radius:9999px;padding-left:1.25em}.tabs.is-toggle.is-toggle-rounded li:last-child a{border-bottom-right-radius:9999px;border-top-right-radius:9999px;padding-right:1.25em}.tabs.is-small{font-size:0.75rem}.tabs.is-medium{font-size:1.25rem}.tabs.is-large{font-size:1.5rem}.column{display:block;flex-basis:0;flex-grow:1;flex-shrink:1;padding:0.75rem}.columns.is-mobile>.column.is-narrow{flex:none;width:unset}.columns.is-mobile>.column.is-full{flex:none;width:100%}.columns.is-mobile>.column.is-three-quarters{flex:none;width:75%}.columns.is-mobile>.column.is-two-thirds{flex:none;width:66.6666%}.columns.is-mobile>.column.is-half{flex:none;width:50%}.columns.is-mobile>.column.is-one-third{flex:none;width:33.3333%}.columns.is-mobile>.column.is-one-quarter{flex:none;width:25%}.columns.is-mobile>.column.is-one-fifth{flex:none;width:20%}.columns.is-mobile>.column.is-two-fifths{flex:none;width:40%}.columns.is-mobile>.column.is-three-fifths{flex:none;width:60%}.columns.is-mobile>.column.is-four-fifths{flex:none;width:80%}.columns.is-mobile>.column.is-offset-three-quarters{margin-left:75%}.columns.is-mobile>.column.is-offset-two-thirds{margin-left:66.6666%}.columns.is-mobile>.column.is-offset-half{margin-left:50%}.columns.is-mobile>.column.is-offset-one-third{margin-left:33.3333%}.columns.is-mobile>.column.is-offset-one-quarter{margin-left:25%}.columns.is-mobile>.column.is-offset-one-fifth{margin-left:20%}.columns.is-mobile>.column.is-offset-two-fifths{margin-left:40%}.columns.is-mobile>.column.is-offset-three-fifths{margin-left:60%}.columns.is-mobile>.column.is-offset-four-fifths{margin-left:80%}.columns.is-mobile>.column.is-0{flex:none;width:0%}.columns.is-mobile>.column.is-offset-0{margin-left:0%}.columns.is-mobile>.column.is-1{flex:none;width:8.33333337%}.columns.is-mobile>.column.is-offset-1{margin-left:8.33333337%}.columns.is-mobile>.column.is-2{flex:none;width:16.66666674%}.columns.is-mobile>.column.is-offset-2{margin-left:16.66666674%}.columns.is-mobile>.column.is-3{flex:none;width:25%}.columns.is-mobile>.column.is-offset-3{margin-left:25%}.columns.is-mobile>.column.is-4{flex:none;width:33.33333337%}.columns.is-mobile>.column.is-offset-4{margin-left:33.33333337%}.columns.is-mobile>.column.is-5{flex:none;width:41.66666674%}.columns.is-mobile>.column.is-offset-5{margin-left:41.66666674%}.columns.is-mobile>.column.is-6{flex:none;width:50%}.columns.is-mobile>.column.is-offset-6{margin-left:50%}.columns.is-mobile>.column.is-7{flex:none;width:58.33333337%}.columns.is-mobile>.column.is-offset-7{margin-left:58.33333337%}.columns.is-mobile>.column.is-8{flex:none;width:66.66666674%}.columns.is-mobile>.column.is-offset-8{margin-left:66.66666674%}.columns.is-mobile>.column.is-9{flex:none;width:75%}.columns.is-mobile>.column.is-offset-9{margin-left:75%}.columns.is-mobile>.column.is-10{flex:none;width:83.33333337%}.columns.is-mobile>.column.is-offset-10{margin-left:83.33333337%}.columns.is-mobile>.column.is-11{flex:none;width:91.66666674%}.columns.is-mobile>.column.is-offset-11{margin-left:91.66666674%}.columns.is-mobile>.column.is-12{flex:none;width:100%}.columns.is-mobile>.column.is-offset-12{margin-left:100%}@media screen and (max-width: 768px){.column.is-narrow-mobile{flex:none;width:unset}.column.is-full-mobile{flex:none;width:100%}.column.is-three-quarters-mobile{flex:none;width:75%}.column.is-two-thirds-mobile{flex:none;width:66.6666%}.column.is-half-mobile{flex:none;width:50%}.column.is-one-third-mobile{flex:none;width:33.3333%}.column.is-one-quarter-mobile{flex:none;width:25%}.column.is-one-fifth-mobile{flex:none;width:20%}.column.is-two-fifths-mobile{flex:none;width:40%}.column.is-three-fifths-mobile{flex:none;width:60%}.column.is-four-fifths-mobile{flex:none;width:80%}.column.is-offset-three-quarters-mobile{margin-left:75%}.column.is-offset-two-thirds-mobile{margin-left:66.6666%}.column.is-offset-half-mobile{margin-left:50%}.column.is-offset-one-third-mobile{margin-left:33.3333%}.column.is-offset-one-quarter-mobile{margin-left:25%}.column.is-offset-one-fifth-mobile{margin-left:20%}.column.is-offset-two-fifths-mobile{margin-left:40%}.column.is-offset-three-fifths-mobile{margin-left:60%}.column.is-offset-four-fifths-mobile{margin-left:80%}.column.is-0-mobile{flex:none;width:0%}.column.is-offset-0-mobile{margin-left:0%}.column.is-1-mobile{flex:none;width:8.33333337%}.column.is-offset-1-mobile{margin-left:8.33333337%}.column.is-2-mobile{flex:none;width:16.66666674%}.column.is-offset-2-mobile{margin-left:16.66666674%}.column.is-3-mobile{flex:none;width:25%}.column.is-offset-3-mobile{margin-left:25%}.column.is-4-mobile{flex:none;width:33.33333337%}.column.is-offset-4-mobile{margin-left:33.33333337%}.column.is-5-mobile{flex:none;width:41.66666674%}.column.is-offset-5-mobile{margin-left:41.66666674%}.column.is-6-mobile{flex:none;width:50%}.column.is-offset-6-mobile{margin-left:50%}.column.is-7-mobile{flex:none;width:58.33333337%}.column.is-offset-7-mobile{margin-left:58.33333337%}.column.is-8-mobile{flex:none;width:66.66666674%}.column.is-offset-8-mobile{margin-left:66.66666674%}.column.is-9-mobile{flex:none;width:75%}.column.is-offset-9-mobile{margin-left:75%}.column.is-10-mobile{flex:none;width:83.33333337%}.column.is-offset-10-mobile{margin-left:83.33333337%}.column.is-11-mobile{flex:none;width:91.66666674%}.column.is-offset-11-mobile{margin-left:91.66666674%}.column.is-12-mobile{flex:none;width:100%}.column.is-offset-12-mobile{margin-left:100%}}@media screen and (min-width: 769px), print{.column.is-narrow,.column.is-narrow-tablet{flex:none;width:unset}.column.is-full,.column.is-full-tablet{flex:none;width:100%}.column.is-three-quarters,.column.is-three-quarters-tablet{flex:none;width:75%}.column.is-two-thirds,.column.is-two-thirds-tablet{flex:none;width:66.6666%}.column.is-half,.column.is-half-tablet{flex:none;width:50%}.column.is-one-third,.column.is-one-third-tablet{flex:none;width:33.3333%}.column.is-one-quarter,.column.is-one-quarter-tablet{flex:none;width:25%}.column.is-one-fifth,.column.is-one-fifth-tablet{flex:none;width:20%}.column.is-two-fifths,.column.is-two-fifths-tablet{flex:none;width:40%}.column.is-three-fifths,.column.is-three-fifths-tablet{flex:none;width:60%}.column.is-four-fifths,.column.is-four-fifths-tablet{flex:none;width:80%}.column.is-offset-three-quarters,.column.is-offset-three-quarters-tablet{margin-left:75%}.column.is-offset-two-thirds,.column.is-offset-two-thirds-tablet{margin-left:66.6666%}.column.is-offset-half,.column.is-offset-half-tablet{margin-left:50%}.column.is-offset-one-third,.column.is-offset-one-third-tablet{margin-left:33.3333%}.column.is-offset-one-quarter,.column.is-offset-one-quarter-tablet{margin-left:25%}.column.is-offset-one-fifth,.column.is-offset-one-fifth-tablet{margin-left:20%}.column.is-offset-two-fifths,.column.is-offset-two-fifths-tablet{margin-left:40%}.column.is-offset-three-fifths,.column.is-offset-three-fifths-tablet{margin-left:60%}.column.is-offset-four-fifths,.column.is-offset-four-fifths-tablet{margin-left:80%}.column.is-0,.column.is-0-tablet{flex:none;width:0%}.column.is-offset-0,.column.is-offset-0-tablet{margin-left:0%}.column.is-1,.column.is-1-tablet{flex:none;width:8.33333337%}.column.is-offset-1,.column.is-offset-1-tablet{margin-left:8.33333337%}.column.is-2,.column.is-2-tablet{flex:none;width:16.66666674%}.column.is-offset-2,.column.is-offset-2-tablet{margin-left:16.66666674%}.column.is-3,.column.is-3-tablet{flex:none;width:25%}.column.is-offset-3,.column.is-offset-3-tablet{margin-left:25%}.column.is-4,.column.is-4-tablet{flex:none;width:33.33333337%}.column.is-offset-4,.column.is-offset-4-tablet{margin-left:33.33333337%}.column.is-5,.column.is-5-tablet{flex:none;width:41.66666674%}.column.is-offset-5,.column.is-offset-5-tablet{margin-left:41.66666674%}.column.is-6,.column.is-6-tablet{flex:none;width:50%}.column.is-offset-6,.column.is-offset-6-tablet{margin-left:50%}.column.is-7,.column.is-7-tablet{flex:none;width:58.33333337%}.column.is-offset-7,.column.is-offset-7-tablet{margin-left:58.33333337%}.column.is-8,.column.is-8-tablet{flex:none;width:66.66666674%}.column.is-offset-8,.column.is-offset-8-tablet{margin-left:66.66666674%}.column.is-9,.column.is-9-tablet{flex:none;width:75%}.column.is-offset-9,.column.is-offset-9-tablet{margin-left:75%}.column.is-10,.column.is-10-tablet{flex:none;width:83.33333337%}.column.is-offset-10,.column.is-offset-10-tablet{margin-left:83.33333337%}.column.is-11,.column.is-11-tablet{flex:none;width:91.66666674%}.column.is-offset-11,.column.is-offset-11-tablet{margin-left:91.66666674%}.column.is-12,.column.is-12-tablet{flex:none;width:100%}.column.is-offset-12,.column.is-offset-12-tablet{margin-left:100%}}@media screen and (max-width: 1023px){.column.is-narrow-touch{flex:none;width:unset}.column.is-full-touch{flex:none;width:100%}.column.is-three-quarters-touch{flex:none;width:75%}.column.is-two-thirds-touch{flex:none;width:66.6666%}.column.is-half-touch{flex:none;width:50%}.column.is-one-third-touch{flex:none;width:33.3333%}.column.is-one-quarter-touch{flex:none;width:25%}.column.is-one-fifth-touch{flex:none;width:20%}.column.is-two-fifths-touch{flex:none;width:40%}.column.is-three-fifths-touch{flex:none;width:60%}.column.is-four-fifths-touch{flex:none;width:80%}.column.is-offset-three-quarters-touch{margin-left:75%}.column.is-offset-two-thirds-touch{margin-left:66.6666%}.column.is-offset-half-touch{margin-left:50%}.column.is-offset-one-third-touch{margin-left:33.3333%}.column.is-offset-one-quarter-touch{margin-left:25%}.column.is-offset-one-fifth-touch{margin-left:20%}.column.is-offset-two-fifths-touch{margin-left:40%}.column.is-offset-three-fifths-touch{margin-left:60%}.column.is-offset-four-fifths-touch{margin-left:80%}.column.is-0-touch{flex:none;width:0%}.column.is-offset-0-touch{margin-left:0%}.column.is-1-touch{flex:none;width:8.33333337%}.column.is-offset-1-touch{margin-left:8.33333337%}.column.is-2-touch{flex:none;width:16.66666674%}.column.is-offset-2-touch{margin-left:16.66666674%}.column.is-3-touch{flex:none;width:25%}.column.is-offset-3-touch{margin-left:25%}.column.is-4-touch{flex:none;width:33.33333337%}.column.is-offset-4-touch{margin-left:33.33333337%}.column.is-5-touch{flex:none;width:41.66666674%}.column.is-offset-5-touch{margin-left:41.66666674%}.column.is-6-touch{flex:none;width:50%}.column.is-offset-6-touch{margin-left:50%}.column.is-7-touch{flex:none;width:58.33333337%}.column.is-offset-7-touch{margin-left:58.33333337%}.column.is-8-touch{flex:none;width:66.66666674%}.column.is-offset-8-touch{margin-left:66.66666674%}.column.is-9-touch{flex:none;width:75%}.column.is-offset-9-touch{margin-left:75%}.column.is-10-touch{flex:none;width:83.33333337%}.column.is-offset-10-touch{margin-left:83.33333337%}.column.is-11-touch{flex:none;width:91.66666674%}.column.is-offset-11-touch{margin-left:91.66666674%}.column.is-12-touch{flex:none;width:100%}.column.is-offset-12-touch{margin-left:100%}}@media screen and (min-width: 1024px){.column.is-narrow-desktop{flex:none;width:unset}.column.is-full-desktop{flex:none;width:100%}.column.is-three-quarters-desktop{flex:none;width:75%}.column.is-two-thirds-desktop{flex:none;width:66.6666%}.column.is-half-desktop{flex:none;width:50%}.column.is-one-third-desktop{flex:none;width:33.3333%}.column.is-one-quarter-desktop{flex:none;width:25%}.column.is-one-fifth-desktop{flex:none;width:20%}.column.is-two-fifths-desktop{flex:none;width:40%}.column.is-three-fifths-desktop{flex:none;width:60%}.column.is-four-fifths-desktop{flex:none;width:80%}.column.is-offset-three-quarters-desktop{margin-left:75%}.column.is-offset-two-thirds-desktop{margin-left:66.6666%}.column.is-offset-half-desktop{margin-left:50%}.column.is-offset-one-third-desktop{margin-left:33.3333%}.column.is-offset-one-quarter-desktop{margin-left:25%}.column.is-offset-one-fifth-desktop{margin-left:20%}.column.is-offset-two-fifths-desktop{margin-left:40%}.column.is-offset-three-fifths-desktop{margin-left:60%}.column.is-offset-four-fifths-desktop{margin-left:80%}.column.is-0-desktop{flex:none;width:0%}.column.is-offset-0-desktop{margin-left:0%}.column.is-1-desktop{flex:none;width:8.33333337%}.column.is-offset-1-desktop{margin-left:8.33333337%}.column.is-2-desktop{flex:none;width:16.66666674%}.column.is-offset-2-desktop{margin-left:16.66666674%}.column.is-3-desktop{flex:none;width:25%}.column.is-offset-3-desktop{margin-left:25%}.column.is-4-desktop{flex:none;width:33.33333337%}.column.is-offset-4-desktop{margin-left:33.33333337%}.column.is-5-desktop{flex:none;width:41.66666674%}.column.is-offset-5-desktop{margin-left:41.66666674%}.column.is-6-desktop{flex:none;width:50%}.column.is-offset-6-desktop{margin-left:50%}.column.is-7-desktop{flex:none;width:58.33333337%}.column.is-offset-7-desktop{margin-left:58.33333337%}.column.is-8-desktop{flex:none;width:66.66666674%}.column.is-offset-8-desktop{margin-left:66.66666674%}.column.is-9-desktop{flex:none;width:75%}.column.is-offset-9-desktop{margin-left:75%}.column.is-10-desktop{flex:none;width:83.33333337%}.column.is-offset-10-desktop{margin-left:83.33333337%}.column.is-11-desktop{flex:none;width:91.66666674%}.column.is-offset-11-desktop{margin-left:91.66666674%}.column.is-12-desktop{flex:none;width:100%}.column.is-offset-12-desktop{margin-left:100%}}@media screen and (min-width: 1216px){.column.is-narrow-widescreen{flex:none;width:unset}.column.is-full-widescreen{flex:none;width:100%}.column.is-three-quarters-widescreen{flex:none;width:75%}.column.is-two-thirds-widescreen{flex:none;width:66.6666%}.column.is-half-widescreen{flex:none;width:50%}.column.is-one-third-widescreen{flex:none;width:33.3333%}.column.is-one-quarter-widescreen{flex:none;width:25%}.column.is-one-fifth-widescreen{flex:none;width:20%}.column.is-two-fifths-widescreen{flex:none;width:40%}.column.is-three-fifths-widescreen{flex:none;width:60%}.column.is-four-fifths-widescreen{flex:none;width:80%}.column.is-offset-three-quarters-widescreen{margin-left:75%}.column.is-offset-two-thirds-widescreen{margin-left:66.6666%}.column.is-offset-half-widescreen{margin-left:50%}.column.is-offset-one-third-widescreen{margin-left:33.3333%}.column.is-offset-one-quarter-widescreen{margin-left:25%}.column.is-offset-one-fifth-widescreen{margin-left:20%}.column.is-offset-two-fifths-widescreen{margin-left:40%}.column.is-offset-three-fifths-widescreen{margin-left:60%}.column.is-offset-four-fifths-widescreen{margin-left:80%}.column.is-0-widescreen{flex:none;width:0%}.column.is-offset-0-widescreen{margin-left:0%}.column.is-1-widescreen{flex:none;width:8.33333337%}.column.is-offset-1-widescreen{margin-left:8.33333337%}.column.is-2-widescreen{flex:none;width:16.66666674%}.column.is-offset-2-widescreen{margin-left:16.66666674%}.column.is-3-widescreen{flex:none;width:25%}.column.is-offset-3-widescreen{margin-left:25%}.column.is-4-widescreen{flex:none;width:33.33333337%}.column.is-offset-4-widescreen{margin-left:33.33333337%}.column.is-5-widescreen{flex:none;width:41.66666674%}.column.is-offset-5-widescreen{margin-left:41.66666674%}.column.is-6-widescreen{flex:none;width:50%}.column.is-offset-6-widescreen{margin-left:50%}.column.is-7-widescreen{flex:none;width:58.33333337%}.column.is-offset-7-widescreen{margin-left:58.33333337%}.column.is-8-widescreen{flex:none;width:66.66666674%}.column.is-offset-8-widescreen{margin-left:66.66666674%}.column.is-9-widescreen{flex:none;width:75%}.column.is-offset-9-widescreen{margin-left:75%}.column.is-10-widescreen{flex:none;width:83.33333337%}.column.is-offset-10-widescreen{margin-left:83.33333337%}.column.is-11-widescreen{flex:none;width:91.66666674%}.column.is-offset-11-widescreen{margin-left:91.66666674%}.column.is-12-widescreen{flex:none;width:100%}.column.is-offset-12-widescreen{margin-left:100%}}@media screen and (min-width: 1408px){.column.is-narrow-fullhd{flex:none;width:unset}.column.is-full-fullhd{flex:none;width:100%}.column.is-three-quarters-fullhd{flex:none;width:75%}.column.is-two-thirds-fullhd{flex:none;width:66.6666%}.column.is-half-fullhd{flex:none;width:50%}.column.is-one-third-fullhd{flex:none;width:33.3333%}.column.is-one-quarter-fullhd{flex:none;width:25%}.column.is-one-fifth-fullhd{flex:none;width:20%}.column.is-two-fifths-fullhd{flex:none;width:40%}.column.is-three-fifths-fullhd{flex:none;width:60%}.column.is-four-fifths-fullhd{flex:none;width:80%}.column.is-offset-three-quarters-fullhd{margin-left:75%}.column.is-offset-two-thirds-fullhd{margin-left:66.6666%}.column.is-offset-half-fullhd{margin-left:50%}.column.is-offset-one-third-fullhd{margin-left:33.3333%}.column.is-offset-one-quarter-fullhd{margin-left:25%}.column.is-offset-one-fifth-fullhd{margin-left:20%}.column.is-offset-two-fifths-fullhd{margin-left:40%}.column.is-offset-three-fifths-fullhd{margin-left:60%}.column.is-offset-four-fifths-fullhd{margin-left:80%}.column.is-0-fullhd{flex:none;width:0%}.column.is-offset-0-fullhd{margin-left:0%}.column.is-1-fullhd{flex:none;width:8.33333337%}.column.is-offset-1-fullhd{margin-left:8.33333337%}.column.is-2-fullhd{flex:none;width:16.66666674%}.column.is-offset-2-fullhd{margin-left:16.66666674%}.column.is-3-fullhd{flex:none;width:25%}.column.is-offset-3-fullhd{margin-left:25%}.column.is-4-fullhd{flex:none;width:33.33333337%}.column.is-offset-4-fullhd{margin-left:33.33333337%}.column.is-5-fullhd{flex:none;width:41.66666674%}.column.is-offset-5-fullhd{margin-left:41.66666674%}.column.is-6-fullhd{flex:none;width:50%}.column.is-offset-6-fullhd{margin-left:50%}.column.is-7-fullhd{flex:none;width:58.33333337%}.column.is-offset-7-fullhd{margin-left:58.33333337%}.column.is-8-fullhd{flex:none;width:66.66666674%}.column.is-offset-8-fullhd{margin-left:66.66666674%}.column.is-9-fullhd{flex:none;width:75%}.column.is-offset-9-fullhd{margin-left:75%}.column.is-10-fullhd{flex:none;width:83.33333337%}.column.is-offset-10-fullhd{margin-left:83.33333337%}.column.is-11-fullhd{flex:none;width:91.66666674%}.column.is-offset-11-fullhd{margin-left:91.66666674%}.column.is-12-fullhd{flex:none;width:100%}.column.is-offset-12-fullhd{margin-left:100%}}.columns{margin-left:-0.75rem;margin-right:-0.75rem;margin-top:-0.75rem}.columns:last-child{margin-bottom:-0.75rem}.columns:not(:last-child){margin-bottom:calc(1.5rem - 0.75rem)}.columns.is-centered{justify-content:center}.columns.is-gapless{margin-left:0;margin-right:0;margin-top:0}.columns.is-gapless>.column{margin:0;padding:0 !important}.columns.is-gapless:not(:last-child){margin-bottom:1.5rem}.columns.is-gapless:last-child{margin-bottom:0}.columns.is-mobile{display:flex}.columns.is-multiline{flex-wrap:wrap}.columns.is-vcentered{align-items:center}@media screen and (min-width: 769px), print{.columns:not(.is-desktop){display:flex}}@media screen and (min-width: 1024px){.columns.is-desktop{display:flex}}.columns.is-variable{--columnGap:0.75rem;margin-left:calc(-1 * var(--columnGap));margin-right:calc(-1 * var(--columnGap))}.columns.is-variable>.column{padding-left:var(--columnGap);padding-right:var(--columnGap)}.columns.is-variable.is-0{--columnGap:0rem}@media screen and (max-width: 768px){.columns.is-variable.is-0-mobile{--columnGap:0rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-0-tablet{--columnGap:0rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-0-tablet-only{--columnGap:0rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-0-touch{--columnGap:0rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-0-desktop{--columnGap:0rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-0-desktop-only{--columnGap:0rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-0-widescreen{--columnGap:0rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-0-widescreen-only{--columnGap:0rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-0-fullhd{--columnGap:0rem}}.columns.is-variable.is-1{--columnGap:0.25rem}@media screen and (max-width: 768px){.columns.is-variable.is-1-mobile{--columnGap:0.25rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-1-tablet{--columnGap:0.25rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-1-tablet-only{--columnGap:0.25rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-1-touch{--columnGap:0.25rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-1-desktop{--columnGap:0.25rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-1-desktop-only{--columnGap:0.25rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-1-widescreen{--columnGap:0.25rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-1-widescreen-only{--columnGap:0.25rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-1-fullhd{--columnGap:0.25rem}}.columns.is-variable.is-2{--columnGap:0.5rem}@media screen and (max-width: 768px){.columns.is-variable.is-2-mobile{--columnGap:0.5rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-2-tablet{--columnGap:0.5rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-2-tablet-only{--columnGap:0.5rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-2-touch{--columnGap:0.5rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-2-desktop{--columnGap:0.5rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-2-desktop-only{--columnGap:0.5rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-2-widescreen{--columnGap:0.5rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-2-widescreen-only{--columnGap:0.5rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-2-fullhd{--columnGap:0.5rem}}.columns.is-variable.is-3{--columnGap:0.75rem}@media screen and (max-width: 768px){.columns.is-variable.is-3-mobile{--columnGap:0.75rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-3-tablet{--columnGap:0.75rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-3-tablet-only{--columnGap:0.75rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-3-touch{--columnGap:0.75rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-3-desktop{--columnGap:0.75rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-3-desktop-only{--columnGap:0.75rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-3-widescreen{--columnGap:0.75rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-3-widescreen-only{--columnGap:0.75rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-3-fullhd{--columnGap:0.75rem}}.columns.is-variable.is-4{--columnGap:1rem}@media screen and (max-width: 768px){.columns.is-variable.is-4-mobile{--columnGap:1rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-4-tablet{--columnGap:1rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-4-tablet-only{--columnGap:1rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-4-touch{--columnGap:1rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-4-desktop{--columnGap:1rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-4-desktop-only{--columnGap:1rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-4-widescreen{--columnGap:1rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-4-widescreen-only{--columnGap:1rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-4-fullhd{--columnGap:1rem}}.columns.is-variable.is-5{--columnGap:1.25rem}@media screen and (max-width: 768px){.columns.is-variable.is-5-mobile{--columnGap:1.25rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-5-tablet{--columnGap:1.25rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-5-tablet-only{--columnGap:1.25rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-5-touch{--columnGap:1.25rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-5-desktop{--columnGap:1.25rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-5-desktop-only{--columnGap:1.25rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-5-widescreen{--columnGap:1.25rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-5-widescreen-only{--columnGap:1.25rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-5-fullhd{--columnGap:1.25rem}}.columns.is-variable.is-6{--columnGap:1.5rem}@media screen and (max-width: 768px){.columns.is-variable.is-6-mobile{--columnGap:1.5rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-6-tablet{--columnGap:1.5rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-6-tablet-only{--columnGap:1.5rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-6-touch{--columnGap:1.5rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-6-desktop{--columnGap:1.5rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-6-desktop-only{--columnGap:1.5rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-6-widescreen{--columnGap:1.5rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-6-widescreen-only{--columnGap:1.5rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-6-fullhd{--columnGap:1.5rem}}.columns.is-variable.is-7{--columnGap:1.75rem}@media screen and (max-width: 768px){.columns.is-variable.is-7-mobile{--columnGap:1.75rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-7-tablet{--columnGap:1.75rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-7-tablet-only{--columnGap:1.75rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-7-touch{--columnGap:1.75rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-7-desktop{--columnGap:1.75rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-7-desktop-only{--columnGap:1.75rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-7-widescreen{--columnGap:1.75rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-7-widescreen-only{--columnGap:1.75rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-7-fullhd{--columnGap:1.75rem}}.columns.is-variable.is-8{--columnGap:2rem}@media screen and (max-width: 768px){.columns.is-variable.is-8-mobile{--columnGap:2rem}}@media screen and (min-width: 769px), print{.columns.is-variable.is-8-tablet{--columnGap:2rem}}@media screen and (min-width: 769px) and (max-width: 1023px){.columns.is-variable.is-8-tablet-only{--columnGap:2rem}}@media screen and (max-width: 1023px){.columns.is-variable.is-8-touch{--columnGap:2rem}}@media screen and (min-width: 1024px){.columns.is-variable.is-8-desktop{--columnGap:2rem}}@media screen and (min-width: 1024px) and (max-width: 1215px){.columns.is-variable.is-8-desktop-only{--columnGap:2rem}}@media screen and (min-width: 1216px){.columns.is-variable.is-8-widescreen{--columnGap:2rem}}@media screen and (min-width: 1216px) and (max-width: 1407px){.columns.is-variable.is-8-widescreen-only{--columnGap:2rem}}@media screen and (min-width: 1408px){.columns.is-variable.is-8-fullhd{--columnGap:2rem}}.tile{align-items:stretch;display:block;flex-basis:0;flex-grow:1;flex-shrink:1;min-height:min-content}.tile.is-ancestor{margin-left:-0.75rem;margin-right:-0.75rem;margin-top:-0.75rem}.tile.is-ancestor:last-child{margin-bottom:-0.75rem}.tile.is-ancestor:not(:last-child){margin-bottom:0.75rem}.tile.is-child{margin:0 !important}.tile.is-parent{padding:0.75rem}.tile.is-vertical{flex-direction:column}.tile.is-vertical>.tile.is-child:not(:last-child){margin-bottom:1.5rem !important}@media screen and (min-width: 769px), print{.tile:not(.is-child){display:flex}.tile.is-1{flex:none;width:8.33333337%}.tile.is-2{flex:none;width:16.66666674%}.tile.is-3{flex:none;width:25%}.tile.is-4{flex:none;width:33.33333337%}.tile.is-5{flex:none;width:41.66666674%}.tile.is-6{flex:none;width:50%}.tile.is-7{flex:none;width:58.33333337%}.tile.is-8{flex:none;width:66.66666674%}.tile.is-9{flex:none;width:75%}.tile.is-10{flex:none;width:83.33333337%}.tile.is-11{flex:none;width:91.66666674%}.tile.is-12{flex:none;width:100%}}.has-text-white{color:white !important}a.has-text-white:hover,a.has-text-white:focus{color:#e6e6e6 !important}.has-background-white{background-color:white !important}.has-text-black{color:#0a0a0a !important}a.has-text-black:hover,a.has-text-black:focus{color:black !important}.has-background-black{background-color:#0a0a0a !important}.has-text-light{color:whitesmoke !important}a.has-text-light:hover,a.has-text-light:focus{color:#dbdbdb !important}.has-background-light{background-color:whitesmoke !important}.has-text-dark{color:#363636 !important}a.has-text-dark:hover,a.has-text-dark:focus{color:#1c1c1c !important}.has-background-dark{background-color:#363636 !important}.has-text-primary{color:#00d1b2 !important}a.has-text-primary:hover,a.has-text-primary:focus{color:#009e86 !important}.has-background-primary{background-color:#00d1b2 !important}.has-text-primary-light{color:#ebfffc !important}a.has-text-primary-light:hover,a.has-text-primary-light:focus{color:#b8fff4 !important}.has-background-primary-light{background-color:#ebfffc !important}.has-text-primary-dark{color:#00947e !important}a.has-text-primary-dark:hover,a.has-text-primary-dark:focus{color:#00c7a9 !important}.has-background-primary-dark{background-color:#00947e !important}.has-text-link{color:#485fc7 !important}a.has-text-link:hover,a.has-text-link:focus{color:#3449a8 !important}.has-background-link{background-color:#485fc7 !important}.has-text-link-light{color:#eff1fa !important}a.has-text-link-light:hover,a.has-text-link-light:focus{color:#c8cfee !important}.has-background-link-light{background-color:#eff1fa !important}.has-text-link-dark{color:#3850b7 !important}a.has-text-link-dark:hover,a.has-text-link-dark:focus{color:#576dcb !important}.has-background-link-dark{background-color:#3850b7 !important}.has-text-info{color:#3e8ed0 !important}a.has-text-info:hover,a.has-text-info:focus{color:#2b74b1 !important}.has-background-info{background-color:#3e8ed0 !important}.has-text-info-light{color:#eff5fb !important}a.has-text-info-light:hover,a.has-text-info-light:focus{color:#c6ddf1 !important}.has-background-info-light{background-color:#eff5fb !important}.has-text-info-dark{color:#296fa8 !important}a.has-text-info-dark:hover,a.has-text-info-dark:focus{color:#368ace !important}.has-background-info-dark{background-color:#296fa8 !important}.has-text-success{color:#48c78e !important}a.has-text-success:hover,a.has-text-success:focus{color:#34a873 !important}.has-background-success{background-color:#48c78e !important}.has-text-success-light{color:#effaf5 !important}a.has-text-success-light:hover,a.has-text-success-light:focus{color:#c8eedd !important}.has-background-success-light{background-color:#effaf5 !important}.has-text-success-dark{color:#257953 !important}a.has-text-success-dark:hover,a.has-text-success-dark:focus{color:#31a06e !important}.has-background-success-dark{background-color:#257953 !important}.has-text-warning{color:#ffe08a !important}a.has-text-warning:hover,a.has-text-warning:focus{color:#ffd257 !important}.has-background-warning{background-color:#ffe08a !important}.has-text-warning-light{color:#fffaeb !important}a.has-text-warning-light:hover,a.has-text-warning-light:focus{color:#ffecb8 !important}.has-background-warning-light{background-color:#fffaeb !important}.has-text-warning-dark{color:#946c00 !important}a.has-text-warning-dark:hover,a.has-text-warning-dark:focus{color:#c79200 !important}.has-background-warning-dark{background-color:#946c00 !important}.has-text-danger{color:#f14668 !important}a.has-text-danger:hover,a.has-text-danger:focus{color:#ee1742 !important}.has-background-danger{background-color:#f14668 !important}.has-text-danger-light{color:#feecf0 !important}a.has-text-danger-light:hover,a.has-text-danger-light:focus{color:#fabdc9 !important}.has-background-danger-light{background-color:#feecf0 !important}.has-text-danger-dark{color:#cc0f35 !important}a.has-text-danger-dark:hover,a.has-text-danger-dark:focus{color:#ee2049 !important}.has-background-danger-dark{background-color:#cc0f35 !important}.has-text-black-bis{color:#121212 !important}.has-background-black-bis{background-color:#121212 !important}.has-text-black-ter{color:#242424 !important}.has-background-black-ter{background-color:#242424 !important}.has-text-grey-darker{color:#363636 !important}.has-background-grey-darker{background-color:#363636 !important}.has-text-grey-dark{color:#4a4a4a !important}.has-background-grey-dark{background-color:#4a4a4a !important}.has-text-grey{color:#7a7a7a !important}.has-background-grey{background-color:#7a7a7a !important}.has-text-grey-light{color:#b5b5b5 !important}.has-background-grey-light{background-color:#b5b5b5 !important}.has-text-grey-lighter{color:#dbdbdb !important}.has-background-grey-lighter{background-color:#dbdbdb !important}.has-text-white-ter{color:whitesmoke !important}.has-background-white-ter{background-color:whitesmoke !important}.has-text-white-bis{color:#fafafa !important}.has-background-white-bis{background-color:#fafafa !important}.is-flex-direction-row{flex-direction:row !important}.is-flex-direction-row-reverse{flex-direction:row-reverse !important}.is-flex-direction-column{flex-direction:column !important}.is-flex-direction-column-reverse{flex-direction:column-reverse !important}.is-flex-wrap-nowrap{flex-wrap:nowrap !important}.is-flex-wrap-wrap{flex-wrap:wrap !important}.is-flex-wrap-wrap-reverse{flex-wrap:wrap-reverse !important}.is-justify-content-flex-start{justify-content:flex-start !important}.is-justify-content-flex-end{justify-content:flex-end !important}.is-justify-content-center{justify-content:center !important}.is-justify-content-space-between{justify-content:space-between !important}.is-justify-content-space-around{justify-content:space-around !important}.is-justify-content-space-evenly{justify-content:space-evenly !important}.is-justify-content-start{justify-content:start !important}.is-justify-content-end{justify-content:end !important}.is-justify-content-left{justify-content:left !important}.is-justify-content-right{justify-content:right !important}.is-align-content-flex-start{align-content:flex-start !important}.is-align-content-flex-end{align-content:flex-end !important}.is-align-content-center{align-content:center !important}.is-align-content-space-between{align-content:space-between !important}.is-align-content-space-around{align-content:space-around !important}.is-align-content-space-evenly{align-content:space-evenly !important}.is-align-content-stretch{align-content:stretch !important}.is-align-content-start{align-content:start !important}.is-align-content-end{align-content:end !important}.is-align-content-baseline{align-content:baseline !important}.is-align-items-stretch{align-items:stretch !important}.is-align-items-flex-start{align-items:flex-start !important}.is-align-items-flex-end{align-items:flex-end !important}.is-align-items-center{align-items:center !important}.is-align-items-baseline{align-items:baseline !important}.is-align-items-start{align-items:start !important}.is-align-items-end{align-items:end !important}.is-align-items-self-start{align-items:self-start !important}.is-align-items-self-end{align-items:self-end !important}.is-align-self-auto{align-self:auto !important}.is-align-self-flex-start{align-self:flex-start !important}.is-align-self-flex-end{align-self:flex-end !important}.is-align-self-center{align-self:center !important}.is-align-self-baseline{align-self:baseline !important}.is-align-self-stretch{align-self:stretch !important}.is-flex-grow-0{flex-grow:0 !important}.is-flex-grow-1{flex-grow:1 !important}.is-flex-grow-2{flex-grow:2 !important}.is-flex-grow-3{flex-grow:3 !important}.is-flex-grow-4{flex-grow:4 !important}.is-flex-grow-5{flex-grow:5 !important}.is-flex-shrink-0{flex-shrink:0 !important}.is-flex-shrink-1{flex-shrink:1 !important}.is-flex-shrink-2{flex-shrink:2 !important}.is-flex-shrink-3{flex-shrink:3 !important}.is-flex-shrink-4{flex-shrink:4 !important}.is-flex-shrink-5{flex-shrink:5 !important}.is-clearfix::after{clear:both;content:" ";display:table}.is-pulled-left{float:left !important}.is-pulled-right{float:right !important}.is-radiusless{border-radius:0 !important}.is-shadowless{box-shadow:none !important}.is-clickable{cursor:pointer !important;pointer-events:all !important}.is-clipped{overflow:hidden !important}.is-relative{position:relative !important}.is-marginless{margin:0 !important}.is-paddingless{padding:0 !important}.m-0{margin:0 !important}.mt-0{margin-top:0 !important}.mr-0{margin-right:0 !important}.mb-0{margin-bottom:0 !important}.ml-0{margin-left:0 !important}.mx-0{margin-left:0 !important;margin-right:0 !important}.my-0{margin-top:0 !important;margin-bottom:0 !important}.m-1{margin:0.25rem !important}.mt-1{margin-top:0.25rem !important}.mr-1{margin-right:0.25rem !important}.mb-1{margin-bottom:0.25rem !important}.ml-1{margin-left:0.25rem !important}.mx-1{margin-left:0.25rem !important;margin-right:0.25rem !important}.my-1{margin-top:0.25rem !important;margin-bottom:0.25rem !important}.m-2{margin:0.5rem !important}.mt-2{margin-top:0.5rem !important}.mr-2{margin-right:0.5rem !important}.mb-2{margin-bottom:0.5rem !important}.ml-2{margin-left:0.5rem !important}.mx-2{margin-left:0.5rem !important;margin-right:0.5rem !important}.my-2{margin-top:0.5rem !important;margin-bottom:0.5rem !important}.m-3{margin:0.75rem !important}.mt-3{margin-top:0.75rem !important}.mr-3{margin-right:0.75rem !important}.mb-3{margin-bottom:0.75rem !important}.ml-3{margin-left:0.75rem !important}.mx-3{margin-left:0.75rem !important;margin-right:0.75rem !important}.my-3{margin-top:0.75rem !important;margin-bottom:0.75rem !important}.m-4{margin:1rem !important}.mt-4{margin-top:1rem !important}.mr-4{margin-right:1rem !important}.mb-4{margin-bottom:1rem !important}.ml-4{margin-left:1rem !important}.mx-4{margin-left:1rem !important;margin-right:1rem !important}.my-4{margin-top:1rem !important;margin-bottom:1rem !important}.m-5{margin:1.5rem !important}.mt-5{margin-top:1.5rem !important}.mr-5{margin-right:1.5rem !important}.mb-5{margin-bottom:1.5rem !important}.ml-5{margin-left:1.5rem !important}.mx-5{margin-left:1.5rem !important;margin-right:1.5rem !important}.my-5{margin-top:1.5rem !important;margin-bottom:1.5rem !important}.m-6{margin:3rem !important}.mt-6{margin-top:3rem !important}.mr-6{margin-right:3rem !important}.mb-6{margin-bottom:3rem !important}.ml-6{margin-left:3rem !important}.mx-6{margin-left:3rem !important;margin-right:3rem !important}.my-6{margin-top:3rem !important;margin-bottom:3rem !important}.m-auto{margin:auto !important}.mt-auto{margin-top:auto !important}.mr-auto{margin-right:auto !important}.mb-auto{margin-bottom:auto !important}.ml-auto{margin-left:auto !important}.mx-auto{margin-left:auto !important;margin-right:auto !important}.my-auto{margin-top:auto !important;margin-bottom:auto !important}.p-0{padding:0 !important}.pt-0{padding-top:0 !important}.pr-0{padding-right:0 !important}.pb-0{padding-bottom:0 !important}.pl-0{padding-left:0 !important}.px-0{padding-left:0 !important;padding-right:0 !important}.py-0{padding-top:0 !important;padding-bottom:0 !important}.p-1{padding:0.25rem !important}.pt-1{padding-top:0.25rem !important}.pr-1{padding-right:0.25rem !important}.pb-1{padding-bottom:0.25rem !important}.pl-1{padding-left:0.25rem !important}.px-1{padding-left:0.25rem !important;padding-right:0.25rem !important}.py-1{padding-top:0.25rem !important;padding-bottom:0.25rem !important}.p-2{padding:0.5rem !important}.pt-2{padding-top:0.5rem !important}.pr-2{padding-right:0.5rem !important}.pb-2{padding-bottom:0.5rem !important}.pl-2{padding-left:0.5rem !important}.px-2{padding-left:0.5rem !important;padding-right:0.5rem !important}.py-2{padding-top:0.5rem !important;padding-bottom:0.5rem !important}.p-3{padding:0.75rem !important}.pt-3{padding-top:0.75rem !important}.pr-3{padding-right:0.75rem !important}.pb-3{padding-bottom:0.75rem !important}.pl-3{padding-left:0.75rem !important}.px-3{padding-left:0.75rem !important;padding-right:0.75rem !important}.py-3{padding-top:0.75rem !important;padding-bottom:0.75rem !important}.p-4{padding:1rem !important}.pt-4{padding-top:1rem !important}.pr-4{padding-right:1rem !important}.pb-4{padding-bottom:1rem !important}.pl-4{padding-left:1rem !important}.px-4{padding-left:1rem !important;padding-right:1rem !important}.py-4{padding-top:1rem !important;padding-bottom:1rem !important}.p-5{padding:1.5rem !important}.pt-5{padding-top:1.5rem !important}.pr-5{padding-right:1.5rem !important}.pb-5{padding-bottom:1.5rem !important}.pl-5{padding-left:1.5rem !important}.px-5{padding-left:1.5rem !important;padding-right:1.5rem !important}.py-5{padding-top:1.5rem !important;padding-bottom:1.5rem !important}.p-6{padding:3rem !important}.pt-6{padding-top:3rem !important}.pr-6{padding-right:3rem !important}.pb-6{padding-bottom:3rem !important}.pl-6{padding-left:3rem !important}.px-6{padding-left:3rem !important;padding-right:3rem !important}.py-6{padding-top:3rem !important;padding-bottom:3rem !important}.p-auto{padding:auto !important}.pt-auto{padding-top:auto !important}.pr-auto{padding-right:auto !important}.pb-auto{padding-bottom:auto !important}.pl-auto{padding-left:auto !important}.px-auto{padding-left:auto !important;padding-right:auto !important}.py-auto{padding-top:auto !important;padding-bottom:auto !important}.is-size-1{font-size:3rem !important}.is-size-2{font-size:2.5rem !important}.is-size-3{font-size:2rem !important}.is-size-4{font-size:1.5rem !important}.is-size-5{font-size:1.25rem !important}.is-size-6{font-size:1rem !important}.is-size-7{font-size:0.75rem !important}@media screen and (max-width: 768px){.is-size-1-mobile{font-size:3rem !important}.is-size-2-mobile{font-size:2.5rem !important}.is-size-3-mobile{font-size:2rem !important}.is-size-4-mobile{font-size:1.5rem !important}.is-size-5-mobile{font-size:1.25rem !important}.is-size-6-mobile{font-size:1rem !important}.is-size-7-mobile{font-size:0.75rem !important}}@media screen and (min-width: 769px), print{.is-size-1-tablet{font-size:3rem !important}.is-size-2-tablet{font-size:2.5rem !important}.is-size-3-tablet{font-size:2rem !important}.is-size-4-tablet{font-size:1.5rem !important}.is-size-5-tablet{font-size:1.25rem !important}.is-size-6-tablet{font-size:1rem !important}.is-size-7-tablet{font-size:0.75rem !important}}@media screen and (max-width: 1023px){.is-size-1-touch{font-size:3rem !important}.is-size-2-touch{font-size:2.5rem !important}.is-size-3-touch{font-size:2rem !important}.is-size-4-touch{font-size:1.5rem !important}.is-size-5-touch{font-size:1.25rem !important}.is-size-6-touch{font-size:1rem !important}.is-size-7-touch{font-size:0.75rem !important}}@media screen and (min-width: 1024px){.is-size-1-desktop{font-size:3rem !important}.is-size-2-desktop{font-size:2.5rem !important}.is-size-3-desktop{font-size:2rem !important}.is-size-4-desktop{font-size:1.5rem !important}.is-size-5-desktop{font-size:1.25rem !important}.is-size-6-desktop{font-size:1rem !important}.is-size-7-desktop{font-size:0.75rem !important}}@media screen and (min-width: 1216px){.is-size-1-widescreen{font-size:3rem !important}.is-size-2-widescreen{font-size:2.5rem !important}.is-size-3-widescreen{font-size:2rem !important}.is-size-4-widescreen{font-size:1.5rem !important}.is-size-5-widescreen{font-size:1.25rem !important}.is-size-6-widescreen{font-size:1rem !important}.is-size-7-widescreen{font-size:0.75rem !important}}@media screen and (min-width: 1408px){.is-size-1-fullhd{font-size:3rem !important}.is-size-2-fullhd{font-size:2.5rem !important}.is-size-3-fullhd{font-size:2rem !important}.is-size-4-fullhd{font-size:1.5rem !important}.is-size-5-fullhd{font-size:1.25rem !important}.is-size-6-fullhd{font-size:1rem !important}.is-size-7-fullhd{font-size:0.75rem !important}}.has-text-centered{text-align:center !important}.has-text-justified{text-align:justify !important}.has-text-left{text-align:left !important}.has-text-right{text-align:right !important}@media screen and (max-width: 768px){.has-text-centered-mobile{text-align:center !important}}@media screen and (min-width: 769px), print{.has-text-centered-tablet{text-align:center !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.has-text-centered-tablet-only{text-align:center !important}}@media screen and (max-width: 1023px){.has-text-centered-touch{text-align:center !important}}@media screen and (min-width: 1024px){.has-text-centered-desktop{text-align:center !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.has-text-centered-desktop-only{text-align:center !important}}@media screen and (min-width: 1216px){.has-text-centered-widescreen{text-align:center !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.has-text-centered-widescreen-only{text-align:center !important}}@media screen and (min-width: 1408px){.has-text-centered-fullhd{text-align:center !important}}@media screen and (max-width: 768px){.has-text-justified-mobile{text-align:justify !important}}@media screen and (min-width: 769px), print{.has-text-justified-tablet{text-align:justify !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.has-text-justified-tablet-only{text-align:justify !important}}@media screen and (max-width: 1023px){.has-text-justified-touch{text-align:justify !important}}@media screen and (min-width: 1024px){.has-text-justified-desktop{text-align:justify !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.has-text-justified-desktop-only{text-align:justify !important}}@media screen and (min-width: 1216px){.has-text-justified-widescreen{text-align:justify !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.has-text-justified-widescreen-only{text-align:justify !important}}@media screen and (min-width: 1408px){.has-text-justified-fullhd{text-align:justify !important}}@media screen and (max-width: 768px){.has-text-left-mobile{text-align:left !important}}@media screen and (min-width: 769px), print{.has-text-left-tablet{text-align:left !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.has-text-left-tablet-only{text-align:left !important}}@media screen and (max-width: 1023px){.has-text-left-touch{text-align:left !important}}@media screen and (min-width: 1024px){.has-text-left-desktop{text-align:left !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.has-text-left-desktop-only{text-align:left !important}}@media screen and (min-width: 1216px){.has-text-left-widescreen{text-align:left !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.has-text-left-widescreen-only{text-align:left !important}}@media screen and (min-width: 1408px){.has-text-left-fullhd{text-align:left !important}}@media screen and (max-width: 768px){.has-text-right-mobile{text-align:right !important}}@media screen and (min-width: 769px), print{.has-text-right-tablet{text-align:right !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.has-text-right-tablet-only{text-align:right !important}}@media screen and (max-width: 1023px){.has-text-right-touch{text-align:right !important}}@media screen and (min-width: 1024px){.has-text-right-desktop{text-align:right !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.has-text-right-desktop-only{text-align:right !important}}@media screen and (min-width: 1216px){.has-text-right-widescreen{text-align:right !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.has-text-right-widescreen-only{text-align:right !important}}@media screen and (min-width: 1408px){.has-text-right-fullhd{text-align:right !important}}.is-capitalized{text-transform:capitalize !important}.is-lowercase{text-transform:lowercase !important}.is-uppercase{text-transform:uppercase !important}.is-italic{font-style:italic !important}.is-underlined{text-decoration:underline !important}.has-text-weight-light{font-weight:300 !important}.has-text-weight-normal{font-weight:400 !important}.has-text-weight-medium{font-weight:500 !important}.has-text-weight-semibold{font-weight:600 !important}.has-text-weight-bold{font-weight:700 !important}.is-family-primary{font-family:BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif !important}.is-family-secondary{font-family:BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif !important}.is-family-sans-serif{font-family:BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif !important}.is-family-monospace{font-family:monospace !important}.is-family-code{font-family:monospace !important}.is-block{display:block !important}@media screen and (max-width: 768px){.is-block-mobile{display:block !important}}@media screen and (min-width: 769px), print{.is-block-tablet{display:block !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-block-tablet-only{display:block !important}}@media screen and (max-width: 1023px){.is-block-touch{display:block !important}}@media screen and (min-width: 1024px){.is-block-desktop{display:block !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-block-desktop-only{display:block !important}}@media screen and (min-width: 1216px){.is-block-widescreen{display:block !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-block-widescreen-only{display:block !important}}@media screen and (min-width: 1408px){.is-block-fullhd{display:block !important}}.is-flex{display:flex !important}@media screen and (max-width: 768px){.is-flex-mobile{display:flex !important}}@media screen and (min-width: 769px), print{.is-flex-tablet{display:flex !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-flex-tablet-only{display:flex !important}}@media screen and (max-width: 1023px){.is-flex-touch{display:flex !important}}@media screen and (min-width: 1024px){.is-flex-desktop{display:flex !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-flex-desktop-only{display:flex !important}}@media screen and (min-width: 1216px){.is-flex-widescreen{display:flex !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-flex-widescreen-only{display:flex !important}}@media screen and (min-width: 1408px){.is-flex-fullhd{display:flex !important}}.is-inline{display:inline !important}@media screen and (max-width: 768px){.is-inline-mobile{display:inline !important}}@media screen and (min-width: 769px), print{.is-inline-tablet{display:inline !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-inline-tablet-only{display:inline !important}}@media screen and (max-width: 1023px){.is-inline-touch{display:inline !important}}@media screen and (min-width: 1024px){.is-inline-desktop{display:inline !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-inline-desktop-only{display:inline !important}}@media screen and (min-width: 1216px){.is-inline-widescreen{display:inline !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-inline-widescreen-only{display:inline !important}}@media screen and (min-width: 1408px){.is-inline-fullhd{display:inline !important}}.is-inline-block{display:inline-block !important}@media screen and (max-width: 768px){.is-inline-block-mobile{display:inline-block !important}}@media screen and (min-width: 769px), print{.is-inline-block-tablet{display:inline-block !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-inline-block-tablet-only{display:inline-block !important}}@media screen and (max-width: 1023px){.is-inline-block-touch{display:inline-block !important}}@media screen and (min-width: 1024px){.is-inline-block-desktop{display:inline-block !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-inline-block-desktop-only{display:inline-block !important}}@media screen and (min-width: 1216px){.is-inline-block-widescreen{display:inline-block !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-inline-block-widescreen-only{display:inline-block !important}}@media screen and (min-width: 1408px){.is-inline-block-fullhd{display:inline-block !important}}.is-inline-flex{display:inline-flex !important}@media screen and (max-width: 768px){.is-inline-flex-mobile{display:inline-flex !important}}@media screen and (min-width: 769px), print{.is-inline-flex-tablet{display:inline-flex !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-inline-flex-tablet-only{display:inline-flex !important}}@media screen and (max-width: 1023px){.is-inline-flex-touch{display:inline-flex !important}}@media screen and (min-width: 1024px){.is-inline-flex-desktop{display:inline-flex !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-inline-flex-desktop-only{display:inline-flex !important}}@media screen and (min-width: 1216px){.is-inline-flex-widescreen{display:inline-flex !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-inline-flex-widescreen-only{display:inline-flex !important}}@media screen and (min-width: 1408px){.is-inline-flex-fullhd{display:inline-flex !important}}.is-hidden{display:none !important}.is-sr-only{border:none !important;clip:rect(0, 0, 0, 0) !important;height:0.01em !important;overflow:hidden !important;padding:0 !important;position:absolute !important;white-space:nowrap !important;width:0.01em !important}@media screen and (max-width: 768px){.is-hidden-mobile{display:none !important}}@media screen and (min-width: 769px), print{.is-hidden-tablet{display:none !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-hidden-tablet-only{display:none !important}}@media screen and (max-width: 1023px){.is-hidden-touch{display:none !important}}@media screen and (min-width: 1024px){.is-hidden-desktop{display:none !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-hidden-desktop-only{display:none !important}}@media screen and (min-width: 1216px){.is-hidden-widescreen{display:none !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-hidden-widescreen-only{display:none !important}}@media screen and (min-width: 1408px){.is-hidden-fullhd{display:none !important}}.is-invisible{visibility:hidden !important}@media screen and (max-width: 768px){.is-invisible-mobile{visibility:hidden !important}}@media screen and (min-width: 769px), print{.is-invisible-tablet{visibility:hidden !important}}@media screen and (min-width: 769px) and (max-width: 1023px){.is-invisible-tablet-only{visibility:hidden !important}}@media screen and (max-width: 1023px){.is-invisible-touch{visibility:hidden !important}}@media screen and (min-width: 1024px){.is-invisible-desktop{visibility:hidden !important}}@media screen and (min-width: 1024px) and (max-width: 1215px){.is-invisible-desktop-only{visibility:hidden !important}}@media screen and (min-width: 1216px){.is-invisible-widescreen{visibility:hidden !important}}@media screen and (min-width: 1216px) and (max-width: 1407px){.is-invisible-widescreen-only{visibility:hidden !important}}@media screen and (min-width: 1408px){.is-invisible-fullhd{visibility:hidden !important}}.hero{align-items:stretch;display:flex;flex-direction:column;justify-content:space-between}.hero .navbar{background:none}.hero .tabs ul{border-bottom:none}.hero.is-white{background-color:white;color:#0a0a0a}.hero.is-white a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-white strong{color:inherit}.hero.is-white .title{color:#0a0a0a}.hero.is-white .subtitle{color:rgba(10, 10, 10, 0.9)}.hero.is-white .subtitle a:not(.button),.hero.is-white .subtitle strong{color:#0a0a0a}@media screen and (max-width: 1023px){.hero.is-white .navbar-menu{background-color:white}}.hero.is-white .navbar-item,.hero.is-white .navbar-link{color:rgba(10, 10, 10, 0.7)}.hero.is-white a.navbar-item:hover,.hero.is-white a.navbar-item.is-active,.hero.is-white .navbar-link:hover,.hero.is-white .navbar-link.is-active{background-color:#f2f2f2;color:#0a0a0a}.hero.is-white .tabs a{color:#0a0a0a;opacity:0.9}.hero.is-white .tabs a:hover{opacity:1}.hero.is-white .tabs li.is-active a{color:white !important;opacity:1}.hero.is-white .tabs.is-boxed a,.hero.is-white .tabs.is-toggle a{color:#0a0a0a}.hero.is-white .tabs.is-boxed a:hover,.hero.is-white .tabs.is-toggle a:hover{background-color:rgba(10, 10, 10, 0.1)}.hero.is-white .tabs.is-boxed li.is-active a,.hero.is-white .tabs.is-boxed li.is-active a:hover,.hero.is-white .tabs.is-toggle li.is-active a,.hero.is-white .tabs.is-toggle li.is-active a:hover{background-color:#0a0a0a;border-color:#0a0a0a;color:white}.hero.is-white.is-bold{background-image:linear-gradient(141deg, #e8e3e4 0%, white 71%, white 100%)}@media screen and (max-width: 768px){.hero.is-white.is-bold .navbar-menu{background-image:linear-gradient(141deg, #e8e3e4 0%, white 71%, white 100%)}}.hero.is-black{background-color:#0a0a0a;color:white}.hero.is-black a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-black strong{color:inherit}.hero.is-black .title{color:white}.hero.is-black .subtitle{color:rgba(255, 255, 255, 0.9)}.hero.is-black .subtitle a:not(.button),.hero.is-black .subtitle strong{color:white}@media screen and (max-width: 1023px){.hero.is-black .navbar-menu{background-color:#0a0a0a}}.hero.is-black .navbar-item,.hero.is-black .navbar-link{color:rgba(255, 255, 255, 0.7)}.hero.is-black a.navbar-item:hover,.hero.is-black a.navbar-item.is-active,.hero.is-black .navbar-link:hover,.hero.is-black .navbar-link.is-active{background-color:black;color:white}.hero.is-black .tabs a{color:white;opacity:0.9}.hero.is-black .tabs a:hover{opacity:1}.hero.is-black .tabs li.is-active a{color:#0a0a0a !important;opacity:1}.hero.is-black .tabs.is-boxed a,.hero.is-black .tabs.is-toggle a{color:white}.hero.is-black .tabs.is-boxed a:hover,.hero.is-black .tabs.is-toggle a:hover{background-color:rgba(10, 10, 10, 0.1)}.hero.is-black .tabs.is-boxed li.is-active a,.hero.is-black .tabs.is-boxed li.is-active a:hover,.hero.is-black .tabs.is-toggle li.is-active a,.hero.is-black .tabs.is-toggle li.is-active a:hover{background-color:white;border-color:white;color:#0a0a0a}.hero.is-black.is-bold{background-image:linear-gradient(141deg, black 0%, #0a0a0a 71%, #181616 100%)}@media screen and (max-width: 768px){.hero.is-black.is-bold .navbar-menu{background-image:linear-gradient(141deg, black 0%, #0a0a0a 71%, #181616 100%)}}.hero.is-light{background-color:whitesmoke;color:rgba(0, 0, 0, 0.7)}.hero.is-light a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-light strong{color:inherit}.hero.is-light .title{color:rgba(0, 0, 0, 0.7)}.hero.is-light .subtitle{color:rgba(0, 0, 0, 0.9)}.hero.is-light .subtitle a:not(.button),.hero.is-light .subtitle strong{color:rgba(0, 0, 0, 0.7)}@media screen and (max-width: 1023px){.hero.is-light .navbar-menu{background-color:whitesmoke}}.hero.is-light .navbar-item,.hero.is-light .navbar-link{color:rgba(0, 0, 0, 0.7)}.hero.is-light a.navbar-item:hover,.hero.is-light a.navbar-item.is-active,.hero.is-light .navbar-link:hover,.hero.is-light .navbar-link.is-active{background-color:#e8e8e8;color:rgba(0, 0, 0, 0.7)}.hero.is-light .tabs a{color:rgba(0, 0, 0, 0.7);opacity:0.9}.hero.is-light .tabs a:hover{opacity:1}.hero.is-light .tabs li.is-active a{color:whitesmoke !important;opacity:1}.hero.is-light .tabs.is-boxed a,.hero.is-light .tabs.is-toggle a{color:rgba(0, 0, 0, 0.7)}.hero.is-light .tabs.is-boxed a:hover,.hero.is-light .tabs.is-toggle a:hover{background-color:rgba(10, 10, 10, 0.1)}.hero.is-light .tabs.is-boxed li.is-active a,.hero.is-light .tabs.is-boxed li.is-active a:hover,.hero.is-light .tabs.is-toggle li.is-active a,.hero.is-light .tabs.is-toggle li.is-active a:hover{background-color:rgba(0, 0, 0, 0.7);border-color:rgba(0, 0, 0, 0.7);color:whitesmoke}.hero.is-light.is-bold{background-image:linear-gradient(141deg, #dfd8d9 0%, whitesmoke 71%, white 100%)}@media screen and (max-width: 768px){.hero.is-light.is-bold .navbar-menu{background-image:linear-gradient(141deg, #dfd8d9 0%, whitesmoke 71%, white 100%)}}.hero.is-dark{background-color:#363636;color:#fff}.hero.is-dark a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-dark strong{color:inherit}.hero.is-dark .title{color:#fff}.hero.is-dark .subtitle{color:rgba(255, 255, 255, 0.9)}.hero.is-dark .subtitle a:not(.button),.hero.is-dark .subtitle strong{color:#fff}@media screen and (max-width: 1023px){.hero.is-dark .navbar-menu{background-color:#363636}}.hero.is-dark .navbar-item,.hero.is-dark .navbar-link{color:rgba(255, 255, 255, 0.7)}.hero.is-dark a.navbar-item:hover,.hero.is-dark a.navbar-item.is-active,.hero.is-dark .navbar-link:hover,.hero.is-dark .navbar-link.is-active{background-color:#292929;color:#fff}.hero.is-dark .tabs a{color:#fff;opacity:0.9}.hero.is-dark .tabs a:hover{opacity:1}.hero.is-dark .tabs li.is-active a{color:#363636 !important;opacity:1}.hero.is-dark .tabs.is-boxed a,.hero.is-dark .tabs.is-toggle a{color:#fff}.hero.is-dark .tabs.is-boxed a:hover,.hero.is-dark .tabs.is-toggle a:hover{background-color:rgba(10, 10, 10, 0.1)}.hero.is-dark .tabs.is-boxed li.is-active a,.hero.is-dark .tabs.is-boxed li.is-active a:hover,.hero.is-dark .tabs.is-toggle li.is-active a,.hero.is-dark .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#363636}.hero.is-dark.is-bold{background-image:linear-gradient(141deg, #1f191a 0%, #363636 71%, #46403f 100%)}@media screen and (max-width: 768px){.hero.is-dark.is-bold .navbar-menu{background-image:linear-gradient(141deg, #1f191a 0%, #363636 71%, #46403f 100%)}}.hero.is-primary{background-color:#00d1b2;color:#fff}.hero.is-primary a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-primary strong{color:inherit}.hero.is-primary .title{color:#fff}.hero.is-primary .subtitle{color:rgba(255, 255, 255, 0.9)}.hero.is-primary .subtitle a:not(.button),.hero.is-primary .subtitle strong{color:#fff}@media screen and (max-width: 1023px){.hero.is-primary .navbar-menu{background-color:#00d1b2}}.hero.is-primary .navbar-item,.hero.is-primary .navbar-link{color:rgba(255, 255, 255, 0.7)}.hero.is-primary a.navbar-item:hover,.hero.is-primary a.navbar-item.is-active,.hero.is-primary .navbar-link:hover,.hero.is-primary .navbar-link.is-active{background-color:#00b89c;color:#fff}.hero.is-primary .tabs a{color:#fff;opacity:0.9}.hero.is-primary .tabs a:hover{opacity:1}.hero.is-primary .tabs li.is-active a{color:#00d1b2 !important;opacity:1}.hero.is-primary .tabs.is-boxed a,.hero.is-primary .tabs.is-toggle a{color:#fff}.hero.is-primary .tabs.is-boxed a:hover,.hero.is-primary .tabs.is-toggle a:hover{background-color:rgba(10, 10, 10, 0.1)}.hero.is-primary .tabs.is-boxed li.is-active a,.hero.is-primary .tabs.is-boxed li.is-active a:hover,.hero.is-primary .tabs.is-toggle li.is-active a,.hero.is-primary .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#00d1b2}.hero.is-primary.is-bold{background-image:linear-gradient(141deg, #009e6c 0%, #00d1b2 71%, #00e7eb 100%)}@media screen and (max-width: 768px){.hero.is-primary.is-bold .navbar-menu{background-image:linear-gradient(141deg, #009e6c 0%, #00d1b2 71%, #00e7eb 100%)}}.hero.is-link{background-color:#485fc7;color:#fff}.hero.is-link a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-link strong{color:inherit}.hero.is-link .title{color:#fff}.hero.is-link .subtitle{color:rgba(255, 255, 255, 0.9)}.hero.is-link .subtitle a:not(.button),.hero.is-link .subtitle strong{color:#fff}@media screen and (max-width: 1023px){.hero.is-link .navbar-menu{background-color:#485fc7}}.hero.is-link .navbar-item,.hero.is-link .navbar-link{color:rgba(255, 255, 255, 0.7)}.hero.is-link a.navbar-item:hover,.hero.is-link a.navbar-item.is-active,.hero.is-link .navbar-link:hover,.hero.is-link .navbar-link.is-active{background-color:#3a51bb;color:#fff}.hero.is-link .tabs a{color:#fff;opacity:0.9}.hero.is-link .tabs a:hover{opacity:1}.hero.is-link .tabs li.is-active a{color:#485fc7 !important;opacity:1}.hero.is-link .tabs.is-boxed a,.hero.is-link .tabs.is-toggle a{color:#fff}.hero.is-link .tabs.is-boxed a:hover,.hero.is-link .tabs.is-toggle a:hover{background-color:rgba(10, 10, 10, 0.1)}.hero.is-link .tabs.is-boxed li.is-active a,.hero.is-link .tabs.is-boxed li.is-active a:hover,.hero.is-link .tabs.is-toggle li.is-active a,.hero.is-link .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#485fc7}.hero.is-link.is-bold{background-image:linear-gradient(141deg, #2959b3 0%, #485fc7 71%, #5658d2 100%)}@media screen and (max-width: 768px){.hero.is-link.is-bold .navbar-menu{background-image:linear-gradient(141deg, #2959b3 0%, #485fc7 71%, #5658d2 100%)}}.hero.is-info{background-color:#3e8ed0;color:#fff}.hero.is-info a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-info strong{color:inherit}.hero.is-info .title{color:#fff}.hero.is-info .subtitle{color:rgba(255, 255, 255, 0.9)}.hero.is-info .subtitle a:not(.button),.hero.is-info .subtitle strong{color:#fff}@media screen and (max-width: 1023px){.hero.is-info .navbar-menu{background-color:#3e8ed0}}.hero.is-info .navbar-item,.hero.is-info .navbar-link{color:rgba(255, 255, 255, 0.7)}.hero.is-info a.navbar-item:hover,.hero.is-info a.navbar-item.is-active,.hero.is-info .navbar-link:hover,.hero.is-info .navbar-link.is-active{background-color:#3082c5;color:#fff}.hero.is-info .tabs a{color:#fff;opacity:0.9}.hero.is-info .tabs a:hover{opacity:1}.hero.is-info .tabs li.is-active a{color:#3e8ed0 !important;opacity:1}.hero.is-info .tabs.is-boxed a,.hero.is-info .tabs.is-toggle a{color:#fff}.hero.is-info .tabs.is-boxed a:hover,.hero.is-info .tabs.is-toggle a:hover{background-color:rgba(10, 10, 10, 0.1)}.hero.is-info .tabs.is-boxed li.is-active a,.hero.is-info .tabs.is-boxed li.is-active a:hover,.hero.is-info .tabs.is-toggle li.is-active a,.hero.is-info .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#3e8ed0}.hero.is-info.is-bold{background-image:linear-gradient(141deg, #208fbc 0%, #3e8ed0 71%, #4d83db 100%)}@media screen and (max-width: 768px){.hero.is-info.is-bold .navbar-menu{background-image:linear-gradient(141deg, #208fbc 0%, #3e8ed0 71%, #4d83db 100%)}}.hero.is-success{background-color:#48c78e;color:#fff}.hero.is-success a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-success strong{color:inherit}.hero.is-success .title{color:#fff}.hero.is-success .subtitle{color:rgba(255, 255, 255, 0.9)}.hero.is-success .subtitle a:not(.button),.hero.is-success .subtitle strong{color:#fff}@media screen and (max-width: 1023px){.hero.is-success .navbar-menu{background-color:#48c78e}}.hero.is-success .navbar-item,.hero.is-success .navbar-link{color:rgba(255, 255, 255, 0.7)}.hero.is-success a.navbar-item:hover,.hero.is-success a.navbar-item.is-active,.hero.is-success .navbar-link:hover,.hero.is-success .navbar-link.is-active{background-color:#3abb81;color:#fff}.hero.is-success .tabs a{color:#fff;opacity:0.9}.hero.is-success .tabs a:hover{opacity:1}.hero.is-success .tabs li.is-active a{color:#48c78e !important;opacity:1}.hero.is-success .tabs.is-boxed a,.hero.is-success .tabs.is-toggle a{color:#fff}.hero.is-success .tabs.is-boxed a:hover,.hero.is-success .tabs.is-toggle a:hover{background-color:rgba(10, 10, 10, 0.1)}.hero.is-success .tabs.is-boxed li.is-active a,.hero.is-success .tabs.is-boxed li.is-active a:hover,.hero.is-success .tabs.is-toggle li.is-active a,.hero.is-success .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#48c78e}.hero.is-success.is-bold{background-image:linear-gradient(141deg, #29b35e 0%, #48c78e 71%, #56d2af 100%)}@media screen and (max-width: 768px){.hero.is-success.is-bold .navbar-menu{background-image:linear-gradient(141deg, #29b35e 0%, #48c78e 71%, #56d2af 100%)}}.hero.is-warning{background-color:#ffe08a;color:rgba(0, 0, 0, 0.7)}.hero.is-warning a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-warning strong{color:inherit}.hero.is-warning .title{color:rgba(0, 0, 0, 0.7)}.hero.is-warning .subtitle{color:rgba(0, 0, 0, 0.9)}.hero.is-warning .subtitle a:not(.button),.hero.is-warning .subtitle strong{color:rgba(0, 0, 0, 0.7)}@media screen and (max-width: 1023px){.hero.is-warning .navbar-menu{background-color:#ffe08a}}.hero.is-warning .navbar-item,.hero.is-warning .navbar-link{color:rgba(0, 0, 0, 0.7)}.hero.is-warning a.navbar-item:hover,.hero.is-warning a.navbar-item.is-active,.hero.is-warning .navbar-link:hover,.hero.is-warning .navbar-link.is-active{background-color:#ffd970;color:rgba(0, 0, 0, 0.7)}.hero.is-warning .tabs a{color:rgba(0, 0, 0, 0.7);opacity:0.9}.hero.is-warning .tabs a:hover{opacity:1}.hero.is-warning .tabs li.is-active a{color:#ffe08a !important;opacity:1}.hero.is-warning .tabs.is-boxed a,.hero.is-warning .tabs.is-toggle a{color:rgba(0, 0, 0, 0.7)}.hero.is-warning .tabs.is-boxed a:hover,.hero.is-warning .tabs.is-toggle a:hover{background-color:rgba(10, 10, 10, 0.1)}.hero.is-warning .tabs.is-boxed li.is-active a,.hero.is-warning .tabs.is-boxed li.is-active a:hover,.hero.is-warning .tabs.is-toggle li.is-active a,.hero.is-warning .tabs.is-toggle li.is-active a:hover{background-color:rgba(0, 0, 0, 0.7);border-color:rgba(0, 0, 0, 0.7);color:#ffe08a}.hero.is-warning.is-bold{background-image:linear-gradient(141deg, #ffb657 0%, #ffe08a 71%, #fff6a3 100%)}@media screen and (max-width: 768px){.hero.is-warning.is-bold .navbar-menu{background-image:linear-gradient(141deg, #ffb657 0%, #ffe08a 71%, #fff6a3 100%)}}.hero.is-danger{background-color:#f14668;color:#fff}.hero.is-danger a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),.hero.is-danger strong{color:inherit}.hero.is-danger .title{color:#fff}.hero.is-danger .subtitle{color:rgba(255, 255, 255, 0.9)}.hero.is-danger .subtitle a:not(.button),.hero.is-danger .subtitle strong{color:#fff}@media screen and (max-width: 1023px){.hero.is-danger .navbar-menu{background-color:#f14668}}.hero.is-danger .navbar-item,.hero.is-danger .navbar-link{color:rgba(255, 255, 255, 0.7)}.hero.is-danger a.navbar-item:hover,.hero.is-danger a.navbar-item.is-active,.hero.is-danger .navbar-link:hover,.hero.is-danger .navbar-link.is-active{background-color:#ef2e55;color:#fff}.hero.is-danger .tabs a{color:#fff;opacity:0.9}.hero.is-danger .tabs a:hover{opacity:1}.hero.is-danger .tabs li.is-active a{color:#f14668 !important;opacity:1}.hero.is-danger .tabs.is-boxed a,.hero.is-danger .tabs.is-toggle a{color:#fff}.hero.is-danger .tabs.is-boxed a:hover,.hero.is-danger .tabs.is-toggle a:hover{background-color:rgba(10, 10, 10, 0.1)}.hero.is-danger .tabs.is-boxed li.is-active a,.hero.is-danger .tabs.is-boxed li.is-active a:hover,.hero.is-danger .tabs.is-toggle li.is-active a,.hero.is-danger .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#f14668}.hero.is-danger.is-bold{background-image:linear-gradient(141deg, #fa0a62 0%, #f14668 71%, #f7595f 100%)}@media screen and (max-width: 768px){.hero.is-danger.is-bold .navbar-menu{background-image:linear-gradient(141deg, #fa0a62 0%, #f14668 71%, #f7595f 100%)}}.hero.is-small .hero-body{padding:1.5rem}@media screen and (min-width: 769px), print{.hero.is-medium .hero-body{padding:9rem 4.5rem}}@media screen and (min-width: 769px), print{.hero.is-large .hero-body{padding:18rem 6rem}}.hero.is-halfheight .hero-body,.hero.is-fullheight .hero-body,.hero.is-fullheight-with-navbar .hero-body{align-items:center;display:flex}.hero.is-halfheight .hero-body>.container,.hero.is-fullheight .hero-body>.container,.hero.is-fullheight-with-navbar .hero-body>.container{flex-grow:1;flex-shrink:1}.hero.is-halfheight{min-height:50vh}.hero.is-fullheight{min-height:100vh}.hero-video{overflow:hidden}.hero-video video{left:50%;min-height:100%;min-width:100%;position:absolute;top:50%;transform:translate3d(-50%, -50%, 0)}.hero-video.is-transparent{opacity:0.3}@media screen and (max-width: 768px){.hero-video{display:none}}.hero-buttons{margin-top:1.5rem}@media screen and (max-width: 768px){.hero-buttons .button{display:flex}.hero-buttons .button:not(:last-child){margin-bottom:0.75rem}}@media screen and (min-width: 769px), print{.hero-buttons{display:flex;justify-content:center}.hero-buttons .button:not(:last-child){margin-right:1.5rem}}.hero-head,.hero-foot{flex-grow:0;flex-shrink:0}.hero-body{flex-grow:1;flex-shrink:0;padding:3rem 1.5rem}@media screen and (min-width: 769px), print{.hero-body{padding:3rem 3rem}}.section{padding:3rem 1.5rem}@media screen and (min-width: 1024px){.section{padding:3rem 3rem}.section.is-medium{padding:9rem 4.5rem}.section.is-large{padding:18rem 6rem}}.footer{background-color:#fafafa;padding:3rem 1.5rem 6rem}.timeline{display:flex;flex-direction:column}.timeline .timeline-header{width:4em;min-width:4em;max-width:8em;word-wrap:normal;text-align:center;display:flex;justify-content:center}.timeline .timeline-item{display:flex;display:-ms-flexbox;display:-webkit-flex;position:relative;margin-left:2em;padding-bottom:2em}.timeline .timeline-item::before{content:"";background-color:#dbdbdb;display:block;width:0.1em;height:100%;position:absolute;left:0;top:0}.timeline .timeline-item .timeline-marker{position:absolute;background:#dbdbdb;border:0.1em solid #dbdbdb;border-radius:100%;content:"";display:block;height:0.8em;left:-0.35em;top:1.2rem;width:0.8em}.timeline .timeline-item .timeline-marker.is-image{background:#dbdbdb;border:0.1em solid #dbdbdb;border-radius:100%;display:block;overflow:hidden}.timeline .timeline-item .timeline-marker.is-image.is-16x16{height:16px;width:16px;left:-8px}.timeline .timeline-item .timeline-marker.is-image.is-24x24{height:24px;width:24px;left:-12px}.timeline .timeline-item .timeline-marker.is-image.is-32x32{height:32px;width:32px;left:-16px}.timeline .timeline-item .timeline-marker.is-image.is-48x48{height:48px;width:48px;left:-24px}.timeline .timeline-item .timeline-marker.is-image.is-64x64{height:64px;width:64px;left:-32px}.timeline .timeline-item .timeline-marker.is-image.is-96x96{height:96px;width:96px;left:-48px}.timeline .timeline-item .timeline-marker.is-image.is-128x128{height:128px;width:128px;left:-64px}.timeline .timeline-item .timeline-marker.is-icon{display:flex;align-items:center;justify-content:center;height:1.5em;width:1.5em;left:-0.7em;line-height:0.75rem;background:#dbdbdb;border:0.1em solid #dbdbdb;border-radius:100%}.timeline .timeline-item .timeline-marker.is-icon>i{color:white;font-size:0.75rem !important}.timeline .timeline-item .timeline-marker.is-outlined .image,.timeline .timeline-item .timeline-marker.is-outlined .post>p>img{background:white}.timeline .timeline-item .timeline-marker.is-outlined.is-icon{background:white}.timeline .timeline-item .timeline-marker.is-outlined.is-icon>i{color:#dbdbdb}.timeline .timeline-item .timeline-marker.is-white{background-color:white !important;border-color:white !important}.timeline .timeline-item .timeline-marker.is-white .image,.timeline .timeline-item .timeline-marker.is-white .post>p>img{border-color:white !important}.timeline .timeline-item .timeline-marker.is-white.is-icon{background-color:white !important;border-color:white !important}.timeline .timeline-item .timeline-marker.is-white.is-icon>i{color:#0a0a0a !important}.timeline .timeline-item .timeline-marker.is-white.is-outlined{background-color:white !important;border-color:white !important}.timeline .timeline-item .timeline-marker.is-white.is-outlined .image,.timeline .timeline-item .timeline-marker.is-white.is-outlined .post>p>img{background-color:white !important}.timeline .timeline-item .timeline-marker.is-white.is-outlined.is-icon{background-color:white !important}.timeline .timeline-item .timeline-marker.is-white.is-outlined.is-icon>i{color:white !important}.timeline .timeline-item .timeline-marker.is-black{background-color:#0a0a0a !important;border-color:#0a0a0a !important}.timeline .timeline-item .timeline-marker.is-black .image,.timeline .timeline-item .timeline-marker.is-black .post>p>img{border-color:#0a0a0a !important}.timeline .timeline-item .timeline-marker.is-black.is-icon{background-color:#0a0a0a !important;border-color:#0a0a0a !important}.timeline .timeline-item .timeline-marker.is-black.is-icon>i{color:white !important}.timeline .timeline-item .timeline-marker.is-black.is-outlined{background-color:white !important;border-color:#0a0a0a !important}.timeline .timeline-item .timeline-marker.is-black.is-outlined .image,.timeline .timeline-item .timeline-marker.is-black.is-outlined .post>p>img{background-color:white !important}.timeline .timeline-item .timeline-marker.is-black.is-outlined.is-icon{background-color:white !important}.timeline .timeline-item .timeline-marker.is-black.is-outlined.is-icon>i{color:#0a0a0a !important}.timeline .timeline-item .timeline-marker.is-light{background-color:whitesmoke !important;border-color:whitesmoke !important}.timeline .timeline-item .timeline-marker.is-light .image,.timeline .timeline-item .timeline-marker.is-light .post>p>img{border-color:whitesmoke !important}.timeline .timeline-item .timeline-marker.is-light.is-icon{background-color:whitesmoke !important;border-color:whitesmoke !important}.timeline .timeline-item .timeline-marker.is-light.is-icon>i{color:rgba(0, 0, 0, 0.7) !important}.timeline .timeline-item .timeline-marker.is-light.is-outlined{background-color:white !important;border-color:whitesmoke !important}.timeline .timeline-item .timeline-marker.is-light.is-outlined .image,.timeline .timeline-item .timeline-marker.is-light.is-outlined .post>p>img{background-color:white !important}.timeline .timeline-item .timeline-marker.is-light.is-outlined.is-icon{background-color:white !important}.timeline .timeline-item .timeline-marker.is-light.is-outlined.is-icon>i{color:whitesmoke !important}.timeline .timeline-item .timeline-marker.is-dark{background-color:#363636 !important;border-color:#363636 !important}.timeline .timeline-item .timeline-marker.is-dark .image,.timeline .timeline-item .timeline-marker.is-dark .post>p>img{border-color:#363636 !important}.timeline .timeline-item .timeline-marker.is-dark.is-icon{background-color:#363636 !important;border-color:#363636 !important}.timeline .timeline-item .timeline-marker.is-dark.is-icon>i{color:#fff !important}.timeline .timeline-item .timeline-marker.is-dark.is-outlined{background-color:white !important;border-color:#363636 !important}.timeline .timeline-item .timeline-marker.is-dark.is-outlined .image,.timeline .timeline-item .timeline-marker.is-dark.is-outlined .post>p>img{background-color:white !important}.timeline .timeline-item .timeline-marker.is-dark.is-outlined.is-icon{background-color:white !important}.timeline .timeline-item .timeline-marker.is-dark.is-outlined.is-icon>i{color:#363636 !important}.timeline .timeline-item .timeline-marker.is-primary{background-color:#00d1b2 !important;border-color:#00d1b2 !important}.timeline .timeline-item .timeline-marker.is-primary .image,.timeline .timeline-item .timeline-marker.is-primary .post>p>img{border-color:#00d1b2 !important}.timeline .timeline-item .timeline-marker.is-primary.is-icon{background-color:#00d1b2 !important;border-color:#00d1b2 !important}.timeline .timeline-item .timeline-marker.is-primary.is-icon>i{color:#fff !important}.timeline .timeline-item .timeline-marker.is-primary.is-outlined{background-color:white !important;border-color:#00d1b2 !important}.timeline .timeline-item .timeline-marker.is-primary.is-outlined .image,.timeline .timeline-item .timeline-marker.is-primary.is-outlined .post>p>img{background-color:white !important}.timeline .timeline-item .timeline-marker.is-primary.is-outlined.is-icon{background-color:white !important}.timeline .timeline-item .timeline-marker.is-primary.is-outlined.is-icon>i{color:#00d1b2 !important}.timeline .timeline-item .timeline-marker.is-link{background-color:#485fc7 !important;border-color:#485fc7 !important}.timeline .timeline-item .timeline-marker.is-link .image,.timeline .timeline-item .timeline-marker.is-link .post>p>img{border-color:#485fc7 !important}.timeline .timeline-item .timeline-marker.is-link.is-icon{background-color:#485fc7 !important;border-color:#485fc7 !important}.timeline .timeline-item .timeline-marker.is-link.is-icon>i{color:#fff !important}.timeline .timeline-item .timeline-marker.is-link.is-outlined{background-color:white !important;border-color:#485fc7 !important}.timeline .timeline-item .timeline-marker.is-link.is-outlined .image,.timeline .timeline-item .timeline-marker.is-link.is-outlined .post>p>img{background-color:white !important}.timeline .timeline-item .timeline-marker.is-link.is-outlined.is-icon{background-color:white !important}.timeline .timeline-item .timeline-marker.is-link.is-outlined.is-icon>i{color:#485fc7 !important}.timeline .timeline-item .timeline-marker.is-info{background-color:#3e8ed0 !important;border-color:#3e8ed0 !important}.timeline .timeline-item .timeline-marker.is-info .image,.timeline .timeline-item .timeline-marker.is-info .post>p>img{border-color:#3e8ed0 !important}.timeline .timeline-item .timeline-marker.is-info.is-icon{background-color:#3e8ed0 !important;border-color:#3e8ed0 !important}.timeline .timeline-item .timeline-marker.is-info.is-icon>i{color:#fff !important}.timeline .timeline-item .timeline-marker.is-info.is-outlined{background-color:white !important;border-color:#3e8ed0 !important}.timeline .timeline-item .timeline-marker.is-info.is-outlined .image,.timeline .timeline-item .timeline-marker.is-info.is-outlined .post>p>img{background-color:white !important}.timeline .timeline-item .timeline-marker.is-info.is-outlined.is-icon{background-color:white !important}.timeline .timeline-item .timeline-marker.is-info.is-outlined.is-icon>i{color:#3e8ed0 !important}.timeline .timeline-item .timeline-marker.is-success{background-color:#48c78e !important;border-color:#48c78e !important}.timeline .timeline-item .timeline-marker.is-success .image,.timeline .timeline-item .timeline-marker.is-success .post>p>img{border-color:#48c78e !important}.timeline .timeline-item .timeline-marker.is-success.is-icon{background-color:#48c78e !important;border-color:#48c78e !important}.timeline .timeline-item .timeline-marker.is-success.is-icon>i{color:#fff !important}.timeline .timeline-item .timeline-marker.is-success.is-outlined{background-color:white !important;border-color:#48c78e !important}.timeline .timeline-item .timeline-marker.is-success.is-outlined .image,.timeline .timeline-item .timeline-marker.is-success.is-outlined .post>p>img{background-color:white !important}.timeline .timeline-item .timeline-marker.is-success.is-outlined.is-icon{background-color:white !important}.timeline .timeline-item .timeline-marker.is-success.is-outlined.is-icon>i{color:#48c78e !important}.timeline .timeline-item .timeline-marker.is-warning{background-color:#ffe08a !important;border-color:#ffe08a !important}.timeline .timeline-item .timeline-marker.is-warning .image,.timeline .timeline-item .timeline-marker.is-warning .post>p>img{border-color:#ffe08a !important}.timeline .timeline-item .timeline-marker.is-warning.is-icon{background-color:#ffe08a !important;border-color:#ffe08a !important}.timeline .timeline-item .timeline-marker.is-warning.is-icon>i{color:rgba(0, 0, 0, 0.7) !important}.timeline .timeline-item .timeline-marker.is-warning.is-outlined{background-color:white !important;border-color:#ffe08a !important}.timeline .timeline-item .timeline-marker.is-warning.is-outlined .image,.timeline .timeline-item .timeline-marker.is-warning.is-outlined .post>p>img{background-color:white !important}.timeline .timeline-item .timeline-marker.is-warning.is-outlined.is-icon{background-color:white !important}.timeline .timeline-item .timeline-marker.is-warning.is-outlined.is-icon>i{color:#ffe08a !important}.timeline .timeline-item .timeline-marker.is-danger{background-color:#f14668 !important;border-color:#f14668 !important}.timeline .timeline-item .timeline-marker.is-danger .image,.timeline .timeline-item .timeline-marker.is-danger .post>p>img{border-color:#f14668 !important}.timeline .timeline-item .timeline-marker.is-danger.is-icon{background-color:#f14668 !important;border-color:#f14668 !important}.timeline .timeline-item .timeline-marker.is-danger.is-icon>i{color:#fff !important}.timeline .timeline-item .timeline-marker.is-danger.is-outlined{background-color:white !important;border-color:#f14668 !important}.timeline .timeline-item .timeline-marker.is-danger.is-outlined .image,.timeline .timeline-item .timeline-marker.is-danger.is-outlined .post>p>img{background-color:white !important}.timeline .timeline-item .timeline-marker.is-danger.is-outlined.is-icon{background-color:white !important}.timeline .timeline-item .timeline-marker.is-danger.is-outlined.is-icon>i{color:#f14668 !important}.timeline .timeline-item .timeline-content{padding:1em 0 0 0.5em;padding:1em 0 0 2em}.timeline .timeline-item .timeline-content .heading{font-weight:600}.timeline .timeline-item.is-white::before{background-color:white}.timeline .timeline-item.is-black::before{background-color:#0a0a0a}.timeline .timeline-item.is-light::before{background-color:whitesmoke}.timeline .timeline-item.is-dark::before{background-color:#363636}.timeline .timeline-item.is-primary::before{background-color:#00d1b2}.timeline .timeline-item.is-link::before{background-color:#485fc7}.timeline .timeline-item.is-info::before{background-color:#3e8ed0}.timeline .timeline-item.is-success::before{background-color:#48c78e}.timeline .timeline-item.is-warning::before{background-color:#ffe08a}.timeline .timeline-item.is-danger::before{background-color:#f14668}.timeline.is-centered .timeline-header{display:flex;width:100%;align-self:center}.timeline.is-centered .timeline-item{width:50%;align-self:flex-end}.timeline.is-centered .timeline-item:nth-of-type(2n){align-self:flex-start;margin-left:0;margin-right:2em}.timeline.is-centered .timeline-item:nth-of-type(2n)::before{right:-0.1em;left:auto}.timeline.is-centered .timeline-item:nth-of-type(2n) .timeline-marker{left:auto;right:-0.45em}.timeline.is-centered .timeline-item:nth-of-type(2n) .timeline-marker.is-image.is-16x16{left:auto;right:-8px}.timeline.is-centered .timeline-item:nth-of-type(2n) .timeline-marker.is-image.is-24x24{left:auto;right:-12px}.timeline.is-centered .timeline-item:nth-of-type(2n) .timeline-marker.is-image.is-32x32{left:auto;right:-16px}.timeline.is-centered .timeline-item:nth-of-type(2n) .timeline-marker.is-image.is-48x48{left:auto;right:-24px}.timeline.is-centered .timeline-item:nth-of-type(2n) .timeline-marker.is-image.is-64x64{left:auto;right:-32px}.timeline.is-centered .timeline-item:nth-of-type(2n) .timeline-marker.is-image.is-96x96{left:auto;right:-48px}.timeline.is-centered .timeline-item:nth-of-type(2n) .timeline-marker.is-image.is-128x128{left:auto;right:-64px}.timeline.is-centered .timeline-item:nth-of-type(2n) .timeline-marker.is-icon{left:auto;right:-0.8em}.timeline.is-centered .timeline-item:nth-of-type(2n) .timeline-content{padding:1em 2em 0 0;text-align:right;display:flex;flex-direction:column;align-items:flex-end;flex-basis:100%}.timeline.is-centered .timeline-item:nth-of-type(2n+1)::before{content:"";background-color:#dbdbdb;display:block;width:0.1em;height:100%;position:absolute;top:0}.timeline.is-centered .timeline-item.is-white::before{background-color:white}.timeline.is-centered .timeline-item.is-black::before{background-color:#0a0a0a}.timeline.is-centered .timeline-item.is-light::before{background-color:whitesmoke}.timeline.is-centered .timeline-item.is-dark::before{background-color:#363636}.timeline.is-centered .timeline-item.is-primary::before{background-color:#00d1b2}.timeline.is-centered .timeline-item.is-link::before{background-color:#485fc7}.timeline.is-centered .timeline-item.is-info::before{background-color:#3e8ed0}.timeline.is-centered .timeline-item.is-success::before{background-color:#48c78e}.timeline.is-centered .timeline-item.is-warning::before{background-color:#ffe08a}.timeline.is-centered .timeline-item.is-danger::before{background-color:#f14668}.timeline.is-rtl{justify-content:flex-end;align-items:flex-end}.timeline.is-rtl .timeline-item{justify-content:flex-end;border-left:none;margin-left:0;margin-right:2em}.timeline.is-rtl .timeline-item::before{right:0;left:auto}.timeline.is-rtl .timeline-item .timeline-marker{left:auto;right:-0.35em}.timeline.is-rtl .timeline-item .timeline-marker.is-image.is-16x16{left:auto;right:-8px}.timeline.is-rtl .timeline-item .timeline-marker.is-image.is-24x24{left:auto;right:-12px}.timeline.is-rtl .timeline-item .timeline-marker.is-image.is-32x32{left:auto;right:-16px}.timeline.is-rtl .timeline-item .timeline-marker.is-image.is-48x48{left:auto;right:-24px}.timeline.is-rtl .timeline-item .timeline-marker.is-image.is-64x64{left:auto;right:-32px}.timeline.is-rtl .timeline-item .timeline-marker.is-image.is-96x96{left:auto;right:-48px}.timeline.is-rtl .timeline-item .timeline-marker.is-image.is-128x128{left:auto;right:-64px}.timeline.is-rtl .timeline-item .timeline-marker.is-icon{left:auto;right:-0.7em}.timeline.is-rtl .timeline-item .timeline-content{padding:1em 2em 0 0;text-align:right}.timeline.no-headers .timeline-item.is-first::before{height:calc(100% - 1.2rem);top:1.2rem}.timeline.no-headers .timeline-item.is-last::before{height:1.2rem}.post>p>img{border-radius:12px;border-width:3px;border-color:black;border-style:dashed;margin-bottom:2rem}.post>pre{white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word}.post>hr{margin-bottom:4rem}',
  map: null
};
const _layout$2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$8);
  return `${slots.default ? slots.default({}) : ``}`;
});
var __layout$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout$2
});
var codieConfused = "/twine-trail-guide/_app/assets/ConfusedCodie-cc6709da.png";
const _error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"section"}"><div class="${"container has-text-centered"}"><img alt="${"Codie the cardinal looking befuddled."}" width="${"200"}"${add_attribute("src", codieConfused, 0)}>
        <h1 class="${"title block"}">Oh no! There was an error.</h1>
        <a class="${"button is-large is-primary"}" href="${escape(base) + "/"}">Return Home</a></div></div>`;
});
var __error = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _error
});
var NSFLogo = "/twine-trail-guide/_app/assets/NSFLogo-bdc22bb6.png";
var CodeVA = "/twine-trail-guide/_app/assets/CodeVALogo-cdf06ed4.png";
var Twine = "/twine-trail-guide/_app/assets/twine-b352c7c6.svg";
const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let burger = { active: false };
  return `<nav class="${"navbar"}"><div class="${"navbar-brand logo"}"><a class="${"navbar-item"}" href="${escape(base) + "/"}"><img alt="${"The CodeVA Logo"}"${add_attribute("src", CodeVA, 0)} height="${"28"}">
            <p class="${"mx-3 heading is-size-5"}">+</p>
            <img alt="${"The Twine Logo"}"${add_attribute("src", Twine, 0)} height="${"28"}">
            <h1 class="${"heading is-size-5 ml-5 mt-1 is-hidden-mobile"}">Twine Trail Guide</h1></a>
        <button role="${"button"}" class="${"navbar-burger " + escape("")}" aria-label="${"menu"}"${add_attribute("aria-expanded", burger.active, 0)} data-target="${"nav-menu"}"><span aria-hidden="${"true"}"></span>
            <span aria-hidden="${"true"}"></span>
            <span aria-hidden="${"true"}"></span></button></div>
    <div id="${"nav-menu"}" class="${"navbar-menu " + escape("")}"><div class="${"navbar-end"}"><a class="${"navbar-item"}" href="${escape(base) + "/"}">Home
            </a>
            <a class="${"navbar-item"}" href="${escape(base) + "/about"}">About the Guide
            </a>
            <a class="${"navbar-item"}" href="${"https://padlet.com/jonstapleton/wvs5vb5ct1s5kqts"}">Region Map
            </a>
            <a class="${"navbar-item"}" href="${escape(base) + "/trails"}">Trails
            </a>
            <a class="${"navbar-item"}" href="${escape(base) + "/locations"}">Locations
            </a></div></div></nav>`;
});
var index_svelte_svelte_type_style_lang = "";
const css$7 = {
  code: ".homepage.svelte-152ibw1{height:100vh}.is-tiny.svelte-152ibw1{font-size:0.75rem}.disclaimer.svelte-152ibw1{background-color:gainsboro}",
  map: null
};
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$7);
  return `${$$result.head += `${$$result.title = `<title>Twine Trail Guide</title>`, ""}`, ""}

<section class="${"hero is-fullheight-with-navbar homepage svelte-152ibw1"}"><div class="${"hero-head"}">${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}</div>
	<div class="${"hero-body"}"><div class="${"container has-text-centered"}"><h1 class="${"title"}">Making Interactive Stories with Twine</h1>
			<h2 class="${"subtitle"}">Trail Guide</h2>
			<div class="${"buttons is-centered"}"><a href="${escape(base) + "/trails"}" class="${"button is-primary"}">Get Started</a>
				<a href="${escape(base) + "/about"}" class="${"button is-secondary"}">About the Guide</a></div></div></div>
	<div class="${"hero-foot p-4 disclaimer svelte-152ibw1"}"><div class="${"columns is-mobile is-vcentered"}"><div class="${"column is-narrow"}"><img alt="${"The National Science Foundation logo."}"${add_attribute("src", NSFLogo, 0)} style="${"height: 4em;"}"></div>
			<div class="${"column is-narrow"}"><img alt="${"The CodeVA logo"}"${add_attribute("src", CodeVA, 0)} style="${"height: 3.5rem;"}"></div>
			<div class="${"column"}"><p class="${"is-tiny svelte-152ibw1"}">The \u201CReaching Across the Hallway\u201D project is created by <a href="${"https://codevirginia.org"}">CodeVA</a> and is funded by the National Science Foundation under Grant Award #2010256. Learn more about licenses for this site&#39;s content and source code <a href="${escape(base) + "/about"}">here</a>.</p></div></div></div>
</section>`;
});
var index$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes
});
const _layout$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}
${slots.default ? slots.default({}) : ``}`;
});
var __layout$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout$1
});
const parseNumber = parseFloat;
function joinCss(obj, separator = ";") {
  let texts;
  if (Array.isArray(obj)) {
    texts = obj.filter((text) => text);
  } else {
    texts = [];
    for (const prop in obj) {
      if (obj[prop]) {
        texts.push(`${prop}:${obj[prop]}`);
      }
    }
  }
  return texts.join(separator);
}
function getStyles(style, size, pull, fw) {
  let float;
  let width;
  const height = "1em";
  let lineHeight;
  let fontSize;
  let textAlign;
  let verticalAlign = "-.125em";
  const overflow = "visible";
  if (fw) {
    textAlign = "center";
    width = "1.25em";
  }
  if (pull) {
    float = pull;
  }
  if (size) {
    if (size == "lg") {
      fontSize = "1.33333em";
      lineHeight = ".75em";
      verticalAlign = "-.225em";
    } else if (size == "xs") {
      fontSize = ".75em";
    } else if (size == "sm") {
      fontSize = ".875em";
    } else {
      fontSize = size.replace("x", "em");
    }
  }
  return joinCss([
    joinCss({
      float,
      width,
      height,
      "line-height": lineHeight,
      "font-size": fontSize,
      "text-align": textAlign,
      "vertical-align": verticalAlign,
      "transform-origin": "center",
      overflow
    }),
    style
  ]);
}
function getTransform(scale, translateX, translateY, rotate, flip, translateTimes = 1, translateUnit = "", rotateUnit = "") {
  let flipX = 1;
  let flipY = 1;
  if (flip) {
    if (flip == "horizontal") {
      flipX = -1;
    } else if (flip == "vertical") {
      flipY = -1;
    } else {
      flipX = flipY = -1;
    }
  }
  return joinCss([
    `translate(${parseNumber(translateX) * translateTimes}${translateUnit},${parseNumber(translateY) * translateTimes}${translateUnit})`,
    `scale(${flipX * parseNumber(scale)},${flipY * parseNumber(scale)})`,
    rotate && `rotate(${rotate}${rotateUnit})`
  ], " ");
}
var fa_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: ".spin.svelte-1cj2gr0{animation:svelte-1cj2gr0-spin 2s 0s infinite linear}.pulse.svelte-1cj2gr0{animation:svelte-1cj2gr0-spin 1s infinite steps(8)}@keyframes svelte-1cj2gr0-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}",
  map: null
};
const Fa = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: clazz = "" } = $$props;
  let { id = "" } = $$props;
  let { style = "" } = $$props;
  let { icon } = $$props;
  let { size = "" } = $$props;
  let { color = "" } = $$props;
  let { fw = false } = $$props;
  let { pull = "" } = $$props;
  let { scale = 1 } = $$props;
  let { translateX = 0 } = $$props;
  let { translateY = 0 } = $$props;
  let { rotate = "" } = $$props;
  let { flip = false } = $$props;
  let { spin = false } = $$props;
  let { pulse = false } = $$props;
  let { primaryColor = "" } = $$props;
  let { secondaryColor = "" } = $$props;
  let { primaryOpacity = 1 } = $$props;
  let { secondaryOpacity = 0.4 } = $$props;
  let { swapOpacity = false } = $$props;
  let i;
  let c;
  let s2;
  let transform;
  if ($$props.class === void 0 && $$bindings.class && clazz !== void 0)
    $$bindings.class(clazz);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.fw === void 0 && $$bindings.fw && fw !== void 0)
    $$bindings.fw(fw);
  if ($$props.pull === void 0 && $$bindings.pull && pull !== void 0)
    $$bindings.pull(pull);
  if ($$props.scale === void 0 && $$bindings.scale && scale !== void 0)
    $$bindings.scale(scale);
  if ($$props.translateX === void 0 && $$bindings.translateX && translateX !== void 0)
    $$bindings.translateX(translateX);
  if ($$props.translateY === void 0 && $$bindings.translateY && translateY !== void 0)
    $$bindings.translateY(translateY);
  if ($$props.rotate === void 0 && $$bindings.rotate && rotate !== void 0)
    $$bindings.rotate(rotate);
  if ($$props.flip === void 0 && $$bindings.flip && flip !== void 0)
    $$bindings.flip(flip);
  if ($$props.spin === void 0 && $$bindings.spin && spin !== void 0)
    $$bindings.spin(spin);
  if ($$props.pulse === void 0 && $$bindings.pulse && pulse !== void 0)
    $$bindings.pulse(pulse);
  if ($$props.primaryColor === void 0 && $$bindings.primaryColor && primaryColor !== void 0)
    $$bindings.primaryColor(primaryColor);
  if ($$props.secondaryColor === void 0 && $$bindings.secondaryColor && secondaryColor !== void 0)
    $$bindings.secondaryColor(secondaryColor);
  if ($$props.primaryOpacity === void 0 && $$bindings.primaryOpacity && primaryOpacity !== void 0)
    $$bindings.primaryOpacity(primaryOpacity);
  if ($$props.secondaryOpacity === void 0 && $$bindings.secondaryOpacity && secondaryOpacity !== void 0)
    $$bindings.secondaryOpacity(secondaryOpacity);
  if ($$props.swapOpacity === void 0 && $$bindings.swapOpacity && swapOpacity !== void 0)
    $$bindings.swapOpacity(swapOpacity);
  $$result.css.add(css$6);
  i = icon && icon.icon || [0, 0, "", [], ""];
  c = joinCss([clazz, "fa", spin && "spin", pulse && "pulse"], " ");
  s2 = getStyles(style, size, pull, fw);
  transform = getTransform(scale, translateX, translateY, rotate, flip, 512);
  return `${i[4] ? `<svg${add_attribute("id", id, 0)} class="${escape(null_to_empty(c)) + " svelte-1cj2gr0"}"${add_attribute("style", s2, 0)}${add_attribute("viewBox", `0 0 ${i[0]} ${i[1]}`, 0)} aria-hidden="${"true"}" role="${"img"}" xmlns="${"http://www.w3.org/2000/svg"}"><g${add_attribute("transform", `translate(${i[0] / 2} ${i[1] / 2})`, 0)}${add_attribute("transform-origin", `${i[0] / 4} 0`, 0)}><g${add_attribute("transform", transform, 0)}>${typeof i[4] == "string" ? `<path${add_attribute("d", i[4], 0)}${add_attribute("fill", color || primaryColor || "currentColor", 0)}${add_attribute("transform", `translate(${i[0] / -2} ${i[1] / -2})`, 0)}></path>` : `<path${add_attribute("d", i[4][0], 0)}${add_attribute("fill", secondaryColor || color || "currentColor", 0)}${add_attribute("fill-opacity", swapOpacity != false ? primaryOpacity : secondaryOpacity, 0)}${add_attribute("transform", `translate(${i[0] / -2} ${i[1] / -2})`, 0)}></path>
          <path${add_attribute("d", i[4][1], 0)}${add_attribute("fill", primaryColor || color || "currentColor", 0)}${add_attribute("fill-opacity", swapOpacity != false ? secondaryOpacity : primaryOpacity, 0)}${add_attribute("transform", `translate(${i[0] / -2} ${i[1] / -2})`, 0)}></path>`}</g></g></svg>` : ``}`;
});
var LocationCard_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: "a.svelte-1afgxki.svelte-1afgxki{color:black}.location.svelte-1afgxki.svelte-1afgxki{max-width:40rem}.location.svelte-1afgxki.svelte-1afgxki:hover{background-color:whitesmoke;cursor:pointer}.video.svelte-1afgxki.svelte-1afgxki{overflow:hidden;padding-top:75%;position:relative}.video.svelte-1afgxki iframe.svelte-1afgxki{border:0;height:100%;left:0;position:absolute;top:0;width:100%;border-radius:12px}.icon.svelte-1afgxki.svelte-1afgxki{border-radius:3rem;margin-left:1rem;height:2rem;width:2rem;background-color:#ffdd57}",
  map: null
};
const LocationCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name, desc, path, type } = $$props;
  let { video } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.desc === void 0 && $$bindings.desc && desc !== void 0)
    $$bindings.desc(desc);
  if ($$props.path === void 0 && $$bindings.path && path !== void 0)
    $$bindings.path(path);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.video === void 0 && $$bindings.video && video !== void 0)
    $$bindings.video(video);
  $$result.css.add(css$5);
  return `<article class="${"card my-5 location svelte-1afgxki"}"><div class="${"card-content"}"><div class="${"columns is-mobile"}">
        ${video ? `<div class="${"column is-4"}"><div class="${"video svelte-1afgxki"}"><iframe${add_attribute("src", video, 0)} title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen class="${"svelte-1afgxki"}"></iframe></div></div>` : ``}
        <div class="${"column"}"><h2 class="${"title is-size-4 mb-3"}"><a href="${escape(base) + "/locations" + escape(path)}" class="${"svelte-1afgxki"}">${escape(name)}</a>${type == "project" ? `<span class="${"icon svelte-1afgxki"}">${validate_component(Fa, "Fa").$$render($$result, { icon: faHammer, size: "0.75x" }, {}, {})}</span>` : ``}</h2>
            <p class="${"block"}">${escape(desc)}</p></div></div></div>
</article>`;
});
const locations = { "./branching-paths.md": () => Promise.resolve().then(function() {
  return branchingPaths;
}), "./create-passage.md": () => Promise.resolve().then(function() {
  return createPassage;
}), "./link-passages.md": () => Promise.resolve().then(function() {
  return linkPassages;
}), "./start-a-story.md": () => Promise.resolve().then(function() {
  return startAStory;
}), "./story-with-multiple-endings.md": () => Promise.resolve().then(function() {
  return storyWithMultipleEndings;
}) };
let body$1 = [];
let slugs = [];
for (const path in locations) {
  slugs.push(path);
  body$1.push(locations[path]().then(({ metadata: metadata2 }) => metadata2));
}
async function load$1({ page, fetch: fetch2 }) {
  const locations2 = await Promise.all(body$1);
  for (let i = 0; i < locations2.length; i++) {
    if (locations2[i]) {
      let end = slugs[i].indexOf(".md");
      locations2[i].slug = slugs[i].substring(1, end);
    }
  }
  return { props: { locations: locations2 } };
}
const Locations = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { locations: locations2 } = $$props;
  let filteredList = [];
  let searchTerm2 = "";
  let filter = (searchTerm3) => {
    let tempList = [];
    for (let i = 0; i < locations2.length; i++) {
      if (locations2[i].title.toLowerCase().includes(searchTerm3.toLowerCase())) {
        tempList.push(locations2[i]);
      }
    }
    if (searchTerm3.length > 0) {
      return tempList;
    } else {
      return locations2;
    }
  };
  if ($$props.locations === void 0 && $$bindings.locations && locations2 !== void 0)
    $$bindings.locations(locations2);
  filteredList = filter(searchTerm2);
  return `<section class="${"section"}"><div class="${"container"}"><h1 class="${"title"}">Locations on the Map</h1>
        <p class="${"block"}">This is a big list of all the locations in this guide. You can use this page to search for videos or tutorials that you think might be useful, or just browse around to find something interesting. You can also browse the Locations in this guide by exploring the <a href="${"https://padlet.com/jonstapleton/wvs5vb5ct1s5kqts"}">Region Map</a>.</p>
        <p class="${"block"}">Each location includes a short video and a text explanation of a particular concept, storytelling strategy, or feature of Twine. You can also explore Locations by following <a href="${escape(base) + "/trails"}">Trails</a>, which are collections of Locations organized around particular features or projects you can create with Twine. Check them out!</p>
        
        <div class="${"field search"}"><div class="${"control"}"><input class="${"input"}" type="${"text"}" placeholder="${"Search in Location titles..."}"${add_attribute("value", searchTerm2, 0)}></div></div>
        <hr></div></section>

<section class="${"section"}"><div class="${"container"}">
        ${each(filteredList, (location) => `${validate_component(LocationCard, "LocationCard").$$render($$result, {
    name: location.title,
    desc: location.description,
    path: location.slug,
    video: location.video,
    type: location.type
  }, {}, {})}`)}</div></section>`;
});
var index$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Locations,
  load: load$1
});
var Image_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: '@charset "UTF-8";.svelte-1a3crq5,.svelte-1a3crq5::before,.svelte-1a3crq5::after{box-sizing:inherit}img.svelte-1a3crq5{height:auto;max-width:100%}img.svelte-1a3crq5{height:auto;max-width:100%}@keyframes svelte-1a3crq5-spinAround{from{transform:rotate(0deg)}to{transform:rotate(359deg)}}@media screen and (min-width: 1024px){}@media screen and (max-width: 1215px){}@media screen and (max-width: 1407px){}@media screen and (min-width: 1216px){}@media screen and (min-width: 1408px){}img.svelte-1a3crq5{display:block;position:relative}@keyframes svelte-1a3crq5-moveIndeterminate{from{background-position:200% 0}to{background-position:-200% 0}}@media screen and (min-width: 769px), print{}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (min-width: 769px), print{}@media screen and (min-width: 769px), print{}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (min-width: 769px), print{}@media screen and (max-width: 768px){}@media screen and (min-width: 769px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px){}@media screen and (max-width: 1023px){}@media screen and (min-width: 1024px){}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (max-width: 1023px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1216px){}@media screen and (min-width: 1408px){}@media screen and (min-width: 769px), print{}@media screen and (min-width: 1024px){}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (min-width: 769px) and (max-width: 1023px){}@media screen and (max-width: 1023px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px) and (max-width: 1215px){}@media screen and (min-width: 1216px){}@media screen and (min-width: 1216px) and (max-width: 1407px){}@media screen and (min-width: 1408px){}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (min-width: 769px) and (max-width: 1023px){}@media screen and (max-width: 1023px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px) and (max-width: 1215px){}@media screen and (min-width: 1216px){}@media screen and (min-width: 1216px) and (max-width: 1407px){}@media screen and (min-width: 1408px){}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (min-width: 769px) and (max-width: 1023px){}@media screen and (max-width: 1023px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px) and (max-width: 1215px){}@media screen and (min-width: 1216px){}@media screen and (min-width: 1216px) and (max-width: 1407px){}@media screen and (min-width: 1408px){}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (min-width: 769px) and (max-width: 1023px){}@media screen and (max-width: 1023px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px) and (max-width: 1215px){}@media screen and (min-width: 1216px){}@media screen and (min-width: 1216px) and (max-width: 1407px){}@media screen and (min-width: 1408px){}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (min-width: 769px) and (max-width: 1023px){}@media screen and (max-width: 1023px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px) and (max-width: 1215px){}@media screen and (min-width: 1216px){}@media screen and (min-width: 1216px) and (max-width: 1407px){}@media screen and (min-width: 1408px){}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (min-width: 769px) and (max-width: 1023px){}@media screen and (max-width: 1023px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px) and (max-width: 1215px){}@media screen and (min-width: 1216px){}@media screen and (min-width: 1216px) and (max-width: 1407px){}@media screen and (min-width: 1408px){}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (min-width: 769px) and (max-width: 1023px){}@media screen and (max-width: 1023px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px) and (max-width: 1215px){}@media screen and (min-width: 1216px){}@media screen and (min-width: 1216px) and (max-width: 1407px){}@media screen and (min-width: 1408px){}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (min-width: 769px) and (max-width: 1023px){}@media screen and (max-width: 1023px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px) and (max-width: 1215px){}@media screen and (min-width: 1216px){}@media screen and (min-width: 1216px) and (max-width: 1407px){}@media screen and (min-width: 1408px){}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (min-width: 769px) and (max-width: 1023px){}@media screen and (max-width: 1023px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px) and (max-width: 1215px){}@media screen and (min-width: 1216px){}@media screen and (min-width: 1216px) and (max-width: 1407px){}@media screen and (min-width: 1408px){}@media screen and (min-width: 769px), print{}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (max-width: 1023px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1216px){}@media screen and (min-width: 1408px){}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (min-width: 769px) and (max-width: 1023px){}@media screen and (max-width: 1023px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px) and (max-width: 1215px){}@media screen and (min-width: 1216px){}@media screen and (min-width: 1216px) and (max-width: 1407px){}@media screen and (min-width: 1408px){}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (min-width: 769px) and (max-width: 1023px){}@media screen and (max-width: 1023px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px) and (max-width: 1215px){}@media screen and (min-width: 1216px){}@media screen and (min-width: 1216px) and (max-width: 1407px){}@media screen and (min-width: 1408px){}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (min-width: 769px) and (max-width: 1023px){}@media screen and (max-width: 1023px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px) and (max-width: 1215px){}@media screen and (min-width: 1216px){}@media screen and (min-width: 1216px) and (max-width: 1407px){}@media screen and (min-width: 1408px){}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (min-width: 769px) and (max-width: 1023px){}@media screen and (max-width: 1023px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px) and (max-width: 1215px){}@media screen and (min-width: 1216px){}@media screen and (min-width: 1216px) and (max-width: 1407px){}@media screen and (min-width: 1408px){}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (min-width: 769px) and (max-width: 1023px){}@media screen and (max-width: 1023px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px) and (max-width: 1215px){}@media screen and (min-width: 1216px){}@media screen and (min-width: 1216px) and (max-width: 1407px){}@media screen and (min-width: 1408px){}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (min-width: 769px) and (max-width: 1023px){}@media screen and (max-width: 1023px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px) and (max-width: 1215px){}@media screen and (min-width: 1216px){}@media screen and (min-width: 1216px) and (max-width: 1407px){}@media screen and (min-width: 1408px){}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (min-width: 769px) and (max-width: 1023px){}@media screen and (max-width: 1023px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px) and (max-width: 1215px){}@media screen and (min-width: 1216px){}@media screen and (min-width: 1216px) and (max-width: 1407px){}@media screen and (min-width: 1408px){}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (min-width: 769px) and (max-width: 1023px){}@media screen and (max-width: 1023px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px) and (max-width: 1215px){}@media screen and (min-width: 1216px){}@media screen and (min-width: 1216px) and (max-width: 1407px){}@media screen and (min-width: 1408px){}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (min-width: 769px) and (max-width: 1023px){}@media screen and (max-width: 1023px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px) and (max-width: 1215px){}@media screen and (min-width: 1216px){}@media screen and (min-width: 1216px) and (max-width: 1407px){}@media screen and (min-width: 1408px){}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (min-width: 769px) and (max-width: 1023px){}@media screen and (max-width: 1023px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px) and (max-width: 1215px){}@media screen and (min-width: 1216px){}@media screen and (min-width: 1216px) and (max-width: 1407px){}@media screen and (min-width: 1408px){}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (min-width: 769px) and (max-width: 1023px){}@media screen and (max-width: 1023px){}@media screen and (min-width: 1024px){}@media screen and (min-width: 1024px) and (max-width: 1215px){}@media screen and (min-width: 1216px){}@media screen and (min-width: 1216px) and (max-width: 1407px){}@media screen and (min-width: 1408px){}@media screen and (max-width: 1023px){}@media screen and (max-width: 768px){}@media screen and (max-width: 1023px){}@media screen and (max-width: 768px){}@media screen and (max-width: 1023px){}@media screen and (max-width: 768px){}@media screen and (max-width: 1023px){}@media screen and (max-width: 768px){}@media screen and (max-width: 1023px){}@media screen and (max-width: 768px){}@media screen and (max-width: 1023px){}@media screen and (max-width: 768px){}@media screen and (max-width: 1023px){}@media screen and (max-width: 768px){}@media screen and (max-width: 1023px){}@media screen and (max-width: 768px){}@media screen and (max-width: 1023px){}@media screen and (max-width: 768px){}@media screen and (max-width: 1023px){}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (min-width: 769px), print{}@media screen and (max-width: 768px){}@media screen and (max-width: 768px){}@media screen and (min-width: 769px), print{}@media screen and (min-width: 769px), print{}@media screen and (min-width: 1024px){}img.svelte-1a3crq5{border-radius:12px;border-width:3px;border-color:black;border-style:dashed;margin-bottom:2rem}',
  map: null
};
const Image = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { alt, src } = $$props;
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
    $$bindings.alt(alt);
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  $$result.css.add(css$4);
  return `<img${add_attribute("alt", alt, 0)} src="${escape(base) + "/images" + escape(src)}" class="${"svelte-1a3crq5"}">`;
});
var Pre_svelte_svelte_type_style_lang = "";
const img = Image;
var Standalone_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".video.svelte-rldwzx.svelte-rldwzx{padding-top:56.25%;position:relative}.video.svelte-rldwzx iframe.svelte-rldwzx{border:0;height:100%;left:0;position:absolute;top:0;width:100%;border-radius:12px}",
  map: null
};
const Standalone = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title, type, description, author, layout, short } = $$props;
  let { compact = false } = $$props;
  let { position = false } = $$props;
  let { video } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.author === void 0 && $$bindings.author && author !== void 0)
    $$bindings.author(author);
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  if ($$props.short === void 0 && $$bindings.short && short !== void 0)
    $$bindings.short(short);
  if ($$props.compact === void 0 && $$bindings.compact && compact !== void 0)
    $$bindings.compact(compact);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.video === void 0 && $$bindings.video && video !== void 0)
    $$bindings.video(video);
  $$result.css.add(css$3);
  return `<div class="${"container"}"><section class="${"section"}"><div${add_attribute("class", compact ? "" : "columns", 0)}><div class="${escape(compact ? "" : "column") + " mb-5"}"><h1 class="${"title"}">${position ? `${escape(position)}. ` : ``}${escape(title)}</h1>
                
                <p class="${"block"}">${escape(description)}</p>
                <p class="${"block"}">Watch the video to see someone demonstrate the basics, or read on to work through it on your own. This concept is a part of several project <a href="${escape(base) + "/trails"}">Trails</a>; check them out!</p>
                </div>
            ${video ? `<div${add_attribute("class", compact ? "" : "column", 0)}><div class="${"video svelte-rldwzx"}"><iframe${add_attribute("src", video, 0)} title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen class="${"svelte-rldwzx"}"></iframe></div></div>` : ``}</div>
        <hr></section>
    <section class="${"section content post"}">${slots.default ? slots.default({}) : ``}</section>
</div>`;
});
const metadata$5 = {
  "title": "Story with Multiple Endings",
  "author": "Jon Stapleton",
  "short": "Practice basic Twine storytelling skills by creating a story with more than one possible ending",
  "description": "This project is designed to help beginner Twine authors create a simple story with links, connecting passages together to create a story with more than one possible ending.",
  "type": "project",
  "layout": "location"
};
const Story_with_multiple_endings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Standalone, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$5), {}, {
    default: () => `<h2>About the Project</h2>
<p>For this project, you\u2019ll use your Twine skills to create a simple story with more than one possible endings. During the story, the reader should have to make choices that lead to different outcomes in the story. You could have your reader choose different locations to visit, choose to talk to different people, or even choose to have the main character \u201Csay\u201D different things to affect what happens next in the story. The story should have a couple of different \u201Cendings\u201D, where events stop and there are no links that lead to a new passage.</p>
<hr>
<h2>How To</h2>
<p>First, you should think of a story to write. Your story should have a setting and a main character who has to deal with some sort of problem or challenge during the story. Here are a couple of ideas:</p>
<ul><li>The main character is lost in a spooky haunted house, and must choose the right path to escape from the house before they are caught by whatever creature lives inside</li>
<li>The main character is a detective at a dinner party, and must solve a mystery before the end of the night</li>
<li>The main character is a sailor dealing with a sudden emergency at sea</li></ul>
<p>Once you have an idea for your story, you can either start writing or plan out your passages and links in advance. I like using sticky notes to get an idea of my story before I start writing too much, but you can do whatever works best for you.</p>
<p>${validate_component(img, "Components.img").$$render($$result, {
      src: "/planning.png",
      alt: "A large number of sticky notes representing scenes from a story about a sailor dealing with a sudden emergency at sea"
    }, {}, {})}</p>
<p>Here are some tips to keep in mind as you work:</p>
<ul><li>Keep your passages short and descriptive. Make sure you give the reader enough information for them to imagine the story in their head as they read</li>
<li>Try to give the reader a couple of different kinds of choices to make. Choosing between two places to go is the easiest, but try adding some other kinds of options as well</li>
<li>Don\u2019t add too many links to one scene\u2014keep it simple</li></ul>
<hr>
<h2>Save Your Work</h2>
<p>Twine saves your work in your browser, but that\u2019s not a very secure way to keep your story safe. To create a secure and permanent version of your story, click the name of your story in the bottom-left of the story editor and select <code>Publish to File</code>. The file that your computer saves when you click that button is a portable version of your story that you can send to other people and keep for yourself.</p>
<p>${validate_component(img, "Components.img").$$render($$result, {
      src: "/publish-to-file.png",
      alt: "The Twine story editor showing the 'Publish to File' button that allows the author to download their story in HTML format"
    }, {}, {})}</p>
<p>Make sure you save your work!</p>
<hr>
<h2>Troubleshooting</h2>
<p>Here are some common problems people run into when they are first starting out with Twine:</p>
<ul><li><strong>Link Name Typos:</strong> Whenever you make a link, the name has to match another passage in your story. If it doesn\u2019t Twine will create a <em>new</em> passage with the name of your mispelled link. Double-check your spelling to avoid confusion</li>
<li><strong>Not Testing Often:</strong> You should test your code as <em>often as possible</em>. Testing your story frequently will help you catch errors before they pile up and become difficult to fix</li>
<li><strong>Link Format Errors:</strong> All of your links need to follow the same format: <code>&gt; [[passage-name]]</code>, with the name of one of your passages in place of <code>passage-name</code>. There are some <a href="${"https://klembot.github.io/chapbook/guide/text-and-links/simple-links.html"}" rel="${"nofollow"}">other kinds of links</a> that also work, but I recommend sticking with the \u201Cnormal\u201D way until you get comfortable recognizing errors</li>
<li><strong>Spaces and Capitalization:</strong> Twine keeps track of spacing and capitalization, so make sure you pay attention to it as well (especially with passage names)</li></ul>
<hr>
`
  })}`;
});
var storyWithMultipleEndings = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Story_with_multiple_endings,
  metadata: metadata$5
});
const metadata$4 = {
  "title": "Branching Paths",
  "author": "Jon Stapleton",
  "short": "Learn how to give your reader choices in the story that each lead to different passages.",
  "description": "Twine stories are about choices. This tutorial covers how to add multiple links to a passage, allowing users to make choices that affect how the story ends.",
  "video": "https://www.youtube.com/embed/VpGFJA5Fnyc",
  "type": "tutorial",
  "layout": "location"
};
const Branching_paths = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Standalone, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$4), {}, {
    default: () => `<h2>Create a Choice</h2>
<p>Before you begin, make sure you\u2019ve got a good idea of what your story might be about, and that you have at least one \u201Cstarting\u201D passage and one linked passage for the reader to follow.</p>
<p>Twine stories are interactive, which means the author (that\u2019s you) can create <strong>options</strong> for the reader to choose from, and connect each option to a different part of the story. Consider this starting passage:</p>
<pre class="${"language-undefined"}"><!-- HTML_TAG_START -->${`<code class="language-undefined">Once upon a time, a spider was looking for a place to spin their web. They walked into the forest alone, looking for a good spot to make their new home. Over the hill, they spotted a peaceful clearing.

&gt; [[The Clearing]]</code>`}<!-- HTML_TAG_END --></pre>
<p>In this scene, the reader only has one choice\u2014they can go to <code>The Clearing</code>. But what if they had another choice?</p>
<pre class="${"language-undefined"}"><!-- HTML_TAG_START -->${`<code class="language-undefined">Once upon a time, a spider was looking for a place to spin thier web. They walked into the forest alone, looking for a good spot to make their new home. Over the hill, they spotted a peaceful clearing; to the right, they spotted a rotten old log.

&gt; [[The Clearing]]
&gt; [[The Rotten Log]]</code>`}<!-- HTML_TAG_END --></pre>
<p>By adding a second link, you can create a <em>choice</em> for the reader. After adding a second link, return to the main story editor. You\u2019ll notice that Twine automatically created a new passage with a name matching the one we created in the first passage: <code>The Rotten Log</code>. Nice!</p>
<p>${validate_component(img, "Components.img").$$render($$result, {
      src: "/branching-path.png",
      alt: "The Twine story editor showing three passages connected to one another."
    }, {}, {})}</p>
<hr>
<h2>Edit the New Passage</h2>
<p>Twine created the <code>Rotten Log</code> passage for us, but we still need to go into it and add the story part. Here\u2019s what I wrote:</p>
<blockquote><p>The spider clambered up the soft wood, and was surprised to find a nest of ants milling around inside the log! The spider quietly stepped away, not wanting to disturb them. The spider carefully returned to the path, and noticed a pond glimmering in the distance near the clearing they noticed before.</p></blockquote>
<p>My new passage needs some links! One of them will lead back to <code>The Clearing</code>, and the other will lead to a new passage that I will choose to name <code>The Pond</code>.</p>
<pre class="${"language-undefined"}"><!-- HTML_TAG_START -->${`<code class="language-undefined">&gt; [[The Clearing]]
&gt; [[The Pond]]</code>`}<!-- HTML_TAG_END --></pre>
<p>Here\u2019s what my story editor looks like after adding the the links to my <code>Rotten Log</code> passage:</p>
<p>${validate_component(img, "Components.img").$$render($$result, {
      src: "/new-branch.png",
      alt: "The Twine story editor, showing four passages connected together"
    }, {}, {})}</p>
<hr>
<h2>Test the Story</h2>
<p>After adding a few new passages and links, it\u2019s a good idea to test out the story to make sure everything works the way you intended it to. Try adding some choices to your story, then press the <code>Play</code> button to test it out! You can refresh your story tab to return to the first passage if you want to test each of the choices in your story.</p>
<hr>`
  })}`;
});
var branchingPaths = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Branching_paths,
  metadata: metadata$4
});
const metadata$3 = {
  "title": "Create a Passage",
  "author": "Jon Stapleton",
  "short": "Learn how to create a passage in Twine, telling a part of your story using text.",
  "description": "Passages are where the action happens--they make up the parts of your story. This tutorial covers how to create a passage using the Twine editor, and how to add text to that passage to tell part of your story to the reader.",
  "video": "https://youtube.com/embed/p91bou3cJuA",
  "type": "tutorial",
  "layout": "location"
};
const Create_passage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Standalone, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$3), {}, {
    default: () => `<h2>Open the Editor</h2>
<p>The story <strong>editor</strong> is where you can create and edit the passages that make up your story. To begin editing one of your Twine stories, click on it from the home screen:</p>
<p>${validate_component(img, "Components.img").$$render($$result, {
      src: "/twine-select-story.png",
      alt: "The home Twine page, with a cursor hovering over a story",
      title: "Edit your story by clicking on it from the home page"
    }, {}, {})}</p>
<p>When you click on the story, the Twine <strong>story editor</strong> will open, and you\u2019ll see a box in the center called \u201CUntitled Passage\u201D.</p>
<p>${validate_component(img, "Components.img").$$render($$result, {
      src: "/default-story.png",
      alt: "The Twine default story editor, with a white box in the center labeled 'Untitled Passage'"
    }, {}, {})}</p>
<hr>
<h2>Test the Story</h2>
<p>Twine starts your story with a default passage. You can change the default passage if you\u2019d like, but first go ahead and test it out to see how Twine shows the story. Click the <code>Play</code> button in the bottom-right corner of the editor to test the story.</p>
<p>${validate_component(img, "Components.img").$$render($$result, {
      src: "/play-button.png",
      alt: "The Twine story editor, with an arrow pointing toward the 'Play' button",
      title: "Click the play button to test the story"
    }, {}, {})}</p>
<p>You\u2019ll notice that Twine opens a new tab for you, with a black background and white text that says:</p>
<blockquote><p>Double-click this passage to edit it.</p></blockquote>
<p>When you create a Twine story, this tab is what your reader will see. They won\u2019t be able to see the editor page with all your passages\u2014those will remain secret.</p>
<p>This isn\u2019t a good story yet, so close the story tab and go back to the story editor to make some changes.</p>
<hr>
<h2>Delete a Passage</h2>
<p>Go ahead and delete the \u201CUntitled Passage\u201D so you can practice making your own. Hover your mouse over the box, and click the <code>trash</code> icon.</p>
<p>${validate_component(img, "Components.img").$$render($$result, {
      src: "/passage-hover.png",
      alt: "The Twine story editor, showing the contextual menu that comes up when the author hovers the mouse over a passage"
    }, {}, {})}</p>
<p>When you choose to delete a passage, a box will pop up asking you if you want to continue. It\u2019s very important to think carefully about deleting your passages\u2014you can\u2019t recover them once they are gone. Click <code>Delete</code> to delete the \u201CUntitled Passage\u201D from your story.</p>
<p>${validate_component(img, "Components.img").$$render($$result, {
      src: "/delete-passage.png",
      alt: "A warning box asking for confirmation from the author before deleting a passage",
      title: "Click 'delete' if you are sure that you want to delete the image"
    }, {}, {})}</p>
<hr>
<h2>Add a New Passage</h2>
<p>To create a new passage, click the green <code>+ Passage</code> button in the bottom-right corner of the screen</p>
<p>${validate_component(img, "Components.img").$$render($$result, {
      src: "/new-passage.png",
      alt: "The Twine story editor with an arrow pointing toward the 'New Passage' button"
    }, {}, {})}</p>
<p>You\u2019ll see a new \u201CUntitled Passage\u201D box. This time, don\u2019t delete it\u2014instead, you can edit it to start adding to your story.</p>
<hr>
<h2>Edit a Passage</h2>
<p>To edit a passage, hover over it and click the <code>pencil</code> icon.</p>
<p>${validate_component(img, "Components.img").$$render($$result, {
      src: "/passage-hover.png",
      alt: "The Twine story editor, showing the contextual menu that comes up with the author hovers the mouse of a passage"
    }, {}, {})}</p>
<p>You\u2019ll see a box pop up that says <code>Double-click this passage to edit it</code>. Delete the message, and type something else. This will be the first sentence of your story! You can start it right away, or you can just type something short for now. You can also change the name of the passage by changing the text that says <code>Untitled Passage</code> at the top of the editor to something else.</p>
<p>${validate_component(img, "Components.img").$$render($$result, {
      src: "/passage-editor.png",
      alt: "The Twine passage editor"
    }, {}, {})}</p>
<p>Once you\u2019re done, click the <code>X</code> in the top-right corner, or click outside of the passage editor on the dark background to return to the story editor.</p>
<hr>
<h2>Test Your Changes</h2>
<p>Now, test your story again\u2014click the <code>Play</code> button at the bottom-right of the editor. You should see your new text instead of the default text this time. You\u2019ve edited your story! You can add as much text as you\u2019d like, but don\u2019t type your whole story into the passage\u2014Twine is about creating <em>many</em> passages that are <em>linked together</em>.</p>
<hr>`
  })}`;
});
var createPassage = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Create_passage,
  metadata: metadata$3
});
const metadata$2 = {
  "title": "Link Passages",
  "author": "Jon Stapleton",
  "short": "Allow the reader to progress through the story step-by-step",
  "description": "Each passage is like a scene in your story. Learn how to connect passages together with links, allowing the reader to move the story forward and uncover new scenes step-by-step.",
  "video": "https://youtube.com/embed/33OQtxF7L8g",
  "type": "tutorial",
  "layout": "location"
};
const Link_passages = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Standalone, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$2), {}, {
    default: () => `<h2>Create a Beginning Passage</h2>
<p>Twine <em>passages</em> are like scenes in your story. They should be short and descriptive. Twine passages are connected by <strong><em>links</em></strong>\u2014clickable words that lead from one passage to another. Readers can click on links to move forward in the story from one scene to another.</p>
<p>Before you can create a link to a new passage, write a beginning scene for your story that can lead to a new scene. Here\u2019s an example:</p>
<blockquote><p>Once upon a time, a spider was looking for a place to spin thier web. They walked into the forest alone, looking for a good spot to make their new home. Over the hill, they spotted a peaceful clearing.</p></blockquote>
<p>${validate_component(img, "Components.img").$$render($$result, {
      src: "/intro-passage.png",
      alt: "The Twine passage editor, showing a passage beginning a story"
    }, {}, {})}</p>
<p>Once you\u2019ve written the first scene of your story, click the <code>X</code> in the top-right corner or click the dark background outside of the editor box to return to the main story editor page.</p>
<hr>
<h2>Create a Second Passage</h2>
<p>Next, create a new passage by clicking the <code>+ Passage</code> button in the bottom-right corner of the editor. You\u2019ll see the two passages side-by-side in the story editor.</p>
<p>${validate_component(img, "Components.img").$$render($$result, {
      src: "/two-passages.png",
      alt: "The Twine story editor showing two passages, one called Intro and one Untitled"
    }, {}, {})}</p>
<p>Open the passage, and edit the title and contents. I\u2019ve chosen to name my passage <code>The Clearing</code> because that\u2019s the topic of the scene, but you can name it whatever you want. The new passage should continue from where the first passage left off:</p>
<blockquote><p>The spider explored the beautiful clearing, but all the trees were too far apart to support their web. They decided to keep exploring to see if they could find another place for their home.</p></blockquote>
<p>${validate_component(img, "Components.img").$$render($$result, {
      src: "/second-passage.png",
      alt: "The Twine passage editor, showing a passage named 'The Clearing'"
    }, {}, {})}</p>
<p>Once you\u2019re finished with your second passage, return to the main story editor page.</p>
<hr>
<h2>Create a Link</h2>
<p>Finally, it\u2019s time to add a <em>link</em> to the first passage that connects it to the new passage. Open the first passage, and add the link by adding to the passage like so:</p>
<pre class="${"language-undefined"}"><!-- HTML_TAG_START -->${`<code class="language-undefined">Once upon a time, a spider was looking for a place to spin thier web. They walked into the forest alone, looking for a good spot to make their new home. Over the hill, they spotted a peaceful clearing.

&gt; [[The Clearing]]</code>`}<!-- HTML_TAG_END --></pre>
<p>Links like this one have a couple of parts\u2014the <code>&gt;</code>, the <code>[[</code> and <code>]]</code>, and the <em>name</em> of the passage you want to link to (in this case, <code>The Clearing</code>, the new passage we just made). </p>
<p>The <code>&gt;</code>, <code>[[</code>, and <code>]]</code> all have to be exactly like in the example, but the <em>name</em> can be whatever you want <strong>as long as it matches the name of a passage in your story</strong>.</p>
<hr>
<h2>Check the Connection</h2>
<p>After adding the link, return to the main story editor. You\u2019ll see that your two passages are now connected visually.</p>
<p>${validate_component(img, "Components.img").$$render($$result, {
      src: "/linked-passages.png",
      alt: "The Twine story editor, showing two passages connected by a link"
    }, {}, {})}</p>
<p>Test your story by pressing the <code>Play</code> button. You\u2019ll notice that you can click the link at the end of your first passage, and the screen changes to show the next passage!</p>
<p>A typical Twine story will have a lot of passages, and a <em>lot</em> of links connecting them. You can add as many passages and links as you like!</p>
<hr>`
  })}`;
});
var linkPassages = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Link_passages,
  metadata: metadata$2
});
const metadata$1 = {
  "title": "Start a Story",
  "author": "Jon Stapleton",
  "short": "Learn how to start the Twine editor in your browser and create a new story.",
  "description": "Twine is a tool for creating interactive, web-based stories. This tutorial shows you how to open the Twine editor and start a new story using the Chapbook format (our recommended starting point).",
  "video": "https://youtube.com/embed/rfl8hMypxCg",
  "type": "tutorial",
  "layout": "location"
};
const Start_a_story = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Standalone, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata$1), {}, {
    default: () => `<h2>First, Visit Twine in Your Web Browser</h2>
<p><a href="${"https://twinery.org/"}" rel="${"nofollow"}">Twine</a> is a set of tools that help people write interactive stories and programs that run in a web browser. There are lots of ways to use these tools (including installing the tools on your computer so you can use them offline), but the <em>easiest</em> way is to just open Twine in your web browser.</p>
<ol><li>Follow <a href="${"https://twinery.org/"}" rel="${"nofollow"}">this link</a> to open the Twine website.</li>
<li>Find the link that says <code>Use it online</code> on the right side of the screen (see the screenshot below). Click the link to open the Twine editor tool.</li></ol>
<p>${validate_component(img, "Components.img").$$render($$result, {
      src: "/twine-home.png",
      alt: "The twinery.org webpage, with the 'Use it online' link circled in red with arrows pointing at it.",
      title: "Find the 'Use it online' link on twinery.org"
    }, {}, {})}</p>
<hr>
<h2>Then, Pick a Format</h2>
<p>Twine <strong>formats</strong> control the appearance and style of the stories you create using Twine\u2019s tools. We suggest using <strong>Chapbook</strong> (that\u2019s the one we will use in our examples in this trail guide).</p>
<ol><li>Click the <code>Formats</code> button in the area on the right side of the screen (see the screenshot below)</li></ol>
<p>${validate_component(img, "Components.img").$$render($$result, {
      src: "/twine-format.png",
      alt: "The Twine story editor, with the 'Formats' button circled in red.",
      title: "Find the 'formats' button"
    }, {}, {})}</p>
<ol start="${"2"}"><li>Choose <strong>Chapbook</strong>, and then click the \u201Cx\u201D to return to the main page.</li></ol>
<p>${validate_component(img, "Components.img").$$render($$result, {
      src: "/twine-chapbook.png",
      alt: "The Twine 'formats' list, indicating that you should choose 'Chapbook' from the list",
      title: "Choose 'Chapbook' and return to the main page"
    }, {}, {})}</p>
<hr>
<h2>Finally, Make Your Story</h2>
<ol><li>Find the <code>+ Story</code> button in the area on the right side of the screen, and give it a click!</li></ol>
<p>${validate_component(img, "Components.img").$$render($$result, {
      src: "/twine-new-story.png",
      alt: "The Twine story editor, with the '+Story' button circled in red.",
      title: "Click the 'New Story' button"
    }, {}, {})}</p>
<ol start="${"2"}"><li>Name your story whatever you\u2019d like. If you can\u2019t think of a name, just name it <code>My First Story</code>. You can change it later if you\u2019d like. Then, click <code>Add</code>.</li></ol>
<p>${validate_component(img, "Components.img").$$render($$result, {
      src: "/twine-add-story.png",
      alt: "The Twine 'new story' dialog box, with the '+Add' button circled in red.",
      title: "Click the 'Add' button"
    }, {}, {})}</p>
<ol start="${"3"}"><li>Twine will automatically open the editor after it creates your story. To see how to add to your story, check out the <a href="${"#"}">next tutorial</a>. To return to the main page, click the <code>Home</code> button shaped like a house in the bottom-left corner of the screen.</li></ol>
<p>${validate_component(img, "Components.img").$$render($$result, {
      src: "/twine-go-home.png",
      alt: "The Twine editor, with a red arrow indicating the location of the 'Home' button",
      title: "Return the main page by clicking the 'Home' button"
    }, {}, {})}</p>
<ol start="${"4"}"><li>You can re-enter your story to make changes by clicking the story box from the main page.</li></ol>
<p>${validate_component(img, "Components.img").$$render($$result, {
      src: "/twine-select-story.png",
      alt: "The Twine story selection page, with a single story titled 'My First Story'.",
      title: "Edit your story by clicking on it from the home page."
    }, {}, {})}</p>
<hr>`
  })}`;
});
var startAStory = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Start_a_story,
  metadata: metadata$1
});
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}

${slots.default ? slots.default({}) : ``}`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout
});
var TrailCard_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "a.svelte-11jwfdi{color:black}.trail.svelte-11jwfdi:hover{background-color:whitesmoke;cursor:pointer}",
  map: null
};
const TrailCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name, desc, difficulty, path } = $$props;
  let icon = "";
  function getDifficulty() {
    switch (difficulty) {
      case 0:
        return "\u{1F537}";
      case 1:
        return "\u{1F537}\u{1F537}";
      case 2:
        return "\u{1F537}\u{1F537}\u{1F537}";
      case 3:
        return "\u{1F537}\u{1F537}\u{1F537}\u{1F537}";
    }
    return "";
  }
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.desc === void 0 && $$bindings.desc && desc !== void 0)
    $$bindings.desc(desc);
  if ($$props.difficulty === void 0 && $$bindings.difficulty && difficulty !== void 0)
    $$bindings.difficulty(difficulty);
  if ($$props.path === void 0 && $$bindings.path && path !== void 0)
    $$bindings.path(path);
  $$result.css.add(css$2);
  icon = difficulty == 0 ? "\u2728" : "";
  return `<article class="${"card my-5 trail svelte-11jwfdi"}"><div class="${"card-content"}"><div class="${"media"}">
        
        <div><div class="${"columns is-mobile"}"><div class="${"column"}"><h2 class="${"title is-size-4"}"><a href="${escape(base) + "/trails" + escape(path)}" class="${"svelte-11jwfdi"}">${escape(name)} ${escape(icon)}</a></h2></div>
            <div class="${"column is-narrow"}"><span class="${"heading is-size-5"}">${escape(getDifficulty())}</span></div></div>
          
          <p class="${"block"}">${escape(desc)}</p></div></div></div>
</article>`;
});
const posts = { "./your-first-story.md": () => Promise.resolve().then(function() {
  return yourFirstStory;
}) };
let body = [];
let paths = [];
for (const path in posts) {
  paths.push(path);
  body.push(posts[path]().then(({ metadata: metadata2 }) => metadata2));
}
async function load({ page, fetch: fetch2 }) {
  const trails = await Promise.all(body);
  for (let i = 0; i < trails.length; i++) {
    if (trails[i]) {
      let end = paths[i].indexOf(".md");
      trails[i].slug = paths[i].substring(1, end);
    }
  }
  return { props: { trails } };
}
let searchTerm = "";
const Trails = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { trails } = $$props;
  let filteredList = [];
  let filter = (searchTerm2) => {
    let tempList = [];
    for (let i = 0; i < trails.length; i++) {
      if (trails[i].title.toLowerCase().includes(searchTerm2.toLowerCase())) {
        tempList.push(trails[i]);
      }
    }
    if (searchTerm2.length > 0) {
      return tempList;
    } else {
      return trails;
    }
  };
  if ($$props.trails === void 0 && $$bindings.trails && trails !== void 0)
    $$bindings.trails(trails);
  filteredList = filter(searchTerm);
  return `<div class="${"section"}"><div class="${"container"}"><h1 class="${"title"}">Trail Guide</h1>
        <p class="${"block"}">Browse the list of trails below to explore different things to create with Twine. Each Trail is a set of short tutorials that will help you learn how to create a particular kind of story, or implement a feature into a story you&#39;ve already created.</p>
            
        <p class="${"block"}">Some Trails are short, and some are longer and take more time to complete. We&#39;ve marked the trails recommended for beginners with the \u2728 icon. All the Trails in this guide have a &quot;difficulty&quot; rating that corresponds to how much time the Trail might take to complete (\u{1F537} for Easy, \u{1F537}\u{1F537} for Moderate, \u{1F537}\u{1F537}\u{1F537} for Strenuous, and \u{1F537}\u{1F537}\u{1F537}\u{1F537} for Expert).</p>
        </div></div>

        

<section class="${"section"}"><div class="${"container trail-list"}">${each(filteredList, (trail) => `${validate_component(TrailCard, "TrailCard").$$render($$result, {
    name: trail.title,
    desc: trail.description,
    difficulty: trail.difficulty,
    path: trail.slug
  }, {}, {})}`)}</div>
</section>`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Trails,
  load
});
var LocationNode_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".location.svelte-158oh21>.location-content.svelte-158oh21{margin-left:3rem}.not-selected.svelte-158oh21.svelte-158oh21:hover{background-color:whitesmoke;cursor:pointer}.location.svelte-158oh21.svelte-158oh21{max-width:25rem}",
  map: null
};
const LocationNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title, short, position, type, slug, cl, selected } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.short === void 0 && $$bindings.short && short !== void 0)
    $$bindings.short(short);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.slug === void 0 && $$bindings.slug && slug !== void 0)
    $$bindings.slug(slug);
  if ($$props.cl === void 0 && $$bindings.cl && cl !== void 0)
    $$bindings.cl(cl);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  $$result.css.add(css$1);
  return `
<article class="${"timeline-item location svelte-158oh21"}">${type == "project" ? `<div class="${"timeline-marker is-warning is-icon"}"><i>${validate_component(Fa, "Fa").$$render($$result, { icon: faHammer }, {}, {})}</i></div>` : `<div class="${"timeline-marker " + escape(selected ? "" : "")}"></div>`}
    <div class="${"timeline-content card location-content p-4 " + escape(selected ? "not-selected" : "not-selected") + " svelte-158oh21"}">
            <h3 class="${"heading is-small"}">${type != "project" ? `${escape(position)}.` : ``} ${escape(title)}</h3>
            <p>${escape(short)}</p></div>
</article>`;
});
const TrailTimeline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { locations: locations2 = [] } = $$props;
  let { locs = [] } = $$props;
  if ($$props.locations === void 0 && $$bindings.locations && locations2 !== void 0)
    $$bindings.locations(locations2);
  if ($$props.locs === void 0 && $$bindings.locs && locs !== void 0)
    $$bindings.locs(locs);
  return `<section class="${"timeline my-5"}">
    <header class="${"timeline-header"}"><span class="${"tag is-medium is-primary"}">Start</span></header>
    ${slots.default ? slots.default({}) : ``}
    
    <div class="${"timeline-header"}"><span class="${"tag is-medium is-primary"}">End</span></div></section>`;
});
var Trail_svelte_svelte_type_style_lang = "";
const css = {
  code: ".content-wrapper.svelte-z0jqs{display:grid;align-items:start;border-radius:1rem}.el2.svelte-z0jqs{grid-area:1/1/2/2;border-radius:1rem}.back-to-top.svelte-z0jqs{position:sticky;bottom:2rem}",
  map: null
};
const Trail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title, difficulty, description, locations: locations2 } = $$props;
  let locationContent = [];
  let inlineLocations;
  let header;
  let selected = 0;
  function getDist() {
    return "-" + locations2.length * 2 + "rem";
  }
  function step(i) {
    selected = i;
    console.log("scrolling to " + i);
    inlineLocations.children[i].scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.difficulty === void 0 && $$bindings.difficulty && difficulty !== void 0)
    $$bindings.difficulty(difficulty);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.locations === void 0 && $$bindings.locations && locations2 !== void 0)
    $$bindings.locations(locations2);
  $$result.css.add(css);
  return `

<section class="${"section"}"><div class="${"container"}"><div class="${"columns"}"><div class="${"column is-8"}"><h1 class="${"title block"}"${add_attribute("this", header, 0)}>${escape(title)} ${escape(difficulty == 0 ? "\u2728" : "")}</h1>
                <p class="${"block"}">${escape(description)}</p>
                ${slots.default ? slots.default({}) : ``}
                <hr>
                <div class="${"is-hidden-desktop"}">${validate_component(TrailTimeline, "TrailTimeline").$$render($$result, {}, {}, {
    default: () => `${each(locationContent, (location, i) => `${validate_component(LocationNode, "LocationNode").$$render($$result, {
      cl: () => step(i),
      title: location.metadata.title,
      short: location.metadata.short,
      position: i + 1,
      type: location.metadata.type,
      slug: location.metadata.slug,
      selected: selected == i
    }, {}, {})}`)}`
  })}</div>
                <div class="${"container is-hidden-desktop"}"${add_attribute("this", inlineLocations, 0)}>${each(locationContent, (component, i) => `<div class="${"container my-5 inline"}">${validate_component(component.default || missing_component, "svelte:component").$$render($$result, { position: i + 1, compact: true }, {}, {})}
                    </div>`)}</div>
                <div class="${"column is-hidden-touch content-wrapper svelte-z0jqs"}">${each(locationContent, (component, i) => `${selected == i ? `<div class="${"el2 svelte-z0jqs"}">${validate_component(component.default || missing_component, "svelte:component").$$render($$result, { position: i + 1, compact: true }, {}, {})}</div>
                    <div class="${"has-text-centered"}"><button class="${"button is-primary is-rounded"}">Back to Top</button>
                    </div>` : ``}`)}</div></div>
            <div class="${"column is-4 ml-5 is-hidden-touch"}"><div style="${"position: sticky; top: " + escape(getDist()) + ";"}">${validate_component(TrailTimeline, "TrailTimeline").$$render($$result, {}, {}, {
    default: () => `${each(locationContent, (location, i) => `${validate_component(LocationNode, "LocationNode").$$render($$result, {
      cl: () => step(i),
      title: location.metadata.title,
      short: location.metadata.short,
      position: i + 1,
      type: location.metadata.type,
      slug: location.metadata.slug,
      selected: selected == i
    }, {}, {})}`)}`
  })}</div></div></div></div>
    ${``}</section>


`;
});
const metadata = {
  "title": "Your First Story",
  "difficulty": 0,
  "description": "This trail is intended to introduce beginners to Twine, and help them create a simple interactive story. Follow this trail to learn the basics! You'll learn about how to use the Twine interface, how to write and test the different parts of your story, how to link scenes together, and how to create a simple choose-your-own-adventure-style story that offers choices for the reader than affect the outcome.",
  "locations": [
    "start-a-story",
    "create-passage",
    "link-passages",
    "branching-paths",
    "story-with-multiple-endings"
  ],
  "layout": "trail"
};
const Your_first_story = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Trail, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => `<p>You don\u2019t need any prerequisite knowledge to get started with this trail. Many of the other <a href="${"/trails"}">trails</a> in this guide will build on the skills you develop here.</p>`
  })}`;
});
var yourFirstStory = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Your_first_story,
  metadata
});
const MdLayout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}
<div class="${"section content"}">${slots.default ? slots.default({}) : ``}</div>`;
});
const About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(MdLayout, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props), {}, {
    default: () => `<div class="${"container"}"><div class="${"section"}"><h1>About the Guide</h1>
<p>This site is a guide intended to help people use (or teach others to use) <a href="${"#"}"><strong>Twine</strong></a>. <strong>Twine</strong> is a tool for creating websites, but instead of the website being about a topic, or hosting a storefront, or containing blog posts, <strong>Twine</strong> websites tell <strong>stories</strong>.</p></div>
<div class="${"section"}"><h2>What is a Trail Guide?</h2>
<p>We use the term \u201Ctrail guide\u201D to describe this resource because most of what you\u2019ll find here are not \u201Ctutorials\u201D, \u201Clessons\u201D, or \u201Cdirections\u201D\u2014instead, you\u2019ll find a <em>Map</em> and some <em>Trails</em>.</p>
<h3>Using the Map</h3>
<p>The <strong><a href="${"https://padlet.com/jonstapleton/wvs5vb5ct1s5kqts"}" rel="${"nofollow"}">Region Map</a></strong> contains a bunch of short little lessons on how to do different things with <strong>Twine</strong>. You don\u2019t have to follow these lessons in any particular order; once you know a little bit about <strong>Twine</strong>, you will probably find it useful to just browse around and explore the things that you might want to learn about as you work on writing a story.</p>
<h3>Following the Trails</h3>
<p>The Map is useful, but sometimes it\u2019s also helpful to have a path to follow so you can learn the basics without having to dig around. <strong>Trails</strong> are sequences of lessons that we\u2019ve created from the lessons on the Map that you can follow (if you want). </p>
<p>Each Trail is designed to help you make something. You can follow the lessons on your chosen Trail in order, and even complete a little mini-project at the end to practice your skills.</p>
<p>There are lots of Trails to choose from.</p></div>
<div class="${"section"}"><h2>How to Use the Trail Guide</h2>
<p>This <em>Trail Guide</em> is a tool for you to use, one that is intended to help you create stories with <strong>Twine</strong>. You can use it in whatever way you find helpful, but here are some suggestions:</p>
<ol><li>If you\u2019re new to <strong>Twine</strong>, go check out the <a href="${escape(base) + "/trails"}">trails</a> and pick one to follow. We suggest the <a href="${"#"}">\u201CMy First Story\u201D</a> trail.</li>
<li>Complete the mini-project at the end of your chosen trail. Bask in your achievement, and share your story with friends &amp; family!</li>
<li>Pick a new <a href="${escape(base) + "/trails"}">trail</a> that seems interesting to you, or go explore the <a href="${"https://padlet.com/jonstapleton/wvs5vb5ct1s5kqts"}" rel="${"nofollow"}">region map</a>. Add to your first story, or start a new one!</li>
<li>Keep going\u2014make stories!</li></ol></div>
<div class="${"section"}"><h2>Licenses &amp; Terms of Use</h2>
<p>The \u201CReaching Across the Hallway\u201D project is funded by the National Science Foundation under Grant Award #2010256. Any opinions, findings, and conclusions or recommendations expressed in this material are those of the author(s) and do not necessarily reflect the views of the National Science Foundation. These modules were written by <a href="${"https://jonstapleton.github.io/"}" rel="${"nofollow"}">Jon Stapleton</a> on behalf of <a href="${"https://www.codevirginia.org/"}" rel="${"nofollow"}">CodeVA</a>. The source code is licensed under <a href="${"https://www.gnu.org/licenses/gpl-3.0.en.html"}" rel="${"nofollow"}">GPLv3</a>. The website text is licensed under <a href="${"http://creativecommons.org/licenses/by-nc-sa/4.0/"}" rel="${"nofollow"}">CC-BY-NC-SA</a>.</p>
<p>You may use the source code of this website to create derivative works, as long as you 1) track changes to the source code and make those changes available to the public, 2) provide build and install instructions for your version of the source code, and 3) license the source code of your derivative work under the <a href="${"https://www.gnu.org/licenses/gpl-3.0.en.html"}" rel="${"nofollow"}">GPLv3</a> license. This license is intended to prevent people from creating closed-source derivative works for commercial or private purposes.</p>
<p>You may use the text of this website to create derivative works as long as you 1) provide proper attribution in your derivative work crediting <a href="${"https://www.codevirginia.org/"}" rel="${"nofollow"}">CodeVA</a>, and 2) license the text of your derivative work under the <a href="${"http://creativecommons.org/licenses/by-nc-sa/4.0/"}" rel="${"nofollow"}">CC-BY-NC-SA</a>. This project applies this license to prevent people from creating derivative works protected by restrictive copyright policies, and to encourage derivative work that remixes, revises, or improves upon this work.</p>
<p>If you create a derivative work based on this Trail Guide, include the following text in your source code and on the website or print material associated with your derivative work:</p>
<blockquote><p>This project is based on the <a href="${"https://github.com/CodeVA-Curriculum/twine-trail-guide"}" rel="${"nofollow"}">Twine Trail Guide</a> created by <a href="${"https://www.codevirginia.org/"}" rel="${"nofollow"}">CodeVA</a>. The source code for this derivative work is licensed under <a href="${"https://www.gnu.org/licenses/gpl-3.0.en.html"}" rel="${"nofollow"}">GPLv3</a>, and the text content of this project is licensed under <a href="${"http://creativecommons.org/licenses/by-nc-sa/4.0/"}" rel="${"nofollow"}">CC-BY-NC-SA</a>.</p>
<p>If you create a derivative work based on this project, include this text in your source code and on the website or print material associated with your derivative work.</p></blockquote></div></div>`
  })}`;
});
var about = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": About
});
export { init, render };
