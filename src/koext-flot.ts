/// <reference path="../typings/tsd.d.ts" />
/// <amd-dependency path="jquery.flot" />

import ko = require('knockout');
import $ = require('jquery');

ko.bindingHandlers['flot'] = {
    init: (element, valueAccessor, allBindingsAccessor, viewModel, context) => {
        var data = ko.utils.unwrapObservable(valueAccessor());
        var options = allBindingsAccessor.get('flotOptions') || {};

        $.plot($(element), data, options);
    },
    update: (element, valueAccessor, allBindingsAccessor, viewModel, context) => {
        var data = ko.utils.unwrapObservable(valueAccessor());
        var $el = $(element);

        var options = allBindingsAccessor.get('flotOptions') || {};

        $.plot($(element), data, options);
    }
};