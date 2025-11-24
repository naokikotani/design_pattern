class Page
  def initialize(title, author)
    @title = title
    @author = author
    @content = []
  end

  def add(item)
    @content << item
  end

  def output(filename = nil)
    filename ||= "#{@title}.html"
    File.write(filename, make_html)
    filename
  end

  def make_html
    raise NotImplementedError
  end
end
