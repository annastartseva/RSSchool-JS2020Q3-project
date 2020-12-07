import cards from './cards.js';
import { createCategoriesCard, createCardsSingleCategories, createMenuList, createStarsForResult, createStatisticTable, createStatisticPage } from './createDom.js';
import { toggleTrainPlayMode, switchStateMenu, startGameButtonToggle, changeActiveMenuItem } from './switch.js';

const body = document.querySelector('.body');
const burgerMenuButton = document.querySelector('.header__burger');
const titleHeaderButton = document.querySelector('.header__title');
const mainMenu = document.querySelector('.menu');

const categoriesContainer = document.getElementById('categories_container'); //Main page container
const cardsContainer = document.getElementById('cards_container'); //Page container
const statisticPage = document.querySelector('.statistic__wrapper');
const statisticContainer = document.querySelector('.statistic__container');

const menuBlackout = document.querySelector('.blackout');
const startGameButton = document.querySelector('.start_game');
const repeatAudioButton = document.querySelector('.repeat_audio');
const playResultContainer = document.querySelector('.play__result');
const winContainer = document.querySelector('.win');
const failureContainer = document.querySelector('.failure');
const failureMistakes = document.querySelector('.failure__mistake');
const repeatDifficultWordButton = document.querySelector('.statistic__button-repeat');
const resetStatisticButton = document.querySelector('.statistic__button-reset');
const messageStatistic = document.querySelector('.statistic__message');

const startCountingThematicCardsInArrayCards = 2;
const mainMenuItemId = cards[0].length;
const statisticItemId = cards[0].length + 1;

const soundCorrect = createAudioOnCard('audio/won.mp3');
const soundFail = createAudioOnCard('audio/fail.mp3');
const soundWon = createAudioOnCard('audio/won_game.mp3');
const soundGameOver = createAudioOnCard('audio/game_over.mp3');

const state = {
    train: true,
    currentPage: null,
    currentCategories: null,
    currentCategoriesId: null,
    currentCards: [],
    currentCardsId: [],
    currentCardsAudio: [],
    NumberWrongAnswer: 0,
    gameStart: false
};

let statisticFile = [];

function buildPage() {
    createMainPage(cards[0], cards[1])
    createMenu(cards[0]);
    createEventListenerForObject();
    createStatisticFile();
}

const createMenu = (categories) => { mainMenu.appendChild(createMenuList(categories, state, mainMenuItemId, statisticItemId)) };

const createMainPage = (categories, imageCategoriesName) => {
    state.currentPage = 'main';
    categoriesContainer.appendChild(createCategoriesCard(categories, imageCategoriesName, state));
};

function openCardsSingleCategories(index) {
    if (cardsContainer.firstChild) { clearCardsContainer() };
    stopGame();
    closeStatisticPage();
    changeActiveMenuItem(state, index);
    categoriesContainer.classList.add('none');
    cardsContainer.classList.remove('none');
    state.currentPage = 'theme';
    const categories = cards[index + startCountingThematicCardsInArrayCards];
    state.currentCategories = categories;
    state.currentCategoriesId = index;
    const arrayRandomNumber = createRandomData(categories.length);
    cardsContainer.appendChild(createCardsSingleCategories(categories, state, arrayRandomNumber));
};

function StartGame() {
    if (state.currentPage === 'main' || state.currentPage === 'statistic') return;
    state.gameStart = true;
    state.NumberWrongAnswer = 0;

    const categories = state.currentCategories;
    const arrayRandomNumber = createRandomData(categories.length);

    categories.forEach(function(element, index) {
        const idCard = arrayRandomNumber[index];
        state.currentCards[index] = categories[idCard].word;
        state.currentCardsId[index] = idCard;
        state.currentCardsAudio[index] = categories[idCard].audioSrc;
    });

    startGameButtonToggle(startGameButton, repeatAudioButton);

    if (state.currentCardsAudio.length > 0) {
        const arrayOfSound = state.currentCardsAudio;
        const sound = arrayOfSound[arrayOfSound.length - 1];
        state.currentPlaySoundWord = createAudioOnCard(sound);
        state.currentPlaySoundWord.play();
    }
}

function stopGame() {
    if (state.gameStart === true) {
        startGameButtonToggle(startGameButton, repeatAudioButton);
        state.gameStart = false;
        clearStarsContainer();
    };
}

