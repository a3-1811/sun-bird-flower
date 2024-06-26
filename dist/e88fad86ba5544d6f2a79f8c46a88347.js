// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({4:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GARDEN_SETTING = exports.BIRD_HOURS = exports.FLOWER_HOURS = exports.SUNDOWN_HOUR = exports.SUNRISE_HOUR = void 0;
exports.SUNRISE_HOUR = 6;
exports.SUNDOWN_HOUR = 18;
exports.FLOWER_HOURS = {
    BLOOMING_HOUR: { from: exports.SUNRISE_HOUR, to: exports.SUNRISE_HOUR + 2 },
    WILT_HOUR: { from: exports.SUNDOWN_HOUR, to: exports.SUNDOWN_HOUR + 2 }
};
exports.BIRD_HOURS = {
    WAKE_HOUR: exports.SUNRISE_HOUR - 1,
    SLEEP_HOUR: exports.SUNDOWN_HOUR + 1
};
exports.GARDEN_SETTING = {
    birds: 5,
    flowers: 10
};
},{}],5:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTimeInRange = exports.formatDateTime = exports.getRandomEnumValue = exports.getRandomIntInclusive = exports.modifyDatetime = exports.getInitialDatetime = void 0;
function getInitialDatetime() {
    var current = new Date();
    current.setHours(17, 0, 0);
    return current;
}
exports.getInitialDatetime = getInitialDatetime;
function modifyDatetime(date) {
    var hours = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var minutes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var seconds = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    var newDate = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    newDate.setSeconds(seconds);
    return newDate;
}
exports.modifyDatetime = modifyDatetime;
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Both maximum and minimum are inclusive
}
exports.getRandomIntInclusive = getRandomIntInclusive;
function getRandomEnumValue(anEnum) {
    var enumValues = Object.values(anEnum);
    var randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
}
exports.getRandomEnumValue = getRandomEnumValue;
function formatDateTime(date, format) {
    var day = date.getDate().toString().padStart(2, "0");
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var year = date.getFullYear().toString();
    var hours = date.getHours().toString().padStart(2, "0");
    var minutes = date.getMinutes().toString().padStart(2, "0");
    var seconds = date.getSeconds().toString().padStart(2, "0");
    var milliseconds = date.getMilliseconds().toString().padStart(3, "0");
    return format.replace("DD", day).replace("MM", month).replace("YYYY", year).replace("hh", hours).replace("mm", minutes).replace("ss", seconds).replace("SSS", milliseconds);
}
exports.formatDateTime = formatDateTime;
function checkTimeInRange(date, start, end) {
    var hours = date.getHours();
    var startHours = start.getHours();
    var endHours = end.getHours();
    return hours >= startHours && hours < endHours;
}
exports.checkTimeInRange = checkTimeInRange;
},{}],24:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rng;
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}
},{}],23:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
},{}],16:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regex = require('./regex.js');

var _regex2 = _interopRequireDefault(_regex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(uuid) {
  return typeof uuid === 'string' && _regex2.default.test(uuid);
}

exports.default = validate;
},{"./regex.js":23}],19:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafeStringify = unsafeStringify;

var _validate = require('./validate.js');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0, _validate2.default)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

exports.default = stringify;
},{"./validate.js":16}],15:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rng = require('./rng.js');

var _rng2 = _interopRequireDefault(_rng);

var _stringify = require('./stringify.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng2.default)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0, _stringify.unsafeStringify)(b);
}

