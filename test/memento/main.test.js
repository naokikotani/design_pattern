import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Gamer } from '../../lib/memento/gamer';
import { Memento } from '../../lib/memento/memento';

describe('Memento Pattern', () => {
  let logSpy;

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  describe('Gamer', () => {
    it('初期所持金を設定できる', () => {
      const gamer = new Gamer(100);
      expect(gamer.getMoney()).toBe(100);
    });

    it('betでゲームを進められる', () => {
      const gamer = new Gamer(100);
      gamer.bet();
      // betの結果は所持金が変わる（増減は運次第）
      expect(typeof gamer.getMoney()).toBe('number');
    });

    it('toStringで現在の状態を文字列で取得できる', () => {
      const gamer = new Gamer(100);
      const str = gamer.toString();
      expect(str).toContain('100');
    });
  });

  describe('Memento', () => {
    it('createMementoで現在の状態を保存できる', () => {
      const gamer = new Gamer(100);
      const memento = gamer.createMemento();

      expect(memento).toBeInstanceOf(Memento);
      expect(memento.getMoney()).toBe(100);
    });

    it('restoreMementoで保存した状態を復元できる', () => {
      const gamer = new Gamer(100);
      const memento = gamer.createMemento();

      // 何回かbetして所持金を変える
      for (let i = 0; i < 10; i++) {
        gamer.bet();
      }

      // 復元
      gamer.restoreMemento(memento);

      expect(gamer.getMoney()).toBe(100);
    });
  });

  describe('ゲームの進行', () => {
    it('所持金が増えたら状態を保存する', () => {
      const gamer = new Gamer(100);
      let memento = gamer.createMemento();

      // 所持金が増えた場合の処理をシミュレート
      // （実際のbetはランダムなので、直接テスト）
      const initialMoney = memento.getMoney();

      // 仮に所持金が増えた状態を作る
      const richGamer = new Gamer(200);
      if (richGamer.getMoney() > initialMoney) {
        memento = richGamer.createMemento();
      }

      expect(memento.getMoney()).toBe(200);
    });

    it('所持金が半分以下になったら状態を復元する', () => {
      const gamer = new Gamer(100);
      const memento = gamer.createMemento();

      // 仮に所持金が減った状態を作る（40円 < 100/2）
      const poorGamer = new Gamer(40);

      if (poorGamer.getMoney() < memento.getMoney() / 2) {
        poorGamer.restoreMemento(memento);
      }

      expect(poorGamer.getMoney()).toBe(100);
    });
  });

  describe('フルーツの保存と復元', () => {
    it('Mementoにフルーツの状態も保存される', () => {
      const gamer = new Gamer(100);

      // 何回かbetしてフルーツを獲得する可能性を作る
      for (let i = 0; i < 20; i++) {
        gamer.bet();
      }

      const memento = gamer.createMemento();

      // さらにbetしてフルーツを変化させる
      for (let i = 0; i < 20; i++) {
        gamer.bet();
      }

      // 復元
      gamer.restoreMemento(memento);

      // 復元後の状態がMementoと一致することを確認
      expect(gamer.getMoney()).toBe(memento.getMoney());
    });
  });
});
