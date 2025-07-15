"use strict";

export class Training {
    elements;
    started = false;
    number = 20;
    throws = 0;
    mis = 0;
    single = 0;
    double = 0;
    triple = 0;
    hits = 0;
    failSeries = 0;
    successSeries = 0;
    failSeriesCounter = 0;
    successSeriesCounter = 0;
    history = [];

    constructor(elements) {
        this.elements = elements;
    }

    addThrow() {
        this.throws += 1;

        if (this.throws === 100) {
            this.started = false;
            this.elements.buttonsArea.style.display = 'none';
        }

        this.drawTable();
        console.log(this.history);
    }

    addMis() {
        this.mis += 1;
        this.addToHistory('mis')
        this.series('fail');
        this.addThrow();
    }

    addSingle() {
        this.single += 1;
        this.addToHistory('single');
        this.addHits();
        this.series('success');
        this.addThrow();
    }

    addDouble() {
        this.double += 1;
        this.addToHistory('double');
        this.addHits();
        this.series('success');
        this.addThrow();
    }

    addTriple() {
        this.triple += 1;
        this.addToHistory('triple');
        this.addHits();
        this.series('success');
        this.addThrow();
    }

    addHits() {
        this.hits = this.single + this.double + this.triple;
    }

    start() {
        this.started = true;
        this.elements.aim.innerHTML = this.number.toString();
        this.drawTable();
        this.switchBackButton('off');
    }

    stop() {
        this.started = false;
    }

    setNumber(number) {
        this.number = number;
    }

    drawTable() {
        const tableArea = document.getElementById('tableArea');
        const labels = ['throws', 'mis', 'single', 'double', 'triple', 'hits', 'failSeries', 'successSeries'];
        const labelsDisplay = {
            throws: "Aantal worpen",
            mis: "Gemist",
            single: "Single",
            double: "Dubbel",
            triple: "Triple",
            hits: "Geraakt",
            failSeries: "Reeks gemist",
            successSeries: "Reeks geraakt",
        }
        const table = document.createElement('table');

        tableArea.innerHTML = "";
        for (const label of labels) {
            const row = document.createElement('tr');
            const cellLabel = document.createElement('td');
            const cellNumber = document.createElement('td');
            cellLabel.innerHTML = labelsDisplay[label];
            cellNumber.innerHTML = this[label];
            cellNumber.classList.add('right');
            row.appendChild(cellLabel);
            row.appendChild(cellNumber);
            table.appendChild(row);
        }

        tableArea.appendChild(table);
    }

    series(type) {
        if ("fail" === type) {
            this.failSeriesCounter += 1;
            this.successSeriesCounter = 0;

            if (this.failSeriesCounter > this.failSeries) this.failSeries = this.failSeriesCounter;
        } else {
            this.successSeriesCounter += 1;
            this.failSeriesCounter = 0;

            if (this.successSeriesCounter > this.successSeries) this.successSeries = this.successSeriesCounter;
        }
    }

    addToHistory(element) {
        this.history.push(element);
        if (0 === this.history.length) {
            this.switchBackButton('off');
        } else {
            this.switchBackButton('on');
        }
    }

    stepBack() {
        const lastElement = this.history.pop();
        console.log(lastElement);
        if (0 === this.history.length) {
            this.switchBackButton('off');
        }

        switch (lastElement) {
            case 'mis':
                this.throws -= 1;
                this.mis -= 1;
                break;
            case 'single':
                this.throws -= 1;
                this.single -= 1;
                break;
            case 'double':
                this.throws -= 1;
                this.double -= 1;
                break;
            case 'triple':
                this.throws -= 1;
                this.triple -= 1;
                break;
            default:
                break;
        }

        this.addHits();

        this.failSeries = 0;
        this.successSeries = 0;
        this.failSeriesCounter = 0;
        this.successSeriesCounter = 0;

        this.history.forEach((value) => {
            this.series(('mis' !== value ? 'success' : 'fail'));
        });

        this.drawTable();
    }

    switchBackButton(type = 'on') {
        if ('on' === type) {
            this.elements.btnBack.removeAttribute('disabled');
            this.elements.btnBack.classList.replace('btnThrowDisabled', 'btnThrow');
        } else if ('off' === type) {
            this.elements.btnBack.setAttribute('disabled', 'disabled');
            this.elements.btnBack.classList.replace('btnThrow', 'btnThrowDisabled');
        }
    }
}