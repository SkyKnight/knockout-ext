/// <reference path="../typings/tsd.d.ts" />
/// <amd-dependency path="breeze" />

import ko = require('knockout');

// https://groups.google.com/forum/#!topic/durandaljs/EBKWsilMKfM
ko.bindingHandlers['validatedField'] = {
    init: (element, valueAccessor, allBindings, viewModel, bindingContext) => {
        var entity = <breeze.Entity>bindingContext.$data;
        var propertyName = ko.unwrap(valueAccessor());

        var validationErrors = ko.observableArray([]);
        entity.entityAspect.validationErrorsChanged.subscribe(changes => {
            var newPropertyErrors = ko.utils.arrayFilter(changes.added, e => e.propertyName == propertyName);
            var removedPropertyErrors = ko.utils.arrayFilter(changes.removed, e => e.propertyName == propertyName);
            ko.utils.arrayForEach(newPropertyErrors, e => { validationErrors([]); validationErrors.push(e); });
            ko.utils.arrayForEach(removedPropertyErrors, e => validationErrors.remove(e));
        });
        validationErrors.subscribe(changes => {
            if (changes.length > 0) {
                //Add Validation Errors
                var formGroup = $(element).closest('.form-group');

                formGroup.removeClass('has-success')
                    .addClass('has-error');
                var child = formGroup.find('.validationError');
                child.remove();
                var helpText = $('<span>');
                helpText.addClass('help-block validationError');
                helpText.html(changes[0].errorMessage);
                //formGroup.append(helpText);
                $(element).append(helpText);
            }
            else {
                //Remove validation errors
                var formGroup = $(element).closest('.form-group');

                formGroup.removeClass('has-error')
                    .addClass('has-success');
                var child = formGroup.find('.validationError');
                child.remove();
            }
        });
    }
};