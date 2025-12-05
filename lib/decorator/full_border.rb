module Decorator
  class FullBorder < Border
    def initialize(display)
      super(display)
    end

    def get_columns
      1 + @display.get_columns + 1
    end

    def get_rows
      1 + @display.get_rows + 1
    end

    def make_line
      "+" + "-" * @display.get_columns + "+"
    end

    def get_row_text(row)
      return make_line if row == 0 || row == get_rows - 1

      "|#{@display.get_row_text(row - 1)}|"
    end
  end
end
