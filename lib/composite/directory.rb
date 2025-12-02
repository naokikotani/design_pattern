class Directory < Entry
  def initialize(name)
    @name = name
    @directory = []
  end

  def get_name
    @name
  end

  def get_size
    @directory.sum { |entry| entry.get_size }
  end

  def print_list(prefix = "")
    puts("#{prefix}/#{self}")
    @directory.each do |entry|
      entry.print_list("#{prefix}/#{@name}")
    end
  end

  def add(entry)
    @directory << entry
    self
  end
end
