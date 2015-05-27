/// <reference path="knockout-1.3.0beta.debug.js" />
/// <reference path="jquery-1.6.2.js" />

ko.bindingHandlers.executeOnEnter = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor();
        $(element).keypress(function (event) {
            if (event.which === 13) {
                value.call(viewModel);
                return false;
            }
            return true;
        });
    }
};