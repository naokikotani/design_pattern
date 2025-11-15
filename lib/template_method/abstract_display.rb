class AbstractDisplay
  def open
    raise NotImplementedError
  end

  def print_body
    raise NotImplementedError
  end

  def close
    raise NotImplementedError
  end

  def display
    result = open
    5.times { result += print_body }
    result += close
    result
  end
end
