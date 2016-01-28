/// <reference path="../typings/tsd.d.ts" />

import ko = require('knockout');
import utils = require('koext-utils');
import $ = require('jquery');

ko.bindingHandlers['slideVisible'] = {
    update: function(element, valueAccessor, allBindings) {
        // First get the latest data that we're bound to
        var value = valueAccessor();

        // Next, whether or not the supplied model property is observable, get its current value
        var valueUnwrapped = ko.unwrap(value);

        // Grab some more data from another binding property
        var duration = allBindings.get('slideDuration') || 400; // 400ms is default duration unless otherwise specified

        // Now manipulate the DOM element
        if (valueUnwrapped == true)
            $(element).slideDown(duration); // Make the element visible
        else
            $(element).slideUp(duration);   // Make the element invisible
    }
};

ko.bindingHandlers['setFocus'] = {
    init: function(element) {
        setTimeout(function() { $(element).focus(); }, 1);
    },
    update: function() {

    }
};

ko.bindingHandlers['avatar'] = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, context) {
        var value = valueAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(value);

        $(element).attr('src', 'http://www.gravatar.com/avatar/' + utils.md5(valueUnwrapped) + '?s=39&d=identicon');
    },
    update: function(element, valueAccessor, allBindingsAccessor, viewModel, context) {
        var value = valueAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(value);

        $(element).attr('src', 'http://www.gravatar.com/avatar/' + utils.md5(valueUnwrapped) + '?s=39&d=identicon');
    }
};