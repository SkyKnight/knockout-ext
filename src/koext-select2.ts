/// <reference path="../typings/tsd.d.ts" />
/// <amd-dependency path="jquery.select2" />

import ko = require('knockout');
import $ = require('jquery');

ko.bindingHandlers['select2'] = {
    init: (element, valueAccessor, allBindingsAccessor) => {
        var obj = valueAccessor(),
            allBindings = allBindingsAccessor(),
            lookupKey = allBindings.lookupKey;
        $(element).select2(obj);
        if (lookupKey) {
            var value = ko.utils.unwrapObservable(allBindings.value);
            $(element).select2('data', ko.utils.arrayFirst(obj.data.results, item => item[lookupKey] === value));
        }

        ko.utils.domNodeDisposal.addDisposeCallback(element, () => $(element).select2('destroy'));
    },
    update: element => $(element).trigger('change')
};

var update = element => {
    var el = $(element);
    if (el.data('select2')) {
        el.trigger('change');
    }
}

var extendSelect2Options = observable => {
    if (typeof (observable.arrayToSelect2) === 'undefined')
        return observable.extend({ arrayToSelect2: true });
    return observable;
}

var updateOptions = ko.bindingHandlers['options']['update'];
ko.bindingHandlers['options']['update'] = function(element, valueAccessor, allBindings, viewModel, bindingContext) {
    var r = null;
    if ($(element).data('select2')) {
        var v = valueAccessor();
        r = updateOptions.apply(null, [element, () => typeof (v) == 'function' ? extendSelect2Options(v) : v, allBindings, viewModel, bindingContext]);
    } else
        r = updateOptions.apply(null, arguments);
    update(element);
    return r;
};
var updateSelectedOptions = ko.bindingHandlers['selectedOptions']['update'];
ko.bindingHandlers['selectedOptions']['update'] = function(element) {
    var r = updateSelectedOptions.apply(null, arguments);
    update(element);
    return r;
};

var updateValue = ko.bindingHandlers['value']['update'];
ko.bindingHandlers['value']['update'] = function(element) {
    var r = updateValue.apply(null, arguments);
    update(element);
    return r;
}

ko.bindingHandlers['readonly'] = {
    'update': function(element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());

        // select2
        if (typeof (element.type) !== 'undefined' && element.type == 'select-one')
            $(element).select2("readonly", value);
        else {
            var attrName = 'readonly';

            if (typeof (element.type) !== 'undefined' && element.type == 'radio')
                attrName = 'disabled';

            if (value)
                element.setAttribute(attrName, true);
            else
                element.removeAttribute(attrName);
        }
    }
};

ko.extenders['arrayToSelect2'] = function(target, option) {
    target.arrayToSelect2 = ko.computed({
        read: function() {
            var a = this();
            a.unshift({});
            return a;
        },
        owner: target
    });
    return target;
}
