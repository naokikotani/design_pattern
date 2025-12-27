import { NumberGenerator } from "./number-generator";
import { Observer } from "./observer";

export class FrameObserver implements Observer {
  update(generator: NumberGenerator): void {
    const number = generator.getNumber();
    const numStr = number.toString().padStart(4, ' ');
    console.log('+------+');
    console.log('|' + numStr + '  |');
    console.log('+------+');
  }
}
