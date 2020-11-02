// window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// const recognition = new SpeechRecognition();
// recognition.interimResults = true;
// // recognition.continuous = true;

const Keyboard = {
    elements: {
        main: null,
        keyboardInput: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        //obrabotchiki sobitii
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false,
        shift: false,
        english: true,
        mute: false,
        speech: false
    },

    keyLayoutEng: [
        "done", "speech", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "\'", "enter",
        "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/",
        "mute", "language", "space", "<", ">"
    ],

    keyLayoutEngShift: [
        "done", "speech", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "backspace",
        "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}",
        "caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "enter",
        "shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?",
        "mute", "language", "space", "<", ">"
    ],
    keyLayoutRus: [
        "done", "speech", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
        "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
        "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".",
        "mute", "language", "space", "<", ">"
    ],

    keyLayoutRusShift: [
        "done", "speech", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "backspace",
        "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ",
        "caps", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "enter",
        "shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", "\,",
        "mute", "language", "space", "<", ">"
    ],

    init() {
        //create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        //setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        //Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
        this.keyboardInput = document.querySelector('.use-keyboard-input');
        // console.log("keyboardInput " + this.keyboardInput);


        this.keyboardInput.onblur = () => {
            if (!this.eventHandlers.onclose) {
                this.keyboardInput.focus();
            }
        };


        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("keydown", (e) => {
                let keyElement = '';
                // console.log("e.code " + e.code);

                switch (e.code) {
                    case 'CapsLock':
                        if (!e.repeat) {
                            keyElement = document.querySelector(`[data-key=${e.code}]`);
                            this._toggleCapsLock();
                            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                            keyElement.classList.add("keyboard__key--down");
                        }
                        break;

                    case 'ShiftLeft':
                        if (!e.repeat) {
                            keyElement = document.querySelector(`[data-key=${e.code}]`);
                            this._toggleShift();
                            keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
                            keyElement.classList.add("keyboard__key--down");
                        }
                        break;

                    default:
                        for (const key of this.elements.keys) {
                            if (key.dataset.key === e.code) {
                                // console.log("default: e.code " + e.code);
                                key.classList.add("keyboard__key--down");
                            }

                            // this.properties.value = this.keyboardInput.value;
                            this.properties.value = element.value;
                        }
                        break;
                }
            });
            element.addEventListener("keyup", (e) => {
                let keyElement = '';
                // console.log("e.code " + e.code);

                switch (e.code) {
                    case 'CapsLock':
                        keyElement = document.querySelector(`[data-key=${e.code}]`);
                        keyElement.classList.remove("keyboard__key--down");
                        break;

                    case 'ShiftLeft':
                        keyElement = document.querySelector(`[data-key=${e.code}]`);
                        keyElement.classList.remove("keyboard__key--down");
                        break;

                    default:
                        for (const key of this.elements.keys) {
                            if (key.dataset.key === e.code) {
                                // console.log("default: e.code " + e.code);
                                key.classList.remove("keyboard__key--down");
                            }

                        }
                        break;
                }
            });
        });


    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        let currentLayout = this.keyLayoutEng;

        //create HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        currentLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "]", "enter", "/"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");
                    keyElement.dataset.key = "Backspace";

                    keyElement.addEventListener("mousedown", () => {

                        this._setSound('backspace');
                        keyElement.classList.add("keyboard__key--down");
                        let startPosition = this.keyboardInput.selectionStart;
                        let endPosition = this.keyboardInput.selectionEnd;
                        let text = this.keyboardInput.value;
                        this.properties.value = text.slice(0, startPosition === endPosition ? startPosition - 1 : startPosition) + text.slice(endPosition, text.length);
                        this._triggerEvent("oninput");
                        this.keyboardInput.selectionStart = this.keyboardInput.selectionEnd = (startPosition === endPosition ? startPosition - 1 : startPosition);

                        // this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                    });

                    keyElement.addEventListener("mouseup", () => {
                        keyElement.classList.remove("keyboard__key--down");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", "CapsLock");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");
                    keyElement.dataset.key = "CapsLock";

                    keyElement.addEventListener("mousedown", () => {
                        this._toggleCapsLock();
                        this._setSound('caps');
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                        keyElement.classList.add("keyboard__key--down");
                    });
                    keyElement.addEventListener("mouseup", () => {
                        keyElement.classList.remove("keyboard__key--down");
                    });

                    break;

                case "shift":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_shift");
                    keyElement.dataset.key = "ShiftLeft";

                    keyElement.addEventListener("mousedown", () => {
                        this._toggleShift();
                        this._setSound('shift');
                        keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
                        keyElement.classList.add("keyboard__key--down");
                    });
                    keyElement.addEventListener("mouseup", () => {
                        keyElement.classList.remove("keyboard__key--down");
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");
                    keyElement.dataset.key = "Enter";

                    keyElement.addEventListener("mousedown", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                        this._setSound('enter');
                        keyElement.classList.add("keyboard__key--down");
                    });
                    keyElement.addEventListener("mouseup", () => {
                        keyElement.classList.remove("keyboard__key--down");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");
                    keyElement.dataset.key = "Space";

                    keyElement.addEventListener("mousedown", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                        this._setSound('space');
                        keyElement.classList.add("keyboard__key--down");
                    });
                    keyElement.addEventListener("mouseup", () => {
                        keyElement.classList.remove("keyboard__key--down");
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                        this._setSound('main');
                    });

                    keyElement.addEventListener("mousedown", () => {
                        keyElement.classList.add("keyboard__key--down");
                        setTimeout(() => {
                            keyElement.classList.remove("keyboard__key--down");
                        }, 500);
                    });
                    // keyElement.addEventListener("mouseup", () => {
                    //     keyElement.classList.remove("keyboard__key--down");
                    // });

                    break;

                case "language":
                    keyElement.classList.add("keyboard__key--wide");
                    if (this.properties.english) {
                        keyElement.textContent = "en";
                    } else {
                        keyElement.textContent = "ru";
                    };
                    keyElement.addEventListener("mousedown", () => {
                        this._toggleLanguage();
                        this._setSound('main');
                        keyElement.classList.add("keyboard__key--down");
                    });
                    keyElement.addEventListener("mouseup", () => {
                        keyElement.classList.remove("keyboard__key--down");
                    });
                    break;

                case "mute":
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML("volume_up");

                    keyElement.addEventListener('click', () => {
                        this._setSound('main');
                        this._toggleSound(keyElement);
                    });

                    keyElement.addEventListener("mousedown", () => {
                        keyElement.classList.add("keyboard__key--down");
                    });

                    keyElement.addEventListener("mouseup", () => {
                        keyElement.classList.remove("keyboard__key--down");
                    });

                    break;
                case "<":
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML("arrow_left");
                    keyElement.dataset.key = "ArrowLeft";

                    keyElement.addEventListener("mousedown", () => {
                        keyElement.classList.add("keyboard__key--down");
                        this._setSound('main');
                        // let cursorPosition = this.keyboardInput.selectionStart;
                        // console.log('cursorPosition ' + cursorPosition);
                        // console.log('this.keyboardInput.selectionStart ' + this.keyboardInput.selectionStart);
                        // console.log('this.keyboardInput.selectionEnd ' + this.keyboardInput.selectionEnd);
                        this.keyboardInput.selectionStart = this.keyboardInput.selectionEnd = this.keyboardInput.selectionStart > 0 ? this.keyboardInput.selectionStart - 1 : 0;
                    });
                    keyElement.addEventListener("mouseup", () => {
                        keyElement.classList.remove("keyboard__key--down");
                    });
                    break;

                case ">":
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML("arrow_right");
                    keyElement.dataset.key = "ArrowRight";

                    keyElement.addEventListener("mousedown", () => {
                        keyElement.classList.add("keyboard__key--down");
                        this._setSound('main');
                        this.keyboardInput.selectionStart = this.keyboardInput.selectionEnd = this.keyboardInput.selectionStart + 1;

                    });
                    keyElement.addEventListener("mouseup", () => {
                        keyElement.classList.remove("keyboard__key--down");
                    });
                    break;

                case "speech":
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML("voice_over_off");

                    keyElement.addEventListener("mousedown", () => {
                        keyElement.classList.add("keyboard__key--down");
                        this._setSound('main');
                        this._toggleSpeechRecognition(keyElement);
                    });
                    keyElement.addEventListener("mouseup", () => {
                        keyElement.classList.remove("keyboard__key--down");
                    });
                    break;

                default:
                    keyElement.textContent = key.toLowerCase();
                    // console.log('createKeys default value');
                    // console.log('typeof key ' + typeof key);
                    if (typeof key === "string" && key.match(/[0-9]/)) {
                        // console.log('typeof key === "Number"');
                        keyElement.dataset.key = `Digit${key}`;
                    } else if (typeof key === "string" && key.match(/[a-z]/i)) {
                        keyElement.dataset.key = `Key${key.toUpperCase()}`;
                    } else if (key === "[") {
                        keyElement.dataset.key = "BracketLeft";
                    } else if (key === "]") {
                        keyElement.dataset.key = "BracketRight";
                    } else if (key === ";") {
                        keyElement.dataset.key = "Semicolon";
                    } else if (key === "\'") {
                        keyElement.dataset.key = "Quote";
                    } else if (key === ",") {
                        keyElement.dataset.key = "Comma";
                    } else if (key === ".") {
                        keyElement.dataset.key = "Period";
                    } else if (key === "/") {
                        keyElement.dataset.key = "Slash";
                    };

                    // console.log('stroka za If');
                    // keyElement.addEventListener("click", () => {
                    keyElement.addEventListener("mousedown", () => {
                        // this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this.properties.value += keyElement.textContent;
                        keyElement.classList.add("keyboard__key--down");

                        let startPosition = this.keyboardInput.selectionStart;
                        let endPosition = this.keyboardInput.selectionEnd;
                        let text = this.keyboardInput.value;
                        this.properties.value = text.slice(0, startPosition) + keyElement.textContent + text.slice(endPosition, text.length);
                        this._triggerEvent("oninput");
                        this.keyboardInput.selectionStart = this.keyboardInput.selectionEnd = startPosition + 1;


                        this._triggerEvent("oninput");
                        this._setSound('main');
                    });
                    keyElement.addEventListener("mouseup", () => {
                        keyElement.classList.remove("keyboard__key--down");
                    });
                    break;
            }
            // console.log("keyElement " + keyElement);
            fragment.appendChild(keyElement);
            // console.log("this.elements.keys " + this.elements.keys);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    // отображение символа в поле ввода
    _triggerEvent(handlerName) {
        console.log("triggerEvent " + handlerName)
        if (typeof this.eventHandlers[handlerName] == "function") {
            // console.log("this.eventHandlers[handlerName] " + this.eventHandlers[handlerName](this.properties.value));
            // console.log("this.properties.value " + this.properties.value);
            this.eventHandlers[handlerName](this.properties.value);
        }

    },

    _toggleCapsLock() {
        console.log("_toggleCapsLock ")
        this.properties.capsLock = !this.properties.capsLock;
        this._changeSymbols();
    },

    _toggleShift() {
        console.log("_toggleShift ")
        this.properties.shift = !this.properties.shift;
        this._changeSymbols();
    },

    _toggleLanguage() {
        console.log("_toggleLanguage ")
        this.properties.english = !this.properties.english;
        this._changeSymbols();

    },

    _toggleSound(keyElement) {
        console.log("_toggleSound");
        this.properties.mute = !this.properties.mute;
        keyElement.innerHTML = this.properties.mute ? `<span class="material-icons">volume_off</span>` : `<span class="material-icons">volume_up</span>`;
    },

    _toggleSpeechRecognition(keyElement) {
        console.log("_toggleSpeechRecognition");
        this.properties.speech = !this.properties.speech;
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        const recognition = new SpeechRecognition();
        recognition.interimResults = true;
        recognition.continuous = true;
        recognition.lang = this.properties.english ? 'en-US' : 'ru-Ru';

        let currentValueText = this.properties.value;

        if (this.properties.speech) {
            keyElement.innerHTML = `<span class="material-icons">record_voice_over</span>`;
            keyElement.classList.add("keyboard__key--active-speech");
            recognition.start();

            let transcript = "";

            recognition.addEventListener('result', e => {
                transcript = Array.from(e.results).map(result => result[0]).map(result => result.transcript)
                    .join('');
                // console.log(transcript);
                this.properties.value = currentValueText + ' ' + transcript + ' ';
                this._triggerEvent('oninput');

            });

            // recognition.addEventListener('end', recognition.start);

        } else {
            keyElement.innerHTML = `<span class="material-icons">voice_over_off</span>`;
            keyElement.classList.remove("keyboard__key--active-speech");
            recognition.stop();
        };

    },

    _changeSymbols() {
        console.log("_changeSymbols");
        var currentLayout = this.keyLayoutEng;
        if (this.properties.shift && this.properties.english) {
            currentLayout = this.keyLayoutEngShift;
        } else if (!this.properties.shift && !this.properties.english) {
            currentLayout = this.keyLayoutRus
        } else if (this.properties.shift && !this.properties.english) {
            currentLayout = this.keyLayoutRusShift
        };

        // console.log("currentLayout " + currentLayout);
        let i = 0;
        for (const key of this.elements.keys) {
            if (currentLayout[i] != "backspace" &&
                currentLayout[i] != "space" &&
                currentLayout[i] != "enter" &&
                currentLayout[i] != "done" &&
                currentLayout[i] != "caps" &&
                currentLayout[i] != "shift" &&
                currentLayout[i] != "mute" &&
                currentLayout[i] != "speech"
            ) {
                key.textContent = currentLayout[i];
                if (!this.properties.capsLock && this.properties.shift && key.childElementCount === 0) {
                    // key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
                    // key.textContent = this.properties.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
                    key.textContent = key.textContent.toUpperCase();
                }
                if (this.properties.capsLock && !this.properties.shift && key.childElementCount === 0) {
                    key.textContent = key.textContent.toUpperCase();
                }
                if (this.properties.capsLock && this.properties.shift && key.childElementCount === 0) {
                    key.textContent = key.textContent.toLowerCase();
                }
                if (currentLayout[i] === "language") {
                    this.properties.english ? key.textContent = "en" : key.textContent = "ru";
                }
            }
            i++;
        }

    },

    _setSound(key) {
        console.log("_setSound ");
        if (this.properties.mute) {
            return;
        }
        const lang = this.properties.english ? "en" : "ru";
        // console.log("lang " + lang);
        // console.log("key " + key);
        const audio = document.querySelector(`audio[data-key="${lang}_${key}"]`);
        // console.log("`audio[data-key=${lang}_${key}]` " + `audio[data-key="${lang}_${key}"]`);
        // console.log("audio " + audio);
        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
    },

    open(initialValue, oninput, onclose) {
        console.log("open  initialValue: " + initialValue);
        // console.log("oninput: " + oninput);
        // console.log("onclose" + onclose);

        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        console.log("close ");
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
        // this.keyboardInput.blur();
    }
};

window.addEventListener("DOMContentLoaded", function() {
    Keyboard.init();


});