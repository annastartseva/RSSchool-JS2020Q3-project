var numberBtns = document.querySelectorAll('.number'),
    operationBtns = document.querySelectorAll('.operator'),
    display = document.getElementById('display'),
    decimalBtn = document.getElementById('decimal'),
    clearBtns = document.querySelectorAll('.clear-btn'),
    resultBtn = document.getElementById('result'),
    sqrtBtn = document.getElementById('sqrt'),
    negativeBtn = document.getElementById('negative'),
    MemoryCurrentNumber = 0,
    MemoryNewNumber = false,
    MemoryPendingOperation = '',
    MemoryLastOperation = 0;




for (var i = 0; i < numberBtns.length; i++) {
    var number = numberBtns[i];
    number.addEventListener('click', function(e) {
        numberPress(e.target.textContent);
    });
}

for (var i = 0; i < operationBtns.length; i++) {
    var operationBtn = operationBtns[i];
    operationBtn.addEventListener('click', function(e) {
        console.log(e);
        console.log(e.target.textContent);
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

decimalBtn.addEventListener('click', decimalFunc);
resultBtn.addEventListener('click', result);
sqrtBtn.addEventListener('click', sqrtFunc);
negativeBtn.addEventListener('click', negativeFunc);


function input(input_taker) {
    var displayInfo = document.getElementById('display').value;
    document.getElementById('block').innerHTML = input_taker;
}

function numberPress(symbolNum) {
    MemoryLastOperation = 0;
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
    //console.log('Клик по кнопке с операцией ' + op);
    var localOperationMemory = display.value;
    //console.log('localOperationMemory ' + localOperationMemory);
    if (op !== '=') { MemoryLastOperation = MemoryLastOperation + 1; };
    //console.log('MemoryLastOperation ' + MemoryLastOperation);
    //console.log('MemoryPendingOperation ' + MemoryPendingOperation);

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
        } else if (MemoryPendingOperation === '√') {
            if (localOperationMemory < 0 || op === '-') {
                //console.log('проверка на отрицательное число');
                MemoryCurrentNumber = 0;
                //console.log('MemoryCurrentNumber ' + MemoryCurrentNumber);
                input('√ из отрицательного числа не существует');
                MemoryLastOperation = 0;
            } else {
                console.log('проверка на отрицательное число else');
                MemoryCurrentNumber = Math.sqrt(localOperationMemory);
            };
        } else if (MemoryPendingOperation === '^') {
            MemoryCurrentNumber = Math.pow(MemoryCurrentNumber, localOperationMemory);
        } else {
            MemoryCurrentNumber = parseFloat(localOperationMemory);
        };
        //display.value = MemoryCurrentNumber;
        display.value = normalizeFractional(MemoryCurrentNumber);
        MemoryPendingOperation = op;
        console.log('MemoryPendingOperation v konce ' + MemoryPendingOperation);
    };
    if (op === '-' && MemoryPendingOperation === '-' && MemoryCurrentNumber === 0 && MemoryLastOperation === 1) {
        MemoryPendingOperation = '';
        //console.log('MemoryPendingOperation v if ' + MemoryPendingOperation);
    };

};

function negativeFunc() {
    console.log('Клик по кнопке -, negativeFunc');
    console.log('MemoryLastOperation ' + MemoryLastOperation);
    var localNegativeMemory = parseFloat(display.value);
    //console.log('localNegativeMemory v nachale ' + localNegativeMemory + typeof localNegativeMemory);
    if (MemoryCurrentNumber === 0 && (MemoryNewNumber === true && MemoryLastOperation === 1)) {
        display.value = '-';
        MemoryNewNumber = false;

    } else if (MemoryNewNumber === true && MemoryLastOperation === 2) {
        display.value = '-';
        MemoryNewNumber = false;
        MemoryLastOperation = 0;
    };
};

function sqrtFunc() {
    console.log('Клик по кнопке с операцией квадратный корень');

    var localSqrtMemory = parseFloat(display.value);

    if (localSqrtMemory > 0) {
        MemoryCurrentNumber = Math.sqrt(localSqrtMemory);
        MemoryLastOperation = 0;
        MemoryPendingOperation = '';
    } else if (localSqrtMemory === 0) {
        MemoryPendingOperation = '√';
        MemoryLastOperation = MemoryLastOperation + 1;
        console.log('MemoryPendingOperation v sqrtFunc ' + MemoryPendingOperation);
    } else {
        MemoryCurrentNumber = 0;
        input('√ из отрицательного числа не существует');
    };


    display.value = normalizeFractional(MemoryCurrentNumber);
    //display.value = MemoryCurrentNumber;

};

function powFunc() {
    console.log('Клик по кнопке с операцией возведения в степень');
    var localPowMemory = display.value;
    MemoryCurrentNumber = localPowMemory;
};

function decimalFunc() {
    var localDecimalMemory = display.value;

    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        };
        display.value = localDecimalMemory;
    };
    //console.log('Клик по кнопке с десятичной дробью');
};

function clear(id) {
    if (id === 'ce') {
        display.value = '0';
        MemoryNewNumber = true;
    } else if (id === 'c') {
        display.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
        input('');
    };
    //console.log('Клик по кнопке ' + id);
};

function normalizeFractional(forNorma) {
    var localNormalizeMemory = 0;

    //Подкорректированная ф-ция toFixed для остальных чисел, не входящих в диапазон (-1.1)
    var power = Math.pow(10, 14);
    localNormalizeMemory = Number(Math.round(forNorma * power) / power);

    //в этом контексте toFixed можно использовать для корректного вывода дробных чисел от (-1.1)
    //localNormalizeMemory = Number(forNorma.toFixed(14));

    //console.log(typeof(localNormalizeMemory));
    return localNormalizeMemory;

};



//console.log('localSqrtMemory v nachale ' + localSqrtMemory + typeof localOperationMemory);
//console.log('MemoryCurrentNumber v nachale ' + MemoryCurrentNumber);
//console.log('MemoryPendingOperation v nachale ' + MemoryPendingOperation);
//MemoryPendingOperation = '√';
//console.log('localSqrtMemory posle vipolneniya ' + localSqrtMemory);
//console.log('MemoryCurrentNumber posle vipolneniya ' + MemoryCurrentNumber);
//console.log('MemoryPendingOperation posle vipolneniya ' + MemoryPendingOperation);

//console.log('Rezultat bez okrugleniya ' + forNorma);
//console.log(typeof(forNorma));
//console.log('forNorma * power ' + forNorma * power);
//console.log('Math.round(forNorma * power) ' + Math.round(forNorma * power));