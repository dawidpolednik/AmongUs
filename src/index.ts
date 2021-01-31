import './styles/scss/main.scss';

import { Game } from './ts/components/Game/Game';

const startButton: HTMLButtonElement = document.getElementById(
  'button-start'
) as HTMLButtonElement;

const resetButton: HTMLButtonElement = document.getElementById(
  'button-reset'
) as HTMLButtonElement;

const playAgainButtons = document.querySelectorAll('.play-again');

startButton.classList.add('onHover');

const disableStartButton = () => {
  startButton.disabled = true;
  startButton.classList.remove('onHover');
};

const game = new Game();

const enableStartButton = () => {
  startButton.disabled = false;
  startButton.classList.add('onHover');
};

const playAgain = () => {
  game.resetGame();
  enableStartButton();
};

startButton.addEventListener('click', () => {
  document.getElementById('steps-select').setAttribute('disabled', 'disabled');
  game.startGame();
  disableStartButton();
});

resetButton.addEventListener('click', playAgain);

playAgainButtons.forEach(button => button.addEventListener('click', playAgain));
