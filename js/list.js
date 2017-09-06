'use strict';

// Must be able to list all children who are getting a toy.

// Must be able to list all toys for a given child's name.

let childsToys = (name) => {
    // ./lootbag.js ls suzy
    return ['ball', 'doll'];
};

let childrenWhoGetToy = () => {
    // ./lootbag.js ls
    return ['jimmy', 'suzie'];
};

module.exports = { childsToys, childrenWhoGetToy };