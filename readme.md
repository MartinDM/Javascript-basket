# JavaScript Shopping Basket project


A just-for-fun learning app - Built using a module JS pattern. Encapsulates basket methods, provides an API.


<img src="https://i.imgur.com/9GpdMBw.jpg" width="700">

## Running the app

The index file in `/dist` can be run on its own, or by `cd`ing into the root directory and running `npm i`.  

Then run `gulp` to start the build and local server at localhost:3000

## Features

- Uses LocalStorage on page load to retreive the basket
- Add items to basket, increase/decrease qty
- Clear basket, or 'Checkout' to total and currency selection
- Live list of currencies from Currency Layer
- Useful error message in drop-down if Ajax fails/returns fail state
- Basket contents persist and carried to second view
- Uses a Module pattern, with some features of ES6 such as arrow functions, `let` and `const` and Tempate Literals
- Build step transpiles ES6 with Babel, compiles SASS and watches all files
- Native JavaScript has been used wherever possible, with little reliance on jQuery apart from Bootstraps' drop-down component
- Responsive layout using Bootstrap
 

## Decisions

The use of Bootstrap is by no means a default for production; just used for demo purposes here. Normally adept at using a grid system (or CSS Grid) with custom SASS partials for components of the UI.

Decision was made to use jQuery's ajax function as it's already included as a dependency for Bootstraps' components. Code could be refactored to remove jQuery all together quite easily.

Other options here would be to use ES6 Fetch API or using native XMLHttpRequest, which is more verbose, however jQuery is already included and more familiar to many; handling much of the parsing and extra code needed to handle the response.


## Testing

- I have used Mocha and Chai's assetion library to check the type, contents or length of of outputs of functions.
- All 8 tests in `./test/test.js`should pass.

Run tests with `npm i` as above, followed by `npm run test`.

## Possible improvements

- Testing to be made more comprehensive, exporting modules for testing in their original context/mocking without mimicking it in the test file
- Layout, design and user flow could be refined; have focused more on other parts of assessment - encapsulation, and function of the program
- 'Checkout' button was briefed to reveal the total. Would consider having 'continue' here instead, then 'checkout' at the end once total revealed
- Caching of DOM elements on the main object for use throughout the program
- Consider optimising user journey/messaging
- Option to return to GBP currency
- JS and CSS could be minified in the build step; left expanded for readability
- A simpler way of determining show/hide of the stages, perhaps resolved by revisiting the layout
