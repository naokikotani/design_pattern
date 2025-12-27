import { Context } from "./context";
import { State } from "./state";
import { NightState } from "./night-state";
import { LunchState } from "./lunch-state";
import { EmergencyState } from "./emergency-state";

export class DayState implements State {
  private static singleton: DayState = new DayState();

  private constructor() {}

  static getInstance(): DayState {
    return DayState.singleton;
  }

  // 問題19-2: 昼間 8:00〜20:59（12:00〜12:59は昼食時）
  doClock(context: Context, hour: number): void {
    if (hour === 12) {
      context.changeState(LunchState.getInstance());
    } else if (hour < 8 || 21 <= hour) {
      context.changeState(NightState.getInstance());
    }
  }

  doUse(context: Context): void {
    context.recordLog("金庫使用(昼間)");
  }

  // 問題19-4: 非常ベルでEmergencyStateに遷移
  doAlarm(context: Context): void {
    context.callSecurityCenter("非常ベル(昼間)");
    context.changeState(EmergencyState.getInstance());
  }

  doPhone(context: Context): void {
    context.callSecurityCenter("通常の通話(昼間)");
  }

  toString(): string {
    return "[DayState]";
  }
}