exports.default = v1;
},{"./rng.js":24,"./stringify.js":19}],21:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validate = require('./validate.js');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(uuid) {
  if (!(0, _validate2.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

exports.default = parse;
},{"./validate.js":16}],22:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.URL = exports.DNS = undefined;
exports.default = v35;

var _stringify = require('./stringify.js');

var _parse = require('./parse.js');

var _parse2 = _interopRequireDefault(_parse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = exports.DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
const URL = exports.URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
function v35(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    var _namespace;

    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0, _parse2.default)(namespace);
    }

    if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0, _stringify.unsafeStringify)(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}
},{"./stringify.js":19,"./parse.js":21}],25:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (let i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */

function md5ToHexEncodedArray(input) {
  const output = [];
  const length32 = input.length * 32;
  const hexTab = '0123456789abcdef';

  for (let i = 0; i < length32; i += 8) {
    const x = input[i >> 5] >>> i % 32 & 0xff;
    const hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */

function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */

function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;

  for (let i = 0; i < x.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c;
    const oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */

function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  const length8 = input.length * 8;
  const output = new Uint32Array(getOutputLength(length8));

  for (let i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */

function safeAdd(x, y) {
  const lsw = (x & 0xffff) + (y & 0xffff);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */

function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */

function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

exports.default = md5;
},{}],13:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _v = require('./v35.js');

var _v2 = _interopRequireDefault(_v);

var _md = require('./md5.js');

var _md2 = _interopRequireDefault(_md);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v3 = (0, _v2.default)('v3', 0x30, _md2.default);
exports.default = v3;
},{"./v35.js":22,"./md5.js":25}],26:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
exports.default = {
  randomUUID
};
},{}],18:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _native = require('./native.js');

var _native2 = _interopRequireDefault(_native);

var _rng = require('./rng.js');

var _rng2 = _interopRequireDefault(_rng);

var _stringify = require('./stringify.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function v4(options, buf, offset) {
  if (_native2.default.randomUUID && !buf && !options) {
    return _native2.default.randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || _rng2.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0, _stringify.unsafeStringify)(rnds);
}

exports.default = v4;
},{"./native.js":26,"./rng.js":24,"./stringify.js":19}],27:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  const H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (let i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  const l = bytes.length / 4 + 2;
  const N = Math.ceil(l / 16);
  const M = new Array(N);

  for (let i = 0; i < N; ++i) {
    const arr = new Uint32Array(16);

    for (let j = 0; j < 16; ++j) {
      arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
    }

    M[i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (let i = 0; i < N; ++i) {
    const W = new Uint32Array(80);

    for (let t = 0; t < 16; ++t) {
      W[t] = M[i][t];
    }

    for (let t = 16; t < 80; ++t) {
      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }

    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];

    for (let t = 0; t < 80; ++t) {
      const s = Math.floor(t / 20);
      const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

exports.default = sha1;
},{}],20:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _v = require('./v35.js');

var _v2 = _interopRequireDefault(_v);

var _sha = require('./sha1.js');

var _sha2 = _interopRequireDefault(_sha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v5 = (0, _v2.default)('v5', 0x50, _sha2.default);
exports.default = v5;
},{"./v35.js":22,"./sha1.js":27}],14:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = '00000000-0000-0000-0000-000000000000';
},{}],17:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validate = require('./validate.js');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function version(uuid) {
  if (!(0, _validate2.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.slice(14, 15), 16);
}

exports.default = version;
},{"./validate.js":16}],12:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _v = require('./v1.js');

Object.defineProperty(exports, 'v1', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_v).default;
  }
});

var _v2 = require('./v3.js');

Object.defineProperty(exports, 'v3', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_v2).default;
  }
});

var _v3 = require('./v4.js');

Object.defineProperty(exports, 'v4', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_v3).default;
  }
});

var _v4 = require('./v5.js');

Object.defineProperty(exports, 'v5', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_v4).default;
  }
});

var _nil = require('./nil.js');

Object.defineProperty(exports, 'NIL', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_nil).default;
  }
});

var _version = require('./version.js');

Object.defineProperty(exports, 'version', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_version).default;
  }
});

var _validate = require('./validate.js');

Object.defineProperty(exports, 'validate', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_validate).default;
  }
});

var _stringify = require('./stringify.js');

Object.defineProperty(exports, 'stringify', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_stringify).default;
  }
});

