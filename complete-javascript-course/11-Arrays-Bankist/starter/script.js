'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(e => e[0])
      .join('');
  });
};
createUsernames(accounts);
const displayMovements = function (movements, sort = false) {
  // console.log(containerMovements.innerHTML);
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">
        ${index + 1} ${type} </div>
      <div class="movements__value">
      ${Math.abs(movement)}€
      </div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
const calcPrintBalance = function (acc) {
  acc.balace = acc.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  labelBalance.textContent = acc.balace + ' €';
};
const calcSummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;
  const outcome = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcome)}€`;
  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * `${acc.interestRate}`) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = interest;
};
const updateUi = function (acc) {
  // Display mov
  displayMovements(acc.movements);
  // Display balance
  calcPrintBalance(acc);
  // Discplay summary
  calcSummary(acc);
};
//Event Handler

//Login
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //Prevent form from submit
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and wellcaome message;
    labelWelcome.textContent = `Wellcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;
    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    //Update UI
    updateUi(currentAccount);
  }
});
//Pedir dinero prestado
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //Add movement
    currentAccount.movements.push(amount);
    updateUi(currentAccount);
  }
  inputLoanAmount.value = '';
});
//Transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const reciverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    reciverAcc &&
    currentAccount.balace >= amount &&
    reciverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    reciverAcc.movements.push(amount);
    updateUi(currentAccount);
  }
});
//Close account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
//Sorting
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
const calculateRecomendPortion = function () {
  dogs.forEach(dog => {
    dog.recomendedPortion = dog.weight ** 0.75 * 28;
  });
};
const findSarahsDog = function () {
  const sarahsdog = dogs.find(dog => dog.owners.includes('Sarah'));
  console.log(
    `Sarah's dog have to eat ${
      sarahsdog.curFood <= sarahsdog.recomendedPortion ? 'more' : 'less'
    }`
  );
};

calculateRecomendPortion();
findSarahsDog();
const ownerswhoeatmuch = dogs
  .filter(dog => dog.curFood > dog.recomendedPortion)
  .flatMap(dog => dog.owners);
const ownerswhoeatless = dogs
  .filter(dog => dog.curFood < dog.recomendedPortion)
  .flatMap(dog => dog.owners);

console.log(`${ownerswhoeatmuch.join(', ')}'s dogs eat to much`);
console.log(`${ownerswhoeatless.join(', ')}'s dogs eat to little`);
console.log(`${dogs.some(dog => dog.curFood === dog.recomendedPortion)}`);
const okayAmount = dog =>
  dog.curFood <= dog.recomendedPortion * 1.1 &&
  dog.curFood >= dog.recomendedPortion * 0.9;
console.log(`${dogs.some(okayAmount)}`);
console.log(dogs.filter(okayAmount));
console.log(
  dogs.slice().sort((a, b) => a.recomendedPortion - b.recomendedPortion)
);
console.log(dogs);
///////////////////////////////////////
// Array Methods Practice
//1.
/* const bankDepositsSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);
console.log(bankDepositsSum);
//2.
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 1000).length;
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 1000)
  .reduce((acc, mov) => (mov >= 1000 ? ++acc : acc), 0);
console.log(numDeposits1000);
//3.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

//4.
//this is a nice title -> This Is a Nice Title

const convertTitleCase = function (title) {
  const expections = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      expections.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(' ');
  return titleCase;
};
console.log(convertTitleCase('this is a nice title')); */
///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/* const calcAverageHumanAge = function (dogages) {
  const humanAges = dogages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
  return [humanAges];
};
let julia;
julia = [5, 2, 4, 1, 15, 8, 3];
console.log(...calcAverageHumanAge(julia)); */
///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/* const calcAverageHumanAge = function (dogages) {
  const humanAges = dogages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));

  const adults = humanAges.filter(age => age >= 18);
  const average = adults.reduce((acc, age) => acc + age) / adults.length;
  return [humanAges, adults, average];
};
let julia;
julia = [5, 2, 4, 1, 15, 8, 3];
console.log(...calcAverageHumanAge(julia)); */
///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/* const checkDogs = function (dogsJulia, dogsKate) {
  dogsJulia.forEach((e, i) => {
    console.log(
      `Julia dog number ${i + 1} is ${
        e >= 3 ? 'an adult, and is ' + e + ' years old' : 'still a puppy'
      }`
    );
  });
  dogsKate.forEach((e, i) => {
    console.log(
      `Kate dog number ${i + 1} is ${
        e >= 3 ? 'an adult, and is ' + e + ' years old' : 'still a puppy'
      }`
    );
  });
};
let julia, kate;
julia = [3, 5, 2, 12, 7];
julia = julia.slice(1, -2);
kate = [4, 1, 15, 8, 3];
const alldogs = [...julia, ...kate];
checkDogs(julia, kate); */
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//Create and fill arrays
//Regular way
/* const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array([1, 2, 3, 4, 5, 6, 7]));

//Empty array + fill method
const x = new Array(7);
console.log(x);
// x.fill(1);
x.fill(1, 3, 5);
console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

//Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

const dicerolls = Array.from({ length: 100 }, (_, i) =>
  Math.round(Math.random() * 5 + 1)
);
console.log(dicerolls);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);
}); */