function checkСorrectlyPushCard(idCard, card, cardWord) {
    if (state.gameStart === true) {
        if (idCard === state.currentCardsId[state.currentCardsId.length - 1]) {
            card.classList.add('correct');
            playResultContainer.appendChild(createStarsForResult('star-win'));
            soundCorrect.play();
            addDataToStatistic(cardWord, "correct");
            state.currentCards.pop();
            state.currentCardsId.pop();
            state.currentCardsAudio.pop();
            if (state.currentCardsAudio.length > 0) {
                const currentPlaySoundWord = createAudioOnCard(state.currentCardsAudio[state.currentCardsAudio.length - 1]);
                currentPlaySoundWord.play();
            } else {
                finishGame();
            }
        } else {
            playResultContainer.appendChild(createStarsForResult('star'));
            const currentWord = state.currentCards[state.currentCards.length - 1];
            addDataToStatistic(currentWord, "wrong");
            state.NumberWrongAnswer += 1;
            soundFail.play();
        }
    } else {
        startGameButton.classList.add('light');
        setTimeout(() => {
            startGameButton.classList.remove('light');
        }, 1000);
    }
}

function finishGame() {
    state.gameStart = false;
    startGameButtonToggle(startGameButton, repeatAudioButton);
    clearStarsContainer();
    if (state.NumberWrongAnswer === 0) {
        cardsContainer.classList.add('none');
        winContainer.classList.remove('none');
        soundWon.play();

    } else {
        failureMistakes.innerHTML = `You have ${state.NumberWrongAnswer} mistakes`;
        cardsContainer.classList.add('none');
        failureContainer.classList.remove('none');
        soundGameOver.play();
    }

    setTimeout(() => {
        setMainPage(mainMenuItemId);
        winContainer.classList.add('none');
        failureContainer.classList.add('none');
    }, 3000);

    state.NumberWrongAnswer = 0;
};

const setMainPage = (index) => {
    if (state.currentPage !== 'main') {
        categoriesContainer.classList.remove('none');
        cardsContainer.classList.add('none');
        state.currentPage = 'main';
        stopGame();
        changeActiveMenuItem(state, index);
        closeStatisticPage();
        clearCardsContainer();
    }
};

const setStatisticPage = (index) => {
    createStatisticPage(statisticFile, statisticContainer);
    state.currentPage = 'statistic';
    categoriesContainer.classList.add('none');
    cardsContainer.classList.add('none');
    statisticPage.classList.remove('none');
    stopGame();
    clearCardsContainer();
    changeActiveMenuItem(state, index);
};

const closeStatisticPage = () => {
    statisticPage.classList.add('none');
    clearStatisticContainer();

};

const clearStatisticContainer = () => {
    if (statisticContainer.firstChild) {
        while (statisticContainer.firstChild) {
            statisticContainer.removeChild(statisticContainer.firstChild);
        }
    }
};

const clearTbodyContainer = () => {
    const statisticTableTbody = document.querySelector('tbody');
    if (statisticTableTbody.firstChild) {
        while (statisticTableTbody.firstChild) {
            statisticTableTbody.removeChild(statisticTableTbody.firstChild);
        }
    }
};

const createStatisticFile = () => {
    if (localStorage.statistic) {
        statisticFile = JSON.parse(localStorage.statistic);
    } else {
        createEmptyStatisticFile();
    }
};

const createEmptyStatisticFile = () => {
    const categories = cards[0];
    for (let j = 0; j < categories.length; j++) {
        const categoriesItem = cards[j + startCountingThematicCardsInArrayCards];

        for (let i = 0; i < categoriesItem.length; i++) {
            const rowData = {};
            rowData.categories = categories[j];
            rowData.word = categoriesItem[i].word;
            rowData.translation = categoriesItem[i].translation;
            rowData.trained = 0;
            rowData.correct = 0;
            rowData.wrong = 0;
            rowData.error = 0;

            statisticFile.push(rowData);
        }
    }
}

const addDataToStatistic = (cardWord, status) => {
    const rowIndex = statisticFile.findIndex(item => item.word === cardWord);

    if (status === "train") {
        statisticFile[rowIndex].trained += 1;
    } else if (status === "correct") {
        statisticFile[rowIndex].correct += 1;

    } else if (status === "wrong") {
        statisticFile[rowIndex].wrong += 1;
    }
    if (status !== "train") {
        const error = (statisticFile[rowIndex].correct * 100) / (statisticFile[rowIndex].correct + statisticFile[rowIndex].wrong);
        statisticFile[rowIndex].error = Math.round(error);
    }
    localStorage.statistic = JSON.stringify(statisticFile);
}

const openTrainDifficultWord = (difficultWordArray) => {
    if (difficultWordArray.length === 0) {
        clearStatisticContainer();
        messageStatistic.classList.remove('none');

        setTimeout(() => {
            messageStatistic.classList.add('none');
            createStatisticPage();
        }, 1000);

    } else {
        if (cardsContainer.firstChild) { clearCardsContainer() };
        closeStatisticPage();
        cardsContainer.classList.remove('none');
        state.currentPage = 'theme';
        state.currentCategories = difficultWordArray;
        const arrayRandomNumber = createRandomData(difficultWordArray.length);
        const categories = [];

        cardsContainer.appendChild(createCardsSingleCategories(difficultWordArray, state, arrayRandomNumber));
    }
};

