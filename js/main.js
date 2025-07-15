"use strict";

import {Training} from "./Training.js";
import {LocalStorage} from "./LocalStorage.js";
import {PageHandler} from "./PageHandler.js";

const elements = {
    keyPad: byId("keyPad"),
    inputThrow: byId("inputThrow"),
    error: byId("error"),
};

const pageHandler = new PageHandler(elements);


function byId(id) {
    return document.getElementById(id);
}
