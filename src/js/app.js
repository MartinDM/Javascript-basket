var shop = (() => {

    var currencies = [];
    var basket = []; 

    // PRIVATE methods

    // Base properties of our item class declared first
    function Item(name, price, qty) {
        this.name = name,
        this.price = price,
        this.qty = qty
    }; 
    
    /* Save the basket to Local Storage so it can be passed to another view,
        or retrieved.
        Local Storage requires a string, so our object must be stringified.
    */
    var saveBasket = () => {  
        localStorage.setItem('basketContents', JSON.stringify(listBasket()));
        renderBasket();
    };

    // Load up the basket from local storage if present
    var loadBasket = () => { 
        basket = JSON.parse(localStorage.getItem('basketContents')) || [];
    }; 

    // Return the basket value based on currency of the original Items
    var totalCost = () => { 
        let totalCost = 0;
        for ( let i in basket ) {
            totalCost += ( basket[i].price * basket[i].qty )
        }
        return totalCost.toFixed(2);
    }; 
   

    // Decouple the basket. Copy it, so it's not a reference.
    // It's an array of objects so needs to be looped over at two levels.
    var listBasket = () => {
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
 

    // Fetch currencies from endpoint to populate dropdown.  
    var populateCurrencies = () => {   
        const currencyDropdown = document.querySelector('.js-currencies');
        const currencyTotal = document.querySelector('.js-currency');  
        var currencyTpl = '';
        var currencyTplErr = 
        `<li class="dropdown-item dropdown-item--error"> 
        <p>Sorry, no currencies available at the moment!</p>
        <p>In the meantime, try a manual conversion at <a href="http://xe.com/">Xe.com</a> while we fix it.
        </li>`;
        
        // Populate dropdown with available currencies
        // set endpoint and our access key
            //const url = 'http://apilayer.net/api/live?access_key=0f0cd603e88461f93914c25ac233252a&format=1';  
            const endpoint = 'live';
            const access_key = '0f0cd603e88461f93914c25ac233252a';
    
            // get the most recent exchange rates via the "live" endpoint.
            // Using popular jQuery Ajax call for ease of integration and as recommended in API docs.
            $.ajax({
                url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key,   
                dataType: 'jsonp',
                success: (json) => { 
                    if(json.success){ 
                        for( let key in json.quotes ) { 
                            //Get the currency abbreviation from the key name
                            let abbr = key.split('USD')[1];
                            let rate = Number( json.quotes[key].toFixed(2) ) 
                            currencies.push( { abbr, rate } )
                            currencyTpl += 
                            `<li class="dropdown-item" data-type="currency" data-name="${abbr}" data-rate="${rate}"> 
                                ${abbr} - <span class="text-muted"><small>${rate}</small></span>
                            </li>`
                        }
                        currencyDropdown.innerHTML = currencyTpl; 
                    } else { 
                        // Helpful message in dropdown if response doesnt indicate success
                        currencyDropdown.innerHTML = currencyTplErr; 
                    }
                },
                error: (xhr) => { 
                    // Helpful message in dropdown if no currencies can be retrieved
                    currencyDropdown.innerHTML = currencyTplErr; 
                }
            }); 
    };

    // Populate the UL element with the items
    var renderBasket = () => {
        // Get the latest saved basket
        let currentBasket = listBasket();
        // Cache DOM elements
        let basketEl = document.querySelector('.js-basket-items');
        let totalEl = document.querySelector('.js-totalItems');
        let totalCostEl = document.querySelector('.js-totalCost');
        var step1El = document.querySelector('.js-reveal-step1');  
        var step2El = document.querySelector('.js-reveal-step2');  

        // Generate new markup
        var lineItems = '';
        currentBasket.forEach( (item) => { 
            lineItems += 
                `<li class="list-group-item p-3"> 
                <p class="mb-0 float-left"><strong>${item.name}</strong>
                <span class="text-muted basket-qty">qty: ${item.qty}</span>
                <div class="increment-btns float-right">
                    <span class="btn btn-outline-danger btn-sm btn-increment js-remove-item" data-type="remove-item" data-name="${item.name}">-</span> 
                    <span class="btn btn-outline-success btn-sm btn-increment js-remove-item" data-type="add-item" data-name="${item.name}">+</span> 
                </div>
                </li>`
        });
        
        // Populate the DOM with updated basket
        basketEl.innerHTML = lineItems;
        totalEl.innerHTML = `${  currentBasket.length < 1 ? 'Basket empty' : currentBasket.length + ' products' } `; 
        totalCostEl.innerHTML = totalCost(); 
        
        // Hide elements on each basket change if nothing in basket
        if (currentBasket.length < 1) {
            step1El.classList.remove('show');
            step1El.classList.add('hide');
            step2El.classList.remove('show');
            step2El.classList.add('hide');
        } else {
            step1El.classList.remove('hide');
            step1El.classList.add('show');
        }
    }
 
    
    // PUBLIC methods returned by shop object

    return {  

        // Creates a new item and adds it to the basket
        addItem: (name, price, qty) => {
               console.log('item added: ', name)
            /*  Loop through basket contents to check if item already added.
                Incrementor buttons will reach this flow as item is already present.
            */
            for ( let i in basket ) { 
                if ( basket[i].name === name ) {
                    basket[i].qty += 1;
                    saveBasket(); 
                    return;
                }
            }
    
            // Item doesnt exist in cart. Add it, and save.
            var item = new Item(name, price, qty);
            basket.push(item);
            saveBasket();
        },
    
        // Handles the click and passes values to basket
        addToBasketBtn: (e) => {
            // Get product details from their data attrs
            let name = e.currentTarget.dataset.name;
            let price = Number(e.target.dataset.price || e.target.parentElement.dataset.price);
            let qty = Number( e.target.dataset.qty ) 
            shop.addItem(name, price, 1);  
        }, 
    
       
        // Update total when new currrency is clicked
        updateTotal: (abbr, rate) => {
            let totalEl = document.querySelector('.js-totalCost');
            let currencyEl = document.querySelector('.js-currency'); 
            totalEl.innerHTML = Number(( totalCost() * rate ).toFixed(2));
            currencyEl.innerHTML = abbr; 
        },
       
        // Handle decrease qty
        removeItem: (name) => { 
            for ( let i in basket ) {
    
                // If item is in the basket, minus one from qty
                if ( basket[i].name === name ) {
                     basket[i].qty --; 
                    // Has it reached zero? Remove item from the basket array using function
                    if ( basket[i].qty === 0 ) {
                        shop.removeItemAll( basket[i].name );
                    } 
                    // Update the view
                    saveBasket();
                    // Exit this function
                    return;
                }
            }
            saveBasket();
        },
    
        // If qty is decreased to zero, remove that item
        removeItemAll: (name) => {
            for ( let i in basket ) {
                // If item is in the basket, remove it
                if ( basket[i].name === name ) {
                    basket.splice(i, 1);
                    break;
                }
            }
            saveBasket();
        },
    
        // Shows total products
        countItems: () => {
            let totalItems = 0;
            for ( let i in basket ) {
                totalItems += basket[i].qty;
            }
            return totalItems;
        },
    
        // Clear the basket contents, save basket
        clearBasket: () => {
            basket = []; 
            saveBasket();
        },

         // When clicking Checkout, reveal the total and currency options with CSS
        revealTotals: () => { 
            var step2El = document.querySelector('.js-reveal-step2');
            step2El.classList.remove('hide');
            step2El.classList.add('show');
        }, 
    
        /* Initialise functions on page load
            - Load up a saved basket if there is one
            - Display the basket
            - Attach events to buttons
        */
    
        init: () => { 
            // Load and render most recent saved basket
            loadBasket();
            renderBasket();
            populateCurrencies();
        } 
    }  
      
})(); 
  
shop.init();
 
/* 
    Attach Event listeners, using the public methods
*/

// Product buttons
const buttons = document.querySelectorAll('.js-add-item'); 
buttons.forEach( (button) => { 
    button.addEventListener('click', shop.addToBasketBtn);
});

// Clear button
document.querySelector('.js-clear').addEventListener('click', shop.clearBasket);

// Checkout button
document.querySelector('.js-checkout').addEventListener('click', shop.revealTotals);

// Select currency
document.querySelector('.js-currencies').addEventListener('click', (e) => {
    if(e.target.dataset.type === "currency") {
        let abbr = e.target.dataset.name;
        let rate = e.target.dataset.rate;
        shop.updateTotal(abbr, rate);
    }
});

// Decrease button
document.querySelector('.js-basket-items').addEventListener('click', (e) => {
    if(e.target.dataset.type === "remove-item") {
        let name = e.target.dataset.name 
        shop.removeItem(name);
    }
});

// Increase button
document.querySelector('.js-basket-items').addEventListener('click', (e) => {
    if(e.target.dataset.type === "add-item") {
        let name = e.target.dataset.name;
        shop.addItem(name);
    }
});