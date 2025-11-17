class UnderlinePen < Product
  attr_reader :ulchar

  def initialize(ulchar)
    @ulchar = ulchar
  end

  def use(string)
    puts string
    string.length.times { print ulchar }
    puts
  end

  def create_copy
    clone
  end
end
