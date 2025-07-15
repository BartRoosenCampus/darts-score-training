"use strict";

import {Training} from "./Training.js";
import {LocalStorage} from "./LocalStorage.js";

const elements = {
    trainingNotStartedArea: document.getElementById('trainingNotStartedArea'),
    trainingStartedArea: document.getElementById('trainingStartedArea'),
    btnMis: document.getElementById('btnMis'),
    btnSingle: document.getElementById('btnSingle'),
    btnDouble: document.getElementById('btnDouble'),
    btnTriple: document.getElementById('btnTriple'),
    aim: document.getElementById('aim'),
    buttonsArea: document.getElementById('buttonsArea'),
    numbersToSelectArea: document.getElementById('numbersToSelectArea'),
    btnBack: document.getElementById('btnBack'),
}

const training = new Training(elements);
const localStorage = new LocalStorage();

for (let i = 20; i >= 0; i--) {
    const div = document.createElement('div');
    const button = document.createElement('button');

    button.innerText = (0 === i) ? "R" : i.toString();
    button.addEventListener('click', () => {
        training.setNumber((0 === i) ? Math.floor(Math.random() * 20) + 1 : i);
        training.start();
        toggleAreas();
        localStorage.save('training', training);
    });
    div.appendChild(button);
    elements.numbersToSelectArea.appendChild(div);
}

elements.btnMis.addEventListener('click', () => {
    training.addMis();
    localStorage.save('training', training);
});

elements.btnSingle.addEventListener('click', () => {
    training.addSingle();
    localStorage.save('training', training);
});

elements.btnDouble.addEventListener('click', () => {
    training.addDouble();
    localStorage.save('training', training);
});

elements.btnTriple.addEventListener('click', () => {
    training.addTriple();
    localStorage.save('training', training);
});

elements.btnBack.addEventListener('click', () => {
    training.stepBack();
    localStorage.save('training', training);
});

function toggleAreas() {
    if (elements.trainingStartedArea.style.display === 'none') {
        elements.trainingStartedArea.style.display = '';
        elements.trainingNotStartedArea.style.display = 'none';
    } else {
        elements.trainingStartedArea.style.display = 'none';
        elements.trainingNotStartedArea.style.display = '';
    }
}