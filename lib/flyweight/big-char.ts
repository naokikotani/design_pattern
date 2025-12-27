// List 20-12: BigChar クラス (BigChar.java)

import * as fs from "fs";
import * as path from "path";

export class BigChar {
  // 文字の名前
  private charname: string;
  // 大きな文字を表現する文字列('#' '.' '\n'の列)
  private fontdata: string;

  // コンストラクタ
  constructor(charname: string) {
    this.charname = charname;
    try {
      const filename = `big${charname}.txt`;
      const filepath = path.join(__dirname, filename);
      const lines = fs.readFileSync(filepath, "utf-8").split("\n");
      this.fontdata = lines.join("\n");
    } catch (e) {
      this.fontdata = charname + "?";
    }
  }

  // 大きな文字を表示する
  print(): void {
    console.log(this.fontdata);
  }
}

/*
=== Java版 ===
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class BigChar {
    // 文字の名前
    private char charname;
    // 大きな文字を表現する文字列('#' '.' '\n'の列)
    private String fontdata;

    // コンストラクタ
    public BigChar(char charname) {
        this.charname = charname;
        try {
            String filename = "big" + charname + ".txt";
            StringBuilder sb = new StringBuilder();
            for (String line: Files.readAllLines(Path.of(filename))) {
                sb.append(line);
                sb.append("\n");
            }
            this.fontdata = sb.toString();
        } catch (IOException e) {
            this.fontdata = charname + "?";
        }
    }

    // 大きな文字を表示する
    public void print() {
        System.out.print(fontdata);
    }
}
*/
