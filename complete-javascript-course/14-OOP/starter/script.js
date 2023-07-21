/* 'use strict';

const Person = function (name, birthAge) {
  console.log('this: ', this);

  this.name = name;
  this.birthAge = birthAge;

  //Never create a method inside a constructor function
  // this.calcAge = function () {
  //   console.log(2037 - this.birthAge);
  // }; --> this is not a good practice, better use prototype
};
Person.hey = function () {
  console.log('Hey there');
};
const jhon = new Person('John', 1990);

// Person.hey(); //static method --> only available in the constructor function
// jhon.hey(); //error

console.log('jhon: ', jhon);
console.log(jhon instanceof Person);

//Prototypes

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthAge);
};

jhon.calcAge();

console.log(jhon.__proto__);
console.log(jhon.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(jhon));
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.specimen = 'Human';
console.log(jhon.hasOwnProperty('name')); //true
console.log(jhon.hasOwnProperty('specimen')); //false

console.log(Object.prototype.__proto__); //null
console.log(jhon.__proto__.__proto__.hasOwnProperty('name')); //Object.prototype

const arr = [3, 6, 4, 5, 6, 9, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3];
console.log('arr: ', arr.__proto__); //Array.prototype

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique().sort());

console.dir(Array.__proto__); //Object.prototype

//Coding Challenge #1

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
mercedes.brake();
bmw.brake();
mercedes.accelerate();

//ES6 Classes

//class expression
// const PersonClExp = class {};

//class declaration
class PersonCl {
  constructor(name, birthAge) {
    this.name = name;
    this.birthAge = birthAge;
  }

  calcAge() {
    //Will be added to .prototype property not to the object itself
    console.log(2037 - this.birthAge);
  }

  get age() {
    return 2037 - this.birthAge;
  }

  static hey() {
    console.log('Hey there');
  }
}

const miquel = new PersonCl('Miquel', 1990);
console.log(miquel.age);

//getters and setters
const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },
};
console.log(account.latest);

PersonCl.hey();

//Object.create

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthAge);
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthAge = 2002;
steven.calcAge();

const sarah = Object.create(PersonProto);
sarah.name = 'Sarah';
sarah.birthAge = 1979;
sarah.calcAge();

//Coding Challenge #2
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log(this.speed);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}
 */

/* const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const miquel = new Student('Miquel', 1990, 'Computer Science');
miquel.introduce();
miquel.calcAge();

console.log(miquel.__proto__);
console.log(miquel.__proto__.__proto__);

console.log(miquel instanceof Student);
console.log(miquel instanceof Person); */

//Coding Challenge #3

/* const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
}
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
}
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
}

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
}
EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
}
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`);
}

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
console.log(tesla);
tesla.brake();
tesla.accelerate();
 */
//ES6 Classes

/* class PersonCl {
  constructor(name, birthAge) {
    this.name = name;
    this.birthAge = birthAge;
  }

  calcAge() {
    //Will be added to .prototype property not to the object itself
    console.log(2037 - this.birthAge);
  }

  get age() {
    return 2037 - this.birthAge;
  }

  static hey() {
    console.log('Hey there');
  }
}

class StudentCl extends PersonCl {
  constructor(name, birthAge, course) {
    super(name, birthAge);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.name} and I study ${this.course}`);
  }

  calcAge() {
    console.log(`I'm ${2037 - this.birthAge} years old, but as a student I feel more like ${2037 - this.birthAge + 10}`);
  }

} */

/* const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthAge);
  },

  init(firstName, birthAge) {
    this.firstName = firstName;
    this.birthAge = birthAge;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthAge, course) {
  PersonProto.init.call(this, firstName, birthAge);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge(); */

/* class Account {
  //Public fields
  locale = navigator.language;
  _movements = [];

  //Private fields
  #pin;

  //Public methods

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  getMovements() {
    return this._movements;
  }

  setMovements(val) {
    this._movements.push(val);
  }

  deposit(val) {
    this._movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
  }
}

const acc1 = new Account('Miquel', 'EUR', 1111);
console.log(acc1);

acc1.deposit(250);
acc1.withdraw(140); */

//Coding Challenge #4

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    console.log((this.speed += 10));
    return this;
  }

  brake() {
    console.log((this.speed -= 5));
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  brake() {
    this.speed -= 5;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    console.log(
      `${this.make} going at ${(this.speed += 20)} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);
rivian.accelerate().accelerate().brake().chargeBattery(50).accelerate();
console.log(rivian.speedUS);

rivian.speedUS = 50;
console.log(rivian);
