import { BoardPicker } from '../BoardPicker/BoardPicker';
import { BoardPattern } from '../BoardPattern/BoardPattern';

interface IGame {
  numberOfSteps: number;
}

export class Game implements IGame {
  private selectElement = document.getElementById(
    'steps-select'
  ) as HTMLSelectElement;

  private gameOverPopupElement = document.querySelector(
    '.lost-popup-container'
  );

  public numberOfSteps: number = Number(
    this.selectElement.options[this.selectElement.selectedIndex].value
  );

  public listOfSteps: number[] = [];

  public listOfPicks: number[] = [];

  private boardPattern = new BoardPattern();

  private boardPicker = new BoardPicker();

  startGame = () => {
    if (this.boardPattern.listOfSteps.length < this.numberOfSteps) {
      this.boardPattern.initRound();

      this.boardPicker.handleForUserSelectItems(
        this.boardPattern.listOfSteps,
        this.numberOfSteps
      );

      document.addEventListener('nextRound', (e: any) => {
        e.detail === true &&
          this.boardPattern.listOfSteps.length < this.numberOfSteps &&
          setTimeout(this.boardPattern.initRound, 1000);
      });

      document.addEventListener('gameOver', (e: any) => {
        e.detail === true && this.stopGame();
      });
    }
  };

  stopGame = () => {
    this.boardPattern.showCombination();
    setTimeout(
      this.showGameOverInfo,
      this.boardPattern.listOfSteps.length * 1000
    );
  };

  showGameOverInfo = () => {
    this.gameOverPopupElement.classList.add('active');
  };

  resetGame = () => {
    this.selectElement.removeAttribute('disabled');
    this.selectElement.selectedIndex = 4;
    this.boardPattern.resetData();
    this.boardPicker.resetData();
  };

  handleChangeSteps = this.selectElement.addEventListener('change', e => {
    this.numberOfSteps = Number(
      this.selectElement.options[this.selectElement.selectedIndex].value
    );
  });
}
