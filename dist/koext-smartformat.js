/// <reference path="../typings/tsd.d.ts" />
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'knockout', 'Smart'], factory);
    }
})(function (require, exports) {
    var ko = require('knockout');
    var Smart = require('Smart');
    function appendBindings() {
        var _textBindingUpdate = ko.bindingHandlers['text'].update;
        ko.bindingHandlers['text'].update = function (element, valueAccessor, allBindingsAccessor) {
            if (allBindingsAccessor && allBindingsAccessor().format) {
                var va = valueAccessor;
                valueAccessor = function () {
                    var value = ko.utils.unwrapObservable(va());
                    return Smart.format(allBindingsAccessor().format, [value]);
                };
            }
            _textBindingUpdate(element, valueAccessor);
        };
    }
    exports.appendBindings = appendBindings;
});
