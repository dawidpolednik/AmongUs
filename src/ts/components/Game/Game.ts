import { BoardPattern } from '../BoardPattern/BoardPattern';
import { StepsPanel } from '../StepsPanel/StepsPanel';

interface IGame {
  numberOfSteps: number;
}

export class Game implements IGame {
  public numberOfSteps: number;
  constructor() {
    this.handleChangeSteps;
  }

  startGame = () => {
    const boardPattern = new BoardPattern(this.numberOfSteps);
    boardPattern.showElementWithIndexLevel();
    console.log('start');
  };

  private selectElement = <HTMLSelectElement>(
    document.getElementById('steps-select')
  );

  handleChangeSteps = this.selectElement.addEventListener('change', e => {
    this.numberOfSteps = Number(
      this.selectElement.options[this.selectElement.selectedIndex].value
    );
    console.log('this.numberOfSteps :>> ', this.numberOfSteps);
  });
}
