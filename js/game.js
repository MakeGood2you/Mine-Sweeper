'use strict'

//game 
var MINES = 'X'
var EMPTY = " "

var gBoard = []

//object
var gLevel = {
    SIZE: 4,
    MINES: 2
};


var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


function initGame() {
    gBoard = createBoard()
    console.table(gBoard)
    renderBoard(gBoard)
    gGame.isOn = true
    console.log('init game')

}



function createBoard() {
    var board = [];
    const SIZE = gLevel.SIZE;
    for (var i = 0; i < SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = createCell()
            
        }
    }

    var elCell = document.querySelector('.cell')
    console.log('renderCell', elCell)
    board[1][2] === MINES
    board[2][2] === MINES
    return board;
}
// ADD MINES TO RANDOM POS
function addMines() {
    var getRandPosI = getRandomInt(0, gLevel.SIZE ** 2 - 1)
    var getRandPosJ = getRandomInt(0, gLevel.SIZE ** 2 - 1)
    var posMines = { i: getRandPosI, j: getRandPosJ }

    while (0 > 2) {
        var res = renderCell(posMines, MINES)
    }
    return res
}

// ${i} - ${j}
function renderBoard(board) {
    var elBorad = document.querySelector('.board')
    var size = gLevel.SIZE
    var strHTML = ''

    for (var i = 0; i < size; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < size; j++) {
            var cell = gBoard[i][j]
            var className = `cell-${i}-${j}`
            if (cell === EMPTY) 
                console.log('cell')

            strHTML +=
                `<td class="${className}"
            onclick="cellClicked(this, ${i}, ${j})">
            ${EMPTY}
            </td> `
        }
        strHTML += '</tr>'
    }
    elBorad.innerHTML = strHTML

    // console.log('renderBoard', board)
}


function createCell() {
    var cell = {
        minesAroundCount: setMinesNegsCount(),
        isShown: false,
        isMine: false,
        isMarked: false
    }
    return cell
}



function setMinesNegsCount() {
    var count = 0
    for (var i = i - 1; i <= i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = j - 1; j <= j + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue;
            if (i === i && j === j) continue;
            if (gBoard[i][j] === MINES) count++;
            console.log();
        }
    }
    return count;
}



function cellClicked(elCell, posI, posJ) {
    var pos = { i: posI, j: posJ };

    console.log('cellClicked', elCell, pos)
}

function cellMarked(elCell) {
    console.log('cellMarked', elCell)

}

function checkGameOver() {
    console.log('GameOver')
}

function expandShown(board, elCell, i, j) {
    console.log('expandShow', board, elCell, i, j)

}


function resetGame() {
    console.log('reset Game')

}
