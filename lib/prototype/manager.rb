class Manager
  attr_reader :showcase

  def initialize
    @showcase = {}
  end

  def register(name, prototype)
    showcase[name] = prototype
  end

  def create(prototype_name)
    p = showcase[prototype_name]
    p.create_copy
  end
end
