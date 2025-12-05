module Decorator
  class StringDisplay < Display
    def initialize(string)
      @string = string
    end

    def get_columns
      @string.length
    end

    def get_rows
      1
    end

    def get_row_text(row)
      raise "row out of range" unless row == 0
      @string
    end
  end
end
