'use strict'
var timeBegan = null
    , timeStopped = null
    , stoppedDuration = 0
    , started = null;




function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.floor(Math.random() * (max - min)) + min); //The maximum is exclusive and the minimum is inclusive
}


function closeModal() {
    var elModal = document.querySelector(".modal");
    elModal.style.display = 'none'

}

function showModal(text) {
    var h1 = document.querySelector('.modal h1')
    var elModal = document.querySelector(".modal");
    h1.innerText = text
    return elModal.style.display = 'block'
}


// TIMER
function startTimer() {
    if (timeBegan === null) {
        timeBegan = new Date();
    }

    if (timeStopped !== null) {
        stoppedDuration += (new Date() - timeStopped);
    }
    console.log(stoppedDuration);

    started = setInterval(clockRunning, 10);
}



function stopTimer() {
    timeStopped = new Date();
    clearInterval(started);
}


function resetTimer() {
    clearInterval(started);
    stoppedDuration = 0;
    timeBegan = null;
    timeStopped = null;
    document.querySelector('.timer').innerHTML = '00:00:00.000';
}

function clockRunning() {
    var currentTime = new Date()
        , timeElapsed = new Date(currentTime - timeBegan - stoppedDuration)
        , hour = timeElapsed.getUTCHours()
        , min = timeElapsed.getUTCMinutes()
        , sec = timeElapsed.getUTCSeconds()
        , ms = timeElapsed.getUTCMilliseconds();

    document.querySelector('.timer').innerHTML =
        (hour > 9 ? hour : "0" + hour) + ":" +
        (min > 9 ? min : "0" + min) + ":" +
        (sec > 9 ? sec : "0" + sec) + "." +
        (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms);
};
