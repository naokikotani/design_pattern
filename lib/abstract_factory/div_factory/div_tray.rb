class DivTray < Tray
  def make_html
    html = "<div class=\"TRAY\">"
    html += "<b>#{@caption}</b>\n"
    @tray.each do |item|
      html += item.make_html
    end
    html += "</div>\n"
    html
  end
end
