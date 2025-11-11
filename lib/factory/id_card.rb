class IdCard < Product
  attr_reader :owner

  def initialize(owner)
    puts "#{owner}のカードを作ります。"
    @owner = owner
  end

  def use
    puts "#{self}を使います。"
  end

  def to_s
    "[IDCard:#{owner}]"
  end
end
