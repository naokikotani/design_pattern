import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BigString } from '../../lib/flyweight/big-string';
import { BigChar } from '../../lib/flyweight/big-char';
import { BigCharFactory } from '../../lib/flyweight/big-char-factory';

describe('Flyweight Pattern', () => {
  let logSpy;

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  // List 20-15: Main クラス (Main.java)
  // public class Main {
  //     public static void main(String[] args) {
  //         if (args.length == 0) {
  //             System.out.println("Usage: java Main digits");
  //             System.out.println("Example: java Main 1212123");
  //             System.exit(0);
  //         }
  //
  //         BigString bs = new BigString(args[0]);
  //         bs.print();
  //     }
  // }

  describe('BigString', () => {
    it('文字列から生成できる', () => {
      const bs = new BigString('123');
      expect(bs).toBeDefined();
    });

    it('print()で大きな文字を出力できる', () => {
      const bs = new BigString('12');
      bs.print();

      expect(logSpy).toHaveBeenCalled();
    });

    it('同じ文字は同じBigCharインスタンスを共有する', () => {
      const bs = new BigString('121');
      // 1番目と3番目の'1'は同じインスタンスであるべき
      expect(bs.getBigChar(0)).toBe(bs.getBigChar(2));
    });

    it('異なる文字は異なるBigCharインスタンスを持つ', () => {
      const bs = new BigString('12');
      expect(bs.getBigChar(0)).not.toBe(bs.getBigChar(1));
    });
  });

  describe('BigChar', () => {
    it('文字を保持できる', () => {
      const bc = new BigChar('1');
      expect(bc).toBeDefined();
    });

    it('print()で大きな文字を出力できる', () => {
      const bc = new BigChar('1');
      bc.print();

      expect(logSpy).toHaveBeenCalled();
    });
  });

  describe('BigCharFactory（Flyweight工場）', () => {
    it('シングルトンである', () => {
      const factory1 = BigCharFactory.getInstance();
      const factory2 = BigCharFactory.getInstance();
      expect(factory1).toBe(factory2);
    });

    it('同じ文字に対して同じインスタンスを返す', () => {
      const factory = BigCharFactory.getInstance();
      const bc1 = factory.getBigChar('1');
      const bc2 = factory.getBigChar('1');
      expect(bc1).toBe(bc2);
    });

    it('異なる文字に対して異なるインスタンスを返す', () => {
      const factory = BigCharFactory.getInstance();
      const bc1 = factory.getBigChar('1');
      const bc2 = factory.getBigChar('2');
      expect(bc1).not.toBe(bc2);
    });

    it('0-9の数字を取得できる', () => {
      const factory = BigCharFactory.getInstance();
      for (let i = 0; i <= 9; i++) {
        const bc = factory.getBigChar(String(i));
        expect(bc).toBeDefined();
      }
    });
  });

  describe('Flyweightの効果', () => {
    it('長い文字列でもインスタンス数は文字種類分のみ', () => {
      // '1212123' は 1, 2, 3 の3種類のみ
      const bs = new BigString('1212123');

      // 同じ文字は同じインスタンスを共有
      expect(bs.getBigChar(0)).toBe(bs.getBigChar(2)); // 1 === 1
      expect(bs.getBigChar(0)).toBe(bs.getBigChar(4)); // 1 === 1
      expect(bs.getBigChar(1)).toBe(bs.getBigChar(3)); // 2 === 2
      expect(bs.getBigChar(1)).toBe(bs.getBigChar(5)); // 2 === 2
    });
  });
});
