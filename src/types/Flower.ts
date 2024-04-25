import { v4 as uuidV4 } from "uuid";
import { FLOWER_HOURS } from "../configs";
import { checkTimeInRange, getRandomEnumValue, getRandomIntInclusive, modifyDatetime } from "../util";
import { Bird } from "./Bird";
import { FlowerColors, Observer } from "./common";
import { Sun } from "./Sun";

export class Flower implements Observer {
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
    if (!checkTimeInRange(sunTime, this.bloomingTime, this.wiltTime)) {
      this.reset(subject);
    } else {
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
    const index = this.birdSuckedNectar?.indexOf(bird.id);
    if (index === -1) {
      this.birdSuckedNectar.push(bird.id);
    }
  }
}