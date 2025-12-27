import { Context } from "./context";
import { State } from "./state";
import { DayState } from "./day-state";
import { EmergencyState } from "./emergency-state";

export class LunchState implements State {
  private static singleton: LunchState = new LunchState();

  private constructor() {}

  static getInstance(): LunchState {
    return LunchState.singleton;
  }

  // 問題19-3: 昼食時 12:00〜12:59
  doClock(context: Context, hour: number): void {
    if (hour !== 12) {
      context.changeState(DayState.getInstance());
    }
  }

  // 昼食時に金庫使用 → 非常通報
  doUse(context: Context): void {
    context.callSecurityCenter("非常:昼食時の金庫使用!");
  }

  // 非常ベル → 通報 + 非常状態へ
  doAlarm(context: Context): void {
    context.callSecurityCenter("非常ベル(昼食時)");
    context.changeState(EmergencyState.getInstance());
  }

  // 昼食時の通話 → 留守番電話
  doPhone(context: Context): void {
    context.recordLog("昼食時の通話録音(留守番電話)");
  }

  toString(): string {
    return "[LunchState]";
  }
}
