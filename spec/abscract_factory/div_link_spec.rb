require 'rspec'

RSpec.describe DivLink do
  let(:caption) { "Example" }
  let(:url)     { "https://example.com" }
  let(:link)    { described_class.new(caption, url) }

  it "includes caption in the HTML" do
    expect(link.make_html).to include(caption)
  end

  it "generates proper anchor with URL" do
    expect(link.make_html).to include("href=\"#{url}\"")
  end

  it "wraps with div class='LINK'" do
    html = link.make_html
    expect(html).to start_with("<div class=\"LINK\">")
    expect(html).to end_with("</div>\n")
  end

  it "contains anchor tag" do
    expect(link.make_html).to include("<a")
    expect(link.make_html).to include("</a>")
  end
end