var _parse = require('./parse.js');

Object.defineProperty(exports, 'parse', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_parse).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./v1.js":15,"./v3.js":13,"./v4.js":18,"./v5.js":20,"./nil.js":14,"./version.js":17,"./validate.js":16,"./stringify.js":19,"./parse.js":21}],8:[function(require,module,exports) {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
exports.Bird = void 0;
var uuid_1 = require("uuid");
var configs_1 = require("../configs");
var util_1 = require("../util");

var Bird = function () {
    function Bird(subject, garden) {
        _classCallCheck(this, Bird);

        this.garden = garden;
        this.id = (0, uuid_1.v4)();
        this.isWake = false;
        this.isSleep = true;
        this.flowerColorsSucked = [];
        var _configs_1$BIRD_HOURS = configs_1.BIRD_HOURS,
            SLEEP_HOUR = _configs_1$BIRD_HOURS.SLEEP_HOUR,
            WAKE_HOUR = _configs_1$BIRD_HOURS.WAKE_HOUR;

        this.wakeTime = (0, util_1.modifyDatetime)(subject.getTime(), WAKE_HOUR, 0);
        this.sleepTime = (0, util_1.modifyDatetime)(subject.getTime(), SLEEP_HOUR, 0);
    }
    // COMMON


    _createClass(Bird, [{
        key: "update",
        value: function update(subject) {
            var sunTime = subject.getTime();
            if (!(0, util_1.checkTimeInRange)(sunTime, this.wakeTime, this.sleepTime)) {
                this.reset();
            } else {
                this.isWake = true;
                this.isSleep = false;
                // Suck honey
                var flower = this.garden.getRandomBloomingFlower(this);
                if (flower) {
                    this.suckHoney(flower);
                }
            }
        }
    }, {
        key: "reset",
        value: function reset() {
            this.isSleep = true;
            this.isWake = false;
            this.flowerColorsSucked = [];
        }
        // Interactions

    }, {
        key: "suckHoney",
        value: function suckHoney(flower) {
            flower.addBirdSuckedNectar(this);
            this.flowerColorsSucked.push(flower.color);
            this.checkCreateNewFlower();
        }
    }, {
        key: "checkCreateNewFlower",
        value: function checkCreateNewFlower() {
            var _a, _b, _c;
            if (((_a = this.flowerColorsSucked) === null || _a === void 0 ? void 0 : _a.length) <= 1) {
                return;
            }
            var lastColor = this.flowerColorsSucked[((_b = this.flowerColorsSucked) === null || _b === void 0 ? void 0 : _b.length) - 1];
            var nextLastColor = this.flowerColorsSucked[((_c = this.flowerColorsSucked) === null || _c === void 0 ? void 0 : _c.length) - 2];
            if (lastColor === nextLastColor) {
                this.garden.createFlower();
                this.flowerColorsSucked = [];
            }
        }
    }]);

    return Bird;
}();

