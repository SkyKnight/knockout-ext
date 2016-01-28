/// <reference path="../typings/tsd.d.ts" />
/// <amd-dependency path="bootstrap-daterangepicker" />

import ko = require('knockout');
import utils = require('koext-utils');
import $ = require('jquery');

ko.bindingHandlers['daterangepicker'] = {
    init: (element, valueAccessor, allBindingsAccessor) => {
        var options = allBindingsAccessor().daterangepickerOptions || {},
            $el = $(element);

        $el.daterangepicker(options, (start, end) => {
            var observable = valueAccessor();
            observable({ start: new Date(start), end: new Date(end) });
        });

        $el.on('cancel', () => {
            $el.val('');
            var observable = valueAccessor();
            observable({ start: null, end: null });
        });

        //handle disposal (if KO removes by the template binding)
        ko.utils.domNodeDisposal.addDisposeCallback(element, () => $el.daterangepicker("remove"));

    },
    update: (element, valueAccessor) => {
        var value = ko.utils.unwrapObservable(valueAccessor()),
            $el = $(element);

        if (typeof (value.start) !== 'undefined')
            $el.data('daterangepicker').setStartDate(utils.tryFixDate(value.start));

        if (typeof (value.end) !== 'undefined')
            $el.data('daterangepicker').setEndDate(utils.tryFixDate(value.end));

        if ((typeof (value.start) == 'undefined' || value.start == null) && (typeof (value.end) == 'undefined' || value.end == null))
            $el.val('');
    }
};