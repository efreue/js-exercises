var source = document.getElementById("templatePersona").innerHTML;
var template = Handlebars.compile(source);


var persona = {
    'nombre': 'Miguel',
    'apellido': 'Rojas',
    'correo': 'mrojas@gmail.com'
};

var compileHtml = Handlebars.compile(persona);
document.getElementsByClassName("container")[0].innerHTML += compileHtml;
