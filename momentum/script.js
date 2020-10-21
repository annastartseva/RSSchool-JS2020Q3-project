//DOM elements
// const time = document.getElementByClassName('.time'),
//     greeting = document.getElementsByClassName('greeting'),
//     name = document.getElementsByClassName('name'),
//     focus = document.getElementsByClassName('focus');
const time = document.querySelector('.time'),
    date = document.querySelector('.date'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus-field');
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
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    changeDate(hour, min, sec);

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

//change date
function changeDate(hour, min, sec) {
    if (hour === 0 && min === 0 && sec === 0) {
        showDate();
    }
}
//add zero
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

//background
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();

    if (hour < 6) {
        //night
        document.body.style.backgroundImage = "url('assets/images/night/01.jpg')";
        greeting.textContent = 'Good Night, ';
        document.body.style.color = 'white';
    } else if (hour < 12) {
        //morning
        document.body.style.backgroundImage = "url('assets/images/morning/01.jpg')";
        greeting.textContent = 'Good Morning, ';
    } else if (hour < 18) {
        //day
        document.body.style.backgroundImage = "url('assets/images/day/01.jpg')";
        greeting.textContent = 'Good Afternoon, ';
    } else {
        //evening
        document.body.style.backgroundImage = "url('assets/images/evening/01.jpg')";
        greeting.textContent = 'Good Evening, ';
        //document.body.style.color = 'white';
    }
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

name.addEventListener('keypress', setName);
name.addEventListener('blur', blurName);
name.addEventListener('click', clearName);

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', blurFocus);
focus.addEventListener('click', clearFocus);

// run
showTime();
showDate();
setBgGreet();
getName();
getFocus();