const Keyboard = {
    elements: {
        main: null,
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
        currentCursor: 0,
        mute: false
    },

    keyLayoutEng: [
        "done", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "\'", "enter",
        "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/",
        "space", "language", "mute"
    ],

    keyLayoutEngShift: [
        "done", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "backspace",
        "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}",
        "caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "enter",
        "shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?",
        "space", "language", "mute"
    ],
    keyLayoutRus: [
        "done", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
        "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
        "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".",
        "space", "language", "mute"
    ],

    keyLayoutRusShift: [
        "done", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "backspace",
        "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ",
        "caps", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "enter",
        "shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", "\,",
        "space", "language", "mute"
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
            //  // установка курсора в начало
            //   element.addEventListener("click", () => {
            //       element.selectionStart = this.properties.curentCursor;
            //       element.selectionEnd = this.properties.curentCursor;
            //   });
        });

        document.addEventListener('keydown', this._handleEvent);
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
            const insertLineBreak = ["backspace", "]", "enter", "?"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");
                    keyElement.id = "Backspace";

                    keyElement.addEventListener("mousedown", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                        this._setSound('backspace');
                        keyElement.classList.add("keyboard__key--down");
                    });

                    keyElement.addEventListener("mouseup", () => {
                        keyElement.classList.remove("keyboard__key--down");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", "CapsLock");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");
                    keyElement.id = "CapsLock";

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
                    keyElement.id = "Shift";

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
                    keyElement.id = "Enter";

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
                        // keyElement.classList.add("keyboard__key--down");
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

                case 'mute':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = `<span class="material-icons">volume_up</span>`;

                    keyElement.addEventListener('click', () => {
                        this._setSound('main');
                        this._toggleSound(keyElement);
                    });
                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    // keyElement.addEventListener("click", () => {
                    keyElement.addEventListener("mousedown", () => {
                        // this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this.properties.value += keyElement.textContent;
                        keyElement.classList.add("keyboard__key--down");
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
            // this.eventHandlers[handlerName].focus();
        }

    },

    _toggleCapsLock() {
        console.log("_toggleCapsLock ")
        this.properties.capsLock = !this.properties.capsLock;
        this._changeSymbols();
        // for (const key of this.elements.keys) {
        //     if (key.childElementCount === 0) {
        //         key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        //     }
        // }
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
        console.log("_toggleSound")
        this.properties.mute = !this.properties.mute;
        keyElement.innerHTML = this.properties.mute ? `<span class="material-icons">volume_off</span>` : `<span class="material-icons">volume_up</span>`;
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

        console.log("currentLayout " + currentLayout);
        let i = 0;
        for (const key of this.elements.keys) {
            if (currentLayout[i] != "backspace" &&
                currentLayout[i] != "space" &&
                currentLayout[i] != "enter" &&
                currentLayout[i] != "done" &&
                currentLayout[i] != "caps" &&
                currentLayout[i] != "shift" &&
                currentLayout[i] != "mute"
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

    _handleEvent(event) {
        console.log("_handleEvent " + event);
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        const { code, type } = event;
        console.log("code " + code);
        console.log("type " + type);
        for (const key of this.elements.keys) {
            if (key.id === code) { console.log("_handleEvent" + code); }
        }
        // const keyObj = this.elements.keys.id.find((key) => key.id === code);
        // console.log("keyObj " + keyObj);
        // this.output.focus();

        // for (const key of this.elements.keys)

        //     keyElement.classList.add("keyboard__key--down");
        // this.elements.keys.innerText: "backspace"]
    },

    _setSound(key) {
        console.log("_setSound ");
        if (this.properties.mute) {
            return;
        }
        const lang = this.properties.english ? "en" : "ru";
        console.log("lang " + lang);
        console.log("key " + key);
        const audio = document.querySelector(`audio[data-key="${lang}_${key}"]`);
        console.log("`audio[data-key=${lang}_${key}]` " + `audio[data-key="${lang}_${key}"]`);

        // const audio = document.querySelector('audio[data-key="ru-main"]');
        // const audio = document.querySelector("audio");
        console.log("audio " + audio);
        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
    },

    open(initialValue, oninput, onclose) {
        console.log("open  initialValue: " + initialValue);
        console.log("oninput: " + oninput);
        console.log("onclose" + onclose);

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
    }
};

window.addEventListener("DOMContentLoaded", function() {
    Keyboard.init();


});