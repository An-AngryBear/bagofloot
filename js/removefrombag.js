'use strict';

// Items can be removed from bag, per child only. Removing ball 
// from the bag should not be allowed. A child's name must be specified.
// ./lootbag.js remove suzy kite

let removeFromBag = (name, item) => {
    db.serialize( () => {
        db.run();
    });
};

module.exports = { removeFromBag };