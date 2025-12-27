import { Memento } from "./memento";

export class Gamer {
  private money: number;
  private fruits: string[] = [];
  private static fruitsName: string[] = [
    "リンゴ", "ぶどう", "バナナ", "みかん",
  ];

  constructor(money: number) {
    this.money = money;
  }

  getMoney(): number {
    return this.money;
  }

  bet(): void {
    const dice = Math.floor(Math.random() * 6) + 1;
    if (dice === 1) {
      this.money += 100;
      console.log("所持金が増えました。");
    } else if (dice === 2) {
      this.money = Math.floor(this.money / 2);
      console.log("所持金が半分になりました。");
    } else if (dice === 6) {
      const f = this.getFruit();
      console.log("フルーツ(" + f + ")をもらいました。");
      this.fruits.push(f);
    } else {
      console.log("何も起こりませんでした。");
    }
  }

  createMemento(): Memento {
    const m = new Memento(this.money);
    for (const f of this.fruits) {
      if (f.startsWith("おいしい")) {
        m.addFruit(f);
      }
    }
    return m;
  }

  restoreMemento(memento: Memento): void {
    this.money = memento.getMoney();
    this.fruits = memento.getFruits();
  }

  toString(): string {
    return "[money = " + this.money + ", fruits = " + this.fruits + "]";
  }

  private getFruit(): string {
    const f = Gamer.fruitsName[Math.floor(Math.random() * Gamer.fruitsName.length)];
    if (Math.random() < 0.5) {
      return "おいしい" + f;
    } else {
      return f;
    }
  }
}
