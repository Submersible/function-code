/*jslint node: true, nomen: true, vars: true */

'use strict';

var dedent = require('dedent');

function code(fn) {
    var args = JSON.stringify(Array.prototype.slice.call(arguments, 1)).slice(1, -1);
    return '(' + dedent(fn.toString()) + '(' + args + '))';
}

Function.prototype.toCode = function () {
    return code.apply(null, [this].concat(Array.prototype.slice.call(arguments, 0)));
};

function inline(fn) {
    var code = fn.toString();
    return dedent(code.slice(code.indexOf('{') + 1, -1)).trim();
}

Function.prototype.toInline = function () {
    return inline(this);
};

module.exports = code;
module.exports.code = code;
module.exports.inline = inline;
