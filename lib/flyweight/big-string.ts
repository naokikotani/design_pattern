// List 20-14: BigString クラス (BigString.java)

import { BigChar } from "./big-char";
import { BigCharFactory } from "./big-char-factory";

export class BigString {
  // 「大きな文字」の配列
  private bigchars: BigChar[];

  // コンストラクタ
  // shared: trueなら共有する（デフォルト）、falseなら共有しない
  constructor(str: string, shared: boolean = true) {
    this.bigchars = [];
    if (shared) {
      // 共有する場合: Factoryを使ってインスタンスを取得
      const factory = BigCharFactory.getInstance();
      for (let i = 0; i < str.length; i++) {
        this.bigchars[i] = factory.getBigChar(str.charAt(i));
      }
    } else {
      // 共有しない場合: 毎回新しいインスタンスを生成
      for (let i = 0; i < str.length; i++) {
        this.bigchars[i] = new BigChar(str.charAt(i));
      }
    }
  }

  // 表示
  print(): void {
    for (const bc of this.bigchars) {
      bc.print();
    }
  }

  // 指定したインデックスのBigCharを取得（テスト用）
  getBigChar(index: number): BigChar {
    return this.bigchars[index];
  }
}

/*
=== Java版 ===
public class BigString {
  // 「大きな文字」の配列
  private BigChar[] bigchars;

  // コンストラクタ
  public BigString(String string) {
      BigCharFactory factory = BigCharFactory.getInstance();
      bigchars = new BigChar[string.length()];
      for (int i = 0; i < bigchars.length; i++) {
          bigchars[i] = factory.getBigChar(string.charAt(i));
      }
  }

  // 表示
  public void print() {
      for (BigChar bc: bigchars) {
          bc.print();
      }
  }
}
*/
