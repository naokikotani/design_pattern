class DivPage < Page
  def make_html
    html = "<!DOCTYPE html>\n"
    html += "<html><head><title>"
    html += @title
    html += "</title></head>\n"
    html += "<body>\n"
    html += "<h1>"
    html += @title
    html += "</h1>\n"
    @content.each do |item|
      html += item.make_html
    end
    html += "<hr><address>"
    html += @author
    html += "</address>\n"
    html += "</body></html>\n"
    html
  end
end
