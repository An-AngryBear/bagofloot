'use strict';

let sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./data/loot.db');

let kidNames = [];
let toyNames = [];
let toysFilled,
    kidNamesFilled,
    kidId,
    toyId;


let checkForKids = () => {
    return new Promise( (resolve, reject) => {
        db.each(`SELECT * FROM goodKids`, (err, row) => {
            kidNames.push(row.name);
        }, () => {
            resolve(kidNames);
            reject();
        });
    });
};

let checkForToys = () => {
    return new Promise( (resolve, reject) => {
        db.each(`SELECT * FROM toys`, (err, row) => {
            toyNames.push(row.item);
        }, () => {
            resolve(toyNames);
            reject();
        });
    });
};

let insertIntoGoodKids = (name) => {
    db.get(`SELECT * FROM goodKids`, (err, row) => {
        if(err) throw err;
        !row ? db.run(`INSERT INTO goodKids VALUES(null, '${name}')`) : checkForKids()
            .then( () => {
                if(kidNames.indexOf(name) === -1) {
                    db.run(`INSERT INTO goodKids VALUES(null, '${name}')`, () => {
                        kidNamesFilled = true;
                    });
                } else {
                    kidNamesFilled = true;
                }
            });
    });
}

let insertIntoToys = (item) => {
    db.get(`SELECT * FROM toys`, (err, row) => {
        if(err) throw err;
        !row ? db.run(`INSERT INTO toys VALUES(null, '${item}')`) : checkForToys()
            .then( () => {
                if(toyNames.indexOf(item) === -1) {
                    db.run(`INSERT INTO toys VALUES(null, '${item}')`, () => {
                        toysFilled = true;
                    });
                } else {
                    toysFilled = true;
                }
            });
    });
}

let assignIds = (name, item) => {
    db.each(`SELECT kid_id FROM goodKids WHERE name = '${name}'`, (err, row) => {
        kidId = row.kid_id;
    }, () => {
        console.log('kidId', kidId); 
    });
    db.each(`SELECT toy_id FROM toys WHERE item = '${item}'`, (error, row) => {
        toyId = row.toy_id;
    }, () => {
        console.log('toyId', toyId);
        db.run(`INSERT INTO toyKids VALUES(${kidId}, '${toyId}', 'false')`)
    });
}

let addToBag = (item, name) => {
        insertIntoGoodKids(name);
        insertIntoToys(item);
        let timeout = setInterval(function() { 
            console.log(kidNamesFilled, toysFilled)
            if(kidNamesFilled && toysFilled) { 
                clearInterval(timeout); 
                assignIds(name, item);
            };
        }, 100);
};

module.exports = { addToBag };

// INSERT INTO toyKids
// SELECT goodKids.kid_id, toys.toy_id FROM goodKids, toys
