interface IPannel {
  position: position;
}

type position = number | string;

export class Pannel implements IPannel {
  public position = 5;
}
