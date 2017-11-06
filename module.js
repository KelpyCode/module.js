/*
  module.js made by Xaotic https://anti.team/
  License: GNU GENERAL PUBLIC LICENSE
  https://github.com/XaoticLabs/module.js
*/
var _typeof="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"===typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a};function _toConsumableArray(a){if(Array.isArray(a)){for(var e=0,c=Array(a.length);e<a.length;e++)c[e]=a[e];return c}return Array.from(a)}
!function(a){function e(b){if("undefined"!==typeof c._config.paths&&c._config.paths)return new Promise(function(a,c){var d=new XMLHttpRequest;d.onreadystatechange=function(){4===d.readyState&&(200===d.status?a({loc:b,code:d.responseText}):c({loc:b,code:null}))};d.open("GET",b,!0);d.send(null)})}var c=function(b,a){function f(a){return function(c){if("function"!==typeof c)throw Error("Module expected to be a function, not a "+("undefined"===typeof c?"undefined":_typeof(c)));b[a]=c}}b&&"undefined"!==
typeof b||(b=[]);"string"===typeof b&&(b=[b]);var d=b.map(function(a){if(0<a.length&&"@"===a[0])for(var b in c._config.paths)a=a.replace("@"+b+":",c._config.paths[b]+"/");b=a;/(?:\.([^.]+))?$/.exec(b)[0]||(b+=".js");return e(b)});b={};Promise.all(d).then(function(c){c.forEach(function(a){(new Function(["define","_file"],a.code))(f(a.loc),a.loc)});retVals=[];for(var d in b)retVals.push(b[d]());"function"===typeof a&&a.apply(void 0,_toConsumableArray(retVals))})};c._config={};c.config=function(a){c._config=
    a};a.Module=Object.seal(c)}(void 0);