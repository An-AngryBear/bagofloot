'use strict';

const { createDb } = require('./tableMaker.js');
const { addToBag } = require('../js/addtobag.js');
const { deliveredStatus } = require('../js/delivery.js');
const { childrenWhoGetToy, childsToys } = require('../js/list.js');
const { removeFromBag } = require('../js/removefrombag.js');

const { argv: [,, ...args] } = process;

console.log("arguments", args);

let runOperations = () => {
    switch(args[0]) {
        case 'add':
            addToBag(args[1], args[2]);
            console.log("args if add", args);
            break;
        case 'remove':
            console.log("args 1 if remove", args[1]);
            break;
        case 'ls':
            console.log("args 1 if ls", args[1]);
            break;
    };
};

createDb();
runOperations();