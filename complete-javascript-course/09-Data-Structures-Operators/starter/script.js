'use strict';
// Data needed for first part of the section

const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours,
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '22:00', adress }) {
    return `Order recived ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} 
    will be delivered to ${adress} at ${time}`;
  },
  orderPasta(ing, ing2, ing3) {
    console.log(`Here is your pasta made from ${ing}, ${ing2}, ${ing3}`);
  },
};
///////////////////////////////////////
// String Methods Practice

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const getCode = str => str.slice(0, 3).toUpperCase();
const splitFlight = flights.split('+');
for (const flight of splitFlight) {
  const [state, from, to, hours] = flight.split(';');
  const output = `${state.startsWith('_Delayed') ? '🔴' : ''}${state.replaceAll(
    '_',
    ' '
  )} from ${getCode(from)} to ${getCode(to)} (${hours.replace(
    ':',
    'h'
  )})`.padStart(55);
  console.log(output);
}

///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

// document.body.append(document.createElement('textarea'));
// document.body.append(document.createElement('button'));

// document.querySelector('button').addEventListener('click', function () {
//   const text = document.querySelector('textarea').value;
//   const arrayNames = text.toLowerCase().split('\n');
//   for (const [i, name] of arrayNames.entries()) {
//     const [first, second] = name.trim().split('_');
//     const finalName = first + second[0].toUpperCase() + second.slice(1) + ' ';
//     console.log(`${finalName.padEnd(20)}${'✅'.repeat(i + 1)}`);
//   }
// });
////////////////////////////////
//Working with Strings

// const airline = 'Tap Air Portugal';
// console.log(airline[1]);
// console.log(airline.length);
// console.log(airline.indexOf('Portugal'));
// console.log(airline.slice(4));
// console.log(airline.slice(4, 7));

// console.log(airline.slice(0, airline.indexOf(' ') + 2));
// console.log(airline.slice(-8));
// console.log(airline.slice(1, -1));

// const str = new String('hello');
// console.log(typeof str, str);
//Fix capitalization
// const passenger = 'MiQuEl';
// const passengerLower = passenger.toLowerCase();
// const passengerCorrect =
//   passengerLower[0].toLocaleUpperCase() + passengerLower.slice(1);
// console.log(passengerCorrect);
// //Comparing emails
// const email = 'hello@miquel.com';
// const loginEmail = ' Hello@Miquel.Com';

// const lowerEmail = loginEmail.toLocaleLowerCase();
// const trimmedEmail = loginEmail.trim();
// console.log(trimmedEmail);

// const normailzedEmail = loginEmail.toLocaleLowerCase().trim();
// console.log(normailzedEmail);

// //Replace parts of string

// const priceUSD = '288,97$';
// const priceEUR = priceUSD.replace('$', '€').replace(',', '.');
// console.log(priceEUR.replaceAll('8', '9'));

// //Booleans

// const plane = 'A320neo';
// console.log(plane.includes('A320'));
// console.log(plane.startsWith('A'));
// console.log(plane.endsWith('eo'));

//Split
// console.log('a+very+nice+string'.split('+'));
// const [firstName, lastName] = 'Miguel Janer'.split(' ');

// const newName = ['Mr.', firstName, lastName.toLocaleUpperCase()].join(' ');
// console.log(newName);

// const capitalizeName = function (name) {
//   const names = name.split(' ');
//   const namesUpper = [];
//   for (const n of names) {
//     // namesUpper.push(n[0].toLocaleUpperCase() + n.slice(1));
//     namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
//   }
//   console.log(namesUpper.join(' '));
// };

// const passenger = 'jessica ann samith davis';
// capitalizeName(passenger);

// //Padding
// const message = 'Go to gate 23!';
// console.log(message.padStart(25, '+').padEnd(35, '+'));

// const maskCreditCard = function (number) {
//   const str = number + ''; //String(number), number.toStirng();
//   console.log(str.slice(-4).padStart(str.length, '*'));
// };

// const creditCard = 213412341234;
// maskCreditCard(creditCard);

// //Repeat
// const message2 = 'Bad weather... All Departures Delayed...';
// console.log(message2.repeat(3));

///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

// const gameEvents = new Map([
//   [17, '⚽️ GOAL'],
//   [36, '🔁 Substitution'],
//   [47, '⚽️ GOAL'],
//   [61, '🔁 Substitution'],
//   [64, '🔶 Yellow card'],
//   [69, '🔴 Red card'],
//   [70, '🔁 Substitution'],
//   [72, '🔁 Substitution'],
//   [76, '⚽️ GOAL'],
//   [80, '⚽️ GOAL'],
//   [92, '🔶 Yellow card'],
// ]);
// const posibleEvents = [...new Set(gameEvents.values())];
// gameEvents.delete(64);

// const time = [...gameEvents.keys()].pop();
// console.log(
//   `An event happened, on average, every ${time / gameEvents.size} minutes`
// );

// for (const [min, event] of gameEvents) {
//   console.log(
//     `${min <= 45 ? '[FIRST HALF] ' : '[SECOND HALF] '}${min}:${event} `
//   );
// }

