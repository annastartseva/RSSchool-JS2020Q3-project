const elemCardsPets = document.querySelector(".petsArray__cards-info");

// VAR
let petsArray = []; // array of 8 elements
let fullPetsList = []; //array of 48 elements
let petsArray2 = [];


//Download and create array with information about Pets
const request = new XMLHttpRequest();
request.open('GET', './pets.json');
//chto prixodit pri zagruzke json faila
fetch('./pets.json').then(res => res.json()).then(list => {
    console.log('function fetch');
    petsArray = list;
    console.log('petsArray array' + petsArray)

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
        console.log('tempArr: ' + tempArr);
        return tempArr;
    })();
    //для 6 и 3 проверяем массив на повторяющиеся элементы
    fullPetsList = sort6Recursiveely(fullPetsList);

    fillPetCard(fullPetsList);
})


request.send();

// функция проверяющая повторы в 6-ках картинок через рекурсию - вызов самой себя
const sort6Recursiveely = (list) => {
    console.log('function sort6Recursiveely');
    let length = list.length;

    for (let i = 0; i < (length / 6); i++) {
        const stepList = list.slice(i * 6, (i * 6) + 6);
        console.log('stepList: ' + stepList);

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

/* <div class="pets__cards">
                    <div class="pets__cards-info">
                        <img src="../../assets/images/pets-katrine.png" alt="Pet's foto">
                        <h4 class="pets__cards-title">Katrine</h4>
                        <button class="pets__cards-button">Learn more</button>
                    </div>*/

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

    // cardsItem.addEventListener('click', () => {
    //     const currentPetInfo = pets.find(pet => pet.name === cardInfo.name);
    //     fillPopup(currentPetInfo);
    //     // const popup = document.querySelector('#popup');
    //     // popup.classList.add('popup--active')
    //     togglePopup();
    //     // popup.style.visibility = 'visible';
    //     // popup.style.opacity = '1';
    //     toggleBodyScrolling();
    // });

    return cardsItem;
}

const fillPetCard = (list) => {
    console.log('function fillPetCard');
    const petsCardsWrapper = document.querySelector(".pets__cards");
    const bodyWidth = document.querySelector('body').offsetWidth;
    const numberPetsCards = bodyWidth >= 1280 ? 8 : bodyWidth >= 768 ? 6 : 3;
    let listCounter = 1;
    while (list.length > 0) {
        const sliderList = document.createElement('div');
        sliderList.classList.add('pets__cards-list');

        if (listCounter === 1) {
            sliderList.classList.add('cards-list-active');
        }

        sliderList.setAttribute('cards-list-number', `${listCounter}`);

        for (let i = 0; i < numberPetsCards; i++) {
            const petItem = createPetCard(list[i]);
            sliderList.appendChild(petItem);
        }

        listCounter++;

        petsCardsWrapper.append(sliderList);
        list.splice(0, numberPetsCards);
    }
}

// const btn = document.querySelector(".pets__cards-button");
// btn.addEventListener('click', () => {
//     const currentPetInfo = petsArray.find(pet => pet.name === cardInfo.name);
//     fillPopup(currentPetInfo);
//     // const popup = document.querySelector('#popup');
//     // popup.classList.add('popup--active')
//     togglePopup();
//     // popup.style.visibility = 'visible';
//     // popup.style.opacity = '1';
//     toggleBodyScrolling();
// });
//popup

const fillPopup = petInfo => {
    const popupTitle = document.querySelector("#popup .title");
    popupTitle.textContent = petInfo.name;

    const popupDescription = document.querySelector("#popup .description");
    popupDescription.textContent = petInfo.description;

    const popupImg = document.querySelector("#popup img");
    popupImg.setAttribute("src", petInfo.img);

    const popupPetType = document.querySelector("#popup-pet-type");
    popupPetType.textContent = petInfo.type;

    const popupBreed = document.querySelector("#popup-breed");
    popupBreed.textContent = petInfo.breed;

    const popupAge = document.querySelector("#popup-age");
    popupAge.textContent = petInfo.age;

    const popupInoculations = document.querySelector("#popup-inoculations");
    popupInoculations.textContent = petInfo.inoculations.join(', ');

    const popupDiseases = document.querySelector("#popup-diseases");
    popupDiseases.textContent = petInfo.diseases.join(', ');

    const popupParasites = document.querySelector("#popup-parasites");
    popupParasites.textContent = petInfo.parasites.join(', ');
}

const popupCloseBtn = document.querySelector('#btn-close-popup');
const popup = document.querySelector("#popup");

popupCloseBtn.addEventListener("click", () => {
    console.log('click button')
    togglePopup();
    toggleBodyScrolling();
});

popup.addEventListener("click", function(event) {
    const isShown = popup.classList.contains('popup--active');

    if (!isShown) {
        return;
    }

    if (this !== event.target) {
        return;
    }

    togglePopup();
    toggleBodyScrolling();
});

const toggleBodyScrolling = () => {
    const body = document.querySelector('body');
    body.classList.toggle("modal-open");
};

const togglePopup = () => {
    const popup = document.querySelector('#popup');
    popup.classList.toggle("popup--active");
}