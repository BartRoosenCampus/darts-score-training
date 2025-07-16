"use strict";

export class PageHandler {
    elements;
    throws = [];

    constructor(elements) {
        this.elements = elements;
        this.drawKeyPad();
    }

    drawKeyPad() {
        // const keys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 'D', 9, 'S'];
        // const keys = [9, 8, 7, 6, 5, 4, 3, 2, 1, 'D', 0, 'S'];
        const keys = [7, 8, 9, 4, 5, 6, 1, 2, 3, 'D', 0, 'S'];

        keys.forEach((key) => {
            const div = this.make("div");
            const button = this.make("button");

            button.classList.add("key");
            button.dataset.value = key;
            button.innerHTML = key.toString();

            switch (key) {
                case "D":
                    button.classList.add("functionKey");
                    button.addEventListener("click", () => {
                        this.elements.inputThrow.value = "";
                        this.elements.error.innerHTML = "";
                    });
                    break;
                case "S":
                    button.classList.add("functionKey");
                    button.addEventListener("click", () => {
                        this.saveScore();
                    });
                    break;
                default:
                    button.addEventListener("click", () => {
                        this.validateNumber(key);
                    });
                    break;
            }

            div.appendChild(button);
            this.elements.keyPad.appendChild(div);
        })
    }

    make(tag) {
        return document.createElement(tag);
    }

    validateNumber(key) {
        const bogy = [163, 166, 169, 172, 173, 175, 176, 178, 179];
        let number = this.elements.inputThrow.value;

        if (typeof number === 'undefined') {
            number = 0;
        }

        this.elements.inputThrow.value = `${number}${key}`;
        number = parseInt(this.elements.inputThrow.value);

        if (number > 180 || bogy.includes(number)) {
            this.elements.error.innerHTML = `Nummer ${number} kan niet gegooid worden`;
            this.elements.inputThrow.value = "";
        } else {
            this.elements.error.innerHTML = "";
        }
    }

    saveScore() {
        this.elements.error.innerHTML = "";
        let number = parseInt(this.elements.inputThrow.value);

        if (!Number.isNaN(number)) {
            this.elements.inputThrow.value = "";
            this.throws.push(number);
            this.elements.error.innerHTML = `Nummer ${number} toegevoegd`;
        } else {
            this.elements.error.innerHTML = "Eerst een nummer ingeven";
        }
    }
}