/////////////////////////////////////////
//Maps
// const rest = new Map();
// rest.set('name', 'Classico Italiano');
// rest.set(1, 'Frienze, Italy');
// rest.set(2, 'Lisbon, Portugal');

// rest
//   .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//   .set('open', 11)
//   .set('close', 23)
//   .set(true, 'We are open')
//   .set(false, 'We are closed');
// console.log(rest.get('name'));
// console.log(rest.get(true));

// const time = 8;
// console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// console.log(rest.has('categories'));
// console.log(rest.delete(2));
// console.log(rest.size);
// // console.log(rest.clear());

// const question = new Map([
//   ['question', 'What is the best programing language in the world?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'JavaScript'],
//   ['correct', 3],
//   [true, 'Correct'],
//   [false, 'Try again'],
// ]);

// //Convert object to map
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

// console.log(question.get('question'));
// 3;
// for (const [key, value] of question) {
//   if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
// }
// const answer = Number(prompt('Your answer:'));

// console.log(question.get(answer === question.get('correct')));

//Convert Map to Array
// console.log([...question]);
// console.log([...question.keys()]);
// console.log([...question.values()]);

//////////////////////////////////////////
//Sets
// const ordersSet = new Set([
//   'Pasta',
//   'Pizza',
//   'Pizza',
//   'Risotto',
//   'Pasta',
//   'Pizza',
// ]);
// console.log(ordersSet.has('Pizza'));
// console.log(ordersSet.add('Garlic Bread'));
// console.log(ordersSet.delete('Pasta'));
// // ordersSet.clear();

// for (const order of ordersSet) {
//   console.log(order);
// }

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// for (const [goal, playername] of game.scored.entries()) {
//   console.log(`Goal ${goal}: ${playername}`);
// }
// let odds = 0;
// for (const odd of Object.values(game.odds)) {
//   odds += odd;
// }
// odds /= Object.values(game.odds).length;
// console.log(odds);

// for (const [team, odd] of Object.entries(game.odds)) {
//   const teamStr = team === 'x' ? 'draw' : `victory for ${game[team]}`;
//   console.log(`Odds of ${teamStr}: ${odd}`);
// }

// // for (const [team, odd] of Object.entries(game.odds)) {
// //   game[team] && console.log(`Odd of victory for ${game[team]}: ${odd} `);
// //   game[team] || console.log(`Odd of draw: ${odd}`);
// // }

///////////////////////////////////
// Looping Objects: Object Keys, Values, and Entries
//Keys
// const properties = Object.keys(openingHours);
// let openStr = `We are open on ${properties.length} days: `;
// for (const day of properties) {
//   openStr += `${day}, `;
// }
// console.log(openStr);

// //Values

// const values = Object.values(openingHours);
// console.log(values);

// //Entries objects
// const entries = Object.entries(openingHours);
// for (const [key, { open, close }] of entries) {
//   console.log(`On ${key} we open at ${open} and close at ${close} `);
// }

///////////////////////////////////
// Optional Chaining (?.)
// if (restaurant.openingHours && restaurant.openingHours.mon)
//   console.log(restaurant.openingHours.mon.open);

// console.log(restaurant.openingHours?.mon?.open

// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// for (const day of days) {
//   const open = restaurant.openingHours[day]?.open ?? 'closed';
//   console.log(`On ${day} we are ${open}`);
// }

// // Methods
// console.log(restaurant.orderBebe?.(1, 2) || 'Methoth not exist');
// //Arrays
// const users = [{ name: 'michel', email: 'adfh@hotmail.com' }];
// console.log(users[0]?.name);

////////////////////////////////////
// // For of loop
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const item of menu) console.log(item);

// for (const [i, el] of menu.entries()) {
//   console.log(`${i + 1}:${el}`);
// }
//////////////////////////////////////
//Destructuring objects array into variable
// const [starter, main] = restaurant.order(1, 2);
// console.log(starter, main);
/////////////////////////////////////
// Destructure Objects
// const { name: firstName, categories: foodType } = restaurant;
// console.log(firstName, foodType);

// console.log(
//   restaurant.orderDelivery({
//     time: '22:30',
//     adress: 'Villa del Sol, 21',
//     mainIndex: 2,
//     starterIndex: 2,
//   })
// );

///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/
// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '3:0',
//   scored: ['Lewandowski', 'Gnarby', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
//   printGoals: function (...playersNames) {
//     for (const playerName of playersNames) {
//       let goal = 0;
//       for (const whoscored of this.scored) {
//         playerName == whoscored && goal++;
//       }
//       console.log(`${playerName} has scored ${goal} goals`);
//     }
//   },
// };

// const {
//   players: [players1, players2],
// } = game;

// // const [gk, ...fieldPlayers] = players1;

// const allPlayers = [...players1, ...players2];

// // const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

// // const {
// //   odds: { team1, x: draw, team2 },
// // } = game;
// // console.log(team1, team2);
// const teamwin = game.printGoals(...allPlayers);

// // team1 > team2 ?? console.log(`${game.team1} Wins`);
// // team1 < team2 ?? console.log(`${game.team2} Wins`);
