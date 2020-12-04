import { openCardsSingleCategories, setMainPage, closeMenu, createAudioOnCard, checkСorrectlyPushCard } from './index.js';


function createCategoriesCard(categories, imageCategoriesName, state) {

    const fragment = document.createDocumentFragment();

    categories.forEach(function(element, index) {
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

        card.id = `${index}`;

        imageInCategories.setAttribute("style", `background-image: url(assets/img/${imageCategoriesName[index]});`);

        cardTitle.innerHTML = `${element}`;

        card.appendChild(imageInCategories);
        card.appendChild(gameMode);
        card.appendChild(cardTitle);

        state.currentCards.push({
            id: `${index}`,
            value: `${element}`,
            element: card
        });

        fragment.appendChild(card);

        console.log('card ' + card);

        card.addEventListener('click', () => {
            openCardsSingleCategories(index);

        });
    })

    return fragment;

}

function createCardsSingleCategories(categories, state, arrayRandomNumber) {
    const fragment = document.createDocumentFragment();
    console.log('categories ' + categories);
    console.log('categories.length ' + categories.length);

    categories.forEach(function(element, index) {
        const idCard = arrayRandomNumber[index];

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
                checkСorrectlyPushCard(idCard, card);

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
    });

    return fragment;
}

function createMenuList(categories, menu) {
    const occupiedItemUnderMain = 1;
    const fragment = document.createDocumentFragment();

    const menuMainItem = document.createElement('li');
    const menuMainIcon = document.createElement('i');
    menuMainItem.classList.add('menu__item', 'active');
    menuMainIcon.classList.add('menu__link', 'main');
    menuMainItem.setAttribute('number', '0')
    menuMainIcon.innerHTML = 'Main Page';

    menuMainItem.appendChild(menuMainIcon);
    fragment.appendChild(menuMainItem);

    menuMainItem.addEventListener('click', () => {
        setMainPage();
        closeMenu();
    });

    categories.forEach(function(element, index) {
        const menuItem = document.createElement('li');
        const menuIcon = document.createElement('i');

        menuItem.classList.add('menu__item');
        menuIcon.classList.add('menu__link', `${element.replace(/\s+/g, '').toLowerCase()}`);

        menuItem.setAttribute('number', `${index+occupiedItemUnderMain}`)
        menuIcon.innerHTML = `${element}`;

        menuItem.appendChild(menuIcon);
        fragment.appendChild(menuItem);

        menuItem.addEventListener('click', () => {
            openCardsSingleCategories(index);
            closeMenu();
        });
    });

    return fragment;
}

function createStarsForResult(item) {
    const star = document.createElement('div');
    star.classList.add(item);
    return star;

}





export { createCategoriesCard, createCardsSingleCategories, createMenuList, createStarsForResult };