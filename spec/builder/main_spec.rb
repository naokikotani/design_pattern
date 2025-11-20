require 'rspec'

RSpec.describe "Builder Pattern" do
  describe "TextBuilder" do
    it "text モードと同じ出力を生成する" do
      builder = TextBuilder.new
      director = Director.new(builder)

      director.construct

      result = builder.result

      expect(result).to include("==============================")
      expect(result).to include("『Greeting』")
      expect(result).to include("■一般的なあいさつ")
      expect(result).to include("・How are you?")
      expect(result).to include("■時間帯に応じたあいさつ")
      expect(result).to include("・Good morning.")
      expect(result).to include("==============================")
    end
  end

  describe "HTMLBuilder" do
    it "HTML ファイルを生成し、そのファイル名を返す" do
      builder = HTMLBuilder.new
      director = Director.new(builder)

      director.construct

      filename = builder.filename
      expect(File.exist?(filename)).to be true

      html = File.read(filename)
      expect(html).to include("<h1>Greeting</h1>")
      expect(html).to include("<li>How are you?</li>")
      expect(html).to include("<li>Good morning.</li>")

      File.delete(filename) if File.exist?(filename)
    end
  end
end
