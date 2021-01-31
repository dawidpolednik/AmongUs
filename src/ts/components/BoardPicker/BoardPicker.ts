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

  private setStylesWhenRoundStart = (listOfSteps: number[]) => {
    if (this.listOfPicks.length < listOfSteps.length) {
      this.listOfButtonsWithAttributes.forEach(({ childElement }) => {
        childElement.addEventListener('mouseover', () => {
          childElement.className += ' hoverElement';
        });
      });
    }
  };

  private isUserFinishedRound = (listOfSteps: number[]) => {
    console.log(
      'JSON.stringify(this.listOfPicks) === JSON.stringify(listOfSteps) :>> ',
      JSON.stringify(this.listOfPicks) === JSON.stringify(listOfSteps)
    );
    return JSON.stringify(this.listOfPicks) === JSON.stringify(listOfSteps);
  };

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
          childElement.dispatchEvent(
            new CustomEvent('nextRound', { bubbles: true, detail: false })
          );
          console.log('listOfSteps :>> ', listOfSteps);
          console.log('this.listOfPicks :>> ', this.listOfPicks);

          if (
            this.isUserFinishedRound(listOfSteps) &&
            isUserCorrectPick &&
            listOfSteps.length < numberOfSteps
          ) {
            this.resetData();

            childElement.dispatchEvent(
              new CustomEvent('nextRound', { bubbles: true, detail: true })
            );
          } else if (
            this.isUserFinishedRound(listOfSteps) &&
            isUserCorrectPick &&
            listOfSteps.length === numberOfSteps
          ) {
            console.log('wygrales gre');
            this.winPopupElement.classList.add('active');
          }
        });
      });
    }
  };

  private addPickToCheck = (attribute: number) => {
    console.log('dodaje do tablicy');
    this.listOfPicks.push(attribute);
  };

  private checkIndexPick = (list: number[], attribute: number) =>
    list.findIndex(number => number === attribute);

  private setButtonToHiglight = (childElement: Element, className: string) => {
    childElement.className += ` ${className}`;
  };

  private resetBoardPickerHighlights = () => {
    setTimeout(() => {
      this.listOfButtonsWithAttributes.map(
        ({ childElement }) => (childElement.className = INITIAL_CLASSNAME)
      );
    }, 500);
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

      childElement.dispatchEvent(
        new CustomEvent('nextRound', { bubbles: true, detail: false })
      );

      childElement.dispatchEvent(
        new CustomEvent('gameOver', { bubbles: true, detail: true })
      );

      return false;
    }
  };

  public resetData = () => {
    this.listOfPicks = [];
    this.winPopupElement.classList.remove('active');
  };
}
