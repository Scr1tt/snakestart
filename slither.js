const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

const snake = {
    body: [{ x: 150, y: 150 }],
    direction: { x: 1, y: 0 },
    size: 10,
};

const food = {
    x: Math.floor(Math.random() * canvas.width / 10) * 10,
    y: Math.floor(Math.random() * canvas.height / 10) * 10,
};

let score = 0;
let speed = 100;

//  Snake
function drawSnake() {
    ctx.fillStyle = "lime";
    snake.body.forEach((part) => {
        ctx.fillRect(part.x, part.y, snake.size, snake.size);
    });
}

// movement
function moveSnake() {
    const head = {
        x: snake.body[0].x + snake.direction.x * snake.size,
        y: snake.body[0].y + snake.direction.y * snake.size,
    };
    snake.body.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        generateFood();
    } else {
        snake.body.pop();
    }
}

//  Food
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, snake.size, snake.size);
}

// make food in a random new spot
function generateFood() {
    food.x = Math.floor(Math.random() * canvas.width / 10) * 10;
    food.y = Math.floor(Math.random() * canvas.height / 10) * 10;
}

// check for if the snake hit walls or its own butt
function checkCollision() {
    const head = snake.body[0];

    // wall collision
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }

    // Self collision
    for (let i = 1; i < snake.body.length; i++) {
        if (snake.body[i].x === head.x && snake.body[i].y === head.y) {
            return true;
        }
    }

    return false;
}

// Updating game 
function update() {
    if (checkCollision()) {
        alert("Game Over! Your Score: " + score);
        resetGame();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    moveSnake();
    drawSnake();
}

// Reset feat
function resetGame() {
    snake.body = [{ x: 150, y: 150 }];
    snake.direction = { x: 1, y: 0 };
    score = 0;
    generateFood();
}

//  Keybinds
function changeDirection(event) {
    const { key } = event;
    if (key === "ArrowUp" && snake.direction.y === 0) {
        snake.direction = { x: 0, y: -1 };
    } else if (key === "ArrowDown" && snake.direction.y === 0) {
        snake.direction = { x: 0, y: 1 };
    } else if (key === "ArrowLeft" && snake.direction.x === 0) {
        snake.direction = { x: -1, y: 0 };
    } else if (key === "ArrowRight" && snake.direction.x === 0) {
        snake.direction = { x: 1, y: 0 };
    }
}

document.addEventListener("keydown", changeDirection);
setInterval(update, speed);
