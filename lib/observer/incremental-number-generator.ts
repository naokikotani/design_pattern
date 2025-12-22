import { NumberGenerator } from "./number-generator";

export class IncrementalNumberGenerator extends NumberGenerator {
  private number: number = 0;

  constructor(
    private start: number,
    private end: number,
    private step: number
  ) {
    super();
  }

  getNumber(): number {
    return this.number;
  }

  execute(): void {
    for (let i = this.start; i < this.end; i += this.step) {
      this.number = i;
      this.notifyObservers();
    }
  }
}
