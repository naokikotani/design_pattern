import { Colleague } from "./colleague";
import { Mediator } from "./mediator";

export class ColleagueTextField implements Colleague {
  private mediator: Mediator | null = null;
  private enabled: boolean = true;
  private text: string;

  constructor(text: string, private columns: number) {
    this.text = text;
  }

  setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }

  setColleagueEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  getText(): string {
    return this.text;
  }

  setText(text: string): void {
    this.text = text;
    if (this.mediator) {
      this.mediator.colleagueChanged();
    }
  }
}
