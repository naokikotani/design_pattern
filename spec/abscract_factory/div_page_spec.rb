require 'rspec'

RSpec.describe DivPage do
  let(:item1) { instance_double("Item", make_html: "<p>Item1</p>") }
  let(:item2) { instance_double("Item", make_html: "<p>Item2</p>") }

  let(:page) { described_class.new("Title", "Author") }

  before do
    page.add(item1)
    page.add(item2)
  end

  it "outputs title and author" do
    html = page.make_html
    expect(html).to include("<title>Title</title>")
    expect(html).to include("Author")
  end

  it "calls make_html for all items" do
    expect(item1).to receive(:make_html)
    expect(item2).to receive(:make_html)
    page.make_html
  end

  it "renders valid HTML structure" do
    html = page.make_html
    expect(html).to start_with("<!DOCTYPE html>")
    expect(html).to include("<body>")
    expect(html).to include("</body></html>")
  end
end
