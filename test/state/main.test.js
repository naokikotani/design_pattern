import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SafeFrame } from '../../lib/state/safe-frame';
import { DayState } from '../../lib/state/day-state';
import { NightState } from '../../lib/state/night-state';
import { LunchState } from '../../lib/state/lunch-state';
import { EmergencyState } from '../../lib/state/emergency-state';

describe('State Pattern', () => {
  let logSpy;

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  describe('SafeFrame', () => {
    it('時刻を設定できる', () => {
      const frame = new SafeFrame('Test');
      frame.setClock(10);

      const calls = logSpy.mock.calls.map(c => c[0]);
      expect(calls.some(c => c.includes('現在時刻は10:00'))).toBe(true);
    });

    it('初期状態はDayState', () => {
      const frame = new SafeFrame('Test');
      expect(frame.getState()).toBe(DayState.getInstance());
    });

    // 問題19-2: 時刻範囲の変更
    // 昼間: 8:00〜20:59（12:00〜12:59は昼食時）
    // 夜間: 21:00〜7:59
    it('昼間（8時〜20時、昼食時除く）はDayStateになる', () => {
      const frame = new SafeFrame('Test');

      frame.setClock(8);
      expect(frame.getState()).toBe(DayState.getInstance());

      frame.setClock(11);
      expect(frame.getState()).toBe(DayState.getInstance());

      frame.setClock(13);
      expect(frame.getState()).toBe(DayState.getInstance());

      frame.setClock(20);
      expect(frame.getState()).toBe(DayState.getInstance());
    });

    it('夜間（21時〜7時）はNightStateになる', () => {
      const frame = new SafeFrame('Test');

      frame.setClock(21);
      expect(frame.getState()).toBe(NightState.getInstance());

      frame.setClock(23);
      expect(frame.getState()).toBe(NightState.getInstance());

      frame.setClock(0);
      expect(frame.getState()).toBe(NightState.getInstance());

      frame.setClock(7);
      expect(frame.getState()).toBe(NightState.getInstance());
    });

    it('changeStateで状態を変更できる', () => {
      const frame = new SafeFrame('Test');

      frame.changeState(NightState.getInstance());
      expect(frame.getState()).toBe(NightState.getInstance());

      frame.changeState(DayState.getInstance());
      expect(frame.getState()).toBe(DayState.getInstance());
    });

    it('changeState時に状態変化のログが出る', () => {
      const frame = new SafeFrame('Test');
      frame.changeState(NightState.getInstance());

      const calls = logSpy.mock.calls.map(c => c[0]);
      expect(calls.some(c => c.includes('状態が変化しました'))).toBe(true);
    });
  });

  describe('Context インターフェース', () => {
    it('callSecurityCenterで警備センターを呼べる', () => {
      const frame = new SafeFrame('Test');
      frame.callSecurityCenter('テスト通報');

      expect(frame.getScreen()).toContain('call! テスト通報');
    });

    it('recordLogで記録できる', () => {
      const frame = new SafeFrame('Test');
      frame.recordLog('テスト記録');

      expect(frame.getScreen()).toContain('record ... テスト記録');
    });
  });

  describe('DayState（昼間の状態）', () => {
    it('金庫使用時は記録される', () => {
      const frame = new SafeFrame('Test');
      frame.setClock(10);  // 昼間

      frame.actionUse();

      expect(frame.getScreen()).toContain('金庫使用');
    });

    it('非常ベル使用時は通報される', () => {
      const frame = new SafeFrame('Test');
      frame.setClock(10);  // 昼間

      frame.actionAlarm();

      expect(frame.getScreen()).toContain('非常ベル');
    });

    it('通常通話は警備センターを呼ぶ', () => {
      const frame = new SafeFrame('Test');
      frame.setClock(10);  // 昼間

      frame.actionPhone();

      expect(frame.getScreen()).toContain('call!');
    });
  });

  describe('NightState（夜間の状態）', () => {
    it('金庫使用時は非常通報される', () => {
      const frame = new SafeFrame('Test');
      frame.setClock(23);  // 夜間

      frame.actionUse();

      expect(frame.getScreen()).toContain('非常');
    });

    it('非常ベル使用時は通報される', () => {
      const frame = new SafeFrame('Test');
      frame.setClock(23);  // 夜間

      frame.actionAlarm();

      expect(frame.getScreen()).toContain('非常ベル');
    });

    it('通常通話は留守番電話に記録', () => {
      const frame = new SafeFrame('Test');
      frame.setClock(23);  // 夜間

      frame.actionPhone();

      expect(frame.getScreen()).toContain('留守番電話');
    });
  });

  describe('状態の変化', () => {
    // 問題19-2: 変更後の時刻範囲
    it('昼から夜への状態変化（20時→21時）', () => {
      const frame = new SafeFrame('Test');

      frame.setClock(20);
      expect(frame.getState()).toBe(DayState.getInstance());

      frame.setClock(21);
      expect(frame.getState()).toBe(NightState.getInstance());
    });

    it('夜から昼への状態変化（7時→8時）', () => {
      const frame = new SafeFrame('Test');

      frame.setClock(7);
      expect(frame.getState()).toBe(NightState.getInstance());

      frame.setClock(8);
      expect(frame.getState()).toBe(DayState.getInstance());
    });

    it('状態変化時にログが出力される', () => {
      const frame = new SafeFrame('Test');
      frame.setClock(21);  // 昼→夜

      const calls = logSpy.mock.calls.map(c => c[0]);
      expect(calls.some(c => c.includes('DayState') && c.includes('NightState'))).toBe(true);
    });
  });

  describe('Singleton', () => {
    it('DayStateはシングルトン', () => {
      const state1 = DayState.getInstance();
      const state2 = DayState.getInstance();
      expect(state1).toBe(state2);
    });

    it('NightStateはシングルトン', () => {
      const state1 = NightState.getInstance();
      const state2 = NightState.getInstance();
      expect(state1).toBe(state2);
    });

    it('LunchStateはシングルトン', () => {
      const state1 = LunchState.getInstance();
      const state2 = LunchState.getInstance();
      expect(state1).toBe(state2);
    });

    it('EmergencyStateはシングルトン', () => {
      const state1 = EmergencyState.getInstance();
      const state2 = EmergencyState.getInstance();
      expect(state1).toBe(state2);
    });
  });

  // 問題19-3: LunchState（昼食時）
  describe('LunchState（昼食時 12:00〜12:59）', () => {
    it('12時はLunchStateになる', () => {
      const frame = new SafeFrame('Test');
      frame.setClock(12);
      expect(frame.getState()).toBe(LunchState.getInstance());
    });

    it('金庫使用時は非常通報される', () => {
      const frame = new SafeFrame('Test');
      frame.setClock(12);

      frame.actionUse();

      expect(frame.getScreen()).toContain('非常');
    });

    it('非常ベル使用時は通報される', () => {
      const frame = new SafeFrame('Test');
      frame.setClock(12);

      frame.actionAlarm();

      expect(frame.getScreen()).toContain('非常ベル');
    });

    it('通常通話は留守番電話', () => {
      const frame = new SafeFrame('Test');
      frame.setClock(12);

      frame.actionPhone();

      expect(frame.getScreen()).toContain('留守番電話');
    });

    it('13時になるとDayStateに戻る', () => {
      const frame = new SafeFrame('Test');
      frame.setClock(12);
      expect(frame.getState()).toBe(LunchState.getInstance());

      frame.setClock(13);
      expect(frame.getState()).toBe(DayState.getInstance());
    });
  });

  // 問題19-4: EmergencyState（非常時）
  describe('EmergencyState（非常時）', () => {
    it('非常ベルを押すとEmergencyStateになる', () => {
      const frame = new SafeFrame('Test');
      frame.setClock(10);  // 昼間

      frame.actionAlarm();

      expect(frame.getState()).toBe(EmergencyState.getInstance());
    });

    it('夜間でも非常ベルでEmergencyStateになる', () => {
      const frame = new SafeFrame('Test');
      frame.setClock(23);  // 夜間

      frame.actionAlarm();

      expect(frame.getState()).toBe(EmergencyState.getInstance());
    });

    it('金庫使用時は非常通報される（時刻によらず）', () => {
      const frame = new SafeFrame('Test');
      frame.changeState(EmergencyState.getInstance());

      frame.actionUse();

      expect(frame.getScreen()).toContain('非常');
    });

    it('非常ベル使用時は通報される（時刻によらず）', () => {
      const frame = new SafeFrame('Test');
      frame.changeState(EmergencyState.getInstance());

      frame.actionAlarm();

      expect(frame.getScreen()).toContain('非常ベル');
    });

    it('通常通話は警備センターを呼ぶ（時刻によらず）', () => {
      const frame = new SafeFrame('Test');
      frame.changeState(EmergencyState.getInstance());

      frame.actionPhone();

      expect(frame.getScreen()).toContain('call!');
    });

    it('非常時は時刻が変わっても状態が変わらない', () => {
      const frame = new SafeFrame('Test');
      frame.changeState(EmergencyState.getInstance());

      frame.setClock(10);  // 昼間の時刻
      expect(frame.getState()).toBe(EmergencyState.getInstance());

      frame.setClock(23);  // 夜間の時刻
      expect(frame.getState()).toBe(EmergencyState.getInstance());
    });
  });
});
