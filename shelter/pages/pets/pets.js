// BURGER MENU active/disable

const burger = document.querySelector(".burger"),
    header = document.querySelector(".header");
const navWrapper = document.querySelector(".menu");
const btnOurPets = document.querySelector(".list__link_active");

burger.addEventListener("click", (event) => {
    // event.stopPropagation();
    header.classList.toggle("header__active");
    changeBodyScrolling();
});


btnOurPets.addEventListener("click", function(event) {
    header.classList.toggle("header__active");
    changeBodyScrolling();
});

const blackoutBgrd = document.querySelector(".blackout__bgr");
blackoutBgrd.addEventListener("click", function(event) {
    const isShown = blackoutBgrd.classList.contains("blackout__bgr-active");

    if (!isShown) {
        return;
    }

    if (this !== event.target) {
        return;
    }

    header.classList.toggle("header__active");
    changeBodyScrolling();
});

navWrapper.addEventListener("click", function(event) {
    if (event.target !== this) {
        return;
    }
    event.stopPropagation();
    header.classList.toggle("header__active");
});

header.addEventListener("click", (event) => {
    event.stopPropagation();
    const isHeaderShown = event.target.classList.contains("header__active");
    return isHeaderShown ? header.classList.toggle("header__active") : null;
});

const btnToStart = document.querySelector('.btn-to-start'),
    btnPrev = document.querySelector('.btn-prev'),
    btnNumber = document.querySelector('.btn-number'),
    btnNext = document.querySelector('.btn-next'),
    btnToEnd = document.querySelector('.btn-to-end');

// VAR
let petsArray = []; // array of 8 elements
let fullPetsList = []; //array of 48 elements
let copyFullPetsList = [];

//Download and create array with information about Pets
const request = new XMLHttpRequest();
request.open('GET', './pets.json');
//chto prixodit pri zagruzke json faila
fetch('./pets.json').then(res => res.json()).then(list => {
    console.log('function fetch');
    petsArray = list;
    // console.log('petsArray array' + petsArray)

    fullPetsList = (() => {
        console.log('function fullPetsList');
        let tempArr = [];

        for (let i = 0; i < 6; i++) {
            const newPets = petsArray;
            //данные в восьмерках элементов не повторяются
            for (let j = petsArray.length; j > 0; j--) {
                let randId = Math.floor(Math.random() * j);
                const randElem = newPets.splice(randId, 1)[0];
                newPets.push(randElem);
            }
            tempArr = [...tempArr, ...newPets];
        }
        // console.log('tempArr: ' + tempArr);
        return tempArr;
    })();
    //для 6 и 3 проверяем массив на повторяющиеся элементы
    fullPetsList = sort6Recursiveely(fullPetsList);
    // let dublicateList = fullPetsList;
    fillPetCard(fullPetsList);
})


request.send();


// функция проверяющая повторы в 6-ках картинок через рекурсию - вызов самой себя
const sort6Recursiveely = (list) => {
    console.log('function sort6Recursiveely');
    let length = list.length;

    for (let i = 0; i < (length / 6); i++) {
        const stepList = list.slice(i * 6, (i * 6) + 6);
        // console.log('stepList: ' + stepList);

        for (let j = 0; j < 6; j++) {
            const duplicatedItem = stepList.find((item, ind) => {
                return item.name === stepList.name && (ind !== j);
                // return item.name === stepList[j].name && (ind !== j);
            });

            if (duplicatedItem !== undefined) {
                const ind = (i * 6) + j;
                const which8OfList = Math.trunc(ind / 8);

                list.splice(which8OfList * 8, 0, list.splice(ind)[0]);

                sort6Recursiveely(list);
            }
        }
    }
    return list;
}

