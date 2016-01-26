/// <reference path="../typings/tsd.d.ts" />
if (typeof (Smart) !== 'undefined' && Smart.format) {
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
