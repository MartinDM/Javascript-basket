
// Sample basket for test functions
var basket = [
    { "name": "Eggs", "price": 2.10, "qty": 3},
    { "name": "Milk", "price": 1.30, "qty": 1},
    { "name": "Peas", "price": 0.95, "qty": 2},
    { "name": "Beans", "price": 0.73, "qty": 4}
]


// Return the basket value based on currency of the original Items

module.exports = function totalCost(){
    let totalCost = 0;
    for ( let i in basket ) {
        totalCost += ( basket[i].price * basket[i].qty )
    }
    return totalCost.toFixed(2);
};


 