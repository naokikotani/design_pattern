class MessageBox < Product
  include Prototype

  attr_reader :decochar

  def initialize(decochar)
    @decochar = decochar
  end

  def use(string)
    decolen = string.length + 2
    print_line(decolen)
    puts "#{decochar}#{string}#{decochar}"
    print_line(decolen)
  end

  private

  def print_line(count)
    count.times { print decochar }
    puts
  end
end
