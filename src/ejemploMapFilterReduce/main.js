var people = [
    {
        'dni': '26443234',
        'name': 'Juan Alban',
        'sexo': 'M',
        'edad': 13,
        'domicilio': 'manzanares 343',
        'barrio': 'belgrano'        
    },
    {
        'dni': '25323678',
        'name': 'Jose Perez',
        'sexo': 'M',
        'edad': 15,
        'domicilio': 'junin 323',
        'barrio': 'balvanera'
    },
    {
        'dni': '28245125',
        'name': 'Maria Solana',
        'sexo': 'F',
        'edad': 32,
        'domicilio': 'Las Heras 2934',
        'barrio': 'Palermo'
    },
    {
        'dni': '29387543',
        'name': 'Mariela Andrada',
        'sexo': 'F',
        'edad': 33,
        'domicilio': 'Ibera 2500',
        'barrio': 'Nuñez'
    }
];

var personJSON = JSON.stringify(people);

var namesPeople = people.map(
    function(people){
        return people.name;
    }
);

var peopleLess18 = people.filter(
    function(people) {
        return people.edad <= 18;
    }
);  


var showExample = function() {
    var divJSON = document.getElementById("listJSON");
    var divPersonsAll = document.getElementById("listPersonsAll");
    var divNames = document.getElementById("listNames");
    var divPersonsLess18 = document.getElementById("listPersonsLess18");
    
    divJSON.innerHTML = personJSON;

    people.forEach(
        function(item) {
            divPersonsAll.innerHTML +=  'DNI:  ' + item.dni + '<BR>' + 
                                        'NAME: ' + item.name +'<BR>' +
                                        'EDAD: ' + item.edad +'<BR>' + 
                                        'SEXO: ' + item.sexo +'<BR>' +
                                        'DOMICILIO: ' + item.domicilio +'<BR>' + 
                                        'BARRIO: ' + item.barrio +'<BR>' +
                                        '*************************************<BR>';  
        }
    );
    
    namesPeople.forEach(
        function(item, index) {
            divNames.innerHTML += "index[" + index + "]: " + item + "<br>"        
        }
    );
    
    peopleLess18.forEach(
        function(item, index) {
            divPersonsLess18.innerHTML += item.name + "( edad: " + item.edad + ") " + "<br>";
        }
    );
};

window.addEventListener('load', showExample);