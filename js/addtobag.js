'use strict';

let sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./data/loot.db');
// Items can be added to bag.
// ./lootbag.js add kite suzy
// name TEXT, item TEXT, delivered BOOLEAN
let addToBag = (item, name) => {
    console.log("item and name?", item, name);
    db.serialize( () => {
        db.run(`INSERT INTO goodKids VALUES(null, '${name}')`)
        db.run(`INSERT INTO toys VALUES(null, '${item}')`)
    });
};

module.exports = { addToBag };