/////////////////////////////
//Sorting Arrays
//Strings
// const owners = ['Miguel', 'Pedro', 'Xisco', 'Aina'];
// console.log(owners.sort());

//Numbers

//return <0 A,B(Keep order)
//return >0 B,A(switch order)
//Ascending
/* movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
}); */
// movements.sort((a, b) => a - b);
// console.log(movements);
//Descending
/* movements.sort((a, b) => {
  if (a < b) return 1;
  if (a > b) return -1;
}); */
// movements.sort((a, b) => b - a);
// console.log(movements);
///////////////////////////////
//Flat and Flatmap
/* const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [[4, 5], 6], 7, 8];
console.log(arrDeep.flat(2));

//Flat
const overallMovements = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
//Flatmap
const overallMovements2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0); */
/////////////////////////
//Some and evary
/* console.log(movements.includes(-130));
console.log(movements.some(mov => mov > 5000));

console.log(movements.every(mov => mov > 0)); */
//////////////////////////////
//The Find Method
/* console.log(movements.find(mov => mov < 0));
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account); */
/////////////////////////////
//The Reduce Method
/* const totalamout = movements.reduce(function (acc, mov) {
  return acc + mov;
}, 0);
console.log(totalamout);

let totalamoutFor = 0;
movements.forEach(function (e) {
  totalamoutFor += e;
});
console.log(totalamoutFor);

//The Maxium Value
const max = movements.reduce((acc, mov) => (acc > mov ? acc : mov), 0);
console.log(max); */
////////////////////////////////////
//The Filter Method
/* const deposits = movements.filter(mov => mov > 0);
console.log(deposits);

const depositFor = [];
for (const mov of movements) {
  mov > 0 ? depositFor.push(mov) : '';
}
console.log(depositFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals); */
////////////////////////////////
//The Map Method -> Crea una nueva array con la operación echa dentro de la función.
/*const eurToUsd = 1.1;
 const movementUSD = movements.map(mov => mov * eurToUsd);
console.log(movementUSD);

movements.map((mov, i) => {
  `Movement ${i + 1}: You ${mov > 0 ? 'Deposited' : 'Withdrew'} ${Math.abs(
    mov
  )}`;
}); */
/////////////////////////////////////////////////
/* 
let arr = ['a', 'b', 'c', 'd', 'e', 'f'];
////////////////////
//Slice
// console.log(arr.slice(1, 3));
// console.log(arr.slice(1, -1));

//Copia de la array
// console.log(arr.slice());
// console.log([...arr]);
/////////////////////////////////
//Splice -> Muta la array origen, devuelve los elementos pasados por parametro
// console.log(arr.splice(2));
// arr.splice(-1);
// arr.splice(1, 2); //Segundo parametro, numero de elementos que queremos contar
// console.log(arr);
////////////////////////
//Rerverse -> Muta la array principal
console.log(arr.reverse());
console.log(arr);
///////////////////////////////////
//Concat -> Concadena las arrays
let arr2 = ['g', 'h', 'i', 'j', 'k'];
const letters = arr.reverse().concat(arr2);
console.log(letters, arr, arr2);
console.log([...arr, ...arr2]);
////////////////////////////////
//Join
console.log(letters.join(', '));
 */

//////////////////////////////////
//The new at Method
/* const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0)); //

console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log('Miquel'.at(-1));
console.log('Miquel'.split('').join(', '));
console.log([...'Miquel'].join(', ')); */
///////////////////////////////////////
//Looping arrays: forEach

// for (const movement of movements) {
/* for (const [i, movement] of movements.entries()) {
  movement > 0
    ? console.log(`Movement ${i}: You depositet ${movement}`)
    : console.log(`Movement ${i}: You withdrew ${Math.abs(movement)}`); //Math.abs() elimina el simbolo negativo.
}
console.log('FOREACH'.padStart(15, '-').padEnd(25, '-'));
movements.forEach(function (e, u, a) {
  //Orden de parametros: valor, indice, array origen
  console.log(e, u, a);
  e > 0
    ? console.log(`Movement ${u}:You depositet ${e}`)
    : console.log(`Movement ${u}:You withdrew ${Math.abs(e)}`);
}); */

/* const usuarios = [
  ['Miquel', '609332280'],
  ['Xisco', '234523452'],
  ['Marga', '647447681'],
];
usuarios.forEach(function (e, i, a) {
  const [name, numero] = e;
  console.log(name, numero);
});

for (const [nombre, numero] of usuarios.values()) {
  console.log(nombre, numero);
}
for (const [i, [nombre, numero]] of usuarios.entries()) {
  console.log(i, nombre, numero);
} */
//////////////////////////////////
//Foreach for MAPS and SETS

/* currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

const currenciesUnique = new Set(['USD', 'EUR', 'GBP', 'EUR', 'USD']);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
}); */
