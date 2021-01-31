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

  private gameOverPopupElement = document.querySelector(
    '.lost-popup-container'
  );

  setIndexLevel = () => Math.floor(Math.random() * numberOfItems) + 1;

  addIndexLevelToListOfSteps = (newIndexLevel: number) =>
    this.listOfSteps.push(newIndexLevel);

  public showCombination = () => {
    this.listOfSteps.forEach((indexLevel, index) => {
      setTimeout(() => {
        this.setButtonToHiglight(indexLevel);
        setTimeout(() => {
          this.resetBoardPatternHighlights();
        }, 500);
      }, 1000 * index);
    });
  };

  public initRound = () => {
    const indexLevel = this.setIndexLevel();
    this.addIndexLevelToListOfSteps(indexLevel);
    this.showCombination();
    this.toggleButtonsToRound(false);
  };

  private toggleButtonsToRound = (isDisabled: boolean) => {
    const gameFields: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
      '.field-game'
    ) as NodeListOf<HTMLButtonElement>;
    gameFields.forEach(button => {
      button.className = 'field-game';
      button.disabled = isDisabled;
    });
  };

  public resetData = () => {
    this.listOfSteps = [];
    this.gameOverPopupElement.classList.remove('active');
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
