require 'rspec'

RSpec.describe "Builder Pattern" do
  describe "TextBuilder" do
    it "text モードと同じ出力を生成する" do
      builder = TextBuilder.new
      director = Director.new(builder)

      director.construct

      result = builder.result

      expect(result).to include("==============================")
      expect(result).to include("『旅行の持ち物リスト』")
      expect(result).to include("■必需品")
      expect(result).to include("・パスポート")
      expect(result).to include("■衣類")
      expect(result).to include("・着替え")
      expect(result).to include("■洗面用具")
      expect(result).to include("・歯ブラシ")
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
      expect(html).to include("<h1>旅行の持ち物リスト</h1>")
      expect(html).to include("<li>パスポート</li>")
      expect(html).to include("<li>着替え</li>")
      expect(html).to include("<li>歯ブラシ</li>")

      File.delete(filename) if File.exist?(filename)
    end
  end
end
