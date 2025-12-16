import { Support } from "./support";
import { Trouble } from "./trouble";

export class LimitSupport extends Support {
  private limit: number;

  constructor(name: string, limit: number) {
    super(name);
    this.limit = limit;
  }

  protected resolve(trouble: Trouble): boolean {
    return trouble.getNumber() < this.limit;
  }
}
