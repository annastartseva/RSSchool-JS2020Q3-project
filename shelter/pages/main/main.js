const elemCardsPets = document.querySelector(".petsArray__cards-info");

// VAR
let petsArray = []; // array of 8 elements
let fullPetsList = []; //array of 48 elements
let petsArray2 = [];


//Download and create array with information about Pets
const request = new XMLHttpRequest();
request.open('GET', '../pets/pets.json');
//chto prixodit pri zagruzke json faila
fetch('../pets/pets.json').then(res => res.json()).then(list => {
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

    //     togglePopup();
    // });

    return cardsItem;
}

const fillPetCard = (list) => {
    console.log('function fillPetCard');
    const petsCardsWrapper = document.querySelector(".pets__cards");
    const bodyWidth = document.querySelector('body').offsetWidth;
    console.log('bodyWidth: ' + bodyWidth);
    const numberPetsCards = bodyWidth >= 1280 ? 3 : bodyWidth >= 768 ? 2 : 1;
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