/// <reference path="../typings/tsd.d.ts" />
/// <amd-dependency path="bootstrap" />

import ko = require('knockout');
import $ = require('jquery');

ko.bindingHandlers['dropdown'] = {
    update: (element, valueAccessor, allBindings) => {
        var value = valueAccessor();
        var valueUnwrapped = ko.unwrap(value);

        if (valueUnwrapped)
            $(element).dropdown();
    }
};