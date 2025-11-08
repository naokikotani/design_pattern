class PrintBanner < Print
  include Banner
  attr_reader :string

  def initialize(string)
    @string = string
  end

  def print_weak
    "(#{string})"
  end

  def print_strong
    "*#{string}*"
  end
end
