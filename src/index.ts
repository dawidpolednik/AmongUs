import './styles/scss/main.scss';

import '../src/styles/images/background.jpg';

import { Game } from './ts/components/Game/Game';

const game = new Game();

const startButton: HTMLButtonElement = document.getElementById(
  'button-start'
) as HTMLButtonElement;

const resetButton: HTMLButtonElement = document.getElementById(
  'button-reset'
) as HTMLButtonElement;

startButton.classList.add('onHover');

const disableStartButton = () => {
  startButton.disabled = true;
  startButton.classList.remove('onHover');
};

const enableStartButton = () => {
  startButton.disabled = false;
  startButton.classList.add('onHover');
};

startButton.addEventListener('click', () => {
  document.getElementById('steps-select').setAttribute('disabled', 'disabled');
  game.startGame();
  disableStartButton();
});

resetButton.addEventListener('click', () => {
  game.resetGame();
  enableStartButton();
});
