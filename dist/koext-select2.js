/// <reference path="../typings/tsd.d.ts" />
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'knockout', 'jquery'], factory);
    }
})(function (require, exports) {
    var ko = require('knockout');
    var $ = require('jquery');
    function appendBindings() {
        ko.bindingHandlers['select2'] = {
            init: function (element, valueAccessor, allBindingsAccessor) {
                var obj = valueAccessor(), allBindings = allBindingsAccessor(), lookupKey = allBindings.lookupKey;
                $(element).select2(obj);
                if (lookupKey) {
                    var value = ko.utils.unwrapObservable(allBindings.value);
                    $(element).select2('data', ko.utils.arrayFirst(obj.data.results, function (item) { return item[lookupKey] === value; }));
                }
                ko.utils.domNodeDisposal.addDisposeCallback(element, function () { return $(element).select2('destroy'); });
            },
            update: function (element) { return $(element).trigger('change'); }
        };
        var update = function (element) {
            var el = $(element);
            if (el.data('select2')) {
                el.trigger('change');
            }
        };
        var extendSelect2Options = function (observable) {
            if (typeof (observable.arrayToSelect2) === 'undefined')
                return observable.extend({ arrayToSelect2: true });
            return observable;
        };
        var updateOptions = ko.bindingHandlers['options']['update'];
        ko.bindingHandlers['options']['update'] = function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var r = null;
            if ($(element).data('select2')) {
                var v = valueAccessor();
                r = updateOptions.apply(null, [element, function () { return typeof (v) == 'function' ? extendSelect2Options(v) : v; }, allBindings, viewModel, bindingContext]);
            }
            else
                r = updateOptions.apply(null, arguments);
            update(element);
            return r;
        };
        var updateSelectedOptions = ko.bindingHandlers['selectedOptions']['update'];
        ko.bindingHandlers['selectedOptions']['update'] = function (element) {
            var r = updateSelectedOptions.apply(null, arguments);
            update(element);
            return r;
        };
        var updateValue = ko.bindingHandlers['value']['update'];
        ko.bindingHandlers['value']['update'] = function (element) {
            var r = updateValue.apply(null, arguments);
            update(element);
            return r;
        };
    }
    exports.appendBindings = appendBindings;
});
