var Config = {
    cellWidth: 50,
    cellHeight: 50,
    chipWidth: 35,
    chipHeight: 35,
    rows: 4,
    cols: 4
};

var Dom = {
    createElement: function(type, cssClass, clickCallback) {
        var element = document.createElement(type);
        element.className = cssClass;
        if(clickCallback) {
            element.onclick = clickCallback;
        }
        return element;
    },
    createTable: function(rows, cols){
        var table = Dom.createElement('table');
        for (var i = 0; i <= rows - 1; i++) {
            table.appendChild(
                Dom.createRow(i, cols - 1)
            );
        }
        return table;
    },
    createCell: function() {
        return Dom.createElement('td', 'container-cell', function(e){
            var boardCoords = Board.toBoardCoords(
                Utils.getCoordsFromEvent(e)
            );
            Chip.add(boardCoords.row, boardCoords.column);
        });
    },
    createRow: function(numberRow, numberCells) {
        var tr = Dom.createElement('tr');
        for(var i = 0; i <= numberCells; i++) {
            tr.appendChild(
                Dom.createCell()
            );
        }
        return tr;
    }
};

var Utils = {
    getCoordsFromEvent: function(e) {
        return {
            x: e.clientX - Board.element.offsetLeft,
            y: e.clientY - Board.element.offsetTop
        };
    }
};

var Chip = {
    create: function() {
        return {
            element: Dom.createElement('div', 'circle', function(e) {
                var boardCoords = Board.toBoardCoords(
                    Utils.getCoordsFromEvent(e)
                );
                Chip.add(boardCoords.row, boardCoords.column);
            }),
            number: 0
        };
    },
    update: function(chip) {
        chip.element.textContent = chip.number;
    },
    increment: function(chip) {
        chip.number++;
        Chip.update(chip);
    },
    move: function(chip, row, col) {
        var marginLeft = (Config.cellWidth - Config.chipWidth);
        var marginTop = (Config.cellHeight - Config.chipHeight);
        chip.element.style.top = (row * Config.cellHeight) + marginTop;
        chip.element.style.left = (col * Config.cellWidth) + marginLeft;
    },
    add: function(row, col) {
        var chip = Board.chips[row][col];
        if(!chip) {
            chip = Chip.create();
            Board.addChip(row, col, chip);
        }
        Chip.increment(chip);
        Chip.move(chip, row, col);
    }
};

var Board = {
    chips: [],
    addChip: function(row, col, chip) {
        Board.chips[row][col] = chip;
        document.body.appendChild(chip.element);
    },
    toBoardCoords: function(absoluteCoords) {
        return {
            row: Math.floor(absoluteCoords.y / Config.cellHeight),
            column: Math.floor(absoluteCoords.x / Config.cellWidth)
        };
    },
    create: function() {
        var divContent = Dom.createElement('div', 'container-div');
        var divShowCell = Dom.createElement('div', 'container-show-div');
        Board.element = Dom.createTable(Config.rows, Config.cols);
        divContent.appendChild(Board.element);
        divContent.appendChild(divShowCell);
        document.body.appendChild(divContent);
        for(var i = 0; i < Config.rows; i++) {
            Board.chips.push(new Array(Config.cols));
        }
    }
};

window.addEventListener('load', Board.create);

var addChip = function() {
    Chip.add(
        document.getElementById('row').value,
        document.getElementById('col').value
    );
};
