var canvas;
var gridData = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var gridSize = 400;
var strokeSize = 16;
var cellSize = 80;
var merged = true;

$( document ).ready(function() {
    canvas = $("#grid");
    setup();
});

$(document).keydown(function(event) {
    switch(event.key) {
        case "ArrowLeft":
        console.log("left");
        shiftLeft();
        break;

        case "ArrowUp": // up
        console.log("up");
        shiftUp();
        break;

        case "ArrowRight": // right
        console.log("right");
        shiftRight();
        break;

        case "ArrowDown": // down
        console.log("down");
        shiftDown();
        break;

        default:
        break; // exit this handler for other keys
    }
    canvas.clearCanvas();
    drawGrid();
    addNumber();
    drawNumbers();
});

function setup() {
    drawGrid();
    addNumber();
    addNumber();
    drawNumbers();
}

function drawGrid() {
    canvas.drawRect({
        fillStyle: '#663300',
        x: 0, y: 0,
        fromCenter: false,
        width: 400,
        height: 400
    });
    for(i=0; i<4; i++) {
        for(j=0; j<4; j++) {
            canvas.drawRect({
                fillStyle: '#996633',
                x: i*cellSize+(i+1)*strokeSize, y: j*cellSize+(j+1)*strokeSize,
                fromCenter: false,
                width: cellSize,
                height: cellSize
            });
        }
    }
}

function drawNumbers() {
    for(i=0; i<4; i++) {
        for(j=0; j<4; j++) {
            if(gridData[i][j] != 0) {
                canvas.drawText({
                    fillStyle: 'white',
                    x: i*100+50, y: j*100+50,
                    fontSize: 48,
                    fontFamily: 'Arial',
                    fromCenter: true,
                    text: gridData[i][j]
                });
            }
        }
    }
}

function addNumber() {
    if(merged) {
        let left = countZeros();
        if(left == 0) {
            console.log("Game over!");
            return;
        }
        let number = (Math.floor(Math.random() * 2)+1)*2;
        let pos = Math.floor(Math.random() * left);
        addNumberToPos(number, pos);
        merged = false;
    }
}

function countZeros() {
    let count = 0;
    for(let i=0; i<4; i++) {
        for(let j=0; j<4; j++) {
            if(gridData[i][j] == 0) {
                count ++;
            }
        }
    }
    return count;
}

function addNumberToPos(number, pos) {
    let count = 0;
    for(let i=0; i<4; i++) {
        for(let j=0; j<4; j++) {
            if(gridData[i][j] == 0) {
                if(count == pos) {
                    gridData[i][j] = number;
                    return;
                }
                else {
                    count ++;
                }
            }
        }
    }
}

function shiftUp() {
    for(let i=0; i<4; i++) {
        gridData[i] = combine(gridData[i]);
    }
}

function shiftRight() {
    gridData = rotate90();
    for(let i=0; i<4; i++) {
        gridData[i] = combine(gridData[i]);
    }
    gridData = rotate90();
    gridData = rotate90();
    gridData = rotate90();
}

function shiftDown() {
    gridData = rotate90();
    gridData = rotate90();
    for(let i=0; i<4; i++) {
        gridData[i] = combine(gridData[i]);
    }
    gridData = rotate90();
    gridData = rotate90();
}

function shiftLeft() {
    gridData = rotate90();
    gridData = rotate90();
    gridData = rotate90();
    for(let i=0; i<4; i++) {
        gridData[i] = combine(gridData[i]);
    }
    gridData = rotate90();
}

function combine(row) {
    row = shiftRow(row);
    for(let i=0; i<row.length; i++) {
        if(row[i]==row[i+1] && row[i]!=0) {
            row[i] += row[i+1];
            row[i+1] = 0;
            merged = true;
        }
    }
    row = shiftRow(row);
    return row;
}

function shiftRow(row) {
    let tmp = [];
    for(let i=0; i<row.length; i++) {
        if(row[i]!=0){
            tmp.push(row[i]);
        }
    }
    var rowcheck = row.slice();
    rowcheck.fill(0);
    for(let i=0; i<tmp.length; i++) {
        rowcheck[i] = tmp[i];
    }
    let c = true;
    for(let i=0; i<row.length; i++) {
        if(row[i] != rowcheck[i]) {
            c = false;
        }
    }
    if(!c) {
        merged = true;
    }
    row = rowcheck;
    return row;
}

function rotate90() {
    let ret = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

    for (let i = 0; i < 4; ++i) {
        for (let j = 0; j < 4; ++j) {
            ret[i][j] = gridData[4-j-1][i];
        }
    }
    return ret;
}