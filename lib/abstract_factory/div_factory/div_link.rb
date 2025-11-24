class DivLink < Link
  def make_html
    <<~HTML
      <div class="LINK"><a href="#{@url}">#{@caption}</a></div>
    HTML
  end
end
