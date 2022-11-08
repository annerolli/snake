const canvas = document.querySelector('#game');
const CTX = canvas.getContext('2d');

const ground = new Image();
ground.src = './image/bg.png';

const foodImg = new Image();
foodImg.src = './image/carrot.png';

const box = 32;
let score = 0;
let dir;

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
}

let snake = [];
snake[0] = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
}

document.addEventListener('keydown', direction);

function direction(event) {
    if(event.key == 'ArrowUp' && dir !== "down") 
        {dir = "up"}
    else if (event.key == 'ArrowDown' && dir !== "up") 
        {dir = "down"} 
    else if(event.key == "ArrowRight" && dir !== "left") 
        {dir = "right"} 
    else if(event.key == "ArrowLeft" && dir !== "right") 
        {dir = "left"}
};

function eatTail(head, array) {
    for(i=0; i<array.length; i++) {
        if(array[i].x === head.x && array[i].y === head.y) {
            clearInterval(game)
        }
    }
}

function drowGame() {
    CTX.drawImage(ground, 0, 0);

    CTX.drawImage(foodImg, food.x, food.y);

    for(i = 0; i<snake.length; i++) {
        CTX.fillStyle = 'green';
        CTX.fillRect(snake[i].x, snake[i].y, box, box);
    };


    CTX.fillStyle = 'white';
    CTX.font = '50px Arial';
    CTX.fillText(score, box * 2.5, box* 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    } else {
        snake.pop();
    }

    if(snakeX < box || snakeX > box * 17
		|| snakeY < 3 * box || snakeY > box * 17){
            clearInterval(game);
            document.addEventListener('keydown', () => location.reload())
        }

    if(dir == "left") snakeX -= box;
	if(dir == "right") snakeX += box;
	if(dir == "up") snakeY -= box;
	if(dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY,
    }

    eatTail(newHead, snake);

    snake.unshift(newHead);
};

let game = setInterval(drowGame, 100);