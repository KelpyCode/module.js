/*
  module.js made by Xaotic https://anti.team/
  License: GNU GENERAL PUBLIC LICENSE
*/
!function (global) {
    function checkExtension(path) {
        const res = /(?:\.([^.]+))?$/.exec(path)[0];
        if (!res)
            path += ".js";
        return path;
    }

    function checkShortcut(path) {
        if (path.length > 0 && path[0] === "@") {
            for (let s in Module._config.paths) {
                path = path.replace("@" + s + ":", Module._config.paths[s] + "/");
            }
        }
        return path;
    }

    function loadModuleFile(url) {
        if (typeof Module._config.paths !== "undefined" && Module._config.paths)


            return new Promise(function (resolve, reject) {
                let req = new XMLHttpRequest();
                req.onreadystatechange = function () {
                    if (req.readyState === 4) {
                        if (req.status === 200)
                            resolve({loc: url, code: req.responseText});
                        else
                            reject({loc: url, code: null});
                    }
                };
                req.open("GET", url, true); // true for asynchronous
                req.send(null);
            });
    }

    const Module = function require(modules, then) {
        if (!modules || typeof modules === "undefined")
            modules = [];
        if (typeof modules === "string")
            modules = [modules];
        let p = modules.map(m => {
            m = checkExtension(checkShortcut(m));
            return loadModuleFile(m);
        });

        let modules = {};

        function define(id) {
            return function (module) {
                if (typeof module !== "function")
                    throw new Error("Module expected to be a function, not a " + typeof module);
                modules[id] = module;
            }
        }

        Promise.all(p).then(result => {
            result.forEach(res => {
                let func = new Function(["define", "_file"], res.code)(define(res.loc), res.loc);
            });
            retVals = [];
            for (let i in modules) {
                retVals.push(modules[i]());
            }
            if (typeof then === "function")
                then(...retVals);
        });
    };

    Module._config = {};

    Module.config = function setConfig(conf) {
        Module._config = conf;
    };

    global.Module = Object.seal(Module)
}(this);
