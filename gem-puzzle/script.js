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
const saveGame = document.createElement('div');
const mainMenu = document.createElement('div');
const popupWonWrapper = document.createElement('div');
//create popup won 
const wonSpanResultTime = document.createElement('span');
const wonSpanResultMove = document.createElement('span');
//create sounde for cell
const MuteOnOff = document.createElement('button'); //mute button in main menu
const soundElement = document.createElement('div');
soundElement.classList.add('audio', 'hidden');
soundElement.innerHTML = `<audio class="audio_file" src="assets/mute.wav"></audio>`;
//CREATE GLOBAL VAR
const cellSize = 100;
//empty cell
const empty = {
    value: 0,
    top: 0,
    left: 0,
    element: null, //!
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
    gameWrap.appendChild(soundElement);

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
    menuOverlay.appendChild(popupWonGame());

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
            const cell = document.createElement('div');
            cell.classList.add('empty');

            empty.value = 16; //позиция завершения игры

            const left = i % 4;
            const top = (i - left) / 4;
            empty.left = left;
            empty.top = top;
            empty.element = cell;
            cells.push(empty);

            cell.style.left = `${left * cellSize}px`;
            cell.style.top = `${top * cellSize}px`;

            fragment.appendChild(cell);
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

            // obrabotka drag and drop mishki
            cell.addEventListener('mousedown', (event) => {
                dragDrop(i, event);
            });
        }
    }
    // console.log(cells);
    return fragment;
};

function createMainMenu() {
    console.log('function createMainMenu');
    const fragment = document.createDocumentFragment();

    const saveGameText = document.createElement('span');
    const saveGameButton = document.createElement('button');
    // const continueGame = document.createElement('button');
    const newGame = document.createElement('button');
    const savedGame = document.createElement('button');

    const settingGame = document.createElement('button');

    // continueGame.innerHTML = "Continue Game";
    saveGameText.innerHTML = "Game paused, whant to save it?"
    saveGameButton.innerHTML = "save game"
    newGame.innerHTML = "New Game";
    savedGame.innerHTML = "Saved Game";
    MuteOnOff.innerHTML = `<i class="material-icons">volume_up</i>`;

    mainMenu.classList.add('menu_container', 'active');
    saveGame.classList.add('save_game_container');
    saveGameText.classList.add('save_game_text');
    saveGameButton.classList.add('save_game_button');
    newGame.classList.add('main_menu_button');
    savedGame.classList.add('main_menu_button');
    MuteOnOff.classList.add('main_menu_button', 'mute_on');


    fragment.appendChild(mainMenu);

    saveGame.appendChild(saveGameText);
    saveGame.appendChild(saveGameButton);

    mainMenu.appendChild(newGame);
    mainMenu.appendChild(savedGame);
    mainMenu.appendChild(MuteOnOff);


    newGame.addEventListener('click', () => {
        newGameStart();
    });

    savedGame.addEventListener('click', () => {
        savedGameView();
    });

    MuteOnOff.addEventListener('click', () => {
        muteToggle();
    });

    return fragment;
};

