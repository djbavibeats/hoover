(function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            exports: {},
            id: moduleId,
            loaded: false
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.loaded = true;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.p = "";
    return __webpack_require__(0);
})([ function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(5);
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var ImageLoader = {
        load: function load(img, config) {
            return window.ImageLoader.load(img, config);
        }
    };
    exports.default = ImageLoader;
    module.exports = exports["default"];
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Lifecycle = {
        init: function init() {
            window.Squarespace.AFTER_BODY_LOADED = false;
            window.Squarespace.afterBodyLoad();
        },
        destroy: function destroy() {
            window.Squarespace.globalDestroy(Y);
        }
    };
    exports.default = Lifecycle;
    module.exports = exports["default"];
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var tweaksToWatch = {
        all: {
            callbacks: []
        }
    };
    var Tweak = {
        getValue: function getValue(name) {
            if (!name || typeof name !== "string") {
                console.error("squarespace-core: Invalid tweak name " + name);
                return null;
            }
            return Y.Squarespace.Template.getTweakValue(name);
        },
        watch: function watch() {
            var _arguments = arguments;
            if (arguments.length === 0) {
                console.error("squarespace-core: " + "Tweak.watch must be called with at least one parameter");
                return;
            }
            if (arguments.length === 1) {
                if (typeof arguments[0] === "function") {
                    tweaksToWatch.all.callbacks.push(arguments[0]);
                }
                return;
            }
            if (typeof arguments[0] === "string" && typeof arguments[1] === "function") {
                var tweakName = arguments[0];
                if (!tweaksToWatch[tweakName]) {
                    tweaksToWatch[tweakName] = {
                        callbacks: []
                    };
                }
                tweaksToWatch[tweakName].callbacks.push(arguments[1]);
            } else if (arguments[0].constructor === Array && typeof arguments[1] === "function") {
                arguments[0].forEach(function(tweakName) {
                    if (!tweaksToWatch[tweakName]) {
                        tweaksToWatch[tweakName] = {
                            callbacks: []
                        };
                    }
                    tweaksToWatch[tweakName].callbacks.push(_arguments[1]);
                });
            }
        }
    };
    if (window.Y.Global) {
        window.Y.Global.on("tweak:change", function(e) {
            var tweakName = e.getName();
            var callbackSignature = {
                name: tweakName,
                value: e.config && e.config.value || e.value
            };
            if (tweaksToWatch[tweakName]) {
                tweaksToWatch[tweakName].callbacks.forEach(function(callback) {
                    try {
                        callback(callbackSignature);
                    } catch (err) {
                        console.error(err);
                    }
                });
            }
            if (tweaksToWatch.all.callbacks.length > 0) {
                tweaksToWatch.all.callbacks.forEach(function(callback) {
                    try {
                        callback(callbackSignature);
                    } catch (err) {
                        console.error(err);
                    }
                });
            }
        });
    }
    exports.default = Tweak;
    module.exports = exports["default"];
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _ImageLoader = __webpack_require__(1);
    var _ImageLoader2 = _interopRequireDefault(_ImageLoader);
    var _Lifecycle = __webpack_require__(2);
    var _Lifecycle2 = _interopRequireDefault(_Lifecycle);
    var _Tweak = __webpack_require__(3);
    var _Tweak2 = _interopRequireDefault(_Tweak);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    var SQS = {
        ImageLoader: _ImageLoader2.default,
        Lifecycle: _Lifecycle2.default,
        Tweak: _Tweak2.default
    };
    exports.default = SQS;
    module.exports = exports["default"];
}, function(module, exports, __webpack_require__) {
    var core = __webpack_require__(4);
    window.addEventListener("DOMContentLoaded", function() {
        var images = document.querySelectorAll("img[data-src]");
        for (var i = 0; i < images.length; i++) {
            core.ImageLoader.load(images[i], {
                load: true
            });
        }
    });
} ]);
//# sourceMappingURL=site-bundle.js.map