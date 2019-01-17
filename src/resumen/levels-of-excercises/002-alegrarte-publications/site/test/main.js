const Css = {
    add(node, className) {
        node.className += ` ${className}`;
    }
};

const ContainerChild2 = {
    changeVisibility(visibility) {
        const divChild2 = document.getElementById("child2");
        if (visibility == 0) {
            Css.add(divChild2, 'hidden');
        } else {
            divChild2.classList.remove('hidden');            
        }
    }
}

const App = {
    inicialize() {
        const levelHead = new Vue({
            el: '#level-head',
            data: {
                logoHeader: 'alegrarte.png',
                nameCompany: 'Alegrarte'
            }
        }); 

        const levelContainer = new Vue({
            el: '#container',
            data: {
                message: 'Alegrarte',
                directionFlow: '<<'
            },
            methods: {
                collapseChildContainer() {
                    if (this._data["directionFlow"] == '<<') {
                        this._data["directionFlow"] = '>>'      
                        ContainerChild2.changeVisibility(0);                    
                    } else {
                        this._data["directionFlow"] = '<<'
                        ContainerChild2.changeVisibility(1);                    
                    }
                }
            }
        });
    }
};

window.addEventListener('load', App.inicialize);