const createPetCard = (cardInfo) => {
    console.log('function createPetCard');
    const cardsItem = document.createElement("div");
    cardsItem.classList.add("pets__cards-info");

    const img = document.createElement("img");
    img.setAttribute("src", `../../assets/images/pets-${cardInfo.name.toLowerCase()}.png`);
    // img.setAttribute("alt", `Pet's foto`);
    cardsItem.appendChild(img);

    const title = document.createElement("h4");
    title.classList.add("pets__cards-title");
    title.textContent = cardInfo.name;
    cardsItem.appendChild(title);

    const btn = document.createElement("button");
    btn.classList.add("pets__cards-button");
    btn.textContent = "Learn more";
    cardsItem.appendChild(btn);

    cardsItem.addEventListener('click', () => {
        const currentPetInfo = petsArray.find(pet => pet.name === cardInfo.name);
        fillPopup(currentPetInfo);
        // const popup = document.querySelector('.popup');
        // popup.classList.add('popup__scr-active')
        togglePopup();
        // вкл-выкл окно popup
        changeBodyScrolling(); //отключение скрола
    });

    return cardsItem;
}

const fillPetCard = (list) => {
    console.log('function fillPetCard');
    copyFullPetsList = list.slice();

    // console.log('function fillPetCard: copyFullPetsList ' + copyFullPetsList);
    const petsCardsWrapper = document.querySelector(".pets__cards");
    const bodyWidth = document.querySelector('body').offsetWidth;
    const numberPetsCards = bodyWidth >= 1280 ? 8 : bodyWidth >= 768 ? 6 : 3;

    // console.log('function fillPetCard: numberPetsCards ' + numberPetsCards);
    console.log('function fillPetCardOnResize: bodyWidth ' + bodyWidth);

    let listCounter = 1;
    while (copyFullPetsList.length > 0) {
        // console.log('function fillPetCard while');
        const sliderList = document.createElement('div');
        sliderList.classList.add('pets__cards-list');

        if (listCounter === 1) {
            sliderList.classList.add('cards-list-active');
            toggleDisablingBtn(btnPrev, true);
            toggleDisablingBtn(btnToStart, true);
        }

        sliderList.setAttribute('cards-list-number', `${listCounter}`);

        for (let i = 0; i < numberPetsCards; i++) {
            // console.log('function fillPetCard: for');
            const petItem = createPetCard(copyFullPetsList[i]);
            sliderList.appendChild(petItem);
        }

        listCounter++;

        petsCardsWrapper.append(sliderList);
        // console.log('function fillPetCard: sliderList ' + sliderList);
        copyFullPetsList.splice(0, numberPetsCards);
    }
}

// пересоздание pets cards при изменении экрана
const fillPetCardOnResize = (list) => {
    console.log('function fillPetCardOnResize');
    copyFullPetsList = list.slice();

    const petsCardsWrapper = document.querySelector(".pets__cards");
    const cardsList = document.querySelector(".pets__cards-list");
    const prevPage = document.querySelector('.cards-list-active');
    const prevPageNumber = +prevPage.getAttribute('cards-list-number');
    const bodyWidth = document.querySelector('body').offsetWidth;
    const numberPetsCards = bodyWidth >= 1280 ? 8 : bodyWidth >= 768 ? 6 : 3;

    console.log('function fillPetCardOnResize: bodyWidth ' + bodyWidth);

    while (petsCardsWrapper.firstChild) {
        petsCardsWrapper.removeChild(petsCardsWrapper.firstChild);
    }

    let listCounter = 1;
    while (copyFullPetsList.length > 0) {
        // console.log('function fillPetCardOnResize: bodyWidth ' + bodyWidth);
        // console.log('function fillPetCardOnResize: numberPetsCards ' + numberPetsCards);
        // console.log('function fillPetCardOnResize: btnNumber ' + btnNumber.textContent);
        // console.log('function fillPetCardOnResize copyFullPetsList.length: ' + copyFullPetsList.length);
        // console.log('function fillPetCardOnResize listCounter: ' + listCounter);
        // console.log('function fillPetCardOnResize: prevPageNumber ' + prevPageNumber);

        const sliderList = document.createElement('div');
        sliderList.classList.add('pets__cards-list');

        if (listCounter === prevPageNumber) {
            // console.log('listCounter === prevPageNumber: ' + listCounter + ' ' + prevPageNumber);
            btnNumber.textContent = 48 / numberPetsCards;
            sliderList.classList.add('cards-list-active');
        }
        if (copyFullPetsList.length === numberPetsCards && listCounter < prevPageNumber) {
            btnNumber.textContent = listCounter;
            sliderList.classList.add('cards-list-active');
        }

        sliderList.setAttribute('cards-list-number', `${listCounter}`);

        for (let i = 0; i < numberPetsCards; i++) {
            const petItem = createPetCard(copyFullPetsList[i]);
            sliderList.appendChild(petItem);
        }

        listCounter++;

        petsCardsWrapper.append(sliderList);
        copyFullPetsList.splice(0, numberPetsCards);
    }
}

