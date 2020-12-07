import { openCardsSingleCategories, setMainPage, closeMenu, createAudioOnCard, checkСorrectlyPushCard, setStatisticPage, addDataToStatistic } from './index.js';

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

        // card.id = `${index}`;

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

        // console.log('card ' + card);

        card.addEventListener('click', () => {
            openCardsSingleCategories(index);
            // console.log('index card' + index);

        });
    })

    return fragment;
}

function createCardsSingleCategories(categories, state, arrayRandomNumber) {
    const fragment = document.createDocumentFragment();
    // console.log('categories ' + categories);
    // console.log('categories.length ' + categories.length);

    categories.forEach(function(element, index) {
        const idCard = arrayRandomNumber[index];
        const cardWord = categories[idCard].word;

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
        titleCardFront.innerHTML = `${cardWord}`;

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
            addDataToStatistic(cardWord, "train");
        });

        card.addEventListener('mouseleave', () => {
            cardFront.classList.remove('front-rotate');
            cardBack.classList.remove('back-rotate');
        });

        card.addEventListener('click', () => {
            if (state.train === false) {
                // console.log("id " + idCard);
                state.playLastPushCardId = idCard;
                checkСorrectlyPushCard(idCard, card, cardWord);

            }
        })

        soundCardFront.addEventListener('click', () => {
            const cardSound = createAudioOnCard(categories[idCard].audioSrc);
            cardSound.play();
            addDataToStatistic(cardWord, "train");
        });

        imageCardFront.addEventListener('click', () => {
            const cardSound = createAudioOnCard(categories[idCard].audioSrc);
            if (state.train === true) {
                cardSound.play();
                addDataToStatistic(cardWord, "train");
            };

        });

        titleCardFront.addEventListener('click', () => {
            const cardSound = createAudioOnCard(categories[idCard].audioSrc);
            cardSound.play();
            addDataToStatistic(cardWord, "train");
        });
    });

    return fragment;
}

function createMenuList(categories, state, mainMenuItemId, statisticItemId) {
    const occupiedItemUnderMain = 1;

    state.currentCategoriesId = mainMenuItemId;

    const fragment = document.createDocumentFragment();

    const menuMainItem = document.createElement('li');
    const menuMainIcon = document.createElement('i');
    menuMainItem.classList.add('menu__item', 'active');
    menuMainIcon.classList.add('menu__link', 'main');

    menuMainIcon.innerHTML = 'Main Page';

    menuMainItem.id = `${mainMenuItemId}`;

    menuMainItem.appendChild(menuMainIcon);
    fragment.appendChild(menuMainItem);

    menuMainItem.addEventListener('click', () => {
        setMainPage(mainMenuItemId);
        closeMenu();
        // console.log('mainMenuItemId ' + mainMenuItemId);
    });

    categories.forEach(function(element, index) {
        const menuItem = document.createElement('li');
        const menuIcon = document.createElement('i');

        menuItem.classList.add('menu__item');
        menuIcon.classList.add('menu__link', `${element.replace(/\s+/g, '').toLowerCase()}`);

        menuIcon.innerHTML = `${element}`;

        menuItem.id = `${index}`;

        menuItem.appendChild(menuIcon);
        fragment.appendChild(menuItem);

        menuItem.addEventListener('click', () => {
            openCardsSingleCategories(index);
            closeMenu();
            // console.log('index ' + index);
        });
    });

    const menuStatisticItem = document.createElement('li');
    const menuStatisticIcon = document.createElement('i');
    menuStatisticItem.classList.add('menu__item');
    menuStatisticIcon.classList.add('menu__link', 'statistics');
    // menuMainItem.setAttribute('number', '0')
    menuStatisticIcon.innerHTML = 'Statistics';

    menuStatisticItem.id = `${statisticItemId}`;

    menuStatisticItem.appendChild(menuStatisticIcon);
    fragment.appendChild(menuStatisticItem);

    menuStatisticItem.addEventListener('click', () => {
        setStatisticPage(statisticItemId);
        closeMenu();
        console.log('statisticItemId ' + statisticItemId);
    });

    return fragment;
}

function createStarsForResult(item) {
    const star = document.createElement('div');
    star.classList.add(item);
    return star;

}

