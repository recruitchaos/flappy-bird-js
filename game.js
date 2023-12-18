const date = new Date();
const time = date.getHours();  // to set the theme of the canvas according to the time

const canvas = document.getElementById('gameEnv');
const ctx = canvas.getContext('2d');

const background_day = new Image();
background_day.src = './images/background-day.png';

const background_night = new Image();
background_night.src = './images/background-night.png';

const base = new Image();
base.src = './images/base.png';

const countdownImages = [];

var image0 = new Image();
image0.src = './images/0.png';
countdownImages.push(image0);

var image1 = new Image();
image1.src = './images/1.png';
countdownImages.push(image1);

var image2 = new Image();
image2.src = './images/2.png';
countdownImages.push(image2);

var image3 = new Image();
image3.src = './images/3.png';
countdownImages.push(image3);

var audio = new Audio('./audio/countdown.mp3');

const bird_upflap = new Image();
bird_upflap.src = './images/bluebird-upflap.png';

const bird_midflap = new Image();
bird_midflap.src = './images/bluebird-midflap.png';

const bird_downflap = new Image();
bird_downflap.src = './images/bluebird-downflap.png';

base.onload = function() {
    gameLoop();
};

background_day.onload = function() {
    // start the game loop only after the background is loaded
    gameLoop();
};

background_night.onload = function() {
    // start the game loop only after the background is loaded
    gameLoop();
};

let score = 0;
let bestScore = 0;
let gameState = 'Start';
let moveSpeed = 3;
let gravity = 0.5;

document.addEventListener('keydown', (e) => {   
    if(e.key === 'Enter' && gameState != 'Play') {
        gameState = 'Play';
        score = 0;
        startCountdown(); 
    }
})

function startCountdown() {
    var count = 4;
    function drawCountdown() {
        if(count >= 1) {
            drawObjects();
            ctx.drawImage(countdownImages[count - 1],canvas.width / 2.2, canvas.height / 3, 36, 24);
            count--;
            audio.play();
            setTimeout(drawCountdown, 1000);
        } else {
            gameLoop();
        }
    }
    drawCountdown();
}

function drawObjects() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw background image
    if(time > 17) {
        ctx.drawImage(background_night, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.drawImage(background_day, 0, 0, canvas.width, canvas.height);
    }

    ctx.drawImage(base, 0, canvas.height - 112, 336, 112);

    ctx.font = " bold 20px Rubik Doodle Shadow";
    ctx.fillStyle = "white";
    ctx.fillText("Score", 20, 40);
    ctx.fillText("Best", 220, 40);
    ctx.fillText(score, 20, 60);
    ctx.fillText(bestScore, 220, 60);
}


function gameLoop() {
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw background image
    if(time > 17) {
        ctx.drawImage(background_night, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.drawImage(background_day, 0, 0, canvas.width, canvas.height);
    }

    ctx.drawImage(base, 0, canvas.height - 112, 336, 112);

    ctx.font = " bold 20px Rubik Doodle Shadow";
    ctx.fillStyle = "white";
    ctx.fillText("Score", 20, 40);
    ctx.fillText("Best", 220, 40);
    ctx.fillText(score, 20, 60);
    ctx.fillText(bestScore, 220, 60);

    if(score == 0) {
        resetGame();
    }

    startButton.onclick = startCountdown;

    

    ctx.drawImage(bird_midflap, canvas.width / 4, canvas.height / 4, 34, 24);
    

    // other game elements

    // request next animation frame

}

const startButton = new Image();
startButton.src = './images/start_button.png';

startButton.onload = function() {
    gameLoop();
};

function resetGame() {
    score = 0;
    ctx.drawImage(startButton, canvas.width / 4, canvas.height / 3, 150, 150);

}

gameLoop();