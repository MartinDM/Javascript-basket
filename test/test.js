const mocha = require('mocha');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

var listBasket = require('../test/lib/listBasket');
var totalCost = require('../test/lib/totalCost');
var removeItem = require('../test/lib/removeItem');
var removeItemAll = require('../test/lib/removeItemAll');
var addItem = require('../test/lib/addItem');

describe('List basket', function() {
    let result = listBasket();  
    it('returns an array', function() {
        assert.isArray(result, 'It\'s an array');
    });
});

describe('Total Cost', function(){
    let result = totalCost();

    it('returns an integer', function(){
        assert.isNotNull(result, 'Not null')
    });

    it('not defined', function(){
        assert.isDefined(result, 'Is defined')
    });

    it('not NaN', function(){
        assert.isNotNaN(result, 'Not NaN')
    });

});

describe('Decrease qty', function() {
    let result = removeItem("Milk");  
    it('returns an array', function() {
        assert.isArray(result, 'It\'s an array');
    });
});


describe('Add item', function() {
    let result = addItem("Eggs");
    it('returns an array', function() {
        assert.isArray(result, 'It\'s an array');
    });
});

describe('Remove item - All', function() {
    let result = removeItemAll("Milk");
    it('returns an array', function() {
        assert.isArray(result, 'Should return an array');
    });
    it('does not include item removed', function() {
        let result = removeItemAll("Milk");
        expect(result).to.not.include({"name":"Milk"});
    });
});
