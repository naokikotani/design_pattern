class Link < Item
  def initialize(caption, url)
    super(caption)
    @url = url
  end
end
