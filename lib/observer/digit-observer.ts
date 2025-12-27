import { NumberGenerator } from "./number-generator";
import { Observer } from "./observer";

export class DigitObserver implements Observer {
  update(generator: NumberGenerator): void {
    console.log("DigitObserver:" + generator.getNumber());
  }
}
