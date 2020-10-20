//DOM elements
// const time = document.getElementByClassName('.time'),
//     greeting = document.getElementsByClassName('greeting'),
//     name = document.getElementsByClassName('name'),
//     focus = document.getElementsByClassName('focus');
const time = document.querySelector('.time'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus');

// options
const showAmPm = true;

// function show time
function showTime() {
    //let today = new Date (2019, 06, 10, 20, 33, 30);
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    //AM PM
    const amPm = hour >= 12 ? 'PM' : 'AM';

    //12hr Format
    hour = hour % 12 || 12;

    //output time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${showAmPm ? amPm : ''}`;

    setTimeout(showTime, 1000);
}

//add zero
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

//background
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    if (hour < 6) {
        //night
        document.body.style.backgroundImage = "url('assets/images/night/01.jpg')";
        greeting.textContent = 'Good Night';
        document.body.style.color = 'white';
    } else if (hour < 12) {
        //morning
        document.body.style.backgroundImage = "url('assets/images/morning/01.jpg')";
        greeting.textContent = 'Good Morning';
    } else if (hour < 18) {
        //day
        document.body.style.backgroundImage = "url('assets/images/day/01.jpg')";
        greeting.textContent = 'Good Afternoon';
    } else {
        //evening
        document.body.style.backgroundImage = "url('assets/images/evening/01.jpg')";
        greeting.textContent = 'Good Evening';
        document.body.style.color = 'white';
    }
}

//get name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// set name
function setName(e) {
    if (e.type === 'keypress') {
        //make sure enter is pressed
        if (e.which === 13 || e.keyCode === 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else {
        localStorage.setItem('name', e.target.innerText);
    }
}

//get focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

// set focus
function setFocus(e) {
    if (e.type === 'keypress') {
        //make sure enter is pressed
        if (e.which === 13 || e.keyCode === 13) {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// run
showTime();
setBgGreet();
getName();
getFocus();