//TEMPLATE PERSONS
var generateTemplate = function() {
    var source = document.getElementById("personsTemplate").innerHTML;
    var template = Handlebars.compile(source);
    var data = {persons: [
        {firstName: "Miguel", lastName: "Rojas", email: "mrojas@gmail.com"},
        {firstName: "Juan", lastName: "Perez", email: "jperez@yahoo.com.ar"}
    ]};
    var output = template(data);
    document.getElementById("personList").innerHTML += output;
};
//Se utiliza el evento DOMContentLoaded para esperar a que se cargue el html antes de hacer referencia a los mismos
if (document.addEventListener) {
    document.addEventListener( "DOMContentLoaded", function(){
         generateTemplate();
    }, false );
} else if ( document.attachEvent ) { // IE
    document.attachEvent("onreadystatechange", function(){
        if ( document.readyState === "complete" ) {
            generateTemplate();
        }
    });
}

