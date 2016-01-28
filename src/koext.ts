/// <reference path="../typings/tsd.d.ts" />

import ko = require('knockout');

// https://github.com/knockout/knockout/pull/320
ko.subscribable.fn['subscribeChanged'] = (callback) => {
    var previousValue;
    this.subscribe(_previousValue => previousValue = _previousValue, undefined, 'beforeChange');
    this.subscribe(latestValue =>callback(latestValue, previousValue));
};

// @TODO: type converters as ko extenders
// eg: var q = ko.observable('1').extend({'toNumber': true})
// <span data-bind="someBinding: q.asNumber"></span>

// idea based on http://stackoverflow.com/questions/14631314/best-approach-for-value-conversion-in-knockoutjs

// ko.extenders.booleanToString = function (target, option) {
//     target.booleanToString = ko.computed({
//         read: function () {
//             return this() != null && typeof (this() != 'undefined') ? this().toString() : '';
//         },
//         write: function (value) {
//             this(value.toLowerCase() == 'true');
//         },
//         owner: target
//     });
//     return target;
// }