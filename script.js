var canvas;
var gridData = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var gridSize = 400;
var strokeSize = 16;
var cellSize = 80;

$( document ).ready(function() {
    canvas = $("#grid");
    setup();
});

$(document).keydown(function(event) {
    switch(event.key) {
        case "ArrowLeft":
        console.log("left");

        addNumber();
        drawNumbers();
        break;

        case "ArrowUp": // up
        console.log("up");

        addNumber();
        drawNumbers();
        break;

        case "ArrowRight": // right
        console.log("right");

        addNumber();
        drawNumbers();
        break;

        case "ArrowDown": // down
        console.log("down");

        addNumber();
        drawNumbers();
        break;

        default: return; // exit this handler for other keys
    }
});

function setup() {
    drawGrid();
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
    let left = countZeros();
    if(left == 0) {
        console.log("Game over!");
        return;
    }
    let number = (Math.floor(Math.random() * 2)+1)*2;
    let pos = Math.floor(Math.random() * left);
    addNumberToPos(number, pos);
    console.table(gridData);
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

function shiftRow(row) {
    
}