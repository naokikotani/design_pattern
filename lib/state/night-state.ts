import { Context } from "./context";
import { State } from "./state";
import { DayState } from "./day-state";

export class NightState implements State {
  private static singleton: NightState = new NightState();

  private constructor() {}

  static getInstance(): NightState {
    return NightState.singleton;
  }

  doClock(context: Context, hour: number): void {
    if (9 <= hour && hour < 17) {
      context.changeState(DayState.getInstance());
    }
  }

  doUse(context: Context): void {
    context.callSecurityCenter("非常:夜間の金庫使用!");
  }

  doAlarm(context: Context): void {
    context.callSecurityCenter("非常ベル(夜間)");
  }

  doPhone(context: Context): void {
    context.recordLog("夜間の通話録音(留守番電話)");
  }

  toString(): string {
    return "[NightState]";
  }
}
