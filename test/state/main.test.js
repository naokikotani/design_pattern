import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SafeFrame } from '../../lib/state/safe-frame';
import { DayState } from '../../lib/state/day-state';
import { NightState } from '../../lib/state/night-state';

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

    it('昼間（9時〜16時）はDayStateになる', () => {
      const frame = new SafeFrame('Test');

      frame.setClock(9);
      expect(frame.getState()).toBe(DayState.getInstance());

      frame.setClock(12);
      expect(frame.getState()).toBe(DayState.getInstance());

      frame.setClock(16);
      expect(frame.getState()).toBe(DayState.getInstance());
    });

    it('夜間（17時〜8時）はNightStateになる', () => {
      const frame = new SafeFrame('Test');

      frame.setClock(17);
      expect(frame.getState()).toBe(NightState.getInstance());

      frame.setClock(23);
      expect(frame.getState()).toBe(NightState.getInstance());

      frame.setClock(0);
      expect(frame.getState()).toBe(NightState.getInstance());

      frame.setClock(8);
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
    it('昼から夜への状態変化', () => {
      const frame = new SafeFrame('Test');

      frame.setClock(16);
      expect(frame.getState()).toBe(DayState.getInstance());

      frame.setClock(17);
      expect(frame.getState()).toBe(NightState.getInstance());
    });

    it('夜から昼への状態変化', () => {
      const frame = new SafeFrame('Test');

      frame.setClock(8);
      expect(frame.getState()).toBe(NightState.getInstance());

      frame.setClock(9);
      expect(frame.getState()).toBe(DayState.getInstance());
    });

    it('状態変化時にログが出力される', () => {
      const frame = new SafeFrame('Test');
      frame.setClock(17);  // 昼→夜

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
  });
});
