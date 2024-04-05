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

var Sun = /** @class */function () {
    function Sun() {
        this.observers = [];
        this.time = 6;
    }
    Sun.prototype.addObserver = function (observer) {
        this.observers.push(observer);
    };
    Sun.prototype.removeObserver = function (observer) {
        var index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    };
    Sun.prototype.notifyObservers = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(this);
        }
    };
    Sun.prototype.getTime = function () {
        return this.time;
    };
    Sun.prototype.setTime = function (time) {
        this.time = time;
        this.notifyObservers();
    };
    return Sun;
}();
var Bird = /** @class */function () {
    function Bird(name) {
        this.isAwake = false;
        this.name = name;
    }
    Bird.prototype.update = function (subject) {
        var time = subject.getTime();
        if (time >= 5 && time <= 18) {
            this.isAwake = true;
            console.log("Bird " + this.name + " is awake.");
        } else {
            this.isAwake = false;
            console.log("Bird " + this.name + " is sleeping.");
        }
    };
    return Bird;
}();
var Flower = /** @class */function () {
    function Flower(color, bloomingHour, wiltHour) {
        this.color = color;
        this.bloomingHour = bloomingHour;
        this.wiltHour = wiltHour;
    }
    Flower.prototype.update = function (subject) {
        var time = subject.getTime();
        if (time === this.bloomingHour) {
            console.log("Flower with color " + this.color + " is blooming.");
        } else if (time === this.wiltHour) {
            console.log("Flower with color " + this.color + " is wilting.");
        }
    };
    return Flower;
}();
var Garden = /** @class */function () {
    function Garden() {
        this.birds = [];
        this.flowers = [];
        this.sun = new Sun();
    }
    Garden.prototype.addBird = function (bird) {
        this.sun.addObserver(bird);
        this.birds.push(bird);
    };
    Garden.prototype.addFlower = function (flower) {
        this.sun.addObserver(flower);
        this.flowers.push(flower);
    };
    Garden.prototype.simulateDay = function () {
        for (var hour = 6; hour <= 18; hour++) {
            this.sun.setTime(hour);
            // Simulate bird visiting flowers
            if (hour >= 6 && hour <= 17) {
                var randomIndex = Math.floor(Math.random() * this.flowers.length);
                var flower = this.flowers[randomIndex];
                console.log("Birds are visiting flower with color " + flower.color + ".");
            }
        }
    };
    return Garden;
}();
// Example usage
var garden = new Garden();
var bird1 = new Bird("A");
var bird2 = new Bird("B");
garden.addBird(bird1);
garden.addBird(bird2);
var flower1 = new Flower("red", Math.floor(Math.random() * 3), Math.floor(Math.random() * 3));
var flower2 = new Flower("green", Math.floor(Math.random() * 3), Math.floor(Math.random() * 3));
garden.addFlower(flower1);
garden.addFlower(flower2);
garden.simulateDay();
},{}],20:[function(require,module,exports) {

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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '57961' + '/');
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
},{}]},{},[20,4])
//# sourceMappingURL=/dist/e88fad86ba5544d6f2a79f8c46a88347.map