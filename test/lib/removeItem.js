
// Sample basket for test functions
var basket = [
    { "name": "Eggs", "price": 2.10, "qty": 3},
    { "name": "Milk", "price": 1.30, "qty": 1},
    { "name": "Milk", "price": 1.30, "qty": 1},
    { "name": "Peas", "price": 0.95, "qty": 2},
    { "name": "Beans", "price": 0.73, "qty": 4},
    { "name": "Beans", "price": 0.73, "qty": 3}
];
 
module.exports = function removeItem(name){

   var  removeItemAll = function (name){
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

    
    // Handle decrease qty 
    for ( let i in basket ) {

        // If item is in the basket, minus one from qty
        if ( basket[i].name === name ) {
                basket[i].qty --; 
            // Has it reached zero? Remove item from the basket array using function
            if ( basket[i].qty === 0 ) {
                removeItemAll( basket[i].name );
            } 
            // Update the view
            // saveBasket();
            // Exit this function
            return basket;
        }
    }
    // saveBasket(); 
};


 