class Builder
  def make_title(title)
    raise NotImplementedError
  end

  def make_string(str)
    raise NotImplementedError
  end

  def make_items(items)
    raise NotImplementedError
  end

  def close
    raise NotImplementedError
  end
end
