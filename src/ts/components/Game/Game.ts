import { BoardPicker } from '../BoardPicker/BoardPicker';
import { BoardPattern } from '../BoardPattern/BoardPattern';

interface IGame {
  numberOfSteps: number;
}

export class Game implements IGame {
  private selectElement = document.getElementById(
    'steps-select'
  ) as HTMLSelectElement;

  private boxElement = document.querySelector('box') as HTMLDivElement;

  public numberOfSteps: number = Number(
    this.selectElement.options[this.selectElement.selectedIndex].value
  );

  public listOfSteps: number[] = [];

  public listOfPicks: number[] = [];

  private boardPattern = new BoardPattern(this.numberOfSteps);

  private boardPicker = new BoardPicker(this.numberOfSteps);

  startGame = () => {
    if (this.boardPattern.listOfSteps.length < this.numberOfSteps) {
      this.startRound();

      document.addEventListener('nextRound', (e: any) =>
        e.detail
          ? setTimeout(() => this.startRound(), 1000)
          : console.log('przegrales')
      );
    }
  };

  startRound = () => {
    this.boardPattern.initRound();
    this.boardPicker.handleForUserSelectItems(this.boardPattern.listOfSteps);
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
