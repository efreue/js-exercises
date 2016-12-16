var ViewModelFullName = function(first, last) {
    this.firstName = ko.observable(first);
    this.lastName = ko.observable(last);

    this.fullName = ko.computed(function() {
        return this.firstName() + " " + this.lastName();
    }, this);
};
ko.applyBindings(new ViewModelFullName("Emiliano", "Freue"));

var viewModelTable = {
    stringValue : ko.observable("Hello"),
    passwordValue : ko.observable("mypass"),
    booleanValue : ko.observable(true),
    optionValues : ["Alpha", "Beta", "Gamma"],
    selectedOptionValue : ko.observable("Gamma"),
    multipleSelectedOptionValues : ko.observable(["Alpha"]),
    radioSelectedOptionValue : ko.observable("Beta")
};
ko.applyBindings(viewModelTable);


