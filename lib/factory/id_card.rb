class IdCard < Product
  attr_reader :owner, :serial

  def initialize(owner, serial)
    @owner = owner
    @serial = serial
    puts "#{owner}のカードを作ります。"
  end

  def use
    puts "#{self}を使います。"
  end

  def to_s
    "[IDCard:#{owner}##{serial}]"
  end
end
