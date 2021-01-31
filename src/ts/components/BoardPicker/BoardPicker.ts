import { IBoard, IButtonData } from '../../models/models';

const INITIAL_CLASSNAME = 'field-game';

const CORRECT_PICK = 'correct';

const WRONG_PICK = 'wrong';

export class BoardPicker implements IBoard {
  public listOfPicks: number[] = [];

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

  private isUserFinishedRound = (listOfSteps: number[]) =>
    JSON.stringify(this.listOfPicks) === JSON.stringify(listOfSteps);

  private winPopupElement = document.querySelector('.win-popup-container');

  public handleForUserSelectItems = (
    listOfSteps: number[],
    numberOfSteps: number
  ) => {
    if (this.listOfPicks.length <= listOfSteps.length) {
      this.listOfButtonsWithAttributes.map(({ childElement, attribute }) => {
        childElement.className = INITIAL_CLASSNAME;
        childElement.addEventListener('click', () => {
          const isUserCorrectPick = this.checkCorrectPick(
            childElement,
            attribute,
            listOfSteps
          );
          this.dispatchEvent('nextRound', childElement, false);
          if (
            this.isUserFinishedRound(listOfSteps) &&
            isUserCorrectPick &&
            listOfSteps.length < numberOfSteps
          ) {
            this.resetData();
            this.dispatchEvent('nextRound', childElement, true);
          } else if (
            this.isUserFinishedRound(listOfSteps) &&
            isUserCorrectPick &&
            listOfSteps.length === numberOfSteps
          ) {
            this.showWinnerPopup();
          }
        });
      });
    }
  };

  private addPickToCheck = (attribute: number) => {
    this.listOfPicks.push(attribute);
  };

  private showWinnerPopup = () => {
    setTimeout(() => {
      this.winPopupElement.classList.add('active');
    }, 1000);
  };

  private checkIndexPick = (list: number[], attribute: number) =>
    list.findIndex(number => number === attribute);

  private setButtonToHiglight = (childElement: Element, className: string) => {
    childElement.className += ` ${className}`;
  };

  private resetBoardPickerHighlights = () => {
    setTimeout(() => {
      this.listOfButtonsWithAttributes.forEach(
        ({ childElement }) => (childElement.className = INITIAL_CLASSNAME)
      );
    }, 500);
  };

  private dispatchEvent = (
    eventName: string,
    childElement: Element,
    flag: boolean
  ) => {
    childElement.dispatchEvent(
      new CustomEvent(eventName, { bubbles: true, detail: flag })
    );
  };

  private checkCorrectPick = (
    childElement: Element,
    attribute: number,
    listOfSteps: number[]
  ): boolean => {
    this.addPickToCheck(attribute);

    if (
      listOfSteps.includes(attribute) &&
      this.checkIndexPick(listOfSteps, attribute) ===
        this.checkIndexPick(this.listOfPicks, attribute)
    ) {
      this.setButtonToHiglight(childElement, CORRECT_PICK);
      this.resetBoardPickerHighlights();
      return true;
    } else {
      this.setButtonToHiglight(childElement, WRONG_PICK);
      this.resetBoardPickerHighlights();
      this.dispatchEvent('nextRound', childElement, false);
      this.dispatchEvent('gameOver', childElement, true);
      return false;
    }
  };

  public resetData = () => {
    this.listOfPicks = [];
    this.winPopupElement.classList.remove('active');
  };
}