function popupWonGame() {
    console.log('function popupWonGame');

    const fragment = document.createDocumentFragment();

    const wonSpanHeader = document.createElement('span');
    const wonSpanResult = document.createElement('span');

    const closePopup = document.createElement('button');

    wonSpanHeader.classList.add('popup_won-header');
    wonSpanResult.classList.add('popup_won-header');
    wonSpanResultTime.classList.add('popup_won-header');
    wonSpanResultMove.classList.add('popup_won-header');
    popupWonWrapper.classList.add('popup_won-container');
    closePopup.classList.add('popup_won-OK-button');

    wonSpanHeader.innerHTML = "Hooray! You won!";
    wonSpanResult.innerHTML = "Your result:";
    wonSpanResultTime.innerHTML = `time ${addZero(timeCount.min)}:${addZero(timeCount.sec)}`;
    wonSpanResultMove.innerHTML = `moves ${movesCount}`;
    closePopup.innerHTML = "OK";

    //для проверки отображения
    // mainMenu.classList.remove('active');
    // popupWonWrapper.classList.add('active');
    // popupWonWrapper.classList.remove('active');

    fragment.appendChild(popupWonWrapper);
    popupWonWrapper.appendChild(wonSpanHeader);
    popupWonWrapper.appendChild(wonSpanResult);
    popupWonWrapper.appendChild(wonSpanResultTime);
    popupWonWrapper.appendChild(wonSpanResultMove);
    popupWonWrapper.appendChild(closePopup);

    //     closePopup.addEventListener('click', () => {
    //         newGameStart();
    //     });


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
    console.log('function pausedGame');
    pauseButton.classList.toggle('active');
    if (pauseButton.classList.contains('active')) {
        field.appendChild(menuOverlay);
        menuOverlay.appendChild(saveGame);
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

};

function move(index) {
    console.log('function move');
    const cell = cells[index];

    //proverka vozmognosti peremesheniya
    const leftDiff = Math.abs(empty.left - cell.left);
    const topDiff = Math.abs(empty.top - cell.top);

    if (leftDiff + topDiff > 1) {
        cell.element.removeAttribute('draggable');
        return;
    }

    cell.element.style.left = `${empty.left * cellSize}px`;
    cell.element.style.top = `${empty.top * cellSize}px`;

    const emptyLeft = empty.left;
    const emptyTop = empty.top;

    empty.left = cell.left;
    empty.top = cell.top;

    empty.element.style.left = `${empty.left * cellSize}px`;
    empty.element.style.top = `${empty.top * cellSize}px`;

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
    if (MuteOnOff.classList.contains('mute_on')) {
        playAudio();
    };
    cell.element.removeAttribute('draggable');

    const isFinished = cells.every(cell => {
        return cell.value === (cell.top * 4 + cell.left) + 1;

    });
    // console.log('empty ' + empty.left + ' ' + empty.element.style.left);
    // console.log('cell.top : ' + cell.top);

    if (isFinished) {
        //&& empty.left === empty.element.style.left && empty.top === empty.element.style.top
        stopTimer();
        setTimeout(wonAlert, 400);
    }
};

function wonAlert() {
    console.log('function wonAlert');

    field.appendChild(menuOverlay);
    stopTimer();
    popupWonWrapper.classList.add('active');
    wonSpanResultTime.innerHTML = `time ${addZero(timeCount.min)}:${addZero(timeCount.sec)}`;
    wonSpanResultMove.innerHTML = `moves ${movesCount}`;

    // alert(`Hooray!!! You won!!! Your result time: ${addZero(timeCount.min)}:${addZero(timeCount.sec)} and ${movesCount} moves`);

};

function dragDrop(index) {
    console.log('function dragDrop');
    const cell = cells[index];
    cell.element.setAttribute('draggable', true);

    document.addEventListener("dragstart", function(event) {
        // делаем объект невидимым
        event.target.style.opacity = 0;
    }, false);

    document.addEventListener("dragend", function(event) {
        event.target.style.opacity = "";
        cell.element.style.transition = "";
    }, false);

    /* отключение стандартного запрета на перемещение на другой объект */
    document.addEventListener("dragover", function(event) {
        event.preventDefault();
    }, false);

    document.addEventListener("dragenter", function(event) {
        // highlight potential drop target when the draggable element enters it
        if (event.target.className === "empty") {
            event.target.style.background = "rgb(219, 199, 201)";
        }
    }, false);

    document.addEventListener("dragleave", function(event) {
        // reset background of potential drop target when the draggable element leaves it
        if (event.target.className == "empty") {
            event.target.style.background = "";
        }
    }, false);

    document.addEventListener("drop", function(event) {
        // prevent default action (open as link for some elements)
        event.preventDefault();
        // move dragged elem to the selected drop target
        if (event.target.className === "empty" && cell.element.hasAttribute('draggable')) {
            move(index);
            event.target.style.background = "";
            cell.element.style.transition = "none";
        }
    }, false);
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
        if (numbers[elemNumber] === 0) {
            const rowZero = (elemNumber - elemNumber % 4) / 4;
            count += rowZero + 1;
            // console.log('count: ' + count);
        } else {
            while (j < numbers.length) {

                if (numbers[elemNumber] > numbers[j] && numbers[j] !== 0) {
                    count += 1;
                }
                // console.log(numbers[elemNumber] + '  ' + numbers[j] + ' ' + count);
                j++;
            }
        }
    }

    console.log('count: ' + count);
    return count % 2 === 0 ? true : false;

};

function muteToggle() {
    console.log("function muteToggle");
    MuteOnOff.classList.toggle('mute_on');

    MuteOnOff.innerHTML = MuteOnOff.classList.contains('mute_on') ? `<span class="material-icons">volume_up</span>` : `<span class="material-icons">volume_off</span>`;
};

function playAudio() {
    console.log("function playAudio");
    const audio = document.querySelector('audio');
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
};


initGame();
// createMainMenu();