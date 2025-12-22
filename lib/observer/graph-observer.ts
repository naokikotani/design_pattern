import { NumberGenerator } from "./number-generator";
import { Observer } from "./observer";

export class GraphObserver implements Observer {
  update(generator: NumberGenerator): void {
    const count = generator.getNumber();
    console.log("GraphObserver:" + "*".repeat(count));
  }
}
