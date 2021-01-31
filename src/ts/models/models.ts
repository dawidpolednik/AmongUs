export interface IBoard {
  resetData: () => void;
}

export interface IGame {
  numberOfSteps: number;
  startGame: () => void;
  stopGame: () => void;
  resetGame: () => void;
}

export interface IButtonData {
  childElement: Element;
  attribute: number;
}
