import { Support } from "./support";
import { Trouble } from "./trouble";

export class NoSupport extends Support {
  constructor(name: string) {
    super(name);
  }

  protected resolve(trouble: Trouble): boolean {
    return false;
  }
}
