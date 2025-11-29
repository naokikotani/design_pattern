class DivPage < Page
  def make_html
    <<~HTML
      <!DOCTYPE html>
      <html><head><title>#{@title}</title></head>
      <body>
      <h1>#{@title}</h1>
      #{@content.map(&:make_html).join}<hr><address>#{@author}</address>
      </body></html>
    HTML
  end
end
