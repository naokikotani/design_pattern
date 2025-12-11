import type { File } from "./file";
import type { Directory } from "./directory";

export interface Visitor {
  visitFile(file: File): void;
  visitDirectory(directory: Directory): void;
}
