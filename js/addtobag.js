'use strict';

let sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./data/loot.db');

let kidNames = [];
let toyNames = [];

let checkForKids = () => {
    return new Promise( (resolve, reject) => {

            db.each(`SELECT * FROM goodKids`, (err, row) => {
                kidNames.push(row.name);
                console.log("Kid rowss", row.name)
            });
            console.log("kid names", kidNames)

        resolve(kidNames);
    });
};

let addToBag = (item, name) => {
    console.log("item and name?", item, name);
    db.serialize( () => {

        db.get(`SELECT * FROM goodKids`, (err, row) => {
            if(err) throw err;
            if(!row) {
                console.log("no kid names, inserting row")
                db.run(`INSERT INTO goodKids VALUES(null, '${name}')`);
            } else {
                checkForKids()
                .then( (kidNamez) => {
                    console.log("kid names", kidNamez, name)
                    if(kidNamez.indexOf(name) === -1) {
                        console.log("kid does not exist");
                        db.run(`INSERT INTO goodKids VALUES(null, '${name}')`);
                    };
                });
            };
        });
        db.get(`SELECT * FROM toys`, (err, row) => {
            if(err) throw err;
            if(!row) {
                console.log("no toys, inserting row")
                db.run(`INSERT INTO toys VALUES(null, '${item}')`);
            } else {
                db.each(`SELECT * FROM toys`, (err, row) => {
                    toyNames.push(row.item);
                    if(toyNames.indexOf(item) === -1) {
                        console.log("toy does not exist");
                        db.run(`INSERT INTO toys VALUES(null, '${item}')`);
                    };
                });
            };
        });
        db.each(`SELECT kid_id FROM goodKids WHERE name = '${name}'`, (err, row) => {
             let kidId = row.kid_id;
             console.log('kidId', kidId);
        });
        db.each(`SELECT toy_id FROM toys WHERE item = '${item}'`, (err, row) => {
            let toyId = row.toy_id;
            console.log('toyId', toyId);
        });
        // db.run(`INSERT INTO toys VALUES(${row.kid_id}, '${item}', 'false')`);
    });
};

module.exports = { addToBag };

// INSERT INTO toyKids
// SELECT goodKids.kid_id, toys.toy_id FROM goodKids, toys
