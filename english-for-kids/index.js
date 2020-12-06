import cards from './cards.js';
import { createCategoriesCard, createCardsSingleCategories, createMenuList, createStarsForResult } from './createDom.js';
import { toggleTrainPlayMode, switchStateMenu, startGameButtonToggle, changeActiveMenuItem } from './switch.js';

const body = document.querySelector('.body');
const burgerMenuButton = document.querySelector('.header__burger');
const titleHeaderButton = document.querySelector('.header__title');
const mainMenu = document.querySelector('.menu');

const categoriesContainer = document.getElementById('categories_container'); //Main page container
const cardsContainer = document.getElementById('cards_container'); //Page container

const menuBlackout = document.querySelector('.blackout');
const startGameButton = document.querySelector('.start_game');
const repeatAudioButton = document.querySelector('.repeat_audio');
const playResultContainer = document.querySelector('.play__result');
const winContainer = document.querySelector('.win');
const failureContainer = document.querySelector('.failure');
const failureMistakes = document.querySelector('.failure__mistake');

const startCountingThematicCardsInArrayCards = 2;
const mainMenuItemId = cards[0].length;

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

function buildPage() {
    createMainPage(cards[0], cards[1])
    createMenu(cards[0]);
    createEventListenerForObject();
}


const createMenu = (categories) => { mainMenu.appendChild(createMenuList(categories, state, mainMenuItemId)) };

const createMainPage = (categories, imageCategoriesName) => {
    state.currentPage = 'main';
    categoriesContainer.appendChild(createCategoriesCard(categories, imageCategoriesName, state));
};

function openCardsSingleCategories(index) {
    if (cardsContainer.firstChild) {
        while (cardsContainer.firstChild) {
            cardsContainer.removeChild(cardsContainer.firstChild);
        }
    };
    stopGame();
    changeActiveMenuItem(state, index);
    categoriesContainer.classList.add('none');
    cardsContainer.classList.remove('none');
    state.currentPage = 'theme';
    const categories = cards[index + startCountingThematicCardsInArrayCards];
    state.currentCategories = categories;
    state.currentCategoriesId = index;
    const arrayRandomNumber = createRandomData(categories.length);
    // console.log('arrayRandomNumber ' + arrayRandomNumber);

    cardsContainer.appendChild(createCardsSingleCategories(categories, state, arrayRandomNumber));
};

function StartGame() {
    if (state.currentPage === 'main') return;
    state.gameStart = true;
    const categories = state.currentCategories;
    const arrayRandomNumber = createRandomData(categories.length);

    categories.forEach(function(element, index) {
        // for (let i = 0; i < categories.length; i++) {
        const idCard = arrayRandomNumber[index];
        state.currentCards[index] = categories[idCard].word;
        state.currentCardsId[index] = idCard;
        state.currentCardsAudio[index] = categories[idCard].audioSrc;
    });

    startGameButtonToggle(startGameButton, repeatAudioButton);

    // console.log("start game");
    // console.log('card ' + state.currentCards);
    // console.log('id ' + state.currentCardsId);
    // console.log('Audio ' + state.currentCardsAudio);
    if (state.currentCardsAudio.length > 0) {
        const arrayOfSound = state.currentCardsAudio;
        const sound = arrayOfSound[arrayOfSound.length - 1];
        console.log('sound ' + sound);
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

function checkСorrectlyPushCard(idCard, card) {
    if (state.gameStart === true) {
        if (idCard === state.currentCardsId[state.currentCardsId.length - 1]) {
            console.log('correct ');
            card.classList.add('correct');
            playResultContainer.appendChild(createStarsForResult('star-win'));
            soundCorrect.play();
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
            console.log('wrong ');
            playResultContainer.appendChild(createStarsForResult('star'));
            state.NumberWrongAnswer += 1;
            soundFail.play();
            // createStarsForResult('star');
        }
    } else {
        startGameButton.classList.add('light');
        setTimeout(() => {
            startGameButton.classList.remove('light');
        }, 1000);
    }

    // console.log('card ' + state.currentCards);
    // console.log('id ' + state.currentCardsId);
    // console.log('Audio ' + state.currentCardsAudio);
}

function finishGame() {
    console.log('finish ');
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

        while (cardsContainer.firstChild) {
            cardsContainer.removeChild(cardsContainer.firstChild);
        }
    }
};

const closeMenu = () => {
    switchStateMenu(body, mainMenu, burgerMenuButton, menuBlackout);
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

//Event Listeners
const createEventListenerForObject = () => {
    getState();
    setEventHeaderTitleButton();
    setBurgerMenuProperty();
    setMenuBlackoutProperty();
    initializationStartGameButton();
    initializationReloudAudioButton();
};

const getState = () => {
    const toggleSwitch = document.getElementById('switch__id');

    toggleSwitch.addEventListener('change', function() {

        if (this.checked) {
            console.log('checked');
            state.train = false;
        } else {
            console.log('unchecked');
            state.train = true;
        }
        toggleTrainPlayMode(state, cardsContainer);
        console.log('state.train ' + state.train);
        console.log('state.currentCards ' + state.currentCards);
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

buildPage();
// createMainPage();
// getState();
// setEventHeaderTitleButton();

export { openCardsSingleCategories, setMainPage, closeMenu, checkСorrectlyPushCard, createAudioOnCard, stopGame };