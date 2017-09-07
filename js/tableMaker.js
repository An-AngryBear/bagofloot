'use strict';

let sqlite3 = require('sqlite3');
let db = null;

function createDb() {
    console.log("create DB chain");
    db = new sqlite3.Database('./data/loot.db', createTable);
};

function createTable() {
    console.log("createTable");
    db.serialize( () => {
        db.run(`CREATE TABLE IF NOT EXISTS goodKids (kid_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)`);
        db.run(`CREATE TABLE IF NOT EXISTS toys (toy_id INTEGER PRIMARY KEY AUTOINCREMENT, item TEXT)`);
        db.run(`CREATE TABLE IF NOT EXISTS toyKids (toy_id INT, kid_id, delivered BOOLEAN)`);
    });
};

module.exports = { createDb };