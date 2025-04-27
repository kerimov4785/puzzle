let options = document.querySelector('.options');
let difficultPanel = document.querySelector('.bg');
let game = document.querySelector('#game');
let start = document.querySelector('#start');
let pictures = ['p1.png','p2.jpg','p3.jpg','p4.jpg','p5.jpg','p6.jpg','p7.png']
let xIndex = 1
let quantityY
let quantityX
let selectedPicture
let wh
for (let j = 0; j < 2; j++) {
    for (let i = 0; i < 7; i++) {
        options.innerHTML += `
            <div id='puzzle${j}${i + 1}'>
                <div id='play${j}${i + 1}' class='play_button'>
                    <h4>PLAY</h4>
                </div>
            </div>
        `;
        setTimeout(() => {
            const puzzle = document.getElementById(`puzzle${j}${i + 1}`);
            puzzle.style.background = `url(img/image${i + 1}.png) center/cover`;
            puzzle.onclick = () => {
                selectedPicture = pictures[i]
                difficultPanel.style.display = 'flex'
                setTimeout(() => {
                    clearInterval(time)
                }, 0);
            }
            puzzle.onmouseover = () => selectPuzzle(j, i)
            puzzle.onmouseleave = () => leavePuzzle(j, i)
        }, 0);
    }
}

let x = 0
let dx = 3
let time
startInerval()
function startInerval() {
    time = setInterval(() => {
        options.style.transform = `translateX(-${x}px)`
        x += dx
        if (x <= 0) {
            dx = 3
        }
        if (x > window.innerWidth) {
            dx *= -1
        }
    }, 24);
}
function leavePuzzle(j, i) {
    document.getElementById(`play${j}${i + 1}`).style.transform = 'scale(0)'
}
function selectPuzzle(j, i) {
    document.getElementById(`play${j}${i + 1}`).style.transform = 'scale(1)'
}
options.onmouseover = function () {
    clearInterval(time)
}
options.onmouseleave = function () {
    startInerval()
}

function selectDifficulty(a) {
    if (a == 'Easy') {
        quantityX = 4
        quantityY = 3
        wh = 150
    }
    else if (a == 'Medium') {
        quantityX = 5
        quantityY = 4
        wh = 125
    }
    else if (a == 'Hard') {
        quantityX = 7
        quantityY = 5
        wh = 100
    }
    else {
        quantityX = 10
        quantityY = 7
        wh = 70
    }
    game.style.display = 'flex'
    difficultPanel.style.display = 'none'
    start.style.display = 'none'
    makeGameField(quantityX, quantityY, wh)
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let gameField = $('#game_field')

function makeGameField(quantityX, quantityY, wh) {
    for (let i = 0; i < quantityY; i++) {
        for (let j = 0; j < quantityX; j++) {
            gameField.append(`<div id = 'elm${i}${j}'></div>`)
                .css({
                    width: `${wh * quantityX}px`,
                    height: `${wh * quantityY}px`,
                    background: `linear-gradient(rgba(26, 25, 36, 0.81), rgba(26, 25, 36, 0.81)),  url(./img/${selectedPicture}) `,
                    backgroundSize: `${wh * quantityX}px ${wh * quantityY}px`
                })
            $(`#elm${i}${j}`).css({
                background: `url(./img/${selectedPicture}) `,
                backgroundPosition: `-${j * wh}px -${i * wh}px`,
                backgroundSize: `${wh * quantityX}px ${wh * quantityY}px`,
                width: `${wh}px`,
                height: `${wh}px`,
                left: `${getRndInteger(wh * quantityX + 100, $(window).innerWidth() - (wh + 100))}px`,
                top: `${getRndInteger(150, $(window).innerHeight() - 200)}px`,
                transform: `rotate(${getRndInteger(0, 360)}deg)`,
                cursor: 'pointer'
            })
                .draggable({ snap: true })
                .mousedown(function () {
                    xIndex++
                    $(this).css({ transform: 'initial', zIndex: `${xIndex}` })
                })
                .mouseup(function () {
                    let nowLeft = $(this).position().left
                    let nowTop = $(this).position().top
                    let qaligLeft = nowLeft % wh
                    let qaligTop = nowTop % wh
                    let newLeft
                    let newTop
                    qaligLeft < 50 ? newLeft = nowLeft - qaligLeft : newLeft = nowLeft + (wh - qaligLeft)
                    qaligTop < 50 ? newTop = nowTop - qaligTop : newTop = nowTop + (wh - qaligTop)
                    $(this).css({
                        left: `${newLeft}px`,
                        top: `${newTop}px`
                    })
                })
        }
    }
    gameField.append(`<div class = 'miniPicture' style = "background:url(./img/${selectedPicture}) center/cover"></div>`)
}

let ok = false
function showPhoto() {
    if (ok) {
        $('#btn1').text('click to hide picture')
        gameField.css({ background: `linear-gradient(rgba(26, 25, 36, 0.81), rgba(26, 25, 36, 0.81)),  url(./img/${selectedPicture})`,
            backgroundSize: `${wh * quantityX}px ${wh * quantityY}px` 
        })
        ok = false
    }
    else {
        $('#btn1').text('click to show picture')
        gameField.css({ background: 'initial' })
        ok = true
    }
}