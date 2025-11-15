module FileIO
  def read_from_file(filename)
    raise NotImplementedError
  end

  def write_to_file(filename)
    raise NotImplementedError
  end

  def set_value(key, value)
    raise NotImplementedError
  end

  def get_value(key)
    raise NotImplementedError
  end
end
