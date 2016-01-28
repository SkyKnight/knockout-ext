/// <reference path="../typings/tsd.d.ts" />

import ko = require('knockout');
import $ = require('jquery');

var __loadSvgFromUrl = function(elementId, url, options) {
    $.ajax({ url: url, dataType: "text" }).then(function(data) {
        var draw = SVG(elementId);
        draw.absorb(data);

        if (options.height)
            $('#' + elementId + ' > svg').height(options.height);//.width(options.width);

        if (options.zoom)
            setTimeout(function() {
                var panZoom = svgPanZoom('#' + elementId + ' svg', { center: false });
            }, 1000);

        if (options.loaded)
            options.loaded($('#' + elementId + ' > svg'), draw);
    });
}

ko.bindingHandlers['svgUrl'] = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, context) {
        var elementId = Metronic.getUniqueID();
        $(element).attr('id', elementId);
    },
    update: function(element, valueAccessor, allBindingsAccessor, viewModel, context) {
        $('svg', element).remove();
        var value = valueAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(value);
        if (valueUnwrapped == null || valueUnwrapped == '')
            return;
        var options = allBindingsAccessor.get('svgOptions') || {};
        options = ko.isObservable(options) ? options() : options;
        __loadSvgFromUrl($(element).attr('id'), valueUnwrapped, options);
    }
}