const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const blockSize = 20;
const canvasSize = 400;
const snakeSpeed = 200; // 200ms

let snake = [
    {x: 0, y: 0}, // 위치 초기값
];

let food = generateFood();
let gameover = false;
let direction = 'right'; // 뱀의 이동 방향
let directionBuffer = []; // 키 입력 버퍼
// let snakeLength = 5;

function draw() {
    context.clearRect(0, 0, canvasSize, canvasSize); // 지나간 이동경로 지우기 (화면클리어)

    if (gameover) {
        context.fillStyle = '#FOF';
        context.font = '40px Arial';
        context.fillText('게임오버', 100, canvasSize / 2);
        // 재시작 여부 확인
        context.font = '25px Arial';
        context.fillText('다시해봐ㅋ 재시작: r', 80, canvasSize /2 +40)

        return;
    };

    drawSnake();
    drawFood();

    moveSnake();
    checkCollision();
    checkFood();
};

function drawSnake() {
    context.fillStyle = '#ff00ff';
    snake.forEach(segment => {
        context.fillRect(segment.x * blockSize, segment.y * blockSize, blockSize, blockSize); // x좌표, y좌표, 블럭 x 가로길이, 블럭 y 세로길이
    });
};

function drawFood() {
    context.fillStyle = '#00F';
    context.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize);
};

function generateFood() {
    // 음식 생성 및 뱀과 겹치지 않게
    let foodPosition;

    do {        
        foodPosition = {
            x: Math.floor(Math.random() * (canvasSize/blockSize)), 
            y: Math.floor(Math.random() * (canvasSize/blockSize))
        };
    } while (isFoodOnSnake(foodPosition));

    return foodPosition;
};

function isFoodOnSnake(foodPosition) {
    // 구현하면서 음식이 있는 위치에 뱀도 존재하는지 확인
    let isOnSnake = false;

    snake.forEach(segment => {
        if (segment.x === foodPosition.x && segment.y === foodPosition.y) {
            isOnSnake = true;
        };
    });

    return isOnSnake;

    // return snake.some(segment => segment.x === foodPosition.x && segment.y === foodPosition.y);
}

function checkCollision() {
    const head = snake[0]; // 뱀의 머리
    // 벽에 박으면 게임오버
    if (head.x < 0 || head.x >= canvasSize/blockSize ||
        head.y < 0 || head.y >= canvasSize/blockSize ||
        isSnakeCollision()
    ) {
        console.log('게임오버');
        gameover = true;
    };
};

function isSnakeCollision() {
    const head = snake[0]; // 뱀의 머리
    return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

function checkFood() {
    const head = snake[0]; // 뱀의 머리

    // 뱀머리 food위치와 같은지 확인하고 같으면 음식 재생성
    if (food.x === head.x && food.y === head.y) {
        food = generateFood();
    } else {
        snake.pop()
    };
};

function moveSnake() {
    const head = { ... snake[0] };

    if (directionBuffer.length > 0) {
        direction = directionBuffer.shift();
    };

    switch (direction) {
        case 'up':
            head.y -= 1;
            break;
        case 'down':
            head.y += 1;
            break;
        case 'left':
            head.x -= 1;
            break;
        case 'right':
            head.x += 1;
            break;
    };

    // 화면 벗어나지 않게
    // if (head.x < 0 || head.x >= canvasSize/blockSize ||
    //     head.y < 0 || head.y >= canvasSize/blockSize
    // ) {
    //     return;
    // };

    // 만약 벗어나지 않았을 경우
    snake.unshift(head); // 뱀 머리 추가

    // if (snake.length > snakeLength) {
    //     snake.pop();
    // };
};

// 키보드 이벤트 등록
document.addEventListener('keydown', handleKeyPress);
let lastKeyPressTime = 0; // 최종키 입력시간

function resetGame() {
    snake = [{ x: 0, y:0 }];
    direction = 'right';
    food = generateFood();
    gameover = false;
};

function handleKeyPress(event) {
    console.log(event.key)

    if (gameover) {
        if (event.key.toLowerCase() === 'r') {
            resetGame();
        };
    };

    // 키 입력시 이번 입력과 다음 입력을 200ms 안에 한번만 받게 함
    // const now = Date.now();
    // const timeSinceLastKeyPress = now - lastKeyPressTime;
    // console.log(timeSinceLastKeyPress)

    // if (timeSinceLastKeyPress < snakeSpeed) {
    //     console.log('무시')
    //     return;
    // };

    if (directionBuffer.length >=2 ) {
        console.log('적당히 눌러라', directionBuffer)
        return;
    };

    let previousKeyPress = direction;

    if (directionBuffer.length > 0) {
        previousKeyPress = directionBuffer[directionBuffer.length -1];
    };

    switch (event.key) {
        case 'ArrowUp':
            if (previousKeyPress !== 'down') {
                // direction = 'up';
                directionBuffer.push('up');
            };
            break;
        case 'ArrowDown':
            if (previousKeyPress !== 'up') {
                // direction = 'down';
                directionBuffer.push('down');
            };
            break;
        case 'ArrowLeft':
            if (previousKeyPress !== 'right') {
                // direction = 'left';
                directionBuffer.push('left');
            };
            break;
        case 'ArrowRight':
            if (previousKeyPress !== 'left') {
                // direction = 'right';
                directionBuffer.push('right');
            }
            break;
        // case 'ArrowUp':
        // case 'ArrowDown':
        // case 'ArrowLeft':
        // case 'ArrowRight':
        //     direction = event.key.toLowerCase().replace('arrow', '');
        //     break;
    };
    // lastKeyPressTime = now;
};

// 일정 시간마다 draw 반복
setInterval(draw, snakeSpeed);