const closeMenu = () => {
    switchStateMenu(body, mainMenu, burgerMenuButton, menuBlackout);
};

const clearCardsContainer = () => {
    while (cardsContainer.firstChild) {
        cardsContainer.removeChild(cardsContainer.firstChild);
    }
};

const createRandomData = (item) => {
    const numbers = [...Array(item).keys()]
        .sort(() => Math.random() - 0.5);
    return numbers;
};

function createAudioOnCard(sound) {
    const audio = new Audio(`assets/${sound}`);
    return audio;
};

const clearStarsContainer = () => {
    while (playResultContainer.firstChild) {
        playResultContainer.removeChild(playResultContainer.firstChild);
    }
}

const createDifficultWordArray = () => {
    const statisticFileCopy = [...statisticFile];
    const difficultWordArray = [];
    statisticFileCopy.sort(function(a, b) {
        return a.error - b.error;
    });

    statisticFileCopy.forEach(function(element) {
        if (element.error < 100 && element.wrong > 0 && difficultWordArray.length < 8) {
            const wordData = {};
            const categoriesId = cards[0].indexOf(element.categories);
            const wordId = cards[categoriesId + startCountingThematicCardsInArrayCards].findIndex(item => item.word === element.word);

            wordData.word = cards[categoriesId + startCountingThematicCardsInArrayCards][wordId].word;
            wordData.translation = cards[categoriesId + startCountingThematicCardsInArrayCards][wordId].translation;
            wordData.image = cards[categoriesId + startCountingThematicCardsInArrayCards][wordId].image;
            wordData.audioSrc = cards[categoriesId + startCountingThematicCardsInArrayCards][wordId].audioSrc;
            difficultWordArray.push(wordData);
        }
    });
    openTrainDifficultWord(difficultWordArray);
};

const sortStatistic = (element, typeSort) => {
    const statisticFileCopy = [...statisticFile];
    let itemSort = '';

    if (element === 'Error(%)') {
        itemSort = 'error';
    } else {
        itemSort = element.toLowerCase();
    }

    if (typeSort === 'down') {
        statisticFileCopy.sort(function(a, b) {
            if (a[itemSort] < b[itemSort]) { return -1; }
            if (a[itemSort] > b[itemSort]) { return 1; }
            return 0;
        });
    } else {
        statisticFileCopy.sort(function(a, b) {
            if (a[itemSort] < b[itemSort]) { return 1; }
            if (a[itemSort] > b[itemSort]) { return -1; }
            return 0;
        });
    }

    clearTbodyContainer();
    const statisticTableTbody = document.querySelector('tbody');
    statisticTableTbody.appendChild(createStatisticTable(statisticFileCopy));
}

//Event Listeners
const createEventListenerForObject = () => {
    getState();
    setEventHeaderTitleButton();
    setBurgerMenuProperty();
    setMenuBlackoutProperty();
    initializationStartGameButton();
    initializationReloudAudioButton();
    initializationRepeatDifficultWordButton();
    initializationResetStatisticButton();
};

const getState = () => {
    const toggleSwitch = document.getElementById('switch__id');

    toggleSwitch.addEventListener('change', function() {
        if (this.checked) {
            state.train = false;
        } else {
            state.train = true;
        }
        toggleTrainPlayMode(state, cardsContainer);
    })
};

const setEventHeaderTitleButton = () => {
    titleHeaderButton.addEventListener('click', () => {
        const mainPageIndex = cards[0].length;
        setMainPage(mainPageIndex);

    })
};

const setBurgerMenuProperty = () => {
    burgerMenuButton.addEventListener('click', () => {
        switchStateMenu(body, mainMenu, burgerMenuButton, menuBlackout);
    })
};

const setMenuBlackoutProperty = () => {
    menuBlackout.addEventListener('click', () => {
        switchStateMenu(body, mainMenu, burgerMenuButton, menuBlackout);
    })
};

const initializationStartGameButton = () => {
    startGameButton.addEventListener('click', () => {
        StartGame();
    })
};

const initializationReloudAudioButton = () => {
    repeatAudioButton.addEventListener('click', () => {
        const currentPlaySoundWord = createAudioOnCard(state.currentCardsAudio[state.currentCardsAudio.length - 1]);
        currentPlaySoundWord.play();
    })
};

const initializationRepeatDifficultWordButton = () => {
    repeatDifficultWordButton.addEventListener('click', () => {
        createDifficultWordArray();
    })
};

const initializationResetStatisticButton = () => {
    resetStatisticButton.addEventListener('click', () => {
        statisticFile.length = 0;
        createEmptyStatisticFile();
        clearStatisticContainer();
        createStatisticPage();
        localStorage.statistic = JSON.stringify(statisticFile);

    })
};

buildPage();

export { openCardsSingleCategories, setMainPage, closeMenu, checkСorrectlyPushCard, createAudioOnCard, stopGame, setStatisticPage, addDataToStatistic, sortStatistic };