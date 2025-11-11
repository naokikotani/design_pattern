class IdCardFactory < Factory
  def create_product(owner)
    IdCard.new(owner)
  end

  def register_product(product)
    puts("#{product}を登録しました。")
  end
end
