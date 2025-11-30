class Tray < Item
  def initialize(caption)
    super
    @tray = []
  end

  def add(item)
    @tray << item
  end
end
