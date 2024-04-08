export enum FlowerColors {
  RED='RED',
  BLUE='BLUE',
  GREEN='GREEN'
}

export interface Observer {
  id: string;
  update(subject: Subject): void;
}

export interface Subject {
  addObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObservers(): void;
}