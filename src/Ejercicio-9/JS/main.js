//TEMPLATE PERSONS
var source = document.getElementById("personsTemplate").innerHTML;
var template = Handlebars.compile(source);

var data = {persons: [
    {firstName: "Miguel", lastName: "Rojas", email: "mrojas@gmail.com"},
    {firstName: "Juan", lastName: "Perez", email: "jperez@yahoo.com.ar"}
]};

var output = template(data);
document.getElementById("personList").innerHTML += output;
