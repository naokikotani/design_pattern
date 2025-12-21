import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { RandomNumberGenerator } from '../../lib/observer/random-number-generator';
import { DigitObserver } from '../../lib/observer/digit-observer';
import { GraphObserver } from '../../lib/observer/graph-observer';

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
});
