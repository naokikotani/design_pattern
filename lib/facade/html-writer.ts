export class HtmlWriter {
  private output: string[] = [];

  title(title: string): void {
    this.output.push("<!DOCTYPE html>");
    this.output.push("<html>");
    this.output.push("<head>");
    this.output.push("<title>" + title + "</title>");
    this.output.push("</head>");
    this.output.push("<body>");
    this.output.push("\n");
    this.output.push("<h1>" + title + "</h1>");
    this.output.push("\n");
  }

  paragraph(msg: string): void {
    this.output.push("<p>" + msg + "</p>");
    this.output.push("\n");
  }

  link(href: string, caption: string): void {
    this.paragraph('<a href="' + href + '">' + caption + "</a>");
  }

  mailto(mailaddr: string, username: string): void {
    this.link("mailto:" + mailaddr, username);
  }

  close(): string {
    this.output.push("</body>");
    this.output.push("</html>");
    this.output.push("\n");
    return this.output.join("");
  }
}
