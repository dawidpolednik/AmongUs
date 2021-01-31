import { IBoard, IButtonData } from '../../models/models';

const ACTIVE = 'active';
const INITIAL_CLASSNAME = 'field-pattern';

const numberOfItems = 16;
export class BoardPattern implements IBoard {
  public listOfSteps: number[] = [];

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

  private setIndexLevel = () => Math.floor(Math.random() * numberOfItems) + 1;

  private addIndexLevelToListOfSteps = (newIndexLevel: number) =>
    this.listOfSteps.push(newIndexLevel);

  private searchButtonToHighlight = (indexLevel: number) =>
    this.listOfButtonsWithAttributes.find(
      ({ attribute }) => attribute === indexLevel
    );

  private setButtonToHiglight = (indexLevel: number) => {
    this.searchButtonToHighlight(
      indexLevel
    ).childElement.className += ` ${ACTIVE}`;
  };

  private toggleButtonsToRound = (isDisabled: boolean) => {
    const gameFields: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
      '.field-game'
    ) as NodeListOf<HTMLButtonElement>;
    gameFields.forEach(button => {
      button.className = isDisabled ? 'field-game disabled' : 'field-game';
      button.disabled = isDisabled;
    });
  };

  public showCombination = (numberOfSteps: number) => {
    this.listOfSteps.forEach((indexLevel, index) => {
      setTimeout(() => {
        this.setButtonToHiglight(indexLevel);
        setTimeout(() => {
          this.resetBoardPatternHighlights();
        }, 500);

        if (
          index + 1 === this.listOfSteps.length &&
          this.listOfSteps.length <= numberOfSteps
        ) {
          this.toggleButtonsToRound(false);
        }
      }, 1000 * index);
    });
  };

  public initRound = (numberOfSteps: number) => {
    this.toggleButtonsToRound(true);
    const indexLevel = this.setIndexLevel();
    this.addIndexLevelToListOfSteps(indexLevel);
    this.showCombination(numberOfSteps);
  };

  public resetData = () => {
    this.listOfSteps = [];
    this.gameOverPopupElement.classList.remove('active');
  };

  public resetBoardPatternHighlights = () => {
    this.listOfButtonsWithAttributes.map(
      ({ childElement }) => (childElement.className = INITIAL_CLASSNAME)
    );
  };
}
