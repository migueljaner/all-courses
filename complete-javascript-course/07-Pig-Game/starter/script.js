'use strict';

//Seleccionar botones del juego
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const players = document.querySelectorAll('.player');
//Selecciomar elementos del juego
const diceelement = document.querySelector('.dice');

const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');

//Declarar Variables
let currentPlayer, currentScore, scores, playing;

const initGame = () => {
  scores = [0, 0];
  currentScore = 0;
  currentPlayer = 0;
  playing = 0;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  diceelement.classList.add('hide');
  for (let i = 0; i < players.length; i++) {
    const element = players[i];
    element.classList.remove('player--winner');
    element.classList.remove('player--active');
  }
  players[0].classList.add('player--active');
};
const cambiarJugador = () => {
  document.querySelector(`#current--${currentPlayer}`).textContent = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  currentScore = 0;
  for (let i = 0; i < players.length; i++) {
    const element = players[i];
    element.classList.toggle('player--active');
  }
};
initGame();

btnRoll.addEventListener('click', function () {
  if (playing == 0) {
    //Generamos un nuevo roll
    const newRoll = Math.trunc(Math.random() * 6) + 1;
    diceelement.src = `dice-${newRoll}.png`;
    diceelement.classList.remove('hide');

    //Si no es igual a 1
    if (newRoll != 1) {
      //Sumar el roll al current del jugador
      currentScore += newRoll;
      document.querySelector(`#current--${currentPlayer}`).textContent =
        currentScore;
    }
    //Si es igual a 1
    else {
      //Cambiar jugador
      cambiarJugador();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing == 0) {
    //Añadir el currentScore a la scoreGlobal
    scores[currentPlayer] += currentScore;

    //Si la score del jugador no es igual a 100;
    if (scores[currentPlayer] < 100) {
      document.querySelector(`#score--${currentPlayer}`).textContent =
        scores[currentPlayer];

      //Cambiar jugador
      cambiarJugador();
    } else {
      players[currentPlayer].classList.add('player--winner');
      playing = 1;
    }
  }
});
btnNew.addEventListener('click', initGame);
