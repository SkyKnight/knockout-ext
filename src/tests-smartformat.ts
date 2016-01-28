/// <reference path="../typings/tsd.d.ts" />
/// <amd-dependency path="koext-smartformat" />

import ko = require('knockout');

describe('Knockout bindings test suite.', () => {
    it('Text binding with format support - basic format.', () => {
          var mockElement = document.createElement('p');
          var mockValueAccessor = () => ko.observable('some value');
          var allBindings = { format: 'In this place should appear {0}.' }
          var mockAllBidingsAccessor = () => allBindings;
          mockAllBidingsAccessor['has'] = key => allBindings[key];
          mockAllBidingsAccessor['get'] = key => allBindings[key];
          
          ko.bindingHandlers['text'].update(mockElement, mockValueAccessor, <any>mockAllBidingsAccessor);
          var mockElementContent = mockElement.textContent;
          expect(mockElementContent).toBe('In this place should appear some value.');
    });
});