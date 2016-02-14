/// <reference path="../typings/tsd.d.ts" />
/// <amd-dependency path="bootstrap-datepicker" />

import ko = require('knockout');
import utils = require('koext-utils');
import $ = require('jquery');

// http://stackoverflow.com/questions/6612705/jquery-ui-datepicker-change-event-not-caught-by-knockoutjs
ko.bindingHandlers['datepicker'] = {
    init: (element, valueAccessor, allBindingsAccessor) => {
        //initialize datepicker with some optional options
        var options = allBindingsAccessor().datepickerOptions || {},
            $el = $(element);

        $el.datepicker(options);

        //handle the field changing
        ko.utils.registerEventHandler(element, "change", () => {
            var observable = valueAccessor();
            observable($el.val() == '' || $el.val() == null ? null : $el.datepicker("getDate"));
        });

        ko.utils.registerEventHandler(element, "clearDate", () => {
            var observable = valueAccessor();
            observable(null);
        });

        //handle disposal (if KO removes by the template binding)
        ko.utils.domNodeDisposal.addDisposeCallback(element, () => $el.datepicker("destroy"));

    },
    update: (element, valueAccessor) => {
        var value = ko.utils.unwrapObservable(valueAccessor()),
            $el = $(element);

        value = utils.tryFixDate(value);

        var current = $el.datepicker("getDate");

        if (typeof (value) == 'undefined' || value == null || value == '') {
            $el.val('').change();
        }

        if (typeof (value) !== 'undefined' && value != null && value - current !== 0) {
            $el.datepicker("setDate", value);
        }

    }
};