function createStatisticTitle() {
    const fragment = document.createDocumentFragment();
    const tableTR = document.createElement('tr');
    tableTR.classList.add('table__row', 'table_title');

    const tableTDCategories = document.createElement('td');
    const tableTDWord = document.createElement('td');
    const tableTDTranslation = document.createElement('td');
    const tableTDTrainClick = document.createElement('td');
    const tableTDPlayCorrect = document.createElement('td');
    const tableTDPlayWrong = document.createElement('td');
    const tableTDPlayError = document.createElement('td');

    tableTDCategories.classList.add('table__column', 'table_title');
    tableTDWord.classList.add('table__column', 'table_title');
    tableTDTranslation.classList.add('table__column', 'table_title');
    tableTDTrainClick.classList.add('table__column', 'table_title');
    tableTDPlayCorrect.classList.add('table__column', 'table_title');
    tableTDPlayWrong.classList.add('table__column', 'table_title');
    tableTDPlayError.classList.add('table__column', 'table_title');

    tableTDCategories.innerHTML = 'Categories';
    tableTDWord.innerHTML = 'Word';
    tableTDTranslation.innerHTML = 'Translation';
    tableTDTrainClick.innerHTML = 'Trained';
    tableTDPlayCorrect.innerHTML = 'Correct';
    tableTDPlayWrong.innerHTML = 'Wrong';
    tableTDPlayError.innerHTML = 'Error %';

    tableTR.appendChild(tableTDCategories);
    tableTR.appendChild(tableTDWord);
    tableTR.appendChild(tableTDTranslation);
    tableTR.appendChild(tableTDTrainClick);
    tableTR.appendChild(tableTDPlayCorrect);
    tableTR.appendChild(tableTDPlayWrong);
    tableTR.appendChild(tableTDPlayError);

    console.log('tableTR ' + tableTR);
    fragment.appendChild(tableTR);
    return fragment;
}

function createStatisticTable(statisticFile) {
    console.log('createStatisticTable ');
    const fragment = document.createDocumentFragment();

    statisticFile.forEach(function(element, index) {
        const tableTR = document.createElement('tr');
        tableTR.classList.add('table__row');

        const tableTDCategories = document.createElement('td');
        const tableTDWord = document.createElement('td');
        const tableTDTranslation = document.createElement('td');
        const tableTDTrainClick = document.createElement('td');
        const tableTDPlayCorrect = document.createElement('td');
        const tableTDPlayWrong = document.createElement('td');
        const tableTDPlayError = document.createElement('td');

        tableTDCategories.classList.add('table__column');
        tableTDWord.classList.add('table__column');
        tableTDTranslation.classList.add('table__column');
        tableTDTrainClick.classList.add('table__column');
        tableTDPlayCorrect.classList.add('table__column');
        tableTDPlayWrong.classList.add('table__column');
        tableTDPlayError.classList.add('table__column');

        console.log('statisticFile[i].categories ' + element.categories);
        console.log('statisticFile[i].word ' + element.word);
        console.log('statisticFile[i].translation ' + element.translation);

        tableTDCategories.innerHTML = `${element.categories}`;
        tableTDWord.innerHTML = `${element.word}`;
        tableTDTranslation.innerHTML = `${element.translation}`;
        tableTDTrainClick.innerHTML = `${element.train}`;
        tableTDPlayCorrect.innerHTML = `${element.correct}`;
        tableTDPlayWrong.innerHTML = `${element.wrong}`;
        tableTDPlayError.innerHTML = `${element.error}`;

        tableTR.appendChild(tableTDCategories);
        tableTR.appendChild(tableTDWord);
        tableTR.appendChild(tableTDTranslation);
        tableTR.appendChild(tableTDTrainClick);
        tableTR.appendChild(tableTDPlayCorrect);
        tableTR.appendChild(tableTDPlayWrong);
        tableTR.appendChild(tableTDPlayError);

        console.log('tableTR ' + tableTR);
        fragment.appendChild(tableTR);
    });
    return fragment;
}


export { createCategoriesCard, createCardsSingleCategories, createMenuList, createStarsForResult, createStatisticTitle, createStatisticTable };