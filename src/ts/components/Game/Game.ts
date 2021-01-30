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
    const boardPattern = new BoardPattern(this.numberOfSteps, this.listOfSteps);

    const boardGame = new BoardPicker(this.numberOfSteps, this.listOfSteps);

    // for (let i = 0; i < this.numberOfSteps; i++) {
    if (this.listOfSteps.length <= this.numberOfSteps) {
      this.addIndexLevelToListOfSteps(this.listOfSteps, this.setIndexLevel());

      boardPattern.showElementsWithIndexLevel();

      boardGame.handleForUserSelectItems();
      // }
    }
  };

  setIndexLevel = () => Math.floor(Math.random() * numberOfItems) + 1;

  addIndexLevelToListOfSteps = (list: number[], newIndex: number) =>
    list.push(newIndex);

  resetGame = () => {
    this.listOfSteps = [];
  };

  handleChangeSteps = this.selectElement.addEventListener('change', e => {
    this.numberOfSteps = Number(
      this.selectElement.options[this.selectElement.selectedIndex].value
    );
  });
}
