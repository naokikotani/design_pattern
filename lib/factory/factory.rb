class Factory
  def create(owner)
    p = create_product(owner)
    register_product(p)

    p
  end

  def create_product(owner)
    raise NotImplementedError
  end

  def register_product(product)
    raise NotImplementedError
  end
end
