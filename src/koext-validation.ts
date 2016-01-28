/// <reference path="../typings/tsd.d.ts" />
/// <amd-dependency path="knockout.validation" />

import ko = require('knockout');

// alternative binding for ko validation
ko.bindingHandlers['validationElementAlt'] = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var validationMessageElement = ko.validation.insertValidationMessage(element);
        ko.applyBindingsToNode(validationMessageElement, { validationMessage: valueAccessor() });
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var obsv = valueAccessor(),
            val = ko.utils.unwrapObservable(obsv),
            msg = null,
            isModified = false,
            isValid = false;

        obsv.extend({ validatable: true });

        isModified = obsv.isModified();
        isValid = obsv.isValid();

        // create an evaluator function that will return something like:
        // css: { validationElement: true }
        var cssSettingsAccessor = function() {
            var css = {};

            var shouldShow = (isModified ? !isValid : false);

            // css: { validationElement: false }
            css['has-error'] = shouldShow;

            return css;
        };

        //add or remove class on the element;
        ko.bindingHandlers.css.update($(element).closest('.form-group')[0], cssSettingsAccessor);
    }
};

ko.validation.rules['dateInRange'] = {
    validator: function(val, range) {
        if (typeof (range.min) == 'undefined' || typeof (range.max) == 'undefined')
            return true; // no range, man!

        if (typeof (range.canNull) !== 'undefined' && range.canNull && (typeof (val) == 'undefined' || val == null))
            return true;
        return moment(val) > moment(range.min) && moment(val) < moment(range.max);
    },
    message: 'Podana data nie mieści się w przedziale.' // TODO: sensowniej opisac
};

ko.validation.rules['notEmptyArray'] = {
    validator: function(val) {
        return val instanceof Array && val != null && val.length > 0;
    },
    message: 'Musi być zawarty co najmniej jeden element.' // TODO: tez do przeredagowania
};

ko.validation.registerExtenders();
