import { GARDEN_SETTING } from "../configs";
import { formatDateTime } from "../util";
import { Bird } from "./Bird";
import { Flower } from "./Flower";
import { Sun } from "./Sun";

export class Garden {
  public sun: Sun;
  public birds: Bird[];
  public flowers: Flower[];
  private sunInterval?: number;

  public constructor(
    birds: number = GARDEN_SETTING.birds,
    flowers: number = GARDEN_SETTING.flowers
  ) {
    this.sun = new Sun();
    this.birds = this.generateBirds(birds);
    this.flowers = this.generateFlowers(flowers);
  }

  generateFlowers(amount: number): Flower[] {
    const flowers = [];
    for (let index = 0; index < amount; index++) {
      flowers.push(new Flower(this.sun));
    }
    return flowers;
  }

  generateBirds(amount: number): Bird[] {
    const birds = [];
    for (let index = 0; index < amount; index++) {
      birds.push(new Bird(this.sun, this));
    }
    return birds;
  }

  createFlower(): void {
    this.flowers.push(new Flower(this.sun));
  }

  logObjects():void{
    const currentTime = formatDateTime(this.sun.getTime(),'[hh:mm:ss]');
    const msg = `${currentTime}:`;
    console.log(msg);
  }

  start(): void {
    this.sunInterval = setInterval(() => {
      // Simulate one second in realtime equal 1 minutes in garden
      this.sun.setTime(0, 1, 0);
      this.logObjects();
    }, 1000);
  }

  stop(): void {
    clearInterval(this.sunInterval);
  }
}
