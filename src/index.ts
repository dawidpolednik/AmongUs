import './styles/scss/main.scss';

import { Game } from './ts/components/Game/Game';

const startButton: HTMLButtonElement = document.getElementById(
  'button-start'
) as HTMLButtonElement;

const resetButton: HTMLButtonElement = document.getElementById(
  'button-reset'
) as HTMLButtonElement;

const playAgainButtons = document.querySelectorAll('.play-again');

const gameOverPopupElement = document.querySelector('.lost-popup-container');

const winPopupElement = document.querySelector('.win-popup-container');

startButton.classList.add('onHover');

const disableStartButton = () => {
  startButton.disabled = true;
  startButton.classList.remove('onHover');
};

let game: Game;

const playAgain = () => {
  gameOverPopupElement.classList.remove('active');
  winPopupElement.classList.remove('active');
  location.reload();
};

startButton.addEventListener('click', () => {
  document.getElementById('steps-select').setAttribute('disabled', 'disabled');
  game = new Game();
  game.startGame();
  disableStartButton();
});

resetButton.addEventListener('click', playAgain);

playAgainButtons.forEach(button => button.addEventListener('click', playAgain));
