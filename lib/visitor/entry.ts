import type { Element } from "./element";
import type { Visitor } from "./visitor";

export abstract class Entry implements Element {
  abstract getName(): string;
  abstract getSize(): number;

  abstract accept(v: Visitor): void;

  toString(): string {
    return `${this.getName()} (${this.getSize()})`;
  }
}
