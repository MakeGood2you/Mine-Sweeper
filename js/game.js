'use strict'

//game 
var EMPTY = ''
var MINES = '💣'
var FLAG = '🚩'
var SMILEY = '😀';
var SMILEY_LOSE = '😕';
var SMILEY_WIN = '😎';

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

//--------------------------------//
//--------------------------------//
//
//
//   I AM TRY MY BEST !
//  AND IS NOT FINISH YET !!!
//
//
//--------------------------------//
//--------------------------------//

function initGame() {
    gBoard = createBoard()
    gGame.isOn = true;
    renderBoard(gBoard)
    
    console.table(gBoard);
}


//--------------------------------//

function createCell(board, i, j) {
    var cell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
        
    }
    return cell
}

//--------------------------------//


function renderBoard(board) {
    var size = gLevel.SIZE
    var strHTML = ''
    for (var i = 0; i < size; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < size; j++) {
            
            var cell = gBoard[i][j]
            var className = `cell-${i}-${j}`
            className += (cell.isMine === false) ? ' good ' : ' bomb '
            if (cell.isMarked) {
                cell = FLAG
            } else {
                if (cell.isShown === false) {
                    cell = EMPTY
                }
                if (cell.isMine === false) {
                    cell = setMinesNegsCount(i, j)
                }
                
                
                else if (cell.isShown && cell.isMine) {
                    cell = MINES
                }
            }
            strHTML += `<td "class="${className}
            "oncontextmenu="cellMarked(this, ${i}, ${j})
            "onclick="cellClicked(this, ${i}, ${j})">
            ${cell}
            </td> `
        }
        strHTML += '</tr>'
    }
    var elBorad = document.querySelector('.board')
    elBorad.innerHTML = strHTML
}

//--------------------------------//



function setRandMines(posI, posJ) {
    var count = 0
    while (count < gLevel.MINES) {
        var randI = getRandomInt(0, gBoard.length - 1)
        var randJ = getRandomInt(0, gBoard[randI].length - 1)
        if (randI === posI && randJ === posJ) continue;
        if (gBoard[randI][randJ].isMine) continue
        gBoard[randI][randJ].isMine = true
        count++
        
    }
}

//--------------------------------//

//  working
function setMinesNegsCount(posI, posJ) {
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {
            var minesAround = MinesNegsCountAround(gBoard, posI, posJ)
            gBoard[i][j].minesAroundCount = minesAround;
        } return minesAround
    }
}



//--------------------------------//

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



//--------------------------------//
//not finish yet
//--------------------------------//
function blowUpNegs(elCell, posI, posJ) {
    for (var i = posI - 1; i <= posI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = posJ - 1; j <= posJ + 1; j++) {
            var cell = gBoard[i][j]
            if (j < 0 || j >= gBoard.length) continue;
            if (i === posI && j === posJ) continue;
            if (!cell.isMine && !cell.isShown && !cell.isMarked){
                
                gBoard[posI][posJ].minesAroundCount
                
            }
        }
    }
    renderBoard();
}

//--------------------------------//
function cellClicked(elCell, posI, posJ) {
    gNextClick++
    
    var cell = gBoard[posI][posJ]
    if (!gGame.isOn) return
    if (cell.isShown) return
    gGame.isOn = true
    console.log('is elCell : ', elCell);
    // debugger
    document.querySelector('.count-click').innerText = gNextClick
    
    
    if (gNextClick === 1) {
        cell.isShown = true
        startTimer()
        
        setRandMines(posI, posJ)
        setMinesNegsCount(posI, posJ)
        blowUpNegs(elCell, posI, posJ)
        
    } else if (cell.isShown === false && cell.isMine === false) {
        cell.isShown = true
        elCell.innerHTML = cell.minesAroundCount
        
    } else{
        cell.isShown = true
        elCell.innerHTML = MINES
        gameOver('you lose the game', SMILEY_LOSE)
        return
    }
    renderBoard(gBoard)
}

//--------------------------------//
function addDifficulties(elLevel) {
    gLevel.SIZE = elLevel.value
    gLevel.MINES = elLevel.value
    resetGame()
    renderBoard(gBoard)
}
//--------------------------------//


function gameOver(txt, smiley) {
    stopTimer()
    showModal(txt)
    gGame.isOn = false
    gNextClick = 0
    document.querySelector('.smiley').innerText = smiley
}

//--------------------------------//
//not finish yet

//--------------------------------//
function cellMarked(elCell, i, j) {
    document.oncontextmenu = function () {
        if (cell.isShown) return
        return false;
    }
    
    var cell = gBoard[i][j]
    if (cell.isMarked === false) {
        cell.isMarked = true
    } else {
        cell.isMarked = false
        elCell.innerText = ''
    }
    renderBoard(gBoard)
}

//--------------------------------//
//not finish yet
//--------------------------------//
function checkGameOver() {
    
    console.log('GameOver')
}

//--------------------------------//
//not finish yet
//--------------------------------//

function resetGame() {
    resetTimer()
    gNextClick = 0
    document.querySelector('.smiley').innerText = SMILEY
    document.querySelector('.count-click').innerText = gNextClick
    gGame.isOn = false
    initGame()
    console.log('reset Game')
}




function createBoard() {
        var board = [];
        const SIZE = gLevel.SIZE;
        for (var i = 0; i < SIZE; i++) {
            board[i] = [];
            for (var j = 0; j < SIZE; j++) {
                board[i][j] = createCell(board, i, j)
            }
        }
        return board;
    }



