import { Context } from "./context";
import { State } from "./state";
import { DayState } from "./day-state";
import { EmergencyState } from "./emergency-state";

export class NightState implements State {
  private static singleton: NightState = new NightState();

  private constructor() {}

  static getInstance(): NightState {
    return NightState.singleton;
  }

  // 問題19-2: 夜間 21:00〜7:59
  doClock(context: Context, hour: number): void {
    if (8 <= hour && hour < 21) {
      context.changeState(DayState.getInstance());
    }
  }

  doUse(context: Context): void {
    context.callSecurityCenter("非常:夜間の金庫使用!");
  }

  // 問題19-4: 非常ベルでEmergencyStateに遷移
  doAlarm(context: Context): void {
    context.callSecurityCenter("非常ベル(夜間)");
    context.changeState(EmergencyState.getInstance());
  }

  doPhone(context: Context): void {
    context.recordLog("夜間の通話録音(留守番電話)");
  }

  toString(): string {
    return "[NightState]";
  }
}
