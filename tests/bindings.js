/// <reference path="../typings/tsd.d.ts" />
describe('Knockout bindings test suite.', function () {
    it('Text binding with format support - basic format.', function () {
        var mockElement = document.createElement('p');
        var mockValueAccessor = function () { return ko.observable('some value'); };
        var allBindings = { format: 'In this place should appear {0}.' };
        var mockAllBidingsAccessor = function () { return allBindings; };
        mockAllBidingsAccessor['has'] = function (key) { return allBindings[key]; };
        mockAllBidingsAccessor['get'] = function (key) { return allBindings[key]; };
        ko.bindingHandlers['text'].update(mockElement, mockValueAccessor, mockAllBidingsAccessor);
        var mockElementContent = mockElement.textContent;
        expect(mockElementContent).toBe('In this place should appear some value.');
    });
});
