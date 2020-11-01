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
        english: true
    },

    keyLayoutEng: [
        "done", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "\'", "enter",
        "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/",
        "space", "language"
    ],

    keyLayoutEngShift: [
        "done", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "backspace",
        "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}",
        "caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "enter",
        "shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?",
        "space", "language"
    ],
    keyLayoutRus: [
        "done", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
        "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
        "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".",
        "space", "language"
    ],

    keyLayoutRusShift: [
        "done", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "backspace",
        "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ",
        "caps", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "enter",
        "shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", "\,",
        "space", "language"
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

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "shift":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_shift");

                    keyElement.addEventListener("click", () => {
                        this._toggleShift();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;

                case "language":
                    keyElement.classList.add("keyboard__key--wide");
                    if (this.properties.english) {
                        keyElement.textContent = "en";
                    } else {
                        keyElement.textContent = "ru";
                    };
                    keyElement.addEventListener("click", () => {
                        this._toggleLanguage();
                    });
                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        // this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this.properties.value += keyElement.textContent;
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        this._changeSymbols();
        // for (const key of this.elements.keys) {
        //     if (key.childElementCount === 0) {
        //         key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        //     }
        // }
    },

    _toggleShift() {
        this.properties.shift = !this.properties.shift;
        this._changeSymbols();
    },

    _toggleLanguage() {
        this.properties.english = !this.properties.english;
        this._changeSymbols();
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
                currentLayout[i] != "shift"
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

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }
};

window.addEventListener("DOMContentLoaded", function() {
    Keyboard.init();
});