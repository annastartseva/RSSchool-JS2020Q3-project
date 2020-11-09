//CREATE ELEMENTS
//create main elements
const gameWrap = document.createElement('div');
//create menu header
const menuWrap = document.createElement('div');
const timeInfo = document.createElement('div');
const timerText = document.createElement('span');
const timeValue = document.createElement('span');
const movesInfo = document.createElement('div');
const numberMoves = document.createElement('span');
const numberMovesCount = document.createElement('span');
const pauseButton = document.createElement('button');
// create game's field
const field = document.createElement('div');
//create main menu 
const menuOverlay = document.createElement('span');
const mainMenu = document.createElement('div');

//CREATE GLOBAL VAR
const cellSize = 100;
//empty cell
const empty = {
    value: 0,
    top: 0,
    left: 0,
};
const timeCount = {
    min: 0,
    sec: 0,
};
let movesCount = 0;
const cells = [];
let timerId = 0;
let numbers = [];


function initGame() {
    console.log('function initGame');

    //setup properties for main elements
    gameWrap.classList.add('game_wrapper');
    menuWrap.classList.add('menu_wrapper');

    timeValue.classList.add('menu_timer');
    numberMovesCount.classList.add('menu_moves');

    pauseButton.classList.add('menu_button');
    field.classList.add('field');
    menuOverlay.classList.add('overlay', 'visible');

    timerText.innerHTML = "Time ";
    timeValue.innerHTML = `${addZero(timeCount.min)}:${addZero(timeCount.sec)}`;
    numberMoves.innerHTML = "Moves ";
    numberMovesCount.innerText = movesCount;
    pauseButton.innerHTML = "Pause game";

    pauseButton.addEventListener('click', () => {
        pausedGame();
    });

    //Add to DOM
    gameWrap.appendChild(menuWrap);
    gameWrap.appendChild(field);

    menuWrap.appendChild(timeInfo);
    menuWrap.appendChild(movesInfo);
    menuWrap.appendChild(pauseButton);

    timeInfo.appendChild(timerText);
    timeInfo.appendChild(timeValue);

    movesInfo.appendChild(numberMoves);
    movesInfo.appendChild(numberMovesCount);

    field.appendChild(createNewGame());
    field.appendChild(menuOverlay);

    menuOverlay.appendChild(createMainMenu());

    document.body.appendChild(gameWrap);
};

function createArrayNumbers() {
    numbers = [...Array(16).keys()]
        .sort(() => Math.random() - 0.5);
    console.log(numbers);

    const resultHaveSolution = haveSolution();

    if (resultHaveSolution === false) {
        createArrayNumbers();
    }

};

function createNewGame() {
    console.log('function createNewGame');

    createArrayNumbers();

    numberMovesCount.innerText = movesCount;

    const fragment = document.createDocumentFragment();
    movesCount = 0;

    for (let i = 0; i <= 15; i++) {
        if (numbers[i] === 0) {
            empty.value = 16;

            const left = i % 4;
            const top = (i - left) / 4;
            empty.left = left;
            empty.top = top;
            cells.push(empty);
        } else {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            const value = numbers[i];
            cell.innerHTML = value;

            const left = i % 4;
            const top = (i - left) / 4;

            cells.push({
                value: value,
                left: left,
                top: top,
                element: cell
            });

            cell.style.left = `${left * cellSize}px`;
            cell.style.top = `${top * cellSize}px`;

            fragment.appendChild(cell);

            cell.addEventListener('click', () => {
                move(i);
            });
        }
    }

    return fragment;
};

function createMainMenu() {
    console.log('function createMainMenu');
    const fragment = document.createDocumentFragment();

    // const continueGame = document.createElement('button');
    const newGame = document.createElement('button');
    const saveGame = document.createElement('button');
    const settingGame = document.createElement('button');

    // continueGame.innerHTML = "Continue Game";
    newGame.innerHTML = "New Game";
    saveGame.innerHTML = "Saved Game";



    mainMenu.classList.add('menu_container', 'active');
    newGame.classList.add('main_menu_button');
    saveGame.classList.add('main_menu_button');


    fragment.appendChild(mainMenu);
    mainMenu.appendChild(newGame);
    mainMenu.appendChild(saveGame);

    newGame.addEventListener('click', () => {
        newGameStart();
    });


    return fragment;
};

