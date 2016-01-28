/// <reference path="../typings/tsd.d.ts" />

import ko = require('knockout');
import Smart = require('Smart');


var _textBindingUpdate = ko.bindingHandlers['text'].update;

ko.bindingHandlers['text'].update = (element, valueAccessor, allBindingsAccessor) => {
    if (allBindingsAccessor && allBindingsAccessor().format) {
        var va = valueAccessor;
        valueAccessor = () => {
            var value = ko.utils.unwrapObservable(va());
            return Smart.format(allBindingsAccessor().format, [value]);
        };
    }
    _textBindingUpdate(element, valueAccessor);
};
