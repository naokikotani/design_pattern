import { Context } from "./context";
import { State } from "./state";
import { NightState } from "./night-state";

export class DayState implements State {
  private static singleton: DayState = new DayState();

  private constructor() {}

  static getInstance(): DayState {
    return DayState.singleton;
  }

  doClock(context: Context, hour: number): void {
    if (hour < 9 || 17 <= hour) {
      context.changeState(NightState.getInstance());
    }
  }

  doUse(context: Context): void {
    context.recordLog("金庫使用(昼間)");
  }

  doAlarm(context: Context): void {
    context.callSecurityCenter("非常ベル(昼間)");
  }

  doPhone(context: Context): void {
    context.callSecurityCenter("通常の通話(昼間)");
  }

  toString(): string {
    return "[DayState]";
  }
}
