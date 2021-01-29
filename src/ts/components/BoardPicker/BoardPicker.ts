import { IBoard, IButtonData } from '../../models/models';
export class BoardPicker implements IBoard {
  public listOfSteps: number[] = [];
  public numberOfSteps: number;
  constructor(numberOfSteps: number, listOfSteps: number[]) {
    this.numberOfSteps = numberOfSteps;
    this.listOfSteps = listOfSteps;
  }

  private allButtonsNode = document.querySelectorAll('.field-game');

  private listOfButtons = [...this.allButtonsNode];

  private listOfButtonsWithAttributes: IButtonData[] = this.listOfButtons.map(
    (item, index) => {
      return {
        childElement: item,
        attribute: index + 1,
      };
    }
  );

  public handleForUserSelectItem = () => {
    this.listOfButtonsWithAttributes.forEach(({ childElement, attribute }) => {
      childElement.addEventListener('click', () => {
        console.log('attribute :>> ', attribute);
      });
    });
  };
}
