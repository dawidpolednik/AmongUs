import { BoardPicker } from '../BoardPicker/BoardPicker';
import { BoardPattern } from '../BoardPattern/BoardPattern';
import { IGame } from '../../models/models';

export class Game implements IGame {
  private selectElement = document.getElementById(
    'steps-select'
  ) as HTMLSelectElement;

  private gameOverPopupElement = document.querySelector(
    '.lost-popup-container'
  );

  constructor() {
    this.selectElement.addEventListener('change', () => {
      this.numberOfSteps = Number(
        this.selectElement.options[this.selectElement.selectedIndex].value
      );
    });
  }

  public numberOfSteps: number = Number(
    this.selectElement.options[this.selectElement.selectedIndex].value
  );

  private boardPattern = new BoardPattern();

  private boardPicker = new BoardPicker();

  public startGame = () => {
    if (this.boardPattern.listOfSteps.length < this.numberOfSteps) {
      this.boardPattern.initRound(this.numberOfSteps);

      this.boardPicker.handleForUserSelectItems(
        this.boardPattern.listOfSteps,
        this.numberOfSteps
      );

      document.addEventListener('nextRound', (e: any) => {
        e.detail === true &&
          this.boardPattern.listOfSteps.length < this.numberOfSteps &&
          setTimeout(
            () => this.boardPattern.initRound(this.numberOfSteps),
            1000
          );
      });

      document.addEventListener('gameOver', (e: any) => {
        e.detail === true && this.stopGame();
      });
    }
  };

  public stopGame = () => {
    this.boardPattern.showCombination(this.numberOfSteps);
    setTimeout(
      this.showGameOverInfo,
      this.boardPattern.listOfSteps.length * 1000
    );
  };

  private showGameOverInfo = () => {
    this.gameOverPopupElement.classList.add('active');
  };

  public resetGame = () => {
    this.boardPattern.resetData();
    this.boardPicker.resetData();
  };
}