// ожидание изменения размера окна
window.addEventListener('resize', function(event) {
    console.log('resized: ' + document.querySelector('body').offsetWidth);
    fillPetCardOnResize(fullPetsList);
});


// Pagination on pets cards


btnNext.addEventListener("click", () => {

    const prevPage = document.querySelector('.cards-list-active');
    const prevPageNumber = +prevPage.getAttribute('cards-list-number');
    const pages = document.querySelectorAll('.pets__cards-list').length;

    const nextPageNumber = prevPageNumber + 1;
    const nextPage = document.querySelector(`.pets__cards-list[cards-list-number="${nextPageNumber}"]`);

    if (prevPageNumber === pages) {
        return;
    }

    if (prevPageNumber === 1 && pages > 1) {
        toggleDisablingBtn(btnPrev);
        toggleDisablingBtn(btnToStart);
    }



    if (nextPageNumber === pages) {
        toggleDisablingBtn(btnNext, true);
        toggleDisablingBtn(btnToEnd, true);
    }


    prevPage.classList.remove('cards-list-active');
    nextPage.classList.add('cards-list-active');

    btnNumber.textContent = nextPageNumber;
});

// btnNext.addEventListener("click", () => {

//     const prevPage = document.querySelector('.cards-list-active');
//     const prevPageNumber = +prevPage.getAttribute('cards-list-number');
//     const pages = document.querySelectorAll('.pets__cards-list').length;

//     if (prevPageNumber === pages) {
//         return;
//     }

//     if (prevPageNumber === 1 && pages > 1) {
//         const prevBtn = document.querySelector('.btn-prev');
//         const toStartBtn = document.querySelector('.btn-to-start');
//         toggleDisablingBtn(prevBtn);
//         toggleDisablingBtn(toStartBtn);
//     }

//     const nextPageNumber = prevPageNumber + 1;

//     if (nextPageNumber === pages) {
//         const nextBtn = document.querySelector('.btn-next');
//         const toEndBtn = document.querySelector('.btn-to-end');
//         toggleDisablingBtn(nextBtn, true);
//         toggleDisablingBtn(toEndBtn, true);
//     }

//     const nextPage = document.querySelector(`.pets__cards-list[cards-list-number="${nextPageNumber}"]`);

//     prevPage.classList.remove('cards-list-active');
//     nextPage.classList.add('cards-list-active');

//     btnNumber.textContent = nextPageNumber;
// });


btnPrev.addEventListener("click", () => {
    const btnNumber = document.querySelector('.btn-number');
    const prevPage = document.querySelector('.cards-list-active');
    const prevPageNumber = +prevPage.getAttribute('cards-list-number');
    const pages = document.querySelectorAll('.pets__cards-list').length;
    const currentPageNumber = prevPageNumber - 1;

    if (currentPageNumber === 1) {
        const prevBtn = document.querySelector('.btn-prev');
        const toStartBtn = document.querySelector('.btn-to-start');
        toggleDisablingBtn(prevBtn, true);
        toggleDisablingBtn(toStartBtn, true);
    }

    if (currentPageNumber < pages) {
        const nextBtn = document.querySelector('.btn-next');
        const toEndBtn = document.querySelector('.btn-to-end');
        toggleDisablingBtn(nextBtn);
        toggleDisablingBtn(toEndBtn);
    }

    const currentPage = document.querySelector(`.pets__cards-list[cards-list-number="${currentPageNumber}"]`);

    prevPage.classList.remove('cards-list-active');
    currentPage.classList.add('cards-list-active');

    btnNumber.textContent = currentPageNumber;
});


