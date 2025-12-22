import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { RandomNumberGenerator } from '../../lib/observer/random-number-generator';
import { IncrementalNumberGenerator } from '../../lib/observer/incremental-number-generator';
import { DigitObserver } from '../../lib/observer/digit-observer';
import { GraphObserver } from '../../lib/observer/graph-observer';
import { FrameObserver } from '../../lib/observer/frame-observer';

describe('Observer Pattern', () => {
  let logSpy;

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  describe('NumberGenerator', () => {
    it('Observerを追加できる', () => {
      const generator = new RandomNumberGenerator();
      const observer = new DigitObserver();

      generator.addObserver(observer);

      expect(generator.getObservers()).toContain(observer);
    });

    it('Observerを削除できる', () => {
      const generator = new RandomNumberGenerator();
      const observer = new DigitObserver();

      generator.addObserver(observer);
      generator.deleteObserver(observer);

      expect(generator.getObservers()).not.toContain(observer);
    });

    it('複数のObserverを追加できる', () => {
      const generator = new RandomNumberGenerator();
      const observer1 = new DigitObserver();
      const observer2 = new GraphObserver();

      generator.addObserver(observer1);
      generator.addObserver(observer2);

      expect(generator.getObservers()).toHaveLength(2);
    });
  });

  describe('RandomNumberGenerator', () => {
    it('executeで数値を生成し、Observerに通知する', () => {
      const generator = new RandomNumberGenerator();
      const observer = new DigitObserver();
      generator.addObserver(observer);

      generator.execute();

      expect(logSpy).toHaveBeenCalled();
    });

    it('getNumberで現在の数値を取得できる', () => {
      const generator = new RandomNumberGenerator();
      generator.execute();

      const number = generator.getNumber();

      expect(typeof number).toBe('number');
      expect(number).toBeGreaterThanOrEqual(0);
      expect(number).toBeLessThanOrEqual(50);
    });
  });

  describe('DigitObserver', () => {
    it('数値を「DigitObserver:数値」の形式で出力する', () => {
      const generator = new RandomNumberGenerator();
      const observer = new DigitObserver();
      generator.addObserver(observer);

      generator.execute();

      const calls = logSpy.mock.calls.map(call => call[0]);
      const digitCalls = calls.filter(c => c.startsWith('DigitObserver:'));
      expect(digitCalls.length).toBeGreaterThan(0);
      expect(digitCalls[0]).toMatch(/^DigitObserver:\d+$/);
    });
  });

  describe('GraphObserver', () => {
    it('数値を「GraphObserver:」+アスタリスクの形式で出力する', () => {
      const generator = new RandomNumberGenerator();
      const observer = new GraphObserver();
      generator.addObserver(observer);

      generator.execute();

      const calls = logSpy.mock.calls.map(call => call[0]);
      const graphCalls = calls.filter(c => c.startsWith('GraphObserver:'));
      expect(graphCalls.length).toBeGreaterThan(0);
      expect(graphCalls[0]).toMatch(/^GraphObserver:\*+$/);
    });

    it('数値の数だけアスタリスクが出力される', () => {
      const generator = new RandomNumberGenerator();
      const observer = new GraphObserver();
      generator.addObserver(observer);

      // 1回だけ生成して確認
      generator.execute();

      const number = generator.getNumber();
      const calls = logSpy.mock.calls.map(call => call[0]);
      const lastGraphCall = calls.filter(c => c.startsWith('GraphObserver:')).pop();
      const asterisks = lastGraphCall.replace('GraphObserver:', '');

      expect(asterisks.length).toBe(number);
    });
  });

  describe('複数のObserverへの通知', () => {
    it('DigitObserverとGraphObserverの両方に通知される', () => {
      const generator = new RandomNumberGenerator();
      const observer1 = new DigitObserver();
      const observer2 = new GraphObserver();
      generator.addObserver(observer1);
      generator.addObserver(observer2);

      generator.execute();

      const calls = logSpy.mock.calls.map(call => call[0]);
      const digitCalls = calls.filter(c => c.startsWith('DigitObserver:'));
      const graphCalls = calls.filter(c => c.startsWith('GraphObserver:'));

      expect(digitCalls.length).toBeGreaterThan(0);
      expect(graphCalls.length).toBeGreaterThan(0);
    });

    it('DigitObserverの後にGraphObserverが呼ばれる（追加順）', () => {
      const generator = new RandomNumberGenerator();
      const observer1 = new DigitObserver();
      const observer2 = new GraphObserver();
      generator.addObserver(observer1);
      generator.addObserver(observer2);

      generator.execute();

      const calls = logSpy.mock.calls.map(call => call[0]);
      // 各生成ごとにDigit→Graphの順で出力される
      const firstDigitIndex = calls.findIndex(c => c.startsWith('DigitObserver:'));
      const firstGraphIndex = calls.findIndex(c => c.startsWith('GraphObserver:'));

      expect(firstDigitIndex).toBeLessThan(firstGraphIndex);
    });
  });

  describe('IncrementalNumberGenerator', () => {
    it('開始値から終了値まで増分ごとに数値を生成する', () => {
      const generator = new IncrementalNumberGenerator(10, 50, 5);
      const observer = new DigitObserver();
      generator.addObserver(observer);

      generator.execute();

      const calls = logSpy.mock.calls.map(call => call[0]);
      const digitCalls = calls.filter(c => c.startsWith('DigitObserver:'));
      const numbers = digitCalls.map(c => parseInt(c.replace('DigitObserver:', '')));

      expect(numbers).toEqual([10, 15, 20, 25, 30, 35, 40, 45]);
    });

    it('終了値は含まない', () => {
      const generator = new IncrementalNumberGenerator(0, 10, 2);
      const observer = new DigitObserver();
      generator.addObserver(observer);

      generator.execute();

      const calls = logSpy.mock.calls.map(call => call[0]);
      const digitCalls = calls.filter(c => c.startsWith('DigitObserver:'));
      const numbers = digitCalls.map(c => parseInt(c.replace('DigitObserver:', '')));

      expect(numbers).toEqual([0, 2, 4, 6, 8]);
      expect(numbers).not.toContain(10);
    });

    it('getNumberで現在の数値を取得できる', () => {
      const generator = new IncrementalNumberGenerator(10, 50, 5);
      generator.execute();

      // 最後の数値は45（50未満で最大）
      expect(generator.getNumber()).toBe(45);
    });
  });

  describe('FrameObserver（問題17-2）', () => {
    it('数値を枠で囲んで出力する', () => {
      const generator = new IncrementalNumberGenerator(10, 20, 5);
      const observer = new FrameObserver();
      generator.addObserver(observer);

      generator.execute();

      const calls = logSpy.mock.calls.map(call => call[0]);
      expect(calls).toContain('+------+');
      expect(calls).toContain('|  10  |');
      expect(calls).toContain('|  15  |');
    });
  });
});
