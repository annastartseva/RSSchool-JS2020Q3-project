import cards from './cards.js';
import { createCategoriesCard, createCardsSingleCategories } from './createDom.js';
import { toggleTrainPlayMode } from './switch.js';

const categoriesContainer = document.getElementById('categories_container'); //Main page container
const cardsContainer = document.getElementById('cards_container'); //Page container
const titleHeaderButton = document.querySelector('.header__title');

const startCountingThematicCardsInArrayCards = 2;
const state = {
    train: true,
    currentPage: null,
    currentCards: []
}

function getState() {
    const toggleSwitch = document.getElementById('switch__id');

    toggleSwitch.addEventListener('change', function() {

        if (this.checked) {
            console.log('checked');
            state.train = false;
        } else {
            console.log('unchecked');
            state.train = true;
        }
        toggleTrainPlayMode(state);
        console.log('state.train ' + state.train);
        console.log('state.currentCards ' + state.currentCards);
    })
}

function createMainPage() {
    const categories = cards[0];
    const imageCategoriesName = cards[1];
    console.log('categories ' + categories);
    state.currentPage = 'main';
    categoriesContainer.appendChild(createCategoriesCard(categories, imageCategoriesName, state));
}

function openCardsSingleCategories(index) {
    categoriesContainer.classList.add('none');
    cardsContainer.classList.remove('none');
    state.currentPage = 'theme';
    const categories = cards[index + startCountingThematicCardsInArrayCards];

    cardsContainer.appendChild(createCardsSingleCategories(categories, state));
}

function setEventHeaderTitleButton() {
    titleHeaderButton.addEventListener('click', () => {
        setMainPage();
    })
}

function setMainPage() {
    if (state.currentPage !== 'main') {
        categoriesContainer.classList.remove('none');

        cardsContainer.classList.add('none');
        while (cardsContainer.firstChild) {
            cardsContainer.removeChild(cardsContainer.firstChild);
        }
    }
}
createMainPage();
getState();
setEventHeaderTitleButton();

export { openCardsSingleCategories };