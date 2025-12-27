// List 20-13: BigCharFactory クラス (BigCharFactory.java)

import { BigChar } from "./big-char";

export class BigCharFactory {
  // すでに作ったBigCharのインスタンスを管理
  private pool: Map<string, BigChar> = new Map();
  // Singletonパターン
  private static singleton: BigCharFactory = new BigCharFactory();

  // コンストラクタ
  private constructor() {}

  // 唯一のインスタンスを得る
  static getInstance(): BigCharFactory {
    return BigCharFactory.singleton;
  }

  // BigCharのインスタンス生成(共有)
  getBigChar(charname: string): BigChar {
    let bc = this.pool.get(charname);
    if (bc === undefined) {
      // ここでBigCharのインスタンスを生成
      bc = new BigChar(charname);
      this.pool.set(charname, bc);
    }
    return bc;
  }
}

/*
=== Java版 ===
import java.util.HashMap;
import java.util.Map;

public class BigCharFactory {
    // すでに作ったBigCharのインスタンスを管理
    private Map<String,BigChar> pool = new HashMap<>();
    // Singletonパターン
    private static BigCharFactory singleton = new BigCharFactory();

    // コンストラクタ
    private BigCharFactory() {
    }

    // 唯一のインスタンスを得る
    public static BigCharFactory getInstance() {
        return singleton;
    }

    // BigCharのインスタンス生成(共有)
    public synchronized BigChar getBigChar(char charname) {
        BigChar bc = pool.get(String.valueOf(charname));
        if (bc == null) {
            // ここでBigCharのインスタンスを生成
            bc = new BigChar(charname);
            pool.put(String.valueOf(charname), bc);
        }
        return bc;
    }
}
*/
