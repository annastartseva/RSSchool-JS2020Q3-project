const cellSize = 100;
//empty cell
const empty = {
    value: 0,
    top: 0,
    left: 0,
};

const cells = [];
// cells.push(empty);

const numbers = [...Array(16).keys()]
    .sort(() => Math.random() - 0.5);
console.log(numbers);

//create main elements
const gameWrap = document.createElement('div');
const menuWrap = document.createElement('div');
const field = document.createElement('div');

//setup properties for main elements
gameWrap.classList.add('game_wrapper');
menuWrap.classList.add('menu_wrapper');
field.classList.add('field');
menuWrap.innerHTML = "Menu";
//field.innerHTML = "Game";

//Add to DOM
gameWrap.appendChild(menuWrap);
gameWrap.appendChild(field);
field.appendChild(createNewGame());
document.body.appendChild(gameWrap);



function createNewGame() {

    const fragment = document.createDocumentFragment();

    for (let i = 0; i <= 15; i++) {
        if (numbers[i] === 0) {
            empty.value = 16;

            const left = i % 4;
            const top = (i - left) / 4;
            empty.left = left;
            empty.top = top;
            cells.push(empty);
        } else {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            const value = numbers[i];
            cell.innerHTML = value;

            const left = i % 4;
            const top = (i - left) / 4;

            cells.push({
                value: value,
                left: left,
                top: top,
                element: cell
            });

            cell.style.left = `${left * cellSize}px`;
            cell.style.top = `${top * cellSize}px`;

            fragment.appendChild(cell);

            cell.addEventListener('click', () => {
                move(i);
            })
        }



    }

    return fragment;
};

function move(index) {
    const cell = cells[index];

    //proverka vozmognosti peremesheniya
    const leftDiff = Math.abs(empty.left - cell.left);
    const topDiff = Math.abs(empty.top - cell.top);

    if (leftDiff + topDiff > 1) {
        return;
    }

    cell.element.style.left = `${empty.left * cellSize}px`;
    cell.element.style.top = `${empty.top * cellSize}px`;

    const emptyLeft = empty.left;
    const emptyTop = empty.top;

    empty.left = cell.left;
    empty.top = cell.top;

    cell.left = emptyLeft;
    cell.top = emptyTop;

    // console.log('cell.value ' + cell.value);
    // console.log('cell.top : ' + cell.top);
    // console.log('cell.top * 4 : ' + cell.top * 4);
    // console.log(' cell.left : ' + cell.left);
    // console.log('(cell.top * 4 + cell.left) : ' + (cell.top * 4 + cell.left));
    // console.log('(cell.top * 4 + cell.left) +1 : ' + ((cell.top * 4 + cell.left) + 1));

    const isFinished = cells.every(cell => {
        return cell.value === (cell.top * 4 + cell.left) + 1;

    });

    if (isFinished) {
        alert('You won');
    }
}