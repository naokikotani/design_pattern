import { Observer } from "./observer";

export abstract class NumberGenerator {
  private observers: Observer[] = [];

  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  deleteObserver(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  getObservers(): Observer[] {
    return this.observers;
  }

  notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  abstract getNumber(): number;

  abstract execute(): void;
}
