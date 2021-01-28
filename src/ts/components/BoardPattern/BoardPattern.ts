interface IBoardPattern {
  numberOfSteps: number;
}

interface IButtonAttribute {
  childElement: Element;
  attribute: number;
}

const numberOfItems = 16;

export class BoardPattern implements IBoardPattern {
  public listOfSteps: number[] = [];
  public numberOfSteps: number;
  constructor(numberOfSteps: number) {
    this.numberOfSteps = numberOfSteps;
  }

  private listOfButtons = [...document.querySelectorAll('.field-pattern')];

  private listOfButtonsAttributes: IButtonAttribute[] = this.listOfButtons.map(
    (item, index) => {
      return {
        childElement: item,
        attribute: index + 1,
      };
    }
  );

  setIndexLevel = () => Math.floor(Math.random() * numberOfItems) + 1;

  addIndexLevelToListOfSteps = (newIndex: number) =>
    this.listOfSteps.push(newIndex);

  showElementWithIndexLevel = () => {
    const buttonToHigh = this.setButtonToHighlight(this.setIndexLevel());
    console.log('buttonToHigh :>> ', buttonToHigh);
  };

  setButtonToHighlight = (indexLevel: number) =>
    this.listOfButtonsAttributes.find(
      ({ attribute }) => attribute === indexLevel
    );
}
