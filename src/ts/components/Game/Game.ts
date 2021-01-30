import { BoardPicker } from '../BoardPicker/BoardPicker';
import { BoardPattern } from '../BoardPattern/BoardPattern';

interface IGame {
  numberOfSteps: number;
}

export class Game implements IGame {
  private selectElement = <HTMLSelectElement>(
    document.getElementById('steps-select')
  );

  public numberOfSteps: number = Number(
    this.selectElement.options[this.selectElement.selectedIndex].value
  );

  public listOfSteps: number[] = [];

  public listOfPicks: number[] = [];

  constructor() {
    this.handleChangeSteps;
  }

  private boardPattern = new BoardPattern(this.numberOfSteps);

  private boardPicker = new BoardPicker(this.numberOfSteps);

  startGame = () => {
    console.log(
      'this.boardPattern.listOfSteps :>> ',
      this.boardPattern.listOfSteps
    );
    if (this.boardPattern.listOfSteps.length < this.numberOfSteps) {
      this.boardPattern.initRound();

      this.boardPicker.handleForUserSelectItems(this.boardPattern.listOfSteps);
    }
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
