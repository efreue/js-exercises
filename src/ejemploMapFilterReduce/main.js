var people = [
    {
        'dni': '26443234',
        'name': 'Juan Alban',
        'sexo': 'M',
        'edad': 30,
        'domicilio': 'manzanares 343',
        'barrio': 'belgrano'        
    },
    {
        'dni': '25323678',
        'name': 'Jose Perez',
        'sexo': 'M',
        'edad': 41,
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

var namesPeople = people.map(
    function(people){
        return people.name;
    }
);

function showExample() {
    var divNames = document.getElementById("listNames");
    
    namesPeople.forEach(
        function(item, index) {
            divNames.innerHTML += "index[" + index + "]: " + item + "<br>"        
        }
    )
};

window.addEventListener('load', showExample);