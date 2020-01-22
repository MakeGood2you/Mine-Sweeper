'use strict'


function renderCell(pos, val) {
    
    var elCell = document.querySelector(`.cell-${pos.i}-${pos.j}`);
    elCell.innerText = val;
    console.log('renderCell', pos, val)
}




function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}




function createBoard() {
    var board = [];
    const SIZE = gLevel.SIZE;
    for (var i = 0; i < SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = cellObject;
            if (board[i][j] === MINES) {
                cellObject.isShown = false
            }
            console.log(cellObject.isShown)
            
        }
    } 
    return board;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.floor(Math.random() * (max - min)) + min); //The maximum is exclusive and the minimum is inclusive
}


function blowUpNegs(posI, posJ) {
    for (var i = posI - 1; i <= posI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = posJ - 1; j <= posJ + 1; j++) {
            if (j < 0 || j >= gBoard.length) continue;
            if (i === posI && j === posJ) continue;
            if (gBoard[i][j] === EMPTY) gBoard[i][j] = EMPTY;
        }
    }
    renderBoard();
}








function setMinesNegsCount(board) {
    // var elCell = document.querySelector('.cell')
    var neighborsCount = 0
    for (var i = posI - 1; i <= posI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = posJ - 1; j <= posJ + 1; j++) {
            if (j < 0 || j >= gBoard.length) continue;
            if (i === posI && j === posJ) continue;
            if (elCell[i][j] === MINES) neighborsCount++
        }
    }
    return neighborsCount
}


function addRandMines() {
    var locations = findEmptyPos()
    var getRandomPos = getRandomInt(0, locations.length)
    var location = locations[getRandomPos]
    locations.splice(getRandomPos, 1)
    console.log(location, 'is locaion')
    renderCell(location, CHERRY)
    


    // function randMines(board) {
    //     var randIdx = getRandomInt(0, board.length)
    //     var MINES = board[randIdx]
    //     board.splice(randIdx, 1)
    //     return MINES
    // }
  }