class HTMLBuilder < Builder
  attr_reader :filename

  def initialize
    @sb = ''
    @filename = 'untitled.html'
  end

  def make_title(title)
    @filename = "#{title}.html"
    @sb += "<!DOCTYPE html>\n"
    @sb += "<html>\n"
    @sb += "<head><title>#{title}</title></head>\n"
    @sb += "<body>\n"
    @sb += "<h1>#{title}</h1>\n"
  end

  def make_string(str)
    @sb += "<p>#{str}</p>\n"
  end

  def make_items(items)
    @sb += "<ul>\n"
    items.each { |item| @sb += "<li>#{item}</li>\n" }
    @sb += "</ul>\n"
  end

  def close
    @sb += "</body>\n"
    @sb += "</html>\n"
    begin
      File.write(@filename, @sb)
    rescue => e
      puts "Error writing file: #{e.message}"
    end
  end

  def get_html_result
    @filename
  end
end
