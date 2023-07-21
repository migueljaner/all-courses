'use strict';
const btnAgain = document.querySelector('.again');
const message = document.querySelector('.message');
const btnCheck = document.querySelector('.check');

let numeroSecreto = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

function resetGame() {
  score = 20;
  document.body.style.backgroundColor = '#222';
  numeroSecreto = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
}
const escribirMensaje = mensaje => (message.textContent = mensaje);
btnAgain.addEventListener('click', resetGame);
btnCheck.addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  //No hay numero
  if (!guess) {
    escribirMensaje('⛔ No hay numero');
  }
  //El jugador acierta el numero
  else if (guess === numeroSecreto) {
    escribirMensaje('✔ Has acertado');
    document.body.style.backgroundColor = 'green';
    highscore = score;
    document.querySelector('.highscore').value > highscore
      ? ''
      : (document.querySelector('.highscore').textContent = highscore);
    document.querySelector('.number').textContent = numeroSecreto;
  }
  //El jugador Falla
  else if (guess !== numeroSecreto) {
    if (score > 1) {
      escribirMensaje(
        guess > numeroSecreto ? 'Demasiado Alto' : 'Demasiado Bajo'
      );
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      escribirMensaje('Has perdido');
      document.querySelector('.score').textContent = '0';
    }
  }
});
