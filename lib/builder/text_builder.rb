class TextBuilder < Builder
  def initialize
    @sb = ''
  end

  def make_title(title)
    @sb += "==============================\n"
    @sb += "『#{title}』\n"
    @sb += "\n"
  end

  def make_string(str)
    @sb += "■#{str}\n"
    @sb += "\n"
  end

  def make_items(items)
    items.each {|item| @sb += " ・#{item}\n" }
    @sb += "\n"
  end

  def close
    @sb += "==============================\n"
  end

  def get_text_result
    @sb
  end

  def result
    @sb
  end
end
