import { IBoard, IButtonData } from '../../models/models';

const ACTIVE = 'active';
const INITIAL_CLASSNAME = 'field-pattern';

export class BoardPattern implements IBoard {
  public listOfSteps: number[] = [];
  public numberOfSteps: number;
  constructor(numberOfSteps: number, listOfSteps: number[]) {
    this.numberOfSteps = numberOfSteps;
    this.listOfSteps = listOfSteps;
  }

  private listOfButtons = [...document.querySelectorAll('.field-pattern')];

  private listOfButtonsWithAttributes: IButtonData[] = this.listOfButtons.map(
    (item, index) => {
      return {
        childElement: item,
        attribute: index + 1,
      };
    }
  );

  showElementWithIndexLevel = () => {
    this.listOfSteps.map(indexLevel => {
      this.setButtonToHiglight(indexLevel);

      setTimeout(() => {
        this.resetBoardPatternHighlights();
      }, 500);
    });
  };

  searchButtonToHighlight = (indexLevel: number) =>
    this.listOfButtonsWithAttributes.find(
      ({ attribute }) => attribute === indexLevel
    );

  setButtonToHiglight = (indexLevel: number) => {
    this.searchButtonToHighlight(
      indexLevel
    ).childElement.className += ` ${ACTIVE}`;
  };

  public resetBoardPatternHighlights = () => {
    this.listOfButtonsWithAttributes.map(
      ({ childElement }) => (childElement.className = INITIAL_CLASSNAME)
    );
  };
}
