'use strict'

//game 
var MINES = '💣'
var FLAG = 'P'
var gBoard = []
var gNextClick = 0


var timeBegan = null
    , timeStopped = null
    , stoppedDuration = 0
    , started = null;


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
    setMines()
    gGame.isOn = true;
    renderBoard(gBoard)
    console.table(gBoard);
}


function createCell(board, i, j) {
    var cell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
        i: i,
        j: j
    }
    return cell
}


function renderBoard(board) {
    // var elCell = document.querySelector(setMines)
    var elBorad = document.querySelector('.board')
    var size = gLevel.SIZE
    var strHTML = ''
    for (var i = 0; i < size; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < size; j++) {

            var cell = gBoard[i][j]
            var tdId = `cell-${i}-${j}`;
            var className = (cell.isShown === false) ? ' hidden' : 'cell'
            cell = ''
            strHTML += `<td id="${tdId}`
            strHTML += `"class="${className}"
            onclick="cellClicked(this, ${i}, ${j} )">
            ${cell}
            </td> `
            console.log('class', className)
        }
        strHTML += '</tr>'
    }
    // elCell.innerHTML = ''
    elBorad.innerHTML = strHTML
}



function findEmptyPos(pos) {
    pos = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j]
            if (cell.isMine === false) {
                pos.push(pos)
            }
        }
    }
    return pos
}




//  working
function setMinesNegsCount() {
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {
            var minesAround = MinesNegsCountAround(gBoard, i, j)
            gBoard[i][j].minesAroundCount = minesAround;
            console.log('mines', minesAround);
        } return minesAround
    }
}






function setMines() {
    for (var i = 0; i < gLevel.MINES; i++) {
        var randomPos = getRandMinePos()
        findEmptyPos(randomPos)
    } return
}

// ADD MINES TO RANDOM POS for mines/// 
function getRandMinePos() {
    var getRandPosJ = getRandomInt(0, gLevel.SIZE - 1)
    var getRandPosI = getRandomInt(0, gLevel.SIZE - 1)
    var loctions = [getRandPosI, getRandPosJ]
    isMine(loctions)
    console.log('randomMINES', getRandPosI, getRandPosJ);
}

function isMine(loction) {
    gBoard[loction[0]][loction[1]].isMine = true
}


function MinesNegsCountAround(board, rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {

            if (j < 0 || j >= board[0].length) continue;
            if (i === rowIdx && j === colIdx) continue;
            if (board[i][j].isMine) count++;
        }
    }
    return count;
}




function isMarked(loction) {
    gBoard[loction[0]][loction[0]].isMarked = true
}




function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function cellClicked(elCell, i, j) {
    var cell = gBoard[i][j]
    gNextClick++
    // start() // Timer
    if (gNextClick === 1) {
        setMines()
        MinesNegsCountAround(gBoard, i, j)
        console.log('nextclick', gNextClick);
    }
    if (elCell === cell.isMine) {
        console.log('cell', elCell);
        renderCell(elCell, MINES)

    }
}
//     var pos = { i: posI, j: posJ };


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





function createBoard() {
    var board = [];
    const SIZE = gLevel.SIZE;
    for (var i = 0; i < SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = createCell(i, j)
        }
    }
    return board;
}



