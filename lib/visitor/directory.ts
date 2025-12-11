import { Entry } from "./entry";
import { Visitor } from "./visitor";

export class Directory extends Entry implements Iterable<Entry> {
  private directory: Entry[] = [];

  constructor(private name: string) {
    super();
  }

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.directory.reduce((sum, e) => sum + e.getSize(), 0);
  }

  add(entry: Entry): Directory {
    this.directory.push(entry);
    return this;
  }

  [Symbol.iterator](): Iterator<Entry> {
    return this.directory[Symbol.iterator]();
  }

  accept(v: Visitor): void {
    v.visitDirectory(this);
  }
}
