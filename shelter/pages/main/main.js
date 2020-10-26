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

// for pets create cards and pagination
const btnPrev = document.querySelector('.btn-prev'),
    btnNext = document.querySelector('.btn-next');


// VAR
let petsArray = []; // array of 8 elements
let fullPetsList = []; //array of 48 elements

//Download and create array with information about Pets
const request = new XMLHttpRequest();
request.open('GET', '../pets/pets.json');
//chto prixodit pri zagruzke json faila
fetch('../pets/pets.json').then(res => res.json()).then(list => {
    console.log('function fetch');
    petsArray = list;


    fullPetsList = (() => {
        console.log('function fullPetsList');
        let newPets = petsArray;
        newPets = createRandomPets(newPets);
        // for (let j = petsArray.length; j > 0; j--) {
        //     let randId = Math.floor(Math.random() * j);
        //     const randElem = newPets.splice(randId, 1)[0];
        //     newPets.push(randElem);
        // }

        console.log('newPets: ' + newPets);
        return newPets;
    })();

    console.log('fullPetsList: ' + fullPetsList);
    fillPetCard(fullPetsList);

})
request.send();

const createRandomPets = (petsData) => {

    for (let j = petsData.length; j > 0; j--) {
        let randId = Math.floor(Math.random() * j);
        const randElem = petsData.splice(randId, 1)[0];
        petsData.push(randElem);
    }

    console.log('petsData: ' + petsData);
    return petsData;
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

    // console.log('function fillPetCard: list ' + list);
    const petsCardsWrapper = document.querySelector(".pets__cards");
    const bodyWidth = document.querySelector('body').offsetWidth;
    const numberPetsCards = bodyWidth >= 1280 ? 3 : bodyWidth >= 768 ? 2 : 1;

    console.log('function fillPetCard: numberPetsCards ' + numberPetsCards);
    console.log('function fillPetCard: bodyWidth ' + bodyWidth);

    const sliderList = document.createElement('div');
    sliderList.classList.add('pets__cards-list');

    for (let i = 0; i < numberPetsCards; i++) {
        // console.log('function fillPetCard: for');
        const petItem = createPetCard(list[i]);
        sliderList.appendChild(petItem);
    }

    petsCardsWrapper.append(sliderList);
    // console.log('function fillPetCard: petsCardsWrapper ' + petsCardsWrapper);
    // console.log('function fillPetCard: sliderList ' + sliderList);

}

// пересоздание pets cards при изменении экрана
const ClearCards = (list) => {
    console.log('function ClearCards');

    const petsCardsWrapper = document.querySelector(".pets__cards");

    while (petsCardsWrapper.firstChild) {
        petsCardsWrapper.removeChild(petsCardsWrapper.firstChild);
    }


}

// ожидание изменения размера окна
window.addEventListener('resize', function(event) {
    console.log('resized: ' + document.querySelector('body').offsetWidth);
    ClearCards();
    fillPetCard(fullPetsList);

});

// Pagination on pets cards

btnNext.addEventListener("click", () => {
    console.log('function btnNext.addEventListener');
    ClearCards(fullPetsList);
    const petsRandom = createRandomPets(petsArray);
    fillPetCard(petsRandom);
});

btnPrev.addEventListener("click", () => {
    console.log('function btnNext.addEventListener');
    ClearCards(fullPetsList);
    const petsRandom = createRandomPets(petsArray);
    fillPetCard(petsRandom);
});

// //включение свойства disable на кнопки слайдера
// const toggleDisablingBtn = (btn, disable = false) => {
//     if (disable) {
//         btn.setAttribute("disabled", true)
//     } else {
//         btn.removeAttribute("disabled", false)
//     }
// }

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