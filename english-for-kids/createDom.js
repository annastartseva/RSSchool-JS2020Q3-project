import { openCardsSingleCategories } from './index.js';

function createCategoriesCard(categories, imageCategoriesName, state) {

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < categories.length; i++) {

        const card = document.createElement('div');
        const imageInCategories = document.createElement('div');
        const gameMode = document.createElement('div');
        const cardTitle = document.createElement('div');

        card.classList.add('cards__category');
        imageInCategories.classList.add('cards__image');
        gameMode.classList.add('cards__mode');

        if (state.train === false) {
            gameMode.classList.add('play');
        }
        cardTitle.classList.add('cards__category-title');

        card.id = `${i}`;

        // imageInCategories.setAttribute("src", "assets/img/animal1.jpg");
        imageInCategories.setAttribute("style", `background-image: url(assets/img/${imageCategoriesName[i]});`);

        cardTitle.innerHTML = `${categories[i]}`;

        card.appendChild(imageInCategories);
        card.appendChild(gameMode);
        card.appendChild(cardTitle);

        state.currentCards.push({
            id: `${i}`,
            value: `${categories[i]}`,
            element: card
        });

        fragment.appendChild(card);

        console.log('card ' + card);

        card.addEventListener('click', () => {
            // createCardsSingleCategories(i);
            openCardsSingleCategories(i);

        });
    }
    return fragment;

}

function createCardsSingleCategories(categories, state) {
    const fragment = document.createDocumentFragment();
    console.log('categories ' + categories);
    console.log('categories.length ' + categories.length);
    for (let i = 0; i < categories.length; i++) {

        const card = document.createElement('div');
        const cardFront = document.createElement('div');
        const imageCardFront = document.createElement('div');
        const footerCardFront = document.createElement('div');
        const soundCardFront = document.createElement('div');
        const titleCardFront = document.createElement('div');
        const rollButtonCardFront = document.createElement('div');
        const imageArrowCardFront = document.createElement('img');

        card.classList.add('cards__theme');
        cardFront.classList.add('cards__theme-front');
        imageCardFront.classList.add('front-image');
        footerCardFront.classList.add('front-footer');
        soundCardFront.classList.add('front-sound');
        titleCardFront.classList.add('front-title');
        rollButtonCardFront.classList.add('front-roll-button');
        imageArrowCardFront.classList.add('front-arrow');

        imageCardFront.setAttribute("style", `background-image: url(assets/${categories[i].image});`);
        imageArrowCardFront.setAttribute("src", "assets/img/turn.svg");
        imageArrowCardFront.setAttribute("alt", "turn card");

        soundCardFront.innerHTML = `<i class="material-icons">volume_up</i>`;
        titleCardFront.innerHTML = `${categories[i].word}`;

        card.appendChild(cardFront);
        cardFront.appendChild(imageCardFront);
        cardFront.appendChild(footerCardFront);
        footerCardFront.appendChild(soundCardFront);
        footerCardFront.appendChild(titleCardFront);
        footerCardFront.appendChild(rollButtonCardFront);

        rollButtonCardFront.appendChild(imageArrowCardFront);

        //BACK
        const cardBack = document.createElement('div');
        const imageCardBack = document.createElement('div');
        const footerCardBack = document.createElement('div');
        const titleCardBack = document.createElement('div');

        cardBack.classList.add('cards__theme-back');
        imageCardBack.classList.add('back-image');
        footerCardBack.classList.add('back-footer');
        titleCardBack.classList.add('back-title');

        imageCardBack.setAttribute("style", `background-image: url(assets/${categories[i].image});`);

        titleCardBack.innerHTML = `${categories[i].translation}`;

        card.appendChild(cardBack);
        cardBack.appendChild(imageCardBack);
        cardBack.appendChild(footerCardBack);
        footerCardBack.appendChild(titleCardBack);

        fragment.appendChild(card);

        rollButtonCardFront.addEventListener('click', () => {
            cardFront.classList.add('front-rotate');
            cardBack.classList.add('back-rotate');
        })

        card.addEventListener('mouseleave', () => {
            cardFront.classList.remove('front-rotate');
            cardBack.classList.remove('back-rotate');
        })

        soundCardFront.addEventListener('click', () => {
            const myAudio = new Audio(`assets/${categories[i].audioSrc}`);
            myAudio.play();
        })
    }
    return fragment;
}

export { createCategoriesCard, createCardsSingleCategories };