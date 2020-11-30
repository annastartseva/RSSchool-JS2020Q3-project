import cards, { example } from './cards.js';

// console.log('cards ' + cards[0]);
// console.log('cards ' + cards[1]);

// example();

const categories = cards[0];
const imageCategoriesName = cards[1];
console.log('categories ' + categories);

const cardsContainer = document.getElementById('cards_container'); //Page container
cardsContainer.appendChild(createCard());

function createCard() {

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < categories.length; i++) {

        const card = document.createElement('div');
        const imageContainer = document.createElement('div');
        const imageInCategories = document.createElement('img');
        const cardTitle = document.createElement('div');

        card.classList.add('cards__category');
        imageContainer.classList.add('cards__image-wrapper');
        imageInCategories.classList.add('cards__image');
        cardTitle.classList.add('cards__category-title');

        // imageInCategories.setAttribute("src", "assets/img/animal1.jpg");
        imageInCategories.setAttribute("src", `assets/img/${imageCategoriesName[i]}`);
        imageInCategories.setAttribute("alt", `${categories[i]}`);

        cardTitle.innerHTML = `${categories[i]}`;

        card.appendChild(imageContainer);
        card.appendChild(cardTitle);

        imageContainer.appendChild(imageInCategories);

        fragment.appendChild(card);
    }
    return fragment;
}