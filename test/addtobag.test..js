'use strict';

const { assert } = require('chai');
const { addToBag } = require('../js/addtobag.js');

describe('addToBag', () => {
    it('should be a function', () => {
        assert.isFunction(addToBag);
    });
});

