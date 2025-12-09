class Entry
  attr_accessor :parent

  def get_name
    raise NotImplementedError
  end

  def get_full_path
    if @parent
      "#{@parent.get_full_path}/#{get_name}"
    else
      "/#{get_name}"
    end
  end

  def get_size
    raise NotImplementedError
  end

  def print_list
    print_list('')
  end

  def print_list(prefix)
    raise NotImplementedError
  end

  def to_s
    "#{get_name} (#{get_size})"
  end
end
