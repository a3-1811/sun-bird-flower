import { getInitialDatetime } from "../util";
import { Observer, Subject } from "./common";

export class Sun implements Subject {
  private observers: Observer[];
  private time: Date;

  public constructor() {
    this.time = getInitialDatetime();
    this.observers = [];
  }

  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    const index = this.observers?.findIndex(
      (item) => item?.id === observer?.id
    );
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers(): void {
    this.observers.forEach((observer: Observer) => {
      observer.update(this);
    });
  }

  getTime(): Date {
    return this.time;
  }

  setTime(hours = 0, minutes = 0, seconds = 0): void {
    const newDate = this.time;
    newDate.setSeconds(newDate.getSeconds() + seconds);
    newDate.setMinutes(newDate.getMinutes() + minutes);
    newDate.setHours(newDate.getHours() + hours);
    this.notifyObservers();
  }
}
