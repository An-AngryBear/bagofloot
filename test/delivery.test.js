'use strict';

const { assert } = require('chai');
const { deliveredStatus } = require('../js/delivery.js');

describe('deliveredStatus', () => {
    it('should return a boolean', () => {
        assert.isBoolean(deliveredStatus());
    });
});