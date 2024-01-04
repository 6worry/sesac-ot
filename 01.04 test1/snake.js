const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const blockSize = 20;
const canvasSize = 400;
const snakeSpeed = 200; // 200ms

let snake = [
    {x: 0, y: 0}, // 위치 초기값
];

let direction = 'right'; // 뱀의 이동 방향
let snakeLength = 5;

function draw() {
    context.clearRect(0, 0, canvasSize, canvasSize); // 지나간 이동경로 지우기 (화면클리어)
    drawSnake();
    moveSnake();
};

function drawSnake() {
    context.fillStyle = '#ff00ff';
    snake.forEach(segment => {
        context.fillRect(segment.x * blockSize, segment.y * blockSize, blockSize, blockSize); // x좌표, y좌표, 블럭 x 가로길이, 블럭 y 세로길이
    });
};

function moveSnake() {
    const head = { ... snake[0] };
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
    if (head.x < 0 || head.x >= canvasSize/blockSize ||
        head.y < 0 || head.y >= canvasSize/blockSize
    ) {
        return;
    }
    // 만약 벗어나지 않았을 경우
    snake.unshift(head); // 뱀 머리 추가

    if (snake.length > 3) {
        snake.pop(snake[0])
    }
};

// 키보드 이벤트 등록
document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    console.log(event.key)
    switch (event.key) {
        case 'ArrowUp':
            direction = 'up';
            break;
        case 'ArrowDown':
            direction = 'down';
            break;
        case 'ArrowLeft':
            direction = 'left';
            break;
        case 'ArrowRight':
            direction = 'right';
            break;
        // case 'ArrowUp':
        //     direction = event.key.toLowerCase().replace('arrow', '');
        //     break;
    };
};

// 일정 시간마다 draw 반복
setInterval(draw, snakeSpeed);