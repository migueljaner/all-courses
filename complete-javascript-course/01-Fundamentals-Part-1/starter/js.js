"use strict";
let numero1 = Number(prompt("Introduce el numero1:"));
let divisores = [];

for (let i = 1; i <= 10; i++) {
  divisores.push([i, numero1, i * numero1]);
}
let resultado;
console.log(resultado);
for (const [multiplicador, , multiplicacion] of divisores) {
  resultado += `${multiplicador} x ${numero1} = ${multiplicacion} <br/>`;
}
document.write(resultado);
console.log(resultado);
/*
let continente, pais, población;
continente = "Europa"
pais = "España"
población = "Europa"

console.log(continente, pais, población)
*/
/*
Mark and John are trying to compare their BMI (Body Mass Index), which is
calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg
and height in meter).
Your tasks:
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both versions)
3. Create a Boolean variable 'markHigherBMI' containing information about
whether Mark has a higher BMI than John.
Test data:
§ Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95
m tall.
§ Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76
m tal

*/
/* let massJhon, massMark, heightJhon, heightMark;
let markHigherBMI;
massJhon = 92;
massMark = 78;
heightJhon = 1.95;
heightMark = 1.69;

const bmiJhon = calculateBMI(massJhon, heightJhon);
const bmiMark = calculateBMI(massMark, heightMark);

markHigherBMI = bmiMark > bmiJhon;

if (markHigherBMI) {
    console.log(`Mark BMI (${bmiMark}) tiene mas que Jhon (${bmiJhon})`)
} else {
    console.log(`Jhon tiene mas BMI`)
}
console.log(bmiJhon, bmiMark, markHigherBMI);

function calculateBMI(mass, height) {
    let bodyMassIndex;
    bodyMassIndex = mass / height ** 2;
    return bodyMassIndex;
} */
// Coding Challenge #3

/*
There are two gymnastics teams, Dolphins and Koalas. They compete against each other 3 times. The winner with the highest average score wins the a trophy!

1. Calculate the average score for each team, using the test data below
2. Compare the team's average scores to determine the winner of the competition, and print it to the console. Don't forget that there can be a draw, so test for that as well (draw means they have the same average score).

3. BONUS 1: Include a requirement for a minimum score of 100. With this rule, a team only wins if it has a higher score than the other team, and the same time a score of at least 100 points. HINT: Use a logical operator to test for minimum score, as well as multiple else-if blocks 😉
4. BONUS 2: Minimum score also applies to a draw! So a draw only happens when both teams have the same score and both have a score greater or equal 100 points. Otherwise, no team wins the trophy.

TEST DATA: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
TEST DATA BONUS 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
TEST DATA BONUS 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106
*/

/* let averageDolphins, averageKoalas, scoreDolphins, scoreKoalas;
scoreDolphins = 97 + 108 + 89
scoreKoalas = 88 + 91 + 110
averageDolphins = scoreDolphins / 3
averageKoalas = scoreKoalas / 3
if (scoreDolphins >= 100 || scoreKoalas >= 100) {
    if (averageKoalas > averageDolphins && scoreKoalas >= 100) {
        console.log(`Koalas Wins`)
    } else if (averageKoalas < averageDolphins && scoreDolphins >= 100) {
        console.log(`Dolphins Wins`)
    } else if (averageDolphins === averageKoalas) {
        console.log(`There was a draw`)
    }
}
else {
    console.log(`Nobody wins`)
}

let age = 19;
console.log(`${age >= 18 ? `Tengo ${age}` : 'Soy Menor'}`)
*/
// Coding Challenge #4

/*
Steven wants to build a very simple tip calculator for whenever he goes eating in a resturant. In his country, it's usual to tip 15% if the bill value is between 50 and 300. If the value is different, the tip is 20%.

1. Your task is to caluclate the tip, depending on the bill value. Create a variable called 'tip' for this. It's not allowed to use an if/else statement 😅 (If it's easier for you, you can start with an if/else statement, and then try to convert it to a ternary operator!)
2. Print a string to the console containing the bill value, the tip, and the final value (bill + tip). Example: 'The bill was 275, the tip was 41.25, and the total value 316.25'

TEST DATA: Test for bill values 275, 40 and 430

HINT: To calculate 20% of a value, simply multiply it by 20/100 = 0.2
HINT: Value X is between 50 and 300, if it's >= 50 && <= 300 😉

GOOD LUCK 😀
*/

// const bill = 275;
// let tip = bill <= 300 && bill >= 50 ? 0.15 * bill : 0.2 * bill;
// console.log(
//   `The bill was ${bill}$, the tip was ${tip}$, the total value was ${
//     bill + tip
//   }$`
// );
