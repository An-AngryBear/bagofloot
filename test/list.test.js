'use strict';

const { assert } = require('chai');
const { childrenWhoGetToy, childsToys } = require('../js/list.js');

describe('childrenWhoGetToy', () => {
    it('should return an array', () => {
        assert.isArray(childrenWhoGetToy());
    });
});

describe('childsToys', () => {
    it('should return an array', () => {
        assert.isArray(childsToys());
    });
});