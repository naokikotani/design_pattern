module Decorator
  class SideBorder < Border
    def initialize(display, char)
      super(display)
      @border_char = char
    end

    def get_columns
      1 + @display.get_columns + 1
    end

    def get_rows
      @display.get_rows
    end

    def get_row_text(row)
      "#{@border_char}#{@display.get_row_text(row)}#{@border_char}"
    end
  end
end
