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

var getCircleColor = function(num, row) {
    var color = '';
    if (row == 1) {
        switch(num) {
            case 3:
            case 9:
            case 12:
            case 18:
            case 21:
            case 27:
            case 30:
            case 36:
                color = 'red';
                break;
            default:
                color = 'black';
                break;
        }
    }
    else if(row == 2) {
        switch(num) {
            case 5:
            case 14:
            case 23:
            case 32:
                color = 'red';
                break;
            default:
                color = 'black';
                break;
        }
    }
    else if(row == 3) {
        switch(num) {
            case 1:
            case 7:
            case 16:
            case 19:
            case 25:
            case 34:
                color = 'red';
                break;
            default:
                color = 'black';
                break;
        }
    }
    return color;
};

var App = {
    createCircle: function(num, color) {
        var element = document.createElement('div');
        Css.add(element, 'circle');
        Css.add(element, color);
        Css.add(element, 'num-white');
        Css.add(element, 'horizontal-centered-text');
        element.textContent = num;
        return element;

    },
    createTable: function() {
        var divContent = document.createElement('div');
        var table = document.createElement('table');
        var row = document.createElement('tr');
        var th = document.createElement('th');
        var p = document.createElement('p');
        th.setAttribute('rowspan', 3);
        th.className = "container-board-col0";
        p.textContent = '0';
        Css.add(p, 'num-white');
        Css.add(p, 'prueba');
        th.appendChild(p);
        row.appendChild(th);
        var numInFirstRow = 0;
        for(var i = 0; i <= 11; i++) {
            numInFirstRow += 3;
            var nodeTh = document.createElement('th');
            nodeTh.className = "container-board-row";

            var newCircleInFirstRow = App.createCircle(numInFirstRow, getCircleColor(numInFirstRow, 1));
            nodeTh.appendChild(newCircleInFirstRow);
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
                    var newCircleInSecondRow = App.createCircle(numInSecondRow, getCircleColor(numInSecondRow, 2));
                    nodeTrTh.appendChild(newCircleInSecondRow);
                }
                else {
                    if(numInThirdRow === 0)
                        numInThirdRow = 1;
                    else
                        numInThirdRow += 3;
                    var newCircleInThirdRow = App.createCircle(numInThirdRow, getCircleColor(numInThirdRow, 3));
                    nodeTrTh.appendChild(newCircleInThirdRow);
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
