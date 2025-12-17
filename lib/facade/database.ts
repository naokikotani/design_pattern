import * as fs from "fs";
import * as path from "path";

export class Database {
  private constructor() {}

  static getProperties(dbname: string): Map<string, string> {
    const filename = path.join(__dirname, dbname + ".txt");
    const content = fs.readFileSync(filename, "utf-8");
    const props = new Map<string, string>();

    for (const line of content.split("\n")) {
      if (line.trim() === "") continue;
      const [key, value] = line.split("=");
      if (key && value) {
        props.set(key.trim(), value.trim());
      }
    }

    return props;
  }
}
