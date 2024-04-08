import { v4 as uuidV4 } from "uuid";
import { BIRD_HOURS } from "../configs";
import { modifyDatetime } from "../util";
import { FlowerColors, Observer } from "./common";
import { Flower } from "./Flower";
import { Garden } from "./Garden";
import { Sun } from "./Sun";

export class Bird implements Observer {
  public id: string;
  public wakeTime: Date;
  public sleepTime: Date;
  public isWake: boolean;
  public isSleep: boolean;
  public flowerColorsSucked: FlowerColors[];
  public garden: Garden;

  public constructor(subject: Sun, garden: Garden) {
    this.garden = garden;
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
  // Interactions
  suckHoney(flower: Flower): void {
    flower.addBirdSuckedNectar(this);
    this.flowerColorsSucked.push(flower.color);
    this.checkCreateNewFlower();
  }

  checkCreateNewFlower(): void {
    if (this.flowerColorsSucked?.length <= 1) {
      return;
    }

    const lastColor =
      this.flowerColorsSucked[this.flowerColorsSucked?.length - 1];
    const nextLastColor =
      this.flowerColorsSucked[this.flowerColorsSucked?.length - 2];

    if (lastColor === nextLastColor) {
      this.garden.createFlower();
      this.flowerColorsSucked = [];
    }
  }
}