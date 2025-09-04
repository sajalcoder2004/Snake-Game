


let canvas = document.getElementById("gameCanvas");

let ctx = canvas.getContext("2d");

let statusEl = document.getElementById("status");

let gameState = "menu";

let snake = [];

let direction = {x: 20, y: 0};

let food = {};

let score = 0;

let gameLoop;


function initGame() {
    snake = [{x: 200, y: 200 }];
    direction = {x: 20, y: 0};
    food = getRandomFood();
    score = 0;
}


function getRandomFood() {
    let x = Math.floor(Math.random() * (canvas.width / 20)) * 20;
    let y = Math.floor(Math.random() * (canvas.height / 20)) * 20;

    return {x, y};
}



function draw() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "lime";
    snake.forEach(part => ctx.fillRect(part.x, part.y, 20, 20));

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 20, 20);

    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Score: " + score, 10, 20);
}


function moveSnake() {
    let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y};

    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || snake.some(part => part.x === head.x && part.y === head.y)) 
    {
        gameOver();
        return;
    }

    snake.unshift(head);

    if(head.x === food.x && head.y === food.y) {
        score++;
        food = getRandomFood();

    } else {
        snake.pop();
    }
}


function gameLoopFunc() {
    if (gameState === "playing") {
        moveSnake();
        draw();
    }
}



function startGame() {
    if (gameState === "menu" || gameState === "gameover") {
        initGame();
        gameState = "playing";
        statusEl.innerText = "Game started";

        clearInterval(gameLoop);
        gameLoop = setInterval(gameLoopFunc, 200);
    }
}


function togglePause() {
    if (gameState === "playing") {
        gameState = "paused";
        statusEl.innerText = "game Paused";

    } else if (gameState === "paused") {
        gameState = "playing";
        statusEl.innerText = "Game Resumed";
    }
}



function gameOver() {
    gameState = "gameover";
    statusEl.innerText = "Game Over! Score: " + score;
    updateHighScore();

    clearInterval(gameLoop);
}

function resetGame() {
    gameState = "menu";
    statusEl.innerText = "Press start to Play";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initGame();
    draw();
}


document.addEventListener("keydown", (e) => {
    if (gameState === "menu" && e.key === "Enter") startGame();
    if (gameState === "gameover" && e.key === "Enter") resetGame();

    if (gameState === "playing") {
        if(e.key === "ArrowUp" && direction.y === 0) direction = { x: 0, y: -20};
        if(e.key === "ArrowDown" && direction.y === 0) direction = { x: 0, y: 20};
        if(e.key === "ArrowLeft" && direction.x === 0) direction = { x: -20, y: 0};
        if(e.key === "ArrowRight" && direction.x === 0) direction = { x: 20, y: 0};
    };

    if(e.key.toLowerCase() === "p")
        togglePause();
}
);




function moveUp() {
    if(direction.y === 0) direction = {x: 0, y: -20};
}

function moveDown() {
    if (direction.y === 0) direction = {x: 0, y: 20
}
}

function moveLeft() {
    if(direction.x === 0) direction = { x: -20, y: 0};
}

function moveRight() {
    if (direction.x === 0) direction = {x: 20, y: 0};
}

resetGame();




let highScore = localStorage.getItem("highScore") || 0;

document.getElementById("highScore").innerText = highScore;


function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);

        document.getElementById("highScore").innerText = highScore;
    }
}







