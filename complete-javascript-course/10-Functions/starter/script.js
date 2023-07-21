'use strict';
///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.body.addEventListener('click', function () {
    header.style.color = 'blue';
    console.dir(this);
  });
})();
///////////////////////
//Closures
/* const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
console.dir(booker); */

/////////////////////////////
//IIFE
/* function runOnce() {
  console.log('This will never run again');
}

runOnce();
runOnce();

(function () {
  console.log('This will never run again');
})();

(() => console.log('Thiis will also never run again'))();

{
  const privateInHere = 'Im private';
  var notPrivateinHere = 'Im not private';
}
console.log(privateInHere, notPrivateinHere); */
///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

/* const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    let strLanguages = '';
    for (const language of this.options) {
      strLanguages += `${language} \n`;
    }
    const answer = Number(
      prompt(
        'What is your favourite programing language? \n' +
          `${strLanguages} (Write option number)`
      )
    );

    answer <= this.options.length && answer >= 0
      ? this.answers[answer - 1]++
      : this.registerNewAnswer();

    this.displayResults();
  },
  displayResults(type = []) {
    Array.isArray(type)
      ? console.log(this.answers)
      : console.log(`Poll results are ${[...this.answers]}`);
  },
};
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll)); */

/* const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );

    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;

    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    type == 'array'
      ? console.log(this.answers)
      : console.log(`Poll results are ${this.answers.join(', ')}`);
  },
};
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string'); */
/////////////////////////////////
//Call, apply, bind method;
/* const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  //   book: function(){}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Miquel Janer');
lufthansa.book(645, 'Xisco Janer');
// console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
  //   book: function(){}
};

const book = lufthansa.book;

//Does not work
// book(234, 'Marga Mudoy') //'.this' no señala al docuento y no al objeto en cuestion.

//Call Method
//Yes work
//.call()-Especifica el objeto al que se refiere como primer parametro.
book.call(eurowings, 234, 'Marga Mudoy');
book.call(lufthansa, 142, 'Pedro Janer');
// console.log(lufthansa);
// console.log(eurowings);

//Apply method
const flightData = [534, 'Mia Janer'];
book.apply(eurowings, flightData);
book.call(eurowings, ...flightData);

//Bind method
const bookEurowings = book.bind(eurowings); //Devuelve una funcion con .this apuntando al objeto pasado
bookEurowings(765, 'Toni Mudoy');
// console.log(eurowings);

const bookEW23 = book.bind(eurowings, 23);

bookEW23('Yolanda Mudoy');
console.log(eurowings);

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

//Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
//addVat = value => value + value * 0.23;
console.log(addVAT(100));

const addTax2 = value => rate => console.log(value + value * rate);
addTax2(100)(0.1); */

////////////////////////////////
//Functions returning functions
/* const greet = greeting => name => console.log(`${greeting} ${name}`);

const greeterHey = greet('Hey');

greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Jonas');
 */

////////////////////////
//Callback functions
//Lower-order functions
/* const oneWord = function (str) {
  return str.replaceAll(' ', '');
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};
//Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
  return fn(str);
};

const done = transformer('JavaScript is the best!', upperFirstWord);
transformer(done, oneWord);

const high5 = function () {
  console.log('👋');
};

document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5); 
*/
