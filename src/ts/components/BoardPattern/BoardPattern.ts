import { IBoard, IButtonData } from '../../models/models';

const ACTIVE = 'active';
const INITIAL_CLASSNAME = 'field-pattern';

const numberOfItems = 16;
export class BoardPattern implements IBoard {
  public listOfSteps: number[] = [];

  constructor() {}

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

  showCombination = () => {
    this.listOfSteps.map(indexLevel => {
      this.setButtonToHiglight(indexLevel);
      setTimeout(() => {
        this.resetBoardPatternHighlights();
      }, 500);
    });
  };

  public initRound = () => {
    const indexLevel = this.setIndexLevel();
    this.addIndexLevelToListOfSteps(indexLevel);
    this.showCombination();
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
}
