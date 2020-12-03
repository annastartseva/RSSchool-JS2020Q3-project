import { openCardsSingleCategories, setMainPage, closeMenu, createAudioOnCard, checkСorrectlyPushCard } from './index.js';


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

function createCardsSingleCategories(categories, state, arrayRandomNumber) {
    const fragment = document.createDocumentFragment();
    console.log('categories ' + categories);
    console.log('categories.length ' + categories.length);
    for (let i = 0; i < categories.length; i++) {
        const idCard = arrayRandomNumber[i];

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

        if (state.train === false) {
            imageCardFront.classList.add('size100');
            footerCardFront.classList.add('none');
        }

        imageCardFront.setAttribute("style", `background-image: url(assets/${categories[idCard].image});`);
        imageArrowCardFront.setAttribute("src", "assets/img/turn.svg");
        imageArrowCardFront.setAttribute("alt", "turn card");

        soundCardFront.innerHTML = `<i class="material-icons">volume_up</i>`;
        titleCardFront.innerHTML = `${categories[idCard].word}`;

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

        imageCardBack.setAttribute("style", `background-image: url(assets/${categories[idCard].image});`);

        titleCardBack.innerHTML = `${categories[idCard].translation}`;

        card.appendChild(cardBack);
        cardBack.appendChild(imageCardBack);
        cardBack.appendChild(footerCardBack);
        footerCardBack.appendChild(titleCardBack);

        fragment.appendChild(card);


        rollButtonCardFront.addEventListener('click', () => {
            cardFront.classList.add('front-rotate');
            cardBack.classList.add('back-rotate');
        });

        card.addEventListener('mouseleave', () => {
            cardFront.classList.remove('front-rotate');
            cardBack.classList.remove('back-rotate');
        });

        card.addEventListener('click', () => {
            if (state.train === false) {
                console.log("id " + idCard);
                state.playLastPushCardId = idCard;
                checkСorrectlyPushCard(idCard);
            }
        })

        soundCardFront.addEventListener('click', () => {
            const cardSound = createAudioOnCard(categories[idCard].audioSrc);
            cardSound.play();
        });

        imageCardFront.addEventListener('click', () => {
            const cardSound = createAudioOnCard(categories[idCard].audioSrc);
            if (state.train === true) { cardSound.play() };
        });

        titleCardFront.addEventListener('click', () => {
            const cardSound = createAudioOnCard(categories[idCard].audioSrc);
            cardSound.play();
        });

    }
    return fragment;
}

function createMenuList(categories, menu) {
    const occupiedItemUnderMain = 1;
    const fragment = document.createDocumentFragment();

    const menuMainItem = document.createElement('li');
    menuMainItem.classList.add('menu__item', 'active');
    menuMainItem.setAttribute('number', '0')
    menuMainItem.innerHTML = 'Main';
    fragment.appendChild(menuMainItem);

    menuMainItem.addEventListener('click', () => {
        setMainPage();
        closeMenu();
    });

    for (let i = 0; i < categories.length; i++) {

        const menuItem = document.createElement('li');

        menuItem.classList.add('menu__item');

        menuItem.setAttribute('number', `${i+occupiedItemUnderMain}`)
        menuItem.innerHTML = `${categories[i]}`;

        fragment.appendChild(menuItem);

        menuItem.addEventListener('click', () => {
            openCardsSingleCategories(i);
            closeMenu();
        });
    }
    return fragment;
}

function createStarsForResult(item) {
    const star = document.createElement('div');
    star.classList.add(item);
    return star;

}





export { createCategoriesCard, createCardsSingleCategories, createMenuList, createStarsForResult };