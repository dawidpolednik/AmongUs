import { BoardPattern } from '../BoardPattern/BoardPattern';
import { StepsPanel } from '../StepsPanel/StepsPanel';

interface IGame {
  numberOfSteps: number;
}

const numberOfItems = 16;

export class Game implements IGame {
  public numberOfSteps: number;

  public listOfSteps: number[] = [];

  constructor() {
    this.handleChangeSteps;
  }

  startGame = () => {
    this.addIndexLevelToListOfSteps(this.listOfSteps, this.setIndexLevel());
    console.log('this.numberOfSteps :>> ', this.numberOfSteps);
    console.log('this.listOfSteps :>> ', this.listOfSteps);
    console.log(
      'this.listOfSteps.length <= this.numberOfSteps :>> ',
      this.listOfSteps.length <= this.numberOfSteps
    );
    if (this.listOfSteps.length <= this.numberOfSteps) {
      const boardPattern = new BoardPattern(
        this.numberOfSteps,
        this.listOfSteps
      );

      console.log('  this.listOfSteps, :>> ', this.listOfSteps);

      boardPattern.showElementWithIndexLevel();
      console.log('start');
    }
  };

  setIndexLevel = () => Math.floor(Math.random() * numberOfItems) + 1;

  addIndexLevelToListOfSteps = (list: number[], newIndex: number) =>
    list.push(newIndex);

  resetGame = () => {};

  private selectElement = <HTMLSelectElement>(
    document.getElementById('steps-select')
  );

  handleChangeSteps = this.selectElement.addEventListener('change', e => {
    this.numberOfSteps = Number(
      this.selectElement.options[this.selectElement.selectedIndex].value
    );
  });
}
