import { BoardPicker } from '../BoardPicker/BoardPicker';
import { BoardPattern } from '../BoardPattern/BoardPattern';

interface IGame {
  numberOfSteps: number;
}

const numberOfItems = 16;

export class Game implements IGame {
  private selectElement = <HTMLSelectElement>(
    document.getElementById('steps-select')
  );

  public numberOfSteps: number = Number(
    this.selectElement.options[this.selectElement.selectedIndex].value
  );

  public listOfSteps: number[] = [];

  constructor() {
    this.handleChangeSteps;
  }

  startGame = () => {
    this.addIndexLevelToListOfSteps(this.listOfSteps, this.setIndexLevel());

    if (this.listOfSteps.length <= this.numberOfSteps) {
      const boardPattern = new BoardPattern(
        this.numberOfSteps,
        this.listOfSteps
      );

      const boardGame = new BoardPicker(this.numberOfSteps, this.listOfSteps);

      console.log('  this.listOfSteps, :>> ', this.listOfSteps);

      boardPattern.showElementWithIndexLevel();

      boardGame.handleForUserSelectItem();
      console.log('start');
    }
  };

  setIndexLevel = () => Math.floor(Math.random() * numberOfItems) + 1;

  addIndexLevelToListOfSteps = (list: number[], newIndex: number) =>
    list.push(newIndex);

  resetGame = () => {};

  handleChangeSteps = this.selectElement.addEventListener('change', e => {
    this.numberOfSteps = Number(
      this.selectElement.options[this.selectElement.selectedIndex].value
    );
  });
}
