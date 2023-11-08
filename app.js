const playFeild = document.querySelector(".play-field")
const scoreNumber = document.querySelector(".score")
const highScoreNumber = document.querySelector(".high-score")

let gameOver = false
let foodX, foodY
let snakeX = 5, snakeY = 10
let snakebody = []
let valueCityX = 0, valueCityY = 0
let setIntervalId
let score = 0
console.log(snakebody)
let highScore = localStorage.getItem("high-score") || 0
highScoreNumber.innerHTML = `High Score: ${highScore}`


function changeFoodPosition() {
    foodX = Math.floor(Math.random() * 30) + 1
    foodY = Math.floor(Math.random() * 30) + 1
}


function handleGameOver() {
    clearInterval(setIntervalId)
    alert('Game Over, press OK to reply')
    location.reload()
}


function chaneDirection(e) {
    if(e.key === 'ArrowUp' && valueCityY != 1) {
        valueCityX = 0
        valueCityY = -1
    } else if(e.key === 'ArrowDown' && valueCityY != -1) {
        valueCityX = 0
        valueCityY = 1
    } else if(e.key === 'ArrowLeft' && valueCityX != 1) {
        valueCityX = -1
        valueCityY = 0
    } else if(e.key === 'ArrowRight' && valueCityX != -1) {
        valueCityX = 1
        valueCityY = 0
    }
}

function initGame() {
    if(gameOver) return handleGameOver()
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`

    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition()
        snakebody.push([555, 666])
        score++

        highScore = score >= highScore ? score : highScore
        localStorage.setItem('high-score', highScore)
        scoreNumber.innerHTML = `Score: ${score}`
        highScoreNumber.innerHTML = `High Score: ${highScore}`
    }

    for(let i = snakebody.length - 1; i > 0; i--){
        snakebody[i] = snakebody[i - 1]
        
    }

    snakebody[0] = [snakeX, snakeY]
    

    for(let i = 0; i < snakebody.length; i++){
        htmlMarkup += `<div class="head" style="grid-area: ${snakebody[i][1]} / ${snakebody[i][0]}"></div>`

        if(i !== 0 && snakebody[0][1] === snakebody[i][1] && snakebody[0][0] === snakebody[i][0]){
            gameOver = true
        }
        
    }

    snakeX += valueCityX
    snakeY += valueCityY

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true
    }

    playFeild.innerHTML = htmlMarkup
}

changeFoodPosition()
setIntervalId = setInterval(initGame, 200)
document.addEventListener("keydown", chaneDirection)