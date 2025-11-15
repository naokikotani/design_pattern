class IdCardFactory < Factory
  attr_reader :owners
  attr_accessor :serial_counter

  def initialize
    @owners = {}
    @serial_counter = 0
  end

  def create_product(owner)
    self.serial_counter += 1
    IdCard.new(owner, serial_counter)
  end

  def register_product(product)
    owners[product.serial] = product.owner
    puts "#{product}を登録しました。"
  end
end
