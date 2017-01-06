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
        var td = document.createElement('td');
        var p = document.createElement('p');
        td.setAttribute('rowspan', 3);
        td.className = "container-board-col0";
        p.textContent = '0';
        Css.add(p, 'num-white');
        Css.add(p, 'prueba');
        td.appendChild(p);
        row.appendChild(td);
        var numInFirstRow = 0;
        for(var i = 0; i <= 11; i++) {
            numInFirstRow += 3;
            var nodetd = document.createElement('td');
            nodetd.className = "container-board-row";

            var newCircleInFirstRow = App.createCircle(numInFirstRow, getCircleColor(numInFirstRow, 1));
            nodetd.appendChild(newCircleInFirstRow);
            row.appendChild(nodetd);
        }
        table.appendChild(row);
        var numInSecondRow = 0;
        var numIntdirdRow = 0;
        for(var r = 0; r <= 1; r++ ) {
            var nodeTr = document.createElement('tr');

            for(var h = 0; h <= 11; h++) {
                var nodeTrtd = document.createElement('td');
                nodeTrtd.className = "container-board-row";
                if(r === 0) {
                    if(numInSecondRow === 0)
                        numInSecondRow = 2;
                    else
                        numInSecondRow += 3;
                    var newCircleInSecondRow = App.createCircle(numInSecondRow, getCircleColor(numInSecondRow, 2));
                    nodeTrtd.appendChild(newCircleInSecondRow);
                }
                else {
                    if(numIntdirdRow === 0)
                        numIntdirdRow = 1;
                    else
                        numIntdirdRow += 3;
                    var newCircleIntdirdRow = App.createCircle(numIntdirdRow, getCircleColor(numIntdirdRow, 3));
                    nodeTrtd.appendChild(newCircleIntdirdRow);
                }
                nodeTr.appendChild(nodeTrtd);
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
