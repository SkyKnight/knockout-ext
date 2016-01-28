/// <reference path="../typings/tsd.d.ts" />
/// <amd-dependency path="fuelux.spinner" />

import ko = require('knockout');
import $ = require('jquery');

ko.bindingHandlers['spinner'] = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, context) {
        var value = valueAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(value);
        var options = allBindingsAccessor.get('spinnerOptions') || {};
        options = ko.isObservable(options) ? options() : options;
        options.value = valueUnwrapped;

        var input = $(element).closest('.input-group');

        input.spinner(options);
        input.on('changed', function(e, v) {
            var observable = valueAccessor();
            observable(v);
        });
    },
    update: function(element, valueAccessor, allBindingsAccessor, viewModel, context) {
        var value = valueAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(value);
        var input = $(element).closest('.input-group');

        input.spinner('value', valueUnwrapped);

    }
};
