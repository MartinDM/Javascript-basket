
// Sample basket for test functions
var basket = [
    { "name": "Eggs", "price": 2.10, "qty": 3},
    { "name": "Milk", "price": 1.30, "qty": 1},
    { "name": "Peas", "price": 0.95, "qty": 2},
    { "name": "Beans", "price": 0.73, "qty": 4}
]


module.exports = function listBasket(){
    let basketCopy = []; 
    for ( var i in basket ){
        let item = basket[i];
        let itemCopy = {};
            for ( var p in item[p] ) {
                itemCopy[p] = item[p]
            }
            basketCopy.push(item);
        }
    return basketCopy
};
