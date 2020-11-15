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
const savedGameWrapper = document.createElement('div');
const bestScoreWrapper = document.createElement('div');
//create popup won 
const wonSpanResultSize = document.createElement('span');
const wonSpanResultTime = document.createElement('span');
const wonSpanResultMove = document.createElement('span');
//create saved games block
const savedGameHeader = document.createElement('span');
const savedGameData = document.createElement('div');
const savedGameSize = document.createElement('span');
const savedGameTime = document.createElement('span');
const savedGameMoves = document.createElement('span');
const savedGameLoad = document.createElement('button');
//create best scores games block
const bestScoreHeader = document.createElement('span');
const bestScoreData = document.createElement('div');
const bestScoreData1 = document.createElement('div');
const bestScoreData2 = document.createElement('div');
const bestScoreData3 = document.createElement('div');
//create sounde for cell
const MuteOnOff = document.createElement('button'); //mute button in main menu
const soundElement = document.createElement('div');
soundElement.classList.add('audio', 'hidden');
soundElement.innerHTML = `<audio class="audio_file" src="assets/mute.wav"></audio>`;
// on/off image on cell
const cellWithImage = document.createElement('button');
//CREATE GLOBAL VAR
const fieldSizePx = 400;
let cellSize = 100;
//current number cell & field size
const CellNumberArray = [3, 4, 5, 6, 7, 8];
let cellNumberCurrent = 4;
let allCellNumberField = null; //всего количество ячеек на поле
//empty cell
const empty = {
    value: 0,
    top: 0,
    left: 0,
    size: null,
    element: null,
};
const timeCount = {
    min: 0,
    sec: 0,
};
let timerId = 0;
let movesCount = 0;
const cells = [];

let numbers = [];

let savedGameCount = {}; //объект для сохранения игры
let bestScoresCount = [{
    moves: "Moves",
    time: "Times",
    size: "Size"
}]; //для сохранения лучших результатов
let gameSaveFlag = false;

let imageFlag = false;

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
    pauseButton.innerHTML = "Pause/Menu";

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
    menuOverlay.appendChild(savedGameCreate());
    menuOverlay.appendChild(bestScoreCreate());



    document.body.appendChild(gameWrap);
};

function createArrayNumbers() {
    console.log('function createArrayNumbers');


    allCellNumberField = cellNumberCurrent * cellNumberCurrent;
    console.log('allCellNumberField ' + allCellNumberField);

    numbers = [...Array(allCellNumberField).keys()]
        .sort(() => Math.random() - 0.5);
    console.log(numbers);

    const resultHaveSolution = haveSolution();

    if (resultHaveSolution === false) {
        createArrayNumbers();
    }

};

