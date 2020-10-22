//DOM elements
// const time = document.getElementByClassName('.time'),
//     greeting = document.getElementsByClassName('greeting'),
//     name = document.getElementsByClassName('name'),
//     focus = document.getElementsByClassName('focus');
const time = document.querySelector('.time'),
    date = document.querySelector('.date'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus-field'),
    btn = document.querySelector('.reloud-bgr'),
    blockquote = document.querySelector('.quote-text'),
    //figcaption = document.querySelector('.figcaption'),
    quoteBtn = document.querySelector('.quote-btn'),
    city = document.querySelector('.city'),
    weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.temperature'),
    weatherDescription = document.querySelector('.weather-description'),
    humidity = document.querySelector('.humidity'),
    wind = document.querySelector('.wind');


//object
const monthText = {
    '0': 'January',
    '1': 'February',
    '2': 'March',
    '3': 'April',
    '4': 'May',
    '5': 'June',
    '6': 'July',
    '7': 'August',
    '8': 'September',
    '9': 'October',
    '10': 'November',
    '11': 'December',
};

const dayWeekText = {
    '0': 'Sunday',
    '1': 'Monday',
    '2': 'Tuesday',
    '3': 'Wednesday',
    '4': 'Thursday',
    '5': 'Friday',
    '6': 'Saturday',
};

// options
const showAmPm = true;
let memoryVarName = '';
let memoryVarFocus = '';
let memoryVarCity = '';
let arrImg = [];
let numberSetImage = 0;

// function show time
function showTime() {
    //let today = new Date(2019, 06, 10, 20, 33, 30);
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    //AM PM
    const amPm = hour >= 12 ? 'PM' : 'AM';

    //12hr Format
    //hour = hour % 12 || 12;

    //output time
    //time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${showAmPm ? amPm : ''}`;
    time.innerHTML = `<span class="time_block">${addZero(hour)} </span> <span> : </span> <span class="time_block"> ${addZero(min)} </span> <span> : </span> <span class="time_block">${addZero(sec)}</span>`;

    if (min == 00 && sec == 00) {
        setBgGreet();
        setBgImage();
        //getWeather()
    }
    if (hour === 0 && min === 0 && sec === 0) {
        showDate();
    }

    setTimeout(showTime, 1000);
}

// function show date
function showDate() {
    //let today = new Date (2019, 06, 10, 20, 33, 30);
    let today = new Date(),
        month = today.getMonth(),
        dateDay = today.getDate(),
        dayWeek = today.getDay();

    //output date
    date.innerHTML = `${dayWeekText[dayWeek]}<span> , </span>${dateDay}<span> </span>${monthText[month]}`;
}

//add zero
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}


