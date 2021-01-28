interface IStepsPanel {
  numberOfSteps: number;
}

export class StepsPanel implements IStepsPanel {
  constructor() {
    this.handleChangeSteps;
  }
  public numberOfSteps;
  private selectElement = <HTMLSelectElement>(
    document.getElementById('steps-select')
  );

  public handleChangeSteps = this.selectElement.addEventListener(
    'change',
    e => {
      this.numberOfSteps = this.selectElement.options[
        this.selectElement.selectedIndex
      ].value;
    }
  );
}
