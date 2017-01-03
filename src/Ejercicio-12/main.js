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
    createBall: function(num, color, top) {
        var element = document.createElement('div');
        Css.add(element, 'ball');
        Css.add(element, color);
        Css.add(element, top);
        element.textContent = num;
        return element;

    },
    createTable: function() {
        var divContent = document.createElement('div');
        var table = document.createElement('table');
        var row = document.createElement('tr');
        var th = document.createElement('th');
        th.setAttribute('rowspan', 3);
        th.className = "container-board-col0";
        row.appendChild(th);
        var numInFirstRow = 0;
        for(var i = 0; i <= 11; i++) {
            numInFirstRow += 3;
            var nodeTh = document.createElement('th');
            nodeTh.className = "container-board-row";
            var newBallInFirstRow = App.createBall(numInFirstRow, 'red', 'top-first-row');
            nodeTh.appendChild(newBallInFirstRow);
            row.appendChild(nodeTh);
        }
        table.appendChild(row);
        var numInSecondRow = 0;
        var numInThirdRow = 0;
        for(var r = 0; r <= 1; r++ ) {
            var nodeTr = document.createElement('tr');

            for(var h = 0; h <= 11; h++) {
                var nodeTrTh = document.createElement('th');
                nodeTrTh.className = "container-board-row";
                if(r === 0) {
                    if(numInSecondRow === 0)
                        numInSecondRow = 2;
                    else
                        numInSecondRow += 3;
                    var newBallInSecondRow = App.createBall(numInSecondRow, 'red', 'top-second-row');
                    nodeTrTh.appendChild(newBallInSecondRow);
                }
                else {
                    if(numInThirdRow === 0)
                        numInThirdRow = 1;
                    else
                        numInThirdRow += 3;
                    var newBallInThirdRow = App.createBall(numInThirdRow, 'red', 'top-third-row');
                    nodeTrTh.appendChild(newBallInThirdRow);
                }
                nodeTr.appendChild(nodeTrTh);
            }
            table.appendChild(nodeTr);
        }
        table.setAttribute('id', 'board');
        table.className = "container-board";
        divContent.setAttribute('id', 'roulette');
        divContent.className = "container-roulette";
        divContent.appendChild(table);
        document.body.appendChild(divContent);
    }
}

window.onload = App.createTable;
