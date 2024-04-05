import { getInitialDatetime, getRandomEnumValue, getRandomIntInclusive, modifyDatetime } from "./util";
import { v4 as uuidV4 } from "uuid";
import { FlowerColors } from "./types/common";
import { BIRD_HOURS, FLOWER_HOURS } from "./configs";

interface Observer {
  id: string;
  update(subject: Subject): void;
}

interface Subject {
  addObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObservers(): void;
}

class Sun implements Subject {
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

class Bird implements Observer {
  id: string;
  public wakeTime: Date;
  public sleepTime: Date;
  public isWake: boolean;
  public isSleep: boolean;
  public flowerColorsSucked: FlowerColors[];

  public constructor(subject: Sun) {
    this.id = uuidV4();
    this.isWake = false;
    this.isSleep = true;
    this.flowerColorsSucked = [];

    const { SLEEP_HOUR, WAKE_HOUR } = BIRD_HOURS;

    this.wakeTime = modifyDatetime(subject.getTime(), WAKE_HOUR, 0);
    this.sleepTime = modifyDatetime(subject.getTime(), SLEEP_HOUR, 0);
  }

  // COMMON
  update(subject: Sun): void {
    const sunTime = subject.getTime();
    if (sunTime < this.wakeTime && sunTime >= this.sleepTime) {
      this.reset();
    } else if (sunTime >= this.wakeTime && sunTime < this.sleepTime) {
      this.isWake = true;
      this.isSleep = false;
    }
  }

  reset(): void {
    this.isSleep = true;
    this.isWake = false;
    this.flowerColorsSucked = [];
  }
}


class Follower implements Observer {
  id: string;
  public color: FlowerColors;
  public bloomingTime: Date;
  public wiltTime: Date;
  public isWilt: boolean;
  public isBlooming: boolean;
  public birdSuckedNectar: string[];

  public constructor(subject: Sun) {
    this.id = uuidV4();
    this.color = getRandomEnumValue(FlowerColors);
    this.isWilt = true;
    this.isBlooming = false;
    this.birdSuckedNectar = [];
    this.bloomingTime = new Date();
    this.wiltTime = new Date();
    this.randomBloomingAndWiltTime(subject.getTime());
  }

  // COMMON
  update(subject: Sun): void {
    const sunTime = subject.getTime();
    if (sunTime < this.bloomingTime && sunTime >= this.wiltTime) {
      this.reset(subject);
    } else if (sunTime >= this.bloomingTime && sunTime < this.wiltTime) {
      this.isBlooming = true;
      this.isWilt = false;
    }
  }

  reset(subject: Sun): void {
    this.isWilt = true;
    this.isBlooming = false;
    this.birdSuckedNectar = [];
    // Renew bloomingTime and wiltTime
    this.randomBloomingAndWiltTime(subject.getTime());
  }

  randomBloomingAndWiltTime(date: Date): void {
    const { BLOOMING_HOUR, WILT_HOUR } = FLOWER_HOURS;

    // Random blooming hour
    const bloomingHour = getRandomIntInclusive(
      BLOOMING_HOUR.from,
      BLOOMING_HOUR.to
    );
    const bloomingMinutes = getRandomIntInclusive(0, 59);
    this.bloomingTime = modifyDatetime(date, bloomingHour, bloomingMinutes);

    // Random wilt hour
    const wiltHour = getRandomIntInclusive(WILT_HOUR.from, WILT_HOUR.to);
    const wiltMinutes = getRandomIntInclusive(0, 59);
    this.wiltTime = modifyDatetime(date, wiltHour, wiltMinutes);
  }

  // INTERACTIONS
  addBirdSuckedNectar(bird: Bird): void {
    this.birdSuckedNectar.push(bird.id);
  }
}