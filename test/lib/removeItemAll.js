
// Sample basket for test functions
var basket = [
    { "name": "Eggs", "price": 2.10, "qty": 3},
    { "name": "Milk", "price": 1.30, "qty": 1},
    { "name": "Peas", "price": 0.95, "qty": 2},
    { "name": "Beans", "price": 0.73, "qty": 4},
    { "name": "Beans", "price": 0.73, "qty": 3}
] 
 

module.exports = function removeItemAll(name){
    // If qty is decreased to zero, remove that item 
        for ( let i in basket ) {
            // If item is in the basket, remove it
            if ( basket[i].name === name ) {
                basket.splice(i, 1);
                break;
            }
        }
        return basket
        //saveBasket(); 
};


 