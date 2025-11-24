class DivFactory < Factory
  def create_link(caption, url)
    DivLink.new(caption, url)
  end

  def create_tray(caption)
    DivTray.new(caption)
  end

  def create_page(title, author)
    DivPage.new(title, author)
  end
end
