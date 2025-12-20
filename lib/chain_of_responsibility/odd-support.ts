import { Support } from "./support";
import { Trouble } from "./trouble";

export class OddSupport extends Support {
  constructor(name: string) {
    super(name);
  }

  protected resolve(trouble: Trouble): boolean {
    return trouble.getNumber() % 2 === 1;
  }
}
