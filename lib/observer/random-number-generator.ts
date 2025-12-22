import { NumberGenerator } from "./number-generator";

export class RandomNumberGenerator extends NumberGenerator {
  private number: number = 0;

  getNumber(): number {
    return this.number;
  }

  execute(): void {
    for (let i = 0; i < 20; i++) {
      this.number = Math.floor(Math.random() * 50);
      this.notifyObservers();
    }
  }
}
