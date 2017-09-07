'use strict';

let sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./data/loot.db');

let kidNames = [];
let toyNames = [];

let checkForKids = () => {
    return new Promise( (resolve, reject) => {
        db.each(`SELECT * FROM goodKids`, (err, row) => {
            kidNames.push(row.name);
        }, () => {
            resolve(kidNames);
        });
        console.log("kid names", kidNames)
    });
};

let checkForToys = () => {
    return new Promise( (resolve, reject) => {
        db.each(`SELECT * FROM toys`, (err, row) => {
            toyNames.push(row.item);
        }, () => {
            resolve(toyNames);
        });
    });
};



let addToBag = (item, name) => {
    db.serialize( () => {
        db.get(`SELECT * FROM goodKids`, (err, row) => {
            if(err) throw err;
            !row ? db.run(`INSERT INTO goodKids VALUES(null, '${name}')`) : checkForKids()
                .then( (kidNamez) => {
                    if(kidNamez.indexOf(name) === -1) {
                        db.run(`INSERT INTO goodKids VALUES(null, '${name}')`);
                    };
                });
        });
        db.get(`SELECT * FROM toys`, (err, row) => {
            if(err) throw err;
            !row ? db.run(`INSERT INTO toys VALUES(null, '${item}')`) : checkForToys()
                .then( () => {
                    if(toyNames.indexOf(item) === -1) {
                        db.run(`INSERT INTO toys VALUES(null, '${item}')`);
                    };
                });
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
