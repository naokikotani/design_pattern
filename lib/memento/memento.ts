export class Memento {
  private money: number;
  private fruits: string[];

  constructor(money: number) {
    this.money = money;
    this.fruits = [];
  }

  getMoney(): number {
    return this.money;
  }

  addFruit(fruit: string): void {
    this.fruits.push(fruit);
  }

  getFruits(): string[] {
    return [...this.fruits];
  }
}