exports.Bird = Bird;
},{"uuid":12,"../configs":4,"../util":5}],11:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowerColors = void 0;
var FlowerColors;
(function (FlowerColors) {
    FlowerColors["RED"] = "RED";
    FlowerColors["BLUE"] = "BLUE";
    FlowerColors["GREEN"] = "GREEN";
})(FlowerColors = exports.FlowerColors || (exports.FlowerColors = {}));
},{}],7:[function(require,module,exports) {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
exports.Flower = void 0;
var uuid_1 = require("uuid");
var configs_1 = require("../configs");
var util_1 = require("../util");
var common_1 = require("./common");

var Flower = function () {
    function Flower(subject) {
        _classCallCheck(this, Flower);

        this.id = (0, uuid_1.v4)();
        this.color = (0, util_1.getRandomEnumValue)(common_1.FlowerColors);
        this.isWilt = true;
        this.isBlooming = false;
        this.birdSuckedNectar = [];
        this.bloomingTime = new Date();
        this.wiltTime = new Date();
        this.randomBloomingAndWiltTime(subject.getTime());
    }
    // COMMON


    _createClass(Flower, [{
        key: "update",
        value: function update(subject) {
            var sunTime = subject.getTime();
            if (!(0, util_1.checkTimeInRange)(sunTime, this.bloomingTime, this.wiltTime)) {
                this.reset(subject);
            } else {
                this.isBlooming = true;
                this.isWilt = false;
            }
        }
    }, {
        key: "reset",
        value: function reset(subject) {
            this.isWilt = true;
            this.isBlooming = false;
            this.birdSuckedNectar = [];
            // Renew bloomingTime and wiltTime
            this.randomBloomingAndWiltTime(subject.getTime());
        }
    }, {
        key: "randomBloomingAndWiltTime",
        value: function randomBloomingAndWiltTime(date) {
            var _configs_1$FLOWER_HOU = configs_1.FLOWER_HOURS,
                BLOOMING_HOUR = _configs_1$FLOWER_HOU.BLOOMING_HOUR,
                WILT_HOUR = _configs_1$FLOWER_HOU.WILT_HOUR;
            // Random blooming hour

            var bloomingHour = (0, util_1.getRandomIntInclusive)(BLOOMING_HOUR.from, BLOOMING_HOUR.to);
            var bloomingMinutes = (0, util_1.getRandomIntInclusive)(0, 59);
            this.bloomingTime = (0, util_1.modifyDatetime)(date, bloomingHour, bloomingMinutes);
            // Random wilt hour
            var wiltHour = (0, util_1.getRandomIntInclusive)(WILT_HOUR.from, WILT_HOUR.to);
            var wiltMinutes = (0, util_1.getRandomIntInclusive)(0, 59);
            this.wiltTime = (0, util_1.modifyDatetime)(date, wiltHour, wiltMinutes);
        }
        // INTERACTIONS

    }, {
        key: "addBirdSuckedNectar",
        value: function addBirdSuckedNectar(bird) {
            var _a;
            var index = (_a = this.birdSuckedNectar) === null || _a === void 0 ? void 0 : _a.indexOf(bird.id);
            if (index === -1) {
                this.birdSuckedNectar.push(bird.id);
            }
        }
    }]);

    return Flower;
}();

exports.Flower = Flower;
},{"uuid":12,"../configs":4,"../util":5,"./common":11}],6:[function(require,module,exports) {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
exports.Sun = void 0;
var util_1 = require("../util");

var Sun = function () {
    function Sun() {
        _classCallCheck(this, Sun);

        this.time = (0, util_1.getInitialDatetime)();
        this.observers = [];
    }

    _createClass(Sun, [{
        key: "addObserver",
        value: function addObserver(observer) {
            this.observers.push(observer);
        }
    }, {
        key: "removeObserver",
        value: function removeObserver(observer) {
            var _a;
            var index = (_a = this.observers) === null || _a === void 0 ? void 0 : _a.findIndex(function (item) {
                return (item === null || item === void 0 ? void 0 : item.id) === (observer === null || observer === void 0 ? void 0 : observer.id);
            });
            if (index !== -1) {
                this.observers.splice(index, 1);
            }
        }
    }, {
        key: "notifyObservers",
        value: function notifyObservers() {
            var _this = this;

            this.observers.forEach(function (observer) {
                observer.update(_this);
            });
        }
    }, {
        key: "getTime",
        value: function getTime() {
            return this.time;
        }
    }, {
        key: "setTime",
        value: function setTime() {
            var hours = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var minutes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var seconds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            var newDate = this.time;
            newDate.setSeconds(newDate.getSeconds() + seconds);
            newDate.setMinutes(newDate.getMinutes() + minutes);
            newDate.setHours(newDate.getHours() + hours);
            this.notifyObservers();
        }
    }]);

    return Sun;
}();

exports.Sun = Sun;
},{"../util":5}],3:[function(require,module,exports) {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
exports.Garden = void 0;
var configs_1 = require("../configs");
var util_1 = require("../util");
var Bird_1 = require("./Bird");
var Flower_1 = require("./Flower");
var Sun_1 = require("./Sun");

var Garden = function () {
    function Garden() {
        var birds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : configs_1.GARDEN_SETTING.birds;
        var flowers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : configs_1.GARDEN_SETTING.flowers;

        _classCallCheck(this, Garden);

        this.sun = new Sun_1.Sun();
        this.birds = this.generateBirds(birds);
        this.flowers = this.generateFlowers(flowers);
    }

    _createClass(Garden, [{
        key: "generateFlowers",
        value: function generateFlowers(amount) {
            var flowers = [];
            for (var index = 0; index < amount; index++) {
                var instance = new Flower_1.Flower(this.sun);
                flowers.push(instance);
                this.sun.addObserver(instance);
            }
            return flowers;
        }
    }, {
        key: "generateBirds",
        value: function generateBirds(amount) {
            var birds = [];
            for (var index = 0; index < amount; index++) {
                var instance = new Bird_1.Bird(this.sun, this);
                birds.push(instance);
                this.sun.addObserver(instance);
            }
            return birds;
        }
    }, {
        key: "createFlower",
        value: function createFlower() {
            var instance = new Flower_1.Flower(this.sun);
            this.flowers.push(instance);
            this.sun.addObserver(instance);
        }
    }, {
        key: "getRandomBloomingFlower",
        value: function getRandomBloomingFlower(bird) {
            var listFlowers = this.flowers.filter(function (flower) {
                return flower.birdSuckedNectar.indexOf(bird.id) === -1 && flower.isBlooming;
            });
            var randomIndex = (0, util_1.getRandomIntInclusive)(0, (listFlowers === null || listFlowers === void 0 ? void 0 : listFlowers.length) - 1);
            return listFlowers ? listFlowers[randomIndex] : null;
        }
    }, {
        key: "logObjects",
        value: function logObjects() {
            var _a, _b, _c, _d;
            var currentTime = (0, util_1.formatDateTime)(this.sun.getTime(), '[hh:mm:ss]');
            var sleptBirds = (_a = this.birds.filter(function (bird) {
                return bird.isSleep;
            })) === null || _a === void 0 ? void 0 : _a.length;
            var wakedBirds = (_b = this.birds.filter(function (bird) {
                return bird.isWake;
            })) === null || _b === void 0 ? void 0 : _b.length;
            var bloomingFlowers = (_c = this.flowers.filter(function (flower) {
                return flower.isBlooming;
            })) === null || _c === void 0 ? void 0 : _c.length;
            var wiltFlowers = (_d = this.flowers.filter(function (flower) {
                return flower.isWilt;
            })) === null || _d === void 0 ? void 0 : _d.length;
            var msg = currentTime + ": \n    Bird(sleep: " + sleptBirds + ", wake: " + wakedBirds + ")\n    Flower(blooming: " + bloomingFlowers + ", wilt: " + wiltFlowers + ")";
            console.log(msg);
        }
    }, {
        key: "start",
        value: function start() {
            var _this = this;

            this.sunInterval = setInterval(function () {
                // Simulate one second in realtime equal 20 minutes in garden
                _this.sun.setTime(0, 10, 0);
                _this.logObjects();
            }, 1000);
        }
    }, {
        key: "stop",
        value: function stop() {
            clearInterval(this.sunInterval);
        }
    }]);

    return Garden;
}();

exports.Garden = Garden;
},{"../configs":4,"../util":5,"./Bird":8,"./Flower":7,"./Sun":6}],2:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Garden_1 = require("./types/Garden");
var garden = new Garden_1.Garden();
garden.start();
},{"./types/Garden":3}],28:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '63643' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[28,2])
//# sourceMappingURL=/dist/e88fad86ba5544d6f2a79f8c46a88347.map