// BLOCK WITH FUNCTION FOR CHANGE NAME
//get name
function getName() {
    console.log('function getName');
    //console.log(localStorage.getItem('name'));
    if (localStorage.getItem('name') === null || localStorage.getItem('name') === '') {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// set name Enter button
function setName(e) {
    console.log('function setName');
    if (e.type === 'keypress') {
        //make sure enter is pressed
        if (e.which === 13 || e.keyCode === 13) {
            if (name.textContent === '' && memoryVarName === '') {
                name.textContent = localStorage.getItem('name');
                getName();
            } else if (name.textContent === '' && memoryVarName !== '') {
                name.textContent = memoryVarName;
                localStorage.setItem('name', memoryVarName);
                getName();
            } else {
                localStorage.setItem('name', e.target.innerText);
            }
            name.blur();
        }
    } else {
        localStorage.setItem('name', e.target.innerText);
    }
}
// set name on click mouse
function blurName(e) {
    console.log('function blurName');
    if (name.textContent === '' && memoryVarName === '') {
        name.textContent = localStorage.getItem('name');
        getName();
    } else if (name.textContent === '' && memoryVarName !== '') {
        name.textContent = memoryVarName;
        localStorage.setItem('name', memoryVarName);
        getName();
    } else {
        localStorage.setItem('name', e.target.innerText);
        getName();
    }
}

//CLEAR entry field for name on click
function clearName(e1) {
    console.log('function clearName');
    if (localStorage.getItem('name') !== null && localStorage.getItem('name') !== '') {
        memoryVarName = localStorage.getItem('name');
    }
    console.log("memoryVarName " + memoryVarName)
    name.textContent = '';
    //localStorage.setItem('name', memoryVar);
    setName(e1);
}

// BLOCK WITH FUNCTION FOR GET FOCUS

//get focus
function getFocus() {
    if (localStorage.getItem('focus') === null || localStorage.getItem('focus') === '') {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

// set Focus Enter button
function setFocus(e) {
    //console.log('function setFocus');
    if (e.type === 'keypress') {
        //make sure enter is pressed
        if (e.which === 13 || e.keyCode === 13) {
            if (focus.textContent === '' && memoryVarFocus === '') {
                focus.textContent = localStorage.getItem('focus');
                getFocus();
            } else if (focus.textContent === '' && memoryVarFocus !== '') {
                focus.textContent = memoryVarFocus;
                localStorage.setItem('focus', memoryVarFocus);
                getFocus();
            } else {
                localStorage.setItem('focus', e.target.innerText);

            }
            focus.blur();
        }
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
}

// set name on click mouse
function blurFocus(e) {
    console.log('function blurName');
    if (focus.textContent === '' && memoryVarFocus === '') {
        focus.textContent = localStorage.getItem('focus');
        getFocus();
    } else if (focus.textContent === '' && memoryVarFocus !== '') {
        focus.textContent = memoryVarFocus;
        localStorage.setItem('focus', memoryVarFocus);
        getFocus();
    } else {
        localStorage.setItem('focus', e.target.innerText);
        getFocus();
    }
}

//CLEAR entry field for name on click
function clearFocus(e1) {
    console.log('function clearFocus');
    if (localStorage.getItem('focus') !== null && localStorage.getItem('focus') !== '') {
        memoryVarFocus = localStorage.getItem('focus');
    }
    console.log("memoryVarFocus " + memoryVarFocus)
    focus.textContent = '';
    //localStorage.setItem('name', memoryVar);
    setFocus(e1);
}

// BLOCK WITH FUNCTION FOR SET CITY
//get city
function getCity() {
    console.log('function getCity');
    //console.log(localStorage.getItem('city'));
    if (localStorage.getItem('city') === null || localStorage.getItem('city') === '') {
        city.textContent = '[Enter city]';
    } else {
        city.textContent = localStorage.getItem('city');
        getWeather()
    }
}

// set city Enter button
function setCity(e) {
    console.log('function setCity');
    if (e.type === 'keypress') {
        //make sure enter is pressed
        if (e.which === 13 || e.keyCode === 13) {
            if (city.textContent === '' && memoryVarCity === '') {
                city.textContent = localStorage.getItem('city');
                getCity();
            } else if (city.textContent === '' && memoryVarCity !== '') {
                city.textContent = memoryVarCity;
                localStorage.setItem('city', memoryVarCity);
                getCity();
            } else {
                localStorage.setItem('city', e.target.innerText);
            }
            city.blur();
        }
    } else {
        localStorage.setItem('city', e.target.innerText);
    }
}
// set city on click mouse
function blurCity(e) {
    console.log('function blurCity');
    if (city.textContent === '' && memoryVarCity === '') {
        city.textContent = localStorage.getItem('city');
        getCity();
    } else if (city.textContent === '' && memoryVarCity !== '') {
        city.textContent = memoryVarCity;
        localStorage.setItem('city', memoryVarCity);
        getCity();
    } else {
        localStorage.setItem('city', e.target.innerText);
        getCity();
    }
    getWeather();
}

//CLEAR entry field for city on click
function clearCity(e1) {
    console.log('function clearCity');
    if (localStorage.getItem('city') !== null && localStorage.getItem('city') !== '') {
        memoryVarCity = localStorage.getItem('city');
    }
    console.log("memoryVarCity " + memoryVarCity)
    city.textContent = '';
    //localStorage.setItem('city', memoryVar);
    setCity(e1);
}

// BLOCK for change image

let i = 0;

// set image on time
function setBgImage() {
    const today = new Date(),
        hour = today.getHours('img');
    console.log('function setBgImage: hour:' + hour);
    document.body.style.backgroundImage = `url(${arrImg[hour]})`;
    console.log('function setBgImage: arrImg[hour]:' + arrImg[hour]);
    numberSetImage = hour;
}

//change image by button
function changeBgImage() {
    const body = document.querySelector('body');
    const img = document.createElement('img');
    console.log('function changeBgImage: numberSetImage do:' + numberSetImage);
    numberSetImage = (numberSetImage + 1) % arrImg.length;
    console.log('function changeBgImage: numberSetImage posle:' + numberSetImage);

    const src = arrImg[numberSetImage];
    console.log('function changeBgImage: src:' + src);
    img.src = src;
    img.onload = () => {
        document.body.style.backgroundImage = `url(${src})`
    }
}


//background
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();

    if (hour < 6) {
        //night
        //document.body.style.backgroundImage = "url('assets/images/night/01.jpg')";
        greeting.textContent = 'Good Night,';
    } else if (hour < 12) {
        //morning
        //document.body.style.backgroundImage = "url('assets/images/morning/01.jpg')";
        greeting.textContent = 'Good Morning,';
    } else if (hour < 18) {
        //day
        //document.body.style.backgroundImage = "url('assets/images/day/01.jpg')";
        greeting.textContent = 'Good Afternoon,';
    } else {
        //evening
        //document.body.style.backgroundImage = "url('assets/images/evening/01.jpg')";
        greeting.textContent = 'Good Evening,';
        //document.body.style.color = 'white';
    }
}

// Get array of image for background
function makeArrImg() {
    let i = 0;
    let randomImg = '';
    while (i < 6) {
        randomImg = `assets/images/night/${addZero(Math.floor(Math.random()*20 + 1))}.jpg`;
        //console.log('makeArrImg: ' + randomImg);
        if (!arrImg.includes(randomImg)) {
            arrImg.push(randomImg)
            i++
        }
    }
    while (i < 12) {
        randomImg = `assets/images/morning/${addZero(Math.floor(Math.random()*20 + 1))}.jpg`;
        //console.log('makeArrImg: ' + randomImg);
        if (!arrImg.includes(randomImg)) {
            arrImg.push(randomImg);
            i++;
        }
    }
    while (i < 18) {
        randomImg = `assets/images/day/${addZero(Math.floor(Math.random()*20 + 1))}.jpg`;
        //console.log('makeArrImg: ' + randomImg);
        if (!arrImg.includes(randomImg)) {
            arrImg.push(randomImg);
            i++;
        }
    }
    while (i < 24) {
        randomImg = `assets/images/evening/${addZero(Math.floor(Math.random()*20 + 1))}.jpg`;
        //console.log('makeArrImg: ' + randomImg);
        if (!arrImg.includes(randomImg)) {
            arrImg.push(randomImg);
            i++;
        }
    }
    console.log('arrImg: ' + arrImg);
}

// BLOCK FOR SET & CHANGE QUOTE
// если смена цитаты у вас не работает, вероятно, исчерпался лимит API. в консоли ошибка 403
// скопируйте код себе и запустите со своего компьютера
// если в ссылке заменить lang=en на lang=ru, цитаты будут на русском языке
// префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked 
async function getQuote() {
    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
    const res = await fetch(url);
    const data = await res.json();
    //console.log('getQuote ' + data.quoteText);
    blockquote.textContent = data.quoteText;
    //figcaption.textContent = data.quoteAuthor;

    // const url = `https://cors-anywhere.herokuapp.com/https://favqs.com/api/qotd`;
    // const res = await fetch(url);
    // const data = await res.json();
    // console.log('getQuote ' + data.quote.body);
    // blockquote.textContent = data.quote.body;


    if (blockquote === '') {
        const url = `https://cors-anywhere.herokuapp.com/https://api.adviceslip.com/advice`;
        const res = await fetch(url);
        const data = await res.json();
        console.log('getQuote ' + data.slip.advice);
        blockquote.textContent = data.slip.advice;
    }

    // const url = `https://cors-anywhere.herokuapp.com/https://api.adviceslip.com/advice`;
    // const res = await fetch(url);
    // const data = await res.json();
    // console.log('getQuote ' + data.slip.advice);
    // blockquote.textContent = data.slip.advice;

    // const url = `https://cors-anywhere.herokuapp.com/https://quote-garden.herokuapp.com/api/v2/quotes/random`;
    // const res = await fetch(url);
    // const data = await res.json();
    // console.log('getQuote ' + data.quoteText);
    // blockquote.textContent = data.quoteText;

}

// POGODA
async function getWeather() {
    console.log('getWeather city.textContent: ' + localStorage.getItem('city'));
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem('city')}&lang=en&appid=a02ecb70744342b247d342098dbaf515&units=metric`;
    console.log('getWeather url: ' + url);
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.weather[0].id, data.weather[0].description, data.main.temp, data.wind.speed, data.main.humidity);

    weatherIcon.classList.add(`owf-${data.weather[0].id}`);

    temperature.textContent = `t ${data.main.temp}°C`;
    humidity.textContent = `humidity ${data.main.humidity} %`;
    wind.textContent = `wind ${data.wind.speed} m/s`;
    weatherDescription.textContent = data.weather[0].description;
}


// run
showTime();
showDate();
makeArrImg();
setBgImage();
setBgGreet();
getName();
getFocus();
getCity();
getQuote();
getWeather();

name.addEventListener('keypress', setName);
name.addEventListener('blur', blurName);
name.addEventListener('click', clearName);

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', blurFocus);
focus.addEventListener('click', clearFocus);

city.addEventListener('keypress', setCity);
city.addEventListener('blur', blurCity);
city.addEventListener('click', clearCity);

btn.addEventListener('click', changeBgImage);

document.addEventListener('DOMContentLoaded', getQuote);
quoteBtn.addEventListener('click', getQuote);