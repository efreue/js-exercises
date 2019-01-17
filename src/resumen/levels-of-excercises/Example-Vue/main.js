const App = {
    inicialize() {
        const containerEj1 = new Vue({
            el: '#ej-1',
            data: {message: 'Hola papa todo'}
        });      
        
        const containerEj2 = new Vue({
            el: '#ej-2',
            data: {
                message: 'You loaded this page on ' + new Date().toLocaleString()
            }
        });

        const containerEj3 = new Vue({
            el: '#ej-3',
            data: {
                seen: true //si cambio a false, desaparece el texto
            },
            methods: {
                changeShow() {
                    (this._data["seen"]) ? this._data["seen"] = false: this._data["seen"] = true
                }
            }
        });
        const containerEj4 = new Vue({
            el: '#ej-4',
            data: {
                todos: [
                    { text: 'Learn JavaScript' },
                    { text: 'Learn Vue' },
                    { text: 'Build something awesome' }
                ]
            }
        });

        const containerEj5 = new Vue({
            el: '#ej-5',
            data: {
                items: [
                    { message: 'Foo' },
                    { message: 'Bar' }
                ]
            }            
        });

        const containerEj6 = new Vue({
            el: '#ej-6',
            data: {
                parentMessage: 'Parent',
                items: [
                    { message: 'Foo' },
                    { message: 'Bar' }
                ]
            }
        });

        const containerEj7 = new Vue({
            el: '#ej-7',
            data: {
                object: {
                    firstName: 'John',
                    lastName: 'Doe',
                    age: 30
                }
            }
        });

        const containerEj8 = new Vue({
            el: '#ej-8',
            data: {
                object: {
                    firstName: 'John',
                    lastName: 'Doe',
                    age: 30
                }
            }
        });

        //Ejercicio9
        new Vue({
            el: '#app',
            data: {
                todos: ['vue', 'vuex', 'nuxt'],
                currentTodos:''
            },
            methods: {
                addTodo() {
                    this.todos.push(this.currentTodos);
                    this.currentTodos = '';
                },
                deleteItem(index) {
                    this.todos.splice(index, 1)
                }
            }
        })
    }
};

window.addEventListener('load', App.inicialize);
