var Css = {
	add: function(node, className) {
		node.className += " " + className;
	},
	del: function(node, className) {
		node.className
        node.className.replace(className, "");
	},
	contains: function(node, className) {
		return node.className.search(className) != -1;
	}
};

var App = {
    createBall: function() {
        var element = document.createElement('div');
        Css.add(element, 'ball');
        Css.add(element, 'red');
        document.body.appendChild(element);
    },
    createTable: function() {
        var table = document.createElement('table');
        var row = document.createElement('tr');
        var th = document.createElement('th');
        th.setAttribute("rowspan", 3);
        th.className = "container-board-col0";
        for(var i = 0; i <= 11; i++) {
            var nodeTh = document.createElement('th');
            nodeTh.className = "container-board-row";
            th.appendChild(nodeTh);
        }
        for(var r = 0; r <= 1; r++ ) {
            var nodeTr = document.createElement('tr');
            for(var h = 0; h <= 11; h++) {
                var nodeTrTh = document.createElement('th');
                nodeTrTh.className = "container-board-row";
                nodeTr.appendChild(nodeTrTh);
            }
            th.appendChild(nodeTr);
        }
        row.appendChild(th);
        table.setAttribute('id', 'board');
        table.className = "container-board";
        table.appendChild(row);
        document.body.appendChild(table);
    }
}

window.onload = App.createTable;