btnToStart.addEventListener('click', function(event) {
    toggleDisablingBtn(event.target, true);
    const btnNumber = document.querySelector('.btn-number');
    btnNumber.textContent = 1;

    const btnPrev = document.querySelector('.btn-prev');
    toggleDisablingBtn(btnPrev, true);

    const btnNext = document.querySelector('.btn-next');
    const btnToEnd = document.querySelector('.btn-to-end');

    toggleDisablingBtn(btnNext);
    toggleDisablingBtn(btnToEnd);

    const prevPage = document.querySelector('.cards-list-active');
    const currentPage = document.querySelector('.pets__cards-list[cards-list-number="1"]');

    prevPage.classList.remove('cards-list-active');
    currentPage.classList.add('cards-list-active');
});



btnToEnd.addEventListener('click', function(event) {
    toggleDisablingBtn(event.target, true);
    const btnNumber = document.querySelector('.btn-number');
    const pages = document.querySelectorAll('.pets__cards-list').length;
    btnNumber.textContent = pages;

    const btnNext = document.querySelector('.btn-next');
    toggleDisablingBtn(btnNext, true);

    const btnPrev = document.querySelector('.btn-prev');
    const btnToStart = document.querySelector('.btn-to-start');

    toggleDisablingBtn(btnPrev);
    toggleDisablingBtn(btnToStart);

    const prevPage = document.querySelector('.cards-list-active');
    const currentPage = document.querySelector(`.pets__cards-list[cards-list-number="${pages}"]`);

    prevPage.classList.remove('cards-list-active');
    currentPage.classList.add('cards-list-active');
});

//включение свойства disable на кнопки слайдера
const toggleDisablingBtn = (btn, disable = false) => {
        if (disable) {
            btn.setAttribute("disabled", true)
        } else {
            btn.removeAttribute("disabled", false)
        }
    }
    // ------ POPUP------

const body = document.querySelector('body'),
    popup = document.querySelector(".popup"),
    popupCloseBtn = document.querySelector(".popup__close-btn"),
    popupImg = document.querySelector(".popup__pets-img"),
    popupTitle = document.querySelector(".popup__content-title"),
    popupSubtitle = document.querySelector(".popup__content-subtitle"),
    popupDescription = document.querySelector(".popup__description"),
    popupAge = document.querySelector(".popup__item-age"),
    popupInoculations = document.querySelector(".popup__item-inoculations"),
    popupDiseases = document.querySelector(".popup__item-diseases"),
    popupParasites = document.querySelector(".popup__item-parasites");

const fillPopup = petInfo => {

    popupTitle.textContent = petInfo.name;
    popupDescription.textContent = petInfo.description;
    popupImg.setAttribute("src", `../../assets/images/pets-${petInfo.name.toLowerCase()}.png`);
    popupSubtitle.textContent = `${petInfo.type} - ${petInfo.breed}`;
    popupAge.textContent = petInfo.age;
    popupInoculations.textContent = petInfo.inoculations.join(', ');
    popupDiseases.textContent = petInfo.diseases.join(', ');
    popupParasites.textContent = petInfo.parasites.join(', ');
}

popupCloseBtn.addEventListener("click", () => {
    console.log('click button')
    togglePopup();
    changeBodyScrolling();
});

popup.addEventListener("click", function(event) {
    const isShown = popup.classList.contains("popup__scr-active");

    if (!isShown) {
        return;
    }

    if (this !== event.target) {
        return;
    }

    togglePopup();
    changeBodyScrolling();
});

//метод classList.toggle: 
//класс у элемента существует - он его удаляет, если класса нет - добавляет
const changeBodyScrolling = () => {
    body.classList.toggle("popup-open");
};

const togglePopup = () => {
    popup.classList.toggle("popup__scr-active");
}