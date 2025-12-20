import * as fs from "fs";
import { Database } from "./database";
import { HtmlWriter } from "./html-writer";

export class PageMaker {
  private constructor() {}

  static makeWelcomePage(mailaddr: string, filename: string): void {
    const mailprop = Database.getProperties("maildata");
    const username = mailprop.get(mailaddr);

    if (!username) {
      throw new Error(`User not found: ${mailaddr}`);
    }

    const writer = new HtmlWriter();
    writer.title(username + "'s web page");
    writer.paragraph("Welcome to " + username + "'s web page!");
    writer.paragraph("Nice to meet you!");
    writer.mailto(mailaddr, username);
    const html = writer.close();

    fs.writeFileSync(filename, html);
    console.log(filename + " is created for " + mailaddr + " (" + username + ")");
  }
}
