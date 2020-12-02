import cards from './cards.js';
import { createCategoriesCard, createCardsSingleCategories, createMenuList } from './createDom.js';
import { toggleTrainPlayMode, switchStateMenu } from './switch.js';

const categoriesContainer = document.getElementById('categories_container'); //Main page container
const cardsContainer = document.getElementById('cards_container'); //Page container
const menu = document.querySelector('.menu');
const titleHeaderButton = document.querySelector('.header__title');
const burgerMenuButton = document.querySelector('.header__burger');
const body = document.querySelector('.body');
const mainMenu = document.querySelector('.menu');

const startCountingThematicCardsInArrayCards = 2;
const state = {
    train: true,
    currentPage: null,
    currentCards: []
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
    const arrayRandomNumber = createRandomData(categories.length);
    // console.log('arrayRandomNumber ' + arrayRandomNumber);

    cardsContainer.appendChild(createCardsSingleCategories(categories, state, arrayRandomNumber));
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


// createMainPage();
// getState();
// setEventHeaderTitleButton();

export { openCardsSingleCategories, setMainPage, closeMenu };