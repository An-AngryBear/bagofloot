'use strict';

const { assert } = require('chai');
const { removeFromBag } = require('../js/removefrombag.js');

describe('removeFromBag', () => {
    it('should be a function', () => {
        assert.isFunction(removeFromBag);
    });
});