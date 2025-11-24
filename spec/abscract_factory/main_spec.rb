require 'rspec'
require 'fileutils'

RSpec.describe "Main functionality" do
  let(:output_file) { "test_main.html" }

  before do
    @factory = DivFactory.new

    # Blog
    blog1 = @factory.create_link("Blog 1", "https://example.com/blog1")
    blog2 = @factory.create_link("Blog 2", "https://example.com/blog2")
    blog3 = @factory.create_link("Blog 3", "https://example.com/blog3")
    blog_tray = @factory.create_tray("Blog Site")
    blog_tray.add(blog1)
    blog_tray.add(blog2)
    blog_tray.add(blog3)

    # News
    news1 = @factory.create_link("News 1", "https://example.com/news1")
    news2 = @factory.create_link("News 2", "https://example.com/news2")
    news3 = @factory.create_tray("News 3")
    news3.add(@factory.create_link("News 3 (US)", "https://example.com/news3us"))
    news3.add(@factory.create_link("News 3 (Japan)", "https://example.com/news3jp"))

    news_tray = @factory.create_tray("News Site")
    news_tray.add(news1)
    news_tray.add(news2)
    news_tray.add(news3)

    # Page
    @page = @factory.create_page("Blog and News", "Hiroshi Yuki")
    @page.add(blog_tray)
    @page.add(news_tray)
  end

  after do
    FileUtils.rm_f(output_file)
  end

  it "outputs valid HTML file" do
    @page.output(output_file)

    expect(File).to exist(output_file)

    html = File.read(output_file)
    expect(html).to include("<title>Blog and News</title>")
    expect(html).to include("Blog 1")
    expect(html).to include("News 3 (Japan)")
  end
end
