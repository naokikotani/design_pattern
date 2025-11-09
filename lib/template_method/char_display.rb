class CharDisplay < AbstractDisplay
  attr_reader :ch

  def initialize(ch)
    @ch = ch
  end

  def open
    '<<'
  end

  def print_body
    ch
  end

  def close
    '>>'
  end
end
