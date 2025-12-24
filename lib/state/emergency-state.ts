import { Context } from "./context";
import { State } from "./state";

export class EmergencyState implements State {
  private static singleton: EmergencyState = new EmergencyState();

  private constructor() {}

  static getInstance(): EmergencyState {
    return EmergencyState.singleton;
  }

  // 問題19-4: 非常時は時刻が変わっても状態は変わらない
  // 【問題点】一度非常状態に入ると、二度と通常状態に戻れない
  // 実際のシステムでは、警備員による手動解除や時間経過による自動解除などの
  // 復旧手段が必要になる
  doClock(context: Context, hour: number): void {
    // 何もしない（状態遷移しない）
  }

  // 非常時に金庫使用 → 非常通報
  doUse(context: Context): void {
    context.callSecurityCenter("非常:非常時の金庫使用!");
  }

  // 非常ベル → 通報
  doAlarm(context: Context): void {
    context.callSecurityCenter("非常ベル(非常時)");
  }

  // 非常時の通話 → 警備センターを呼ぶ
  doPhone(context: Context): void {
    context.callSecurityCenter("非常時の通話");
  }

  toString(): string {
    return "[EmergencyState]";
  }
}
