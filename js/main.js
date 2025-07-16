"use strict";

import {Training} from "./Training.js";
import {LocalStorage} from "./LocalStorage.js";
import {PageHandler} from "./PageHandler.js";

const elements = {
    keyPad: byId("keyPad"),
    inputThrow: byId("inputThrow"),
    error: byId("error"),
    totalScore: byId("totalScore"),
    averageScore: byId("averageScore"),
    nineDartAverageScore: byId("nineDartAverageScore"),
    totalDartCount: byId("totalDartCount"),
};

const pageHandler = new PageHandler(elements);


function byId(id) {
    return document.getElementById(id);
}