function createNewGame() {
    console.log('function createNewGame');
    randomImg = `assets/${Math.floor(Math.random()*20 + 1)}.jpg`;
    createArrayNumbers();
    if (imageFlag) {
        field.style.backgroundImage = `url(${randomImg})`;
        field.style.backgroundSize = "100%";
    } else {
        field.style.backgroundImage = '';
    }

    numberMovesCount.innerText = movesCount;
    cellSize = fieldSizePx / cellNumberCurrent;
    const fragment = document.createDocumentFragment();
    movesCount = 0;

    // for (let i = 0; i <= 15; i++) {
    for (let i = 0; i <= allCellNumberField - 1; i++) {

        if (numbers[i] === 0) {
            const cell = document.createElement('div');
            cell.classList.add('empty');

            // empty.value = 16; //позиция завершения игры
            empty.value = allCellNumberField; //позиция завершения игры

            // const left = i % 4;
            // const top = (i - left) / 4;
            const left = i % cellNumberCurrent;
            const top = (i - left) / cellNumberCurrent;
            empty.left = left;
            empty.top = top;
            empty.size = fieldSizePx / cellNumberCurrent;
            empty.element = cell;
            cells.push(empty);

            cell.style.left = `${left * cellSize}px`;
            cell.style.top = `${top * cellSize}px`;

            cell.style.width = `${fieldSizePx / cellNumberCurrent}px`;
            cell.style.height = `${fieldSizePx / cellNumberCurrent}px`;

            fragment.appendChild(cell);
        } else {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            const value = numbers[i];
            cell.innerHTML = value;

            // const left = i % 4;
            // const top = (i - left) / 4;
            const left = i % cellNumberCurrent;
            const top = (i - left) / cellNumberCurrent;
            if (imageFlag) {
                const posLeft = (numbers[i] - 1) % cellNumberCurrent;
                const posTop = (numbers[i] - 1 - posLeft) / cellNumberCurrent;
                console.log('numbers[i] ' + numbers[i]);
                console.log('posLeft ' + posLeft);
                console.log('posTop ' + posTop);
                cell.style.backgroundImage = `url(${randomImg})`;
                cell.style.backgroundSize = `${cellNumberCurrent*100}%`;
                cell.style.backgroundPosition = `-${posLeft*100}% -${posTop*100}%`;
            }
            cells.push({
                value: value,
                left: left,
                top: top,
                size: fieldSizePx / cellNumberCurrent,
                element: cell
            });

            cell.style.left = `${left * cellSize}px`;
            cell.style.top = `${top * cellSize}px`;

            cell.style.width = `${fieldSizePx / cellNumberCurrent}px`;
            cell.style.height = `${fieldSizePx / cellNumberCurrent}px`;

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

function newGameStart() {
    console.log('function newGameStart');
    // mainMenu.classList.add('visually-hidden');
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

function createMainMenu() {
    console.log('function createMainMenu');
    const fragment = document.createDocumentFragment();

    const saveGameText = document.createElement('span');
    const saveGameButton = document.createElement('button');

    const newGame = document.createElement('button');
    const savedGame = document.createElement('button');
    const bestScore = document.createElement('button');
    const fieldSize = document.createElement('form');
    const fieldSizeText = document.createElement('label');
    // const fieldSizeСhoice = document.createElement('form');
    const fieldSizeСhoiceUl = document.createElement('select');



    // continueGame.innerHTML = "Continue Game";
    saveGameText.innerHTML = "Game pause, want to save the game?"
    saveGameButton.innerHTML = "save game"
    newGame.innerHTML = "New Game";
    savedGame.innerHTML = "Saved Game";
    bestScore.innerHTML = "Best Scores";
    fieldSizeText.innerHTML = "Field Size";
    cellWithImage.innerHTML = "Display Image";
    MuteOnOff.innerHTML = `<i class="material-icons">volume_up</i>`;

    mainMenu.classList.add('menu_container', 'active');
    saveGame.classList.add('save_game_container');
    saveGameText.classList.add('save_game_text');
    saveGameButton.classList.add('save_game_button');
    newGame.classList.add('main_menu_button');
    savedGame.classList.add('main_menu_button');
    bestScore.classList.add('main_menu_button');
    fieldSize.classList.add('main_menu_field-size');
    fieldSizeText.classList.add('main_menu_field-label');
    fieldSizeСhoiceUl.classList.add('main_menu_field-select');
    cellWithImage.classList.add('main_menu_button');
    MuteOnOff.classList.add('main_menu_button', 'mute_on');

    fragment.appendChild(mainMenu);
    fragment.appendChild(saveGame);

    saveGame.appendChild(saveGameText);
    saveGame.appendChild(saveGameButton);

    mainMenu.appendChild(newGame);
    mainMenu.appendChild(savedGame);
    mainMenu.appendChild(bestScore);
    mainMenu.appendChild(fieldSize);
    mainMenu.appendChild(cellWithImage);
    mainMenu.appendChild(MuteOnOff);

    fieldSize.appendChild(fieldSizeText);
    fieldSize.appendChild(fieldSizeСhoiceUl);
    // fieldSize.appendChild(fieldSizeСhoice);
    // fieldSizeСhoice.appendChild(fieldSizeСhoiceUl);

    for (let i = 0; i < CellNumberArray.length; i++) {
        const fieldSizeСhoiceLi = document.createElement('option');
        fieldSizeСhoiceLi.setAttribute('value', `${CellNumberArray[i]}`);
        if (CellNumberArray[i] === 4) {
            fieldSizeСhoiceLi.setAttribute('selected', "selected");
        }
        fieldSizeСhoiceLi.classList.add('main_menu_field-text');
        fieldSizeСhoiceLi.innerHTML = `${CellNumberArray[i]}x${CellNumberArray[i]}`;;
        fieldSizeСhoiceUl.appendChild(fieldSizeСhoiceLi);
    }

    newGame.addEventListener('click', () => {
        newGameStart();
        gameSaveFlag = true;
    });

    savedGame.addEventListener('click', () => {
        mainMenu.classList.remove('active');
        saveGame.classList.remove('active');
        savedGameWrapper.classList.add('active');
        savedGameView();
    });

    bestScore.addEventListener('click', () => {
        mainMenu.classList.remove('active');
        saveGame.classList.remove('active');
        bestScoreWrapper.classList.add('active');
        bestScoreView();
    });

    fieldSizeСhoiceUl.addEventListener('click', () => {
        cellNumberCurrent = fieldSizeСhoiceUl.value;
        console.log('cellNumberCurrent ' + cellNumberCurrent);
        // console.log('fieldSizeСhoiceUl.value ' + fieldSizeСhoiceUl.value);
    });

    cellWithImage.addEventListener('click', () => {

        if (imageFlag) {
            imageFlag = false;
            cellWithImage.innerHTML = "Display Image";
        } else {
            imageFlag = true;
            cellWithImage.innerHTML = "Hide Image";
        }
    });

    MuteOnOff.addEventListener('click', () => {
        muteToggle();
    });

    saveGameButton.addEventListener('click', () => {
        savedGameRecord();
        gameSaveFlag = false;
    })
    return fragment;
};

function pausedGame() {
    console.log('function pausedGame');
    pauseButton.classList.toggle('active');
    popupWonWrapper.classList.remove('active');
    if (pauseButton.classList.contains('active')) {
        field.appendChild(menuOverlay);
        stopTimer();
        // mainMenu.classList.remove('visually-hidden');
        mainMenu.classList.add('active');
        saveGame.classList.add('active');
    } else {
        // mainMenu.classList.add('visually-hidden');
        mainMenu.classList.remove('active');
        saveGame.classList.remove('active');
        bestScoreWrapper.classList.remove('active');

        field.removeChild(menuOverlay);
        timerId = window.setInterval(startTimer, 1000);
        gameSaveFlag = true;
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

    // console.log('cells : ' + cells);
    // for (let i = 0; i < 15; i++) {
    //     console.log('cell.value : ' + cells[i].value);
    //     console.log('(cell.top * 4 + cell.left) + 1 : ' + ((cells[i].top * 4 + cells[i].left) + 1));
    // };


    // const isFinished = cells.every(cell => {
    //     return cell.value === (cell.top * 4 + cell.left) + 1;
    // });
    const isFinished = cells.every(cell => {
        return cell.value === (cell.top * cellNumberCurrent + cell.left) + 1;
    });

    console.log('isFinished : ' + isFinished);

    // console.log('empty ' + empty.left + ' ' + empty.element.style.left);
    // console.log('cell.top : ' + cell.top);

    if (isFinished) {
        //&& empty.left === empty.element.style.left && empty.top === empty.element.style.top
        stopTimer();
        setTimeout(wonAlert, 400);
    }
};

function popupWonGame() {
    console.log('function popupWonGame');

    const fragment = document.createDocumentFragment();

    const wonSpanHeader = document.createElement('span');
    const wonSpanResult = document.createElement('span');

    const closePopup = document.createElement('button');

    wonSpanHeader.classList.add('popup_won-header');
    wonSpanResult.classList.add('popup_won-header');
    wonSpanResultSize.classList.add('popup_won-header');
    wonSpanResultTime.classList.add('popup_won-header');
    wonSpanResultMove.classList.add('popup_won-header');
    popupWonWrapper.classList.add('popup_won-container');
    closePopup.classList.add('popup_won-OK-button');

    wonSpanHeader.innerHTML = "Hooray! You won!";
    wonSpanResult.innerHTML = "Your result:";
    // wonSpanResultSize.innerHTML = `Size ${cellNumberCurrent}:${cellNumberCurrent}`;
    // wonSpanResultTime.innerHTML = `Time ${addZero(timeCount.min)}:${addZero(timeCount.sec)}`;
    // wonSpanResultMove.innerHTML = `Moves ${movesCount}`;
    closePopup.innerHTML = "OK";

    //для проверки отображения
    // mainMenu.classList.remove('active');
    // popupWonWrapper.classList.add('active');
    // popupWonWrapper.classList.remove('active');

    fragment.appendChild(popupWonWrapper);
    popupWonWrapper.appendChild(wonSpanHeader);
    popupWonWrapper.appendChild(wonSpanResult);
    popupWonWrapper.appendChild(wonSpanResultSize);
    popupWonWrapper.appendChild(wonSpanResultTime);
    popupWonWrapper.appendChild(wonSpanResultMove);
    popupWonWrapper.appendChild(closePopup);


    closePopup.addEventListener('click', () => {
        popupWonWrapper.classList.remove('active');
        saveGame.classList.remove('active');
        mainMenu.classList.add('active');
    });

    return fragment;
};

function savedGameCreate() {
    console.log('function savedGameCreate');

    const fragment = document.createDocumentFragment();

    const savedGameBack = document.createElement('button');

    savedGameWrapper.classList.add('saved_game-container');
    savedGameHeader.classList.add('saved_game-header');
    savedGameData.classList.add('saved_game-data');
    savedGameSize.classList.add('saved_game-text');
    savedGameTime.classList.add('saved_game-text');
    savedGameMoves.classList.add('saved_game-text');

    savedGameLoad.classList.add('saved_game-button-load');
    savedGameBack.classList.add('button-back');

    savedGameHeader.innerHTML = "No Saved Game";
    savedGameLoad.innerHTML = "Load Game";
    savedGameBack.innerHTML = "BACK";

    //для проверки отображения
    // mainMenu.classList.remove('active');
    // savedGameWrapper.classList.add('active');
    // popupWonWrapper.classList.remove('active');

    fragment.appendChild(savedGameWrapper);
    savedGameWrapper.appendChild(savedGameHeader);
    savedGameWrapper.appendChild(savedGameData);
    savedGameData.appendChild(savedGameSize);
    savedGameData.appendChild(savedGameTime);
    savedGameData.appendChild(savedGameMoves);
    savedGameData.appendChild(savedGameLoad);
    savedGameWrapper.appendChild(savedGameBack);

    savedGameLoad.addEventListener('click', () => {
        savedGameGetFromLS();
        field.appendChild(savedGameLoadFunc());
    });

    savedGameBack.addEventListener('click', () => {
        savedGameWrapper.classList.remove('active');
        mainMenu.classList.add('active');
        if (gameSaveFlag) {
            saveGame.classList.add('active');
        };
    });


    return fragment;
};

function savedGameView() {
    if ("name" in savedGameCount) {
        savedGameHeader.innerHTML = "Saved Game";
        savedGameSize.innerHTML = `Size ${savedGameCount.size}x${savedGameCount.size}`
        savedGameTime.innerHTML = `Time ${addZero(savedGameCount.timeMin)}:${addZero(savedGameCount.timeSec)}`;
        savedGameMoves.innerHTML = `Moves ${savedGameCount.move}`;
        savedGameLoad.classList.add('active');
    } else {
        savedGameHeader.innerHTML = "No Saved Game";
    }
};

function savedGameRecord() {
    console.log('function savedGameRecord');
    savedGameCount.name = "1";
    savedGameCount.size = cellNumberCurrent;
    savedGameCount.timeMin = timeCount.min;
    savedGameCount.timeSec = timeCount.sec;
    savedGameCount.move = movesCount;
    savedGameCount.arrayValue = [...cells];

    savedGameCount.arrayEmptyValue = empty.value;
    savedGameCount.arrayEmptyTop = empty.top;
    savedGameCount.arrayEmptyLeft = empty.left;
    savedGameCount.arrayEmptySize = empty.size;

    savedGameCount.arrayEmptyElement = empty.element;
    saveGame.classList.remove('active');
    console.log('savedGameCount.arrayValue ' + savedGameCount.arrayValue);
    // localStorage.setItem('saved game', savedGameCount);
    localStorage.game = JSON.stringify(savedGameCount);
    // sessionStorage.gameEl = JSON.stringify(savedGameCount.arrayEmptyElement);
};

function savedGameGetFromLS() {
    console.log('function savedGameLoadFunc');
    // console.log("localStorage.getItem('saved game') " + localStorage.getItem('saved game'));
    // if (localStorage.getItem('saved game') !== null && localStorage.getItem('saved game') !== '') {
    //     savedGameCount = localStorage.getItem('saved game');
    console.log("localStorage.game " + localStorage.game);
    if (localStorage.game !== null && localStorage.game !== '' && localStorage.game !== undefined) {
        savedGameCount = JSON.parse(localStorage.game);
        // console.log("savedGameGetFromLS if");
        // console.log("savedGameCount.name " + savedGameCount.name);
        // console.log("savedGameCount.size " + savedGameCount.size);
        // console.log("savedGameCount.timeMin " + savedGameCount.timeMin);
        // console.log("savedGameCount.move " + savedGameCount.move);

        // for (let i = 0; i <= 15; i++) {
        const sizeFieldSave = savedGameCount.size * savedGameCount.size;
        for (let i = 0; i <= sizeFieldSave - 1; i++) {
            const cell = document.createElement('div');
            // if (savedGameCount.arrayValue[i].value === 16) {
            if (savedGameCount.arrayValue[i].value === sizeFieldSave) {

                cell.classList.add('empty');
                cell.innerHTML = '';
                cell.style.left = `${savedGameCount.arrayValue[i].left * (fieldSizePx / savedGameCount.size)}px`;
                cell.style.top = `${savedGameCount.arrayValue[i].top *  (fieldSizePx / savedGameCount.size)}px`;
                cell.style.width = `${fieldSizePx / savedGameCount.size}px`;
                cell.style.height = `${fieldSizePx / savedGameCount.size}px`;
                savedGameCount.arrayValue[i].element = cell;
                savedGameCount.arrayEmptyElement = cell;
            } else {

                cell.classList.add('cell');
                cell.innerHTML = savedGameCount.arrayValue[i].value;
                cell.style.left = `${savedGameCount.arrayValue[i].left *  (fieldSizePx / savedGameCount.size)}px`;
                cell.style.top = `${savedGameCount.arrayValue[i].top *  (fieldSizePx / savedGameCount.size)}px`;
                cell.style.width = `${fieldSizePx / savedGameCount.size}px`;
                cell.style.height = `${fieldSizePx / savedGameCount.size}px`;
                savedGameCount.arrayValue[i].element = cell;
            };
            cell.addEventListener('click', () => {
                move(i);
            });

            // obrabotka drag and drop mishki
            cell.addEventListener('mousedown', (event) => {
                dragDrop(i, event);
            });
        };
    };
};

function savedGameLoadFunc() {
    console.log('function savedGameLoadFunc');

    //скрываем меню
    // mainMenu.classList.add('visually-hidden');
    mainMenu.classList.remove('active');
    pauseButton.classList.remove('active');
    savedGameWrapper.classList.remove('active');
    field.removeChild(menuOverlay);

    //очищаем поле игры и массив хранящий значения ячеек
    clearCell();
    cells.length = 0;
    clearTimer();

    cellSize = savedGameCount.arrayEmptySize;
    cellNumberCurrent = savedGameCount.size;
    movesCount = savedGameCount.move;
    timeCount.min = savedGameCount.timeMin;
    timeCount.sec = savedGameCount.timeSec;

    numberMovesCount.innerText = movesCount;
    timeValue.innerHTML = `${addZero(timeCount.min)}:${addZero(timeCount.sec)}`;
    //
    const fragment = document.createDocumentFragment();
    // for (let i = 0; i <= 15; i++) {
    const sizeFieldSave = savedGameCount.size * savedGameCount.size;
    for (let i = 0; i <= sizeFieldSave - 1; i++) {
        cells[i] = savedGameCount.arrayValue[i];
        // console.log('cells[i].value ' + cells[i].value);
        // console.log('savedGameCount.arrayValueEmpty.cell ' + savedGameCount.arrayValueEmpty.cell);
        // if (cells[i].value === 16) {
        if (cells[i].value === sizeFieldSave) {
            // console.log('savedGameCount.arrayValueEmpty ' + savedGameCount.arrayValueEmpty);
            // console.log('savedGameCount.arrayValueEmpty.value ' + savedGameCount.arrayValueEmpty.value);
            // console.log('savedGameCount.arrayValueEmpty.value.top ' + savedGameCount.arrayValueEmpty.top);
            // console.log('savedGameCount.arrayValueEmpty.value.cell ' + savedGameCount.arrayValueEmpty.cell);

            empty.value = savedGameCount.arrayEmptyValue;
            empty.left = savedGameCount.arrayEmptyLeft;
            empty.top = savedGameCount.arrayEmptyTop;
            empty.size = savedGameCount.arrayEmptySize;
            empty.element = savedGameCount.arrayEmptyElement;
            cells[i] = empty;
            // console.log(' empty.value ' + empty.value);
            // console.log(' empty.left ' + empty.left);

        }
        // console.log(' cells[i] ' + cells[i]);
        // console.log('cells[i].value ' + cells[i].value);
        fragment.appendChild(cells[i].element);
    }

    timerId = window.setInterval(startTimer, 1000);
    return fragment;
};

function bestScoreCreate() {
    console.log('function bestScoreCreate');

    const fragment = document.createDocumentFragment();
    const bestScoreBack = document.createElement('button');

    bestScoreWrapper.classList.add('best_game-container');
    bestScoreHeader.classList.add('best_game-header');
    bestScoreData.classList.add('best_game-data');
    bestScoreData1.classList.add('best_game-text');
    bestScoreData2.classList.add('best_game-text');
    bestScoreData3.classList.add('best_game-text');
    bestScoreBack.classList.add('button-back');

    bestScoreHeader.innerHTML = "Best Scores";
    bestScoreBack.innerHTML = "BACK";

    //для проверки отображения
    // mainMenu.classList.remove('active');
    // bestScoreWrapper.classList.add('active');

    fragment.appendChild(bestScoreWrapper);
    bestScoreWrapper.appendChild(bestScoreHeader);
    bestScoreWrapper.appendChild(bestScoreData);
    bestScoreWrapper.appendChild(bestScoreBack);

    bestScoreData.appendChild(bestScoreData1);
    bestScoreData.appendChild(bestScoreData2);
    bestScoreData.appendChild(bestScoreData3);

    bestScoreBack.addEventListener('click', () => {
        bestScoreWrapper.classList.remove('active');
        mainMenu.classList.add('active');
        if (gameSaveFlag) {
            saveGame.classList.add('active');
        };
    });

    return fragment;
};

function wonAlert() {
    console.log('function wonAlert');

    field.appendChild(menuOverlay);
    saveGame.classList.remove('active');
    stopTimer();
    popupWonWrapper.classList.add('active');
    wonSpanResultSize.innerHTML = `Size ${cellNumberCurrent}x${cellNumberCurrent}`;
    wonSpanResultTime.innerHTML = `time ${addZero(timeCount.min)}:${addZero(timeCount.sec)}`;
    wonSpanResultMove.innerHTML = `moves ${movesCount}`;
    gameSaveFlag = false;

    bestScoresRecord();
    // alert(`Hooray!!! You won!!! Your result time: ${addZero(timeCount.min)}:${addZero(timeCount.sec)} and ${movesCount} moves`);

};

function bestScoresRecord() {
    console.log('function bestScoresRecord()');

    if (localStorage.score !== null && localStorage.score !== '' && localStorage.score !== undefined) {
        console.log('function bestScoreView() if');
        bestScoresCount = JSON.parse(localStorage.score);
    }

    if (bestScoresCount.length < 11) {
        bestScoresCount.push({
            moves: movesCount,
            time: `${addZero(timeCount.min)}:${addZero(timeCount.sec)}`,
            size: `${cellNumberCurrent}x${cellNumberCurrent}`
        });

    } else {
        const lastBest = bestScoresCount.length - 1;
        if (movesCount < bestScoresCount[lastBest].moves) {
            bestScoresCount[lastBest].moves = movesCount;
            bestScoresCount[lastBest].time = `${addZero(timeCount.min)}:${addZero(timeCount.sec)}`;
            bestScoresCount[lastBest].size = `${cellNumberCurrent}x${cellNumberCurrent}`;
        }
    }
    bestScoresCount.sort(function(a, b) {
        return a.moves - b.moves;
    });

    localStorage.score = JSON.stringify(bestScoresCount);
}

function bestScoreView() {
    console.log('function bestScoreView()');

    if (localStorage.score !== null && localStorage.score !== '' && localStorage.score !== undefined) {
        console.log('function bestScoreView() if');
        bestScoresCount = JSON.parse(localStorage.score);
    }

    bestScoreData1.innerHTML = bestScoresCount[0].moves + '<br>';
    bestScoreData2.innerHTML = bestScoresCount[0].time + '<br>';
    bestScoreData3.innerHTML = bestScoresCount[0].size + '<br>';

    for (let i = 1; i < bestScoresCount.length; i++) {
        bestScoreData1.innerHTML += `<br>${bestScoresCount[i].moves}`;
        bestScoreData2.innerHTML += `<br>${bestScoresCount[i].time}`;
        bestScoreData3.innerHTML += `<br>${bestScoresCount[i].size}`;
    }
}

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
    if (cellNumberCurrent % 2 === 0) {
        for (let i = 0; i < numbers.length; i++) {
            const elemNumber = i;
            let j = i;
            // console.log('array[elemNumber] ' + numbers[elemNumber]);
            if (numbers[elemNumber] === 0) {
                // const rowZero = (elemNumber - elemNumber % 4) / 4;
                const rowZero = (elemNumber - elemNumber % cellNumberCurrent) / cellNumberCurrent;
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
    } else {
        for (let i = 0; i < numbers.length; i++) {
            const elemNumber = i;
            let j = i;
            // console.log('array[elemNumber] ' + numbers[elemNumber]);
            while (j < numbers.length) {

                if (numbers[elemNumber] > numbers[j] && numbers[j] !== 0) {
                    count += 1;
                }
                // console.log(numbers[elemNumber] + '  ' + numbers[j] + ' ' + count);
                j++;
            }
        }
        console.log('count: ' + count);
        return count % 2 === 0 ? true : false;
    }
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
savedGameGetFromLS();