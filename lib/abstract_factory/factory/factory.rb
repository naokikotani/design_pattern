class Factory
  def self.get_factory(class_name)
    begin
      Object.const_get(class_name).new
    rescue NameError
      raise "#{class_name}が見つかりません"
    end
  end

  def create_link(caption, url)
    raise NotImplementedError
  end

  def create_tray(caption)
    raise NotImplementedError
  end

  def create_page(title, author)
    raise NotImplementedError
  end
end
