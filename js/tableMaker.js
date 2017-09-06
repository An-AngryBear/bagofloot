'use strict';

let sqlite3 = require('sqlite3');
let db = null;

// const seedLoot = [{
//     name: "Jason",
//     item: "Cool stuff he deserves",
//     delivered: false
// }];

function createDb() {
    console.log("create DB chain");
    db = new sqlite3.Database('./data/loot.db', createTable);
};

function createTable() {
    console.log("createTable");
    db.serialize( () => {
        db.run(`CREATE TABLE IF NOT EXISTS goodKids (kid_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)`);
        db.run(`CREATE TABLE IF NOT EXISTS toys (toy_id INTEGER PRIMARY KEY AUTOINCREMENT, item TEXT, delivered BOOLEAN)`);
        db.run(`CREATE TABLE IF NOT EXISTS toyKids (toy_id INT, kid_id)`);
        // insertRows();
    });
};

// function insertRows() {
//     console.log("inserting data");
//     seedLoot.forEach( (loot) => {
//         db.run(`INSERT INTO goodKids
//             VALUES("${loot.name}", "${loot.item}", "${loot.delivered}")`)
//     });
// };

module.exports = { createDb };