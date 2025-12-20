import { Colleague } from "./colleague";
import { Mediator } from "./mediator";

export class ColleagueCheckbox implements Colleague {
  private mediator: Mediator | null = null;
  private enabled: boolean = true;
  private state: boolean;

  constructor(
    private caption: string,
    private group: ColleagueCheckbox[] | null,
    state: boolean
  ) {
    this.state = state;
    if (group) {
      group.push(this);
    }
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

  getState(): boolean {
    return this.state;
  }

  setState(state: boolean): void {
    this.state = state;
    // ラジオボタンのようにグループ内で1つだけ選択状態にする
    if (state && this.group) {
      for (const checkbox of this.group) {
        if (checkbox !== this) {
          checkbox.state = false;
        }
      }
    }
    if (this.mediator) {
      this.mediator.colleagueChanged();
    }
  }

  getCaption(): string {
    return this.caption;
  }
}
