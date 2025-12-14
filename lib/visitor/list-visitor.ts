import { Visitor } from "./visitor";
import { File } from "./file";
import { Directory } from "./directory";

export class ListVisitor implements Visitor {
  private currentdir: string = "";

  visitFile(file: File): void {
    console.log(`${this.currentdir}/${file.toString()}`);
  }

  visitDirectory(directory: Directory): void {
    console.log(`${this.currentdir}/${directory.toString()}`);

    const savedir = this.currentdir;
    this.currentdir = `${this.currentdir}/${directory.getName()}`;

    for (const entry of directory) {
      entry.accept(this);
    }

    this.currentdir = savedir;
  }
}
