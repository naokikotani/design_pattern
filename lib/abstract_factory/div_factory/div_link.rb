class DivLink < Link
  def make_html
    "<div class=\"LINK\"><a href=\"#{@url}\">#{@caption}</a></div>\n"
  end
end
