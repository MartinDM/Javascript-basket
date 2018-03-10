// Sample basket for test functions

var basket = [
    { "name": "Eggs", "price": 2.10, "qty": 3},
    { "name": "Milk", "price": 1.30, "qty": 1},
    { "name": "Milk", "price": 1.30, "qty": 1},
    { "name": "Peas", "price": 0.95, "qty": 2},
    { "name": "Beans", "price": 0.73, "qty": 4},
    { "name": "Beans", "price": 0.73, "qty": 3}
];

var name = 'Milk';
var price = 0.50;
var qty = 3;

// Base properties of our item class declared first
class Item {
    constructor(name, price, qty) {
        this.name = name,
        this.price = price,
        this.qty = qty
    }
}; 


module.exports = function addItem(name){

     /* Creates a new item and adds it to the basket if it doesnt exist already.
        This test should add an extra item 'Milk', making qty 3
      */
           
        /*  Loop through basket contents to check if item already added.
            Incrementor buttons will reach this flow as item is already present.
        */
        for ( let i in basket ) {
            //console.log('Added item to basket', basket);
            if ( basket[i].name === name ) {
                basket[i].qty += 1;
                return basket
            }
        }

        // Item doesnt exist in cart. Add it, and save.
        var item = new Item(name, price, qty);
        basket.push(item);
        return basket
        //saveBasket(); 
     
};


 