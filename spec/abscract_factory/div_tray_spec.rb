require 'rspec'

RSpec.describe DivTray do
  let(:item1) { instance_double("Item", make_html: "<p>Item1</p>") }
  let(:item2) { instance_double("Item", make_html: "<p>Item2</p>") }
  let(:tray) { described_class.new("Tray Caption") }

  before do
    tray.add(item1)
    tray.add(item2)
  end

  it "includes caption" do
    expect(tray.make_html).to include("<b>Tray Caption</b>")
  end

  it "renders TRAY div" do
    expect(tray.make_html).to include("<div class=\"TRAY\">")
    expect(tray.make_html).to include("</div>")
  end

  it "calls make_html for all items" do
    expect(item1).to receive(:make_html)
    expect(item2).to receive(:make_html)
    tray.make_html
  end
end
