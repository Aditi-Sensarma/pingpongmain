const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;
let paddleSpeed = 30;
let ballSpeedX = 2;
let ballSpeedY = 2;
let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;

let player1Score = 0;
let player2Score = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    ctx.fillStyle = '#b19cd9';
    ctx.fillRect(10, paddle1Y, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - 20, paddle2Y, paddleWidth, paddleHeight);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fillStyle = '#b19cd9';
    ctx.fill();
    ctx.closePath();

    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY + ballSize > canvas.height || ballY - ballSize < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX - ballSize < 20 && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX + ballSize > canvas.width - 20 && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball out of bounds
    if (ballX + ballSize < 0) {
        player2Score++;
        updateScoreboard();
        resetBall();
    }
    if (ballX - ballSize > canvas.width) {
        player1Score++;
        updateScoreboard();
        resetBall();
    }
}


function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}


function updateScoreboard() {
    document.getElementById('player1Score').textContent = `Human: ${player1Score}`;
    document.getElementById('player2Score').textContent = `AI: ${player2Score}`;
}

function updatePaddle1Position(event) {
    if (event.key === 'ArrowUp') {
        paddle1Y -= paddleSpeed;
        if (paddle1Y < 0) paddle1Y = 0;
    }
    if (event.key === 'ArrowDown') {
        paddle1Y += paddleSpeed;
        if (paddle1Y + paddleHeight > canvas.height) paddle1Y = canvas.height - paddleHeight;
    }
}

function updatePaddle2Position() {
    if (ballY < paddle2Y + paddleHeight / 2) {
        paddle2Y -= paddleSpeed;
        if (paddle2Y < 0) paddle2Y = 0;
    } else {
        paddle2Y += paddleSpeed;
        if (paddle2Y + paddleHeight > canvas.height) paddle2Y = canvas.height - paddleHeight;
    }
}

document.addEventListener('keydown', updatePaddle1Position);


document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
    }
});

function gameLoop() {
    draw();
    updatePaddle2Position();
    requestAnimationFrame(gameLoop);
}

gameLoop();