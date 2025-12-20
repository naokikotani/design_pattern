import { Trouble } from "./trouble";

export abstract class Support {
  private name: string;
  private next: Support | null;

  constructor(name: string) {
    this.name = name;
    this.next = null;
  }

  setNext(next: Support): Support {
    this.next = next;
    return next;
  }

  support(trouble: Trouble): void {
    if (this.resolve(trouble)) {
      this.done(trouble);
    } else if (this.next != null) {
      this.next.support(trouble);
    } else {
      this.fail(trouble);
    }
  }

  toString(): string {
    return "[" + this.name + "]";
  }

  protected abstract resolve(trouble: Trouble): boolean;

  protected done(trouble: Trouble): void {
    console.log(trouble + " is resolved by " + this + ".");
  }

  protected fail(trouble: Trouble): void {
    console.log(trouble + " cannot be resolved.");
  }
}
