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

startButton.addEventListener('click', () => {
  game.startGame();
});

resetButton.addEventListener('click', () => {
  game.resetGame();
});
