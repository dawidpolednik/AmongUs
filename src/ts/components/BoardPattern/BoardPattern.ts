import { IBoard, IButtonData } from '../../models/models';

const ACTIVE = 'active';
const INITIAL_CLASSNAME = 'field-pattern';

const numberOfItems = 16;
export class BoardPattern implements IBoard {
  public numberOfSteps: number;
  public listOfSteps: number[] = [];

  constructor(numberOfSteps: number) {
    this.numberOfSteps = numberOfSteps;
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

  setIndexLevel = () => Math.floor(Math.random() * numberOfItems) + 1;

  addIndexLevelToListOfSteps = (newIndexLevel: number) =>
    this.listOfSteps.push(newIndexLevel);

  showElementsWithIndexLevel = () => {
    this.listOfSteps.forEach(indexLevel => {
      this.setButtonToHiglight(indexLevel);
      setTimeout(() => {
        this.resetBoardPatternHighlights();
      }, 500);
    });
  };

  public initRound = () => {
    const indexLevel = this.setIndexLevel();
    this.addIndexLevelToListOfSteps(indexLevel);
    this.showElementsWithIndexLevel();
  };

  public resetData = () => {
    this.listOfSteps = [];
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

  // public showAllStepsInRound =
}
