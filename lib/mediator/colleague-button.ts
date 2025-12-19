import { Colleague } from "./colleague";
import { Mediator } from "./mediator";

export class ColleagueButton implements Colleague {
  private mediator: Mediator | null = null;
  private enabled: boolean = true;

  constructor(private caption: string) {}

  setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }

  setColleagueEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  getCaption(): string {
    return this.caption;
  }
}
