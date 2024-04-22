import { GARDEN_SETTING } from "../configs";
import { formatDateTime, getRandomIntInclusive } from "../util";
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
      const instance = new Flower(this.sun);
      flowers.push(instance);
      this.sun.addObserver(instance);
    }
    return flowers;
  }

  generateBirds(amount: number): Bird[] {
    const birds = [];
    for (let index = 0; index < amount; index++) {
      const instance = new Bird(this.sun, this); 
      birds.push(instance);
      this.sun.addObserver(instance);
    }
    return birds;
  }

  createFlower(): void {
    const instance = new Flower(this.sun);
    this.flowers.push(instance);
    this.sun.addObserver(instance);
  }

  getRandomBloomingFlower(bird:Bird): Flower | null{
    const listFlowers = this.flowers.filter((flower) => flower.birdSuckedNectar.indexOf(bird.id) === -1 && flower.isBlooming);
    const randomIndex = getRandomIntInclusive(0,listFlowers?.length -1);
    return listFlowers ? listFlowers[randomIndex] : null;
  }

  logObjects():void{
    const currentTime = formatDateTime(this.sun.getTime(),'[hh:mm:ss]');
    
    const sleptBirds = this.birds.filter(bird=>bird.isSleep)?.length;
    const wakedBirds = this.birds.filter((bird) => bird.isWake)?.length;

    const bloomingFlowers = this.flowers.filter((flower) => flower.isBlooming)?.length;
    const wiltFlowers = this.flowers.filter((flower) => flower.isWilt)?.length;
    
    const msg = `${currentTime}: 
    Bird(sleep: ${sleptBirds}, wake: ${wakedBirds})
    Flower(blooming: ${bloomingFlowers}, wilt: ${wiltFlowers})`;

    console.log(msg);
  }

  start(): void {
    this.sunInterval = setInterval(() => {
      // Simulate one second in realtime equal 20 minutes in garden
      this.sun.setTime(0, 10, 0);
      this.logObjects();
    }, 1000);
  }

  stop(): void {
    clearInterval(this.sunInterval);
  }
}
