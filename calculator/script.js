var numberBtns = document.querySelectorAll('.number'),
    operationBtns = document.querySelectorAll('.operator'),
    display = document.getElementById('display'),
    decimalBtn = document.getElementById('decimal'),
    clearBtns = document.querySelectorAll('.clear-btn'),
    resultBtn = document.getElementById('result'),
    MemoryCurrentNumber = 0,
    MemoryNewNumber = false,
    MemoryPendingOperation = '';

console.log(decimalBtn);
console.log(decimalBtn);
console.log(resultBtn);
for (var i = 0; i < numberBtns.length; i++) {
    var number = numberBtns[i];
    number.addEventListener('click', function(e) {
        numberPress(e.target.textContent);
    });
}

for (var i = 0; i < operationBtns.length; i++) {
    var operationBtn = operationBtns[i];
    operationBtn.addEventListener('click', function(e) {
        operation(e.target.textContent);
    });
}

for (var i = 0; i < clearBtns.length; i++) {
    var clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function(e) {
        //console.log(e.srcElement.id);
        clear(e.srcElement.id);
    });
}

decimalBtn.addEventListener('click', decimal);
resultBtn.addEventListener('click', result);


function numberPress(symbolNum) {
    if (MemoryNewNumber) {
        display.value = symbolNum;
        MemoryNewNumber = false;
    } else {
        if (display.value === '0') {
            display.value = symbolNum;
        } else {
            display.value += symbolNum;
        };
    };
    //console.log('Клик по кнопке с номером ' + symbolNum);
};

function operation(op) {
    localOperationMemory = display.value;

    if (MemoryNewNumber && MemoryPendingOperation !== '=') {
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        if (MemoryPendingOperation === '+') {
            MemoryCurrentNumber += parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '-') {
            MemoryCurrentNumber -= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '*') {
            MemoryCurrentNumber *= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '/') {
            MemoryCurrentNumber /= parseFloat(localOperationMemory);
        } else {
            MemoryCurrentNumber = parseFloat(localOperationMemory);
        };
        display.value = MemoryCurrentNumber;
        MemoryPendingOperation = op;
    };
    console.log('Клик по кнопке с операцией ' + op);
};

function decimal() {
    console.log('Клик по кнопке с десятичной дробью');
};

function clear(id) {
    console.log('Клик по кнопке ' + id);
};

function result() {
    console.log('Клик по кнопке =');
};


/*function howWork() {

};*/