import { IBoard, IButtonData } from '../../models/models';

const INITIAL_CLASSNAME = 'field-game';

const CORRECT_PICK = 'correct';

const WRONG_PICK = 'wrong';

export class BoardPicker implements IBoard {
  public listOfSteps: number[];
  public numberOfSteps: number;
  public listOfPicks: number[] = [];

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

  private setStylesWhenRoundStart = () => {
    if (this.listOfPicks.length < this.listOfSteps.length) {
      this.listOfButtonsWithAttributes.forEach(({ childElement }) => {
        childElement.addEventListener('mouseover', () => {
          childElement.className += ' hoverElement';
        });
      });
    }
  };

  public handleForUserSelectItems = () => {
    this.listOfButtonsWithAttributes.forEach(({ childElement, attribute }) => {
      childElement.className = INITIAL_CLASSNAME;
      childElement.addEventListener('click', () => {
        if (this.listOfPicks.length < this.listOfSteps.length) {
          return this.checkCorrectPick(childElement, attribute);
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
    attribute: number
  ): boolean => {
    this.addPickToCheck(attribute);
    // console.log(
    //   'this.checkIndexPick(this.listOfPicks,attribute) :>> ',
    //   this.checkIndexPick(this.listOfPicks, attribute)
    // );
    // console.log(
    //   'this.checkIndexPick(this.listOfSteps,attribute :>> ',
    //   this.checkIndexPick(this.listOfSteps, attribute)
    // );
    if (
      this.listOfSteps.includes(attribute) &&
      this.checkIndexPick(this.listOfSteps, attribute) ===
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
}
