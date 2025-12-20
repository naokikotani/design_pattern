import { Support } from "./support";
import { Trouble } from "./trouble";

export class SpecialSupport extends Support {
  private number: number;

  constructor(name: string, number: number) {
    super(name);
    this.number = number;
  }

  protected resolve(trouble: Trouble): boolean {
    return trouble.getNumber() === this.number;
  }
}
