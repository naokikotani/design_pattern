import { Context } from "./context";
import { State } from "./state";
import { DayState } from "./day-state";

export class SafeFrame implements Context {
  private textClock: string = "";
  private textScreen: string = "";
  private state: State = DayState.getInstance();

  constructor(private title: string) {}

  // 時刻の設定
  setClock(hour: number): void {
    const clockstring = `現在時刻は${hour.toString().padStart(2, "0")}:00`;
    console.log(clockstring);
    this.textClock = clockstring;
    this.state.doClock(this, hour);
  }

  // 状態変化
  changeState(state: State): void {
    console.log(`${this.state}から${state}へ状態が変化しました。`);
    this.state = state;
  }

  // 警備センター警備員呼び出し
  callSecurityCenter(msg: string): void {
    this.textScreen += "call! " + msg + "\n";
  }

  // 警備センター記録
  recordLog(msg: string): void {
    this.textScreen += "record ... " + msg + "\n";
  }

  // 金庫使用ボタン
  actionUse(): void {
    this.state.doUse(this);
  }

  // 非常ベルボタン
  actionAlarm(): void {
    this.state.doAlarm(this);
  }

  // 通常通話ボタン
  actionPhone(): void {
    this.state.doPhone(this);
  }

  // テスト用: 現在の状態を取得
  getState(): State {
    return this.state;
  }

  // テスト用: 画面出力を取得
  getScreen(): string {
    return this.textScreen;
  }
}
