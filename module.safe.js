/*
  module.js made by Xaotic https://anti.team/
  License: GNU GENERAL PUBLIC LICENSE
  https://github.com/XaoticLabs/module.js
*/
"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
!function (global) {
    function checkExtension(path) {
        var res = /(?:\.([^.]+))?$/.exec(path)[0];
        if (!res) path += ".js";
        return path;
    }

    function checkShortcut(path) {
        if (path.length > 0 && path[0] === "@") {
            for (var s in Module._config.paths) {
                path = path.replace("@" + s + ":", Module._config.paths[s] + "/");
            }
        }
        return path;
    }

    function loadModuleFile(url) {
        if (typeof Module._config.paths !== "undefined" && Module._config.paths) return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if (req.readyState === 4) {
                    if (req.status === 200) resolve({ loc: url, code: req.responseText });else reject({ loc: url, code: null });
                }
            };
            req.open("GET", url, true); // true for asynchronous
            req.send(null);
        });
    }

    var Module = function require(modules, then) {
        if (!modules || typeof modules === "undefined") modules = [];
        if (typeof modules === "string") modules = [modules];
        var p = modules.map(function (m) {
            m = checkExtension(checkShortcut(m));
            return loadModuleFile(m);
        });

        var modules = {};

        function define(id) {
            return function (module) {
                if (typeof module !== "function") throw new Error("Module expected to be a function, not a " + (typeof module === "undefined" ? "undefined" : _typeof(module)));
                modules[id] = module;
            };
        }

        Promise.all(p).then(function (result) {
            result.forEach(function (res) {
                var func = new Function(["define", "_file"], res.code)(define(res.loc), res.loc);
            });
            retVals = [];
            for (var i in modules) {
                retVals.push(modules[i]());
            }
            if (typeof then === "function") then.apply(undefined, _toConsumableArray(retVals));
        });
    };

    Module._config = {};

    Module.config = function setConfig(conf) {
        Module._config = conf;
    };

    global.Module = Object.seal(Module);
}(undefined);