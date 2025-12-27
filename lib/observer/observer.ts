import { NumberGenerator } from "./number-generator";

export interface Observer {
  update(generator: NumberGenerator): void;
}
