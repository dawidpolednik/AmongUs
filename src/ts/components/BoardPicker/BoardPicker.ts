import { IBoard, IButtonData } from '../../models/models';

const INITIAL_CLASSNAME = 'field-game';

const CORRECT_PICK = 'correct';

const WRONG_PICK = 'wrong';

export class BoardPicker implements IBoard {
  public numberOfSteps: number;
  public listOfPicks: number[] = [];

  constructor(numberOfSteps: number) {
    this.numberOfSteps = numberOfSteps;
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

  private setStylesWhenRoundStart = (listOfSteps: number[]) => {
    if (this.listOfPicks.length < listOfSteps.length) {
      this.listOfButtonsWithAttributes.forEach(({ childElement }) => {
        childElement.addEventListener('mouseover', () => {
          childElement.className += ' hoverElement';
        });
      });
    }
  };

  public handleForUserSelectItems = (listOfSteps: number[]) => {
    this.listOfButtonsWithAttributes.forEach(({ childElement, attribute }) => {
      childElement.className = INITIAL_CLASSNAME;
      childElement.addEventListener('click', () => {
        if (this.listOfPicks.length < listOfSteps.length) {
          return this.checkCorrectPick(childElement, attribute, listOfSteps);
        }
      });
    });
  };

  private addPickToCheck = (attribute: number) => {
    // console.log('attribute :>> ', attribute);
    this.listOfPicks.push(attribute);
  };

  private checkIndexPick = (list: number[], attribute: number) =>
    list.findIndex(number => number === attribute);

  private setButtonToHiglight = (childElement: Element, className: string) => {
    childElement.className += ` ${className}`;
  };

  private resetBoardPatternHighlights = () => {
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
      console.log('dobrze');

      this.setButtonToHiglight(childElement, CORRECT_PICK);

      this.resetBoardPatternHighlights();

      return true;
    } else {
      this.setButtonToHiglight(childElement, WRONG_PICK);

      this.resetBoardPatternHighlights();
      console.log('źle');
      return false;
    }
  };

  public resetData = () => {
    this.listOfPicks = [];
  };
}
