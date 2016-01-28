/// <reference path="../typings/tsd.d.ts" />
/// <amd-dependency path="bootstrap" />
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "bootstrap", 'knockout', 'jquery'], factory);
    }
})(function (require, exports) {
    var ko = require('knockout');
    var $ = require('jquery');
    ko.bindingHandlers['dropdown'] = {
        update: function (element, valueAccessor, allBindings) {
            var value = valueAccessor();
            var valueUnwrapped = ko.unwrap(value);
            if (valueUnwrapped)
                $(element).dropdown();
        }
    };
});