function newGameStart() {
    // mainMenu.classList.add('hidden');
    mainMenu.classList.add('visually-hidden');
    mainMenu.classList.remove('active');
    pauseButton.classList.remove('active');
    cells.length = 0;
    numbers.length = 0;
    movesCount = 0;
    clearCell();
    clearTimer();
    field.appendChild(createNewGame());
    timerId = window.setInterval(startTimer, 1000);
};

function pausedGame() {
    pauseButton.classList.toggle('active');
    if (pauseButton.classList.contains('active')) {
        field.appendChild(menuOverlay);
        stopTimer();
        // mainMenu.classList.remove('hidden');
        mainMenu.classList.remove('visually-hidden');
        mainMenu.classList.add('active');
    } else {
        mainMenu.classList.add('visually-hidden');
        mainMenu.classList.remove('active');
        field.removeChild(menuOverlay);
        timerId = window.setInterval(startTimer, 1000);
    }

}

function move(index) {
    console.log('function move');
    const cell = cells[index];


    //proverka vozmognosti peremesheniya
    const leftDiff = Math.abs(empty.left - cell.left);
    const topDiff = Math.abs(empty.top - cell.top);

    if (leftDiff + topDiff > 1) {
        return;
    }

    cell.element.style.left = `${empty.left * cellSize}px`;
    cell.element.style.top = `${empty.top * cellSize}px`;

    const emptyLeft = empty.left;
    const emptyTop = empty.top;

    empty.left = cell.left;
    empty.top = cell.top;

    cell.left = emptyLeft;
    cell.top = emptyTop;

    // console.log('cell.value ' + cell.value);
    // console.log('cell.top : ' + cell.top);
    // console.log('cell.top * 4 : ' + cell.top * 4);
    // console.log(' cell.left : ' + cell.left);
    // console.log('(cell.top * 4 + cell.left) : ' + (cell.top * 4 + cell.left));
    // console.log('(cell.top * 4 + cell.left) +1 : ' + ((cell.top * 4 + cell.left) + 1));
    movesCount += 1;
    // console.log('movesCount: ' + movesCount)
    numberMovesCount.innerText = movesCount;
    const isFinished = cells.every(cell => {
        return cell.value === (cell.top * 4 + cell.left) + 1;

    });

    if (isFinished) {
        alert('You won');
    }
};

function startTimer() {
    timeCount.sec += 1;
    if (timeCount.sec === 60) {
        timeCount.sec = 0;
        timeCount.min += 1;
    }

    timeValue.innerHTML = `${addZero(timeCount.min)}:${addZero(timeCount.sec)}`;
};

function stopTimer() {
    window.clearInterval(timerId);
};

function clearTimer() {
    timeCount.sec = 0;
    timeCount.min = 0;
    timeValue.innerHTML = `${addZero(timeCount.min)}:${addZero(timeCount.sec)}`;
}

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function clearCell() {
    console.log('function clearCell');

    const cellContainer = document.querySelector(".field");

    while (cellContainer.firstChild) {
        cellContainer.removeChild(cellContainer.firstChild);
    }
};

function haveSolution() {
    let count = 0;

    for (let i = 0; i < numbers.length; i++) {
        const elemNumber = i;
        let j = i;
        // console.log('array[elemNumber] ' + numbers[elemNumber]);
        while (j < numbers.length) {

            if (numbers[elemNumber] > numbers[j]) {
                count += 1;
            }
            // console.log(numbers[elemNumber] + '  ' + numbers[j] + ' ' + count);
            j++;
        }
    }

    console.log('count: ' + count);
    return count % 2 === 0 ? true : false;

};

initGame();
// createMainMenu();