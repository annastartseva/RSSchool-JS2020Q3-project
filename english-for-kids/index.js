import cards from './cards.js';
import { createCategoriesCard, createCardsSingleCategories, createMenuList, createStarsForResult } from './createDom.js';
import { toggleTrainPlayMode, switchStateMenu } from './switch.js';

const categoriesContainer = document.getElementById('categories_container'); //Main page container
const cardsContainer = document.getElementById('cards_container'); //Page container
const menu = document.querySelector('.menu');
const titleHeaderButton = document.querySelector('.header__title');
const burgerMenuButton = document.querySelector('.header__burger');
const body = document.querySelector('.body');
const mainMenu = document.querySelector('.menu');
const startGameButton = document.querySelector('.start_game');
const playResultContainer = document.querySelector('.play__result');
const winContainer = document.querySelector('.win');

const startCountingThematicCardsInArrayCards = 2;
const state = {
    train: true,
    currentPage: null,
    currentCategories: null,
    currentCards: [],
    currentCardsId: [],
    currentCardsAudio: [],
    NumberWrongAnswer: 0
};

(function createMainPage() {
    const categories = cards[0];
    const imageCategoriesName = cards[1];
    console.log('categories ' + categories);
    state.currentPage = 'main';
    categoriesContainer.appendChild(createCategoriesCard(categories, imageCategoriesName, state));
})();

(function createMenu() {
    const categories = cards[0];

    menu.appendChild(createMenuList(categories, menu));
})();

function openCardsSingleCategories(index) {
    if (cardsContainer.firstChild) {
        while (cardsContainer.firstChild) {
            cardsContainer.removeChild(cardsContainer.firstChild);
        }
    }
    categoriesContainer.classList.add('none');
    cardsContainer.classList.remove('none');
    state.currentPage = 'theme';
    const categories = cards[index + startCountingThematicCardsInArrayCards];
    state.currentCategories = categories;
    const arrayRandomNumber = createRandomData(categories.length);
    // console.log('arrayRandomNumber ' + arrayRandomNumber);

    cardsContainer.appendChild(createCardsSingleCategories(categories, state, arrayRandomNumber));
};

function StartGame() {
    if (state.currentPage === 'main') return;
    const categories = state.currentCategories;
    const arrayRandomNumber = createRandomData(categories.length);
    for (let i = 0; i < categories.length; i++) {
        const idCard = arrayRandomNumber[i];
        state.currentCards[i] = categories[idCard].word;
        state.currentCardsId[i] = idCard;
        state.currentCardsAudio[i] = categories[idCard].audioSrc;
    }
    console.log("start game");
    console.log('card ' + state.currentCards);
    console.log('id ' + state.currentCardsId);
    console.log('Audio ' + state.currentCardsAudio);
    if (state.currentCardsAudio.length > 0) {
        const arrayOfSound = state.currentCardsAudio;
        const sound = arrayOfSound[arrayOfSound.length - 1];
        console.log('sound ' + sound);
        const currentPlaySoundWord = createAudioOnCard(sound);
        currentPlaySoundWord.play();
    }

}

function checkСorrectlyPushCard(idCard) {

    if (idCard === state.currentCardsId[state.currentCardsId.length - 1]) {
        console.log('correct ');
        playResultContainer.appendChild(createStarsForResult('star-win'));
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
        // createStarsForResult('star');
    }
    console.log('card ' + state.currentCards);
    console.log('id ' + state.currentCardsId);
    console.log('Audio ' + state.currentCardsAudio);
}

function finishGame() {
    console.log('finish ');
    cardsContainer.classList.add('none');
    winContainer.classList.remove('none');


}

function setMainPage() {
    if (state.currentPage !== 'main') {
        categoriesContainer.classList.remove('none');

        cardsContainer.classList.add('none');
        state.currentPage = 'main';

        while (cardsContainer.firstChild) {
            cardsContainer.removeChild(cardsContainer.firstChild);
        }
    }
};

function closeMenu() {
    switchStateMenu(body, mainMenu, burgerMenuButton);
};

function createRandomData(item) {
    const numbers = [...Array(item).keys()]
        .sort(() => Math.random() - 0.5);
    return numbers;
};

function createAudioOnCard(sound) {
    const audio = new Audio(`assets/${sound}`);
    return audio;
};

//Event Listeners
(function getState() {
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
})();

(function setEventHeaderTitleButton() {
    titleHeaderButton.addEventListener('click', () => {
        setMainPage();
    })
})();

(function setBurgerMenuProperty() {
    burgerMenuButton.addEventListener('click', () => {
        switchStateMenu(body, mainMenu, burgerMenuButton);
    })
})();

(function initializationStartGameButton() {
    startGameButton.addEventListener('click', () => {
        StartGame();
    })
})();


// createMainPage();
// getState();
// setEventHeaderTitleButton();

export { openCardsSingleCategories, setMainPage, closeMenu, checkСorrectlyPushCard, createAudioOnCard };