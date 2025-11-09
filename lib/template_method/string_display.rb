class StringDisplay < AbstractDisplay
  attr_reader :string, :width

  def initialize(string)
    @string = string
    @width = string.length
  end

  def open
    print_line
  end

  def print_body
    "|#{string}|\n"
  end

  def close
    print_line
  end

  private

  def print_line
    "+#{'-' * width}+\n"
  end
end
