/// <reference path="../typings/tsd.d.ts" />

import ko = require('knockout');
import Metronic = require('metronic');

ko.bindingHandlers['metronicBlockUi'] = {
    init: function(element, valueAccessor, allBindingsAccessor) {
        var $el = $(element);

        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            Metronic.unblockUI(element, null);
        });
    },

    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var value = valueAccessor();
        var valueUnwrapped = ko.unwrap(value);

        if (valueUnwrapped)
            Metronic.blockUI(element, true);
        else {
            Metronic.unblockUI(element, null);
            Metronic.unblockUI();
        }
    }
};

ko.bindingHandlers['metronicTabs'] = {
    init: function(element, valueAccessor, allBindingsAccessor) {
        $(element).find('ul.nav-tabs a').click(function(e) {
            e.preventDefault();
            var tabId = $(this).attr('data-tab');
            $(element).find('ul.nav-tabs li.active').removeClass('active');
            $(element).find('div.tab-content > div.active').removeClass('active');

            $(this).closest('li').addClass('active');
            $(element).find('div.tab-content > div.tab-pane[data-tab=\'' + tabId + '\']').addClass('active');

            var observable = valueAccessor();
            if (typeof (observable) == 'function')
                observable(tabId);
        });

        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            $(element).off('click');
        